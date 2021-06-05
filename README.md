# Character Count Checker for Figma
Character Count Checker is a simple plugin that let's you define a maximum character count for a text layer 
and check if the text layer exceeds that character count. This is especially handy for enforcing character 
limits for localization.

Here's how you use it:
1. Add `[CC:XX]` to the name of your text layer where XX is the allowed character count. For example: `Description [CC:2000]`.
2. Update your text layers with content as usual.
3. To check your layers, select them or their parent frames and run the plugin. If nothing is selected, the entire page will 
be checked.
4. Text layers that exceed their character count will be highlighted with a red overlay layer. These overlays will 
be at the top of your layers list. 
5. To quickly find the location of an overlay, select it and press Shift + 2.
