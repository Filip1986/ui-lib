# Theme Switcher in Storybook

## Overview
A theme switcher has been implemented in Storybook to allow testing components in both light and dark themes.

## How It Works

The theme switcher uses Storybook's `globalTypes` and decorators to:
1. Add a toolbar button in Storybook UI with sun/moon icons
2. Apply the `data-theme` attribute to the document element
3. Load your CSS variables from `global-variables.scss`

## Implementation Details

### Files Modified

1. **`.storybook/preview.ts`**
   - Added `globalTypes` configuration for the theme toolbar
   - Added a decorator that applies `data-theme` attribute to document element
   - Uses bracket notation to access theme: `context.globals['theme']`

2. **`.storybook/preview-head.html`**
   - Added background color styling that responds to theme changes

**Note:** The `global-variables.scss` file is automatically loaded through `styles.scss` which is included in the Angular build configuration (`angular.json`). No additional imports are needed in `preview.ts`.

## Usage

1. **Start Storybook:**
   ```bash
   npm run storybook
   ```

2. **Switch Themes:**
   - Look for the theme icon in the Storybook toolbar (top of the page)
   - Click the icon to toggle between:
     - ☀️ Light theme
     - 🌙 Dark theme

3. **In Your Stories:**
   The theme is automatically applied to all stories. No additional configuration needed in individual story files.

## CSS Variables

The theme switcher works with your existing CSS variables defined in `global-variables.scss`:

### Light Theme (default)
```css
:root {
  --background-color: #fafafa;
  --text-color: #495057;
  --primary-color: #3B82F6;
  /* ... other variables */
}
```

### Dark Theme
```css
[data-theme='dark'] {
  --background-color: #141a21;
  --text-color: #e6e6e6;
  --primary-color: #4d8fff;
  /* ... other variables */
}
```

## Testing Components

When you view any component in Storybook:
1. The component will initially render in light theme
2. Click the theme switcher in the toolbar
3. The entire Storybook canvas will update to dark theme
4. All CSS variables will switch to their dark theme values
5. Your components will re-render with dark theme styles

## Customization

To customize the theme switcher:

### Change Default Theme
In `.storybook/preview.ts`, modify the `defaultValue`:
```typescript
globalTypes: {
  theme: {
    defaultValue: 'dark', // Change to 'dark' for dark as default
    // ...
  },
}
```

### Add More Themes
Extend the `items` array in `.storybook/preview.ts`:
```typescript
items: [
  { value: 'light', icon: 'sun', title: 'Light theme' },
  { value: 'dark', icon: 'moon', title: 'Dark theme' },
  { value: 'custom', icon: 'star', title: 'Custom theme' },
],
```

Then add corresponding CSS in `global-variables.scss`:
```css
[data-theme='custom'] {
  /* custom theme variables */
}
```

## Troubleshooting

If the theme switcher doesn't appear:
1. Restart Storybook: `npm run storybook`
2. Clear browser cache
3. Check that `global-variables.scss` is being imported correctly

If themes don't switch:
1. Verify CSS variables are using the correct selectors
2. Check browser console for errors
3. Ensure components are using CSS variables (not hard-coded colors)

