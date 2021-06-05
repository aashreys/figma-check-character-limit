# Character Count Checker for Figma
Character Count Checker is a simple plugin that lets you define a maximum character count for a text layer 
and flag any layer that exceeds its character count. It is especially handy for enforcing character limits
for localization.

Here's how you use it:
1. Add `[CharCount:XX]` to the name of your text layers. XX is the maximum character count for the layer. For example: `Description Text [CharCount:2000]`.
2. Edit content and run the plugin to check character counts on your text layers (see note).
3. Text layers that exceed their character count will be highlighted in red. The highlight layers can be found at the top of your layer list.
4. Select an overlay from the layer list and press Shift + 2 to locate it.
5. Edit the text layer and delete the highlight.

Note: When running the plugin, if no layer is selected, the whole page will be checked. To check a specific layer, or all layers under a frame, select the layers or frames before running the plugin. This allows you to scope the checking as you see fit.
