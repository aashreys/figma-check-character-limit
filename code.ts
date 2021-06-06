const TEXT_NODE = "TEXT";
const NOTIFICATION_TIME_SHORT = 2000;
const NOTIFICATION_TIME_LONG = 3000;
const IS_DEBUG_LOG_ENABLED = true;
const CHAR_LIMIT_REGEX = /CharLimit:(\d+)/i; // https://regex101.com/r/o9z8wp/1
const FLAG_ID_KEY = "FLAG_ID";

var numFlaggedNodes = 0;

// MAIN FUNCTION
try {
    if (figma.currentPage.selection.length > 0) {
        for (const node of figma.currentPage.selection) processRecursively(node);
    } else {
        processRecursively(figma.currentPage);
    }
    notifyStatus(numFlaggedNodes);
} catch (error) {
    logError(error);
} finally {
    figma.closePlugin();
}

function processRecursively(rootNode) {
    if (isNodeText(rootNode)) {
        checkCharacterLimit(rootNode);    
    } 

    if ("children" in rootNode) {
        for (const child of rootNode.children) {
            processRecursively(child);
        }
    }
}

function checkCharacterLimit(textNode: TextNode) {
    if (CHAR_LIMIT_REGEX.test(textNode.name)) {
        const numCharLimit = parseInt(textNode.name.match(CHAR_LIMIT_REGEX)[1]);
        if (textNode.characters.length > numCharLimit) {
            flagNode(textNode, textNode.characters.length - numCharLimit);
        } else {
            unflagNode(textNode);
        }
    }
}

function flagNode(textNode: TextNode, numExtraChars) {
    setNodeFlag(textNode, updateFlagNodeUI(textNode, numExtraChars).id);
    numFlaggedNodes++;
}

function updateFlagNodeUI(textNode: TextNode, numExtraChars) {
    var flag:RectangleNode = getFlagNode(textNode) as RectangleNode;
    if (flag == null) flag = figma.createRectangle();
    figma.currentPage.appendChild(flag);
    flag.name = getFlagUIName(numExtraChars);
    flag.x = textNode.absoluteTransform[0][2];
    flag.y = textNode.absoluteTransform[1][2];
    flag.resize(textNode.width, textNode.height);
    const fills = clone(flag.fills);
    fills[0].color.r = 1;
    fills[0].color.g = 0.286;
    fills[0].color.b = 0.286;
    flag.fills = fills;
    flag.opacity = 0.4;
    return flag;
}

function getFlagNode(textNode: TextNode) {
    return figma.getNodeById(textNode.getPluginData(FLAG_ID_KEY));
}


function unflagNode(textNode: TextNode) {
    const flag:BaseNode = getFlagNode(textNode);
    if (flag != null) flag.remove();
    setNodeFlag(textNode, "");
}

function setNodeFlag(textNode: TextNode, flagId) {
    textNode.setPluginData(FLAG_ID_KEY, flagId);
}

function getFlagUIName(numExtraChars) {
    return `\u26A0 Character limit exceeded by ${numExtraChars}`;
}

function isNodeText(node) {
    return node.type === "TEXT";
}

function notifyStatus(numFlaggedNodes) {
    if (numFlaggedNodes > 0) {
        const msg = numFlaggedNodes + (numFlaggedNodes > 1 ? " layers exceed character limits" : " layer exceeds character limit") + ". Flagged at the top of the layer list.";
        notifyUI(msg, NOTIFICATION_TIME_LONG);
    } else {
        notifyUI("All layers within character limits!", NOTIFICATION_TIME_SHORT);
    }
}

function notifyUI(message: string, time) {
    figma.notify(message, {timeout: time});
}

function log(obj) {
    if (IS_DEBUG_LOG_ENABLED) console.log(obj);
}

function logError(error) {
    console.error(error)
}

function clone(val) {
    const type = typeof val
    if (val === null) {
      return null
    } else if (type === 'undefined' || type === 'number' ||
               type === 'string' || type === 'boolean') {
      return val
    } else if (type === 'object') {
      if (val instanceof Array) {
        return val.map(x => clone(x))
      } else if (val instanceof Uint8Array) {
        return new Uint8Array(val)
      } else {
        let o = {}
        for (const key in val) {
          o[key] = clone(val[key])
        }
        return o
      }
    }
    throw 'unknown'
}