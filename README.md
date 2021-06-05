# Character Count Checker for Figma
Character Count Checker is a simple plugin that let's you define a maximum character count for a text layer 
and flag any layer that exceeds its character count. It is especially handy for enforcing character limimts
for localization.

Here's how you use it:
1. Add `[CharCount:XX]` to the name of your text layers. XX is the maximum character count for the layer. For example: `Description Text [CharCount:2000]`.
2. Run the plugin to check character counts on your text layers (see note).
3. Text layers that exceed their character count will be highlighted with a red overlay. The overlays can be found at the top of your layer list.
4. Select an overlay from the layer list and press Shift + 2 to locate it.
5. Edit the associated text layer and fix its content.

Note: When running the plugin, selection matters. If you've selected specific layers, only those layers will be checked. If nothing is selected, the entire page will be checked. This allows you to scope the checking as you see fit.
