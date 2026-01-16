# Storybook Guide for UI-Lib

This guide provides comprehensive documentation on using Storybook in the UI-Lib project.

## Table of Contents

1. [What is Storybook?](#what-is-storybook)
2. [Getting Started](#getting-started)
3. [Project Configuration](#project-configuration)
4. [Writing Stories](#writing-stories)
5. [Best Practices](#best-practices)
6. [Advanced Features](#advanced-features)
7. [Troubleshooting](#troubleshooting)

## What is Storybook?

Storybook is an open-source tool for building UI components in isolation. It allows developers to:
- Develop components independently from the main application
- Test different states and variants of components
- Document component APIs automatically
- Share component libraries with stakeholders
- Perform visual testing and accessibility checks

## Getting Started

### Prerequisites

Ensure you have all dependencies installed:

```bash
npm install
```

### Running Storybook

Start the Storybook development server:

```bash
npm run storybook
```

This command will:
1. Generate Compodoc documentation from your Angular components
2. Start Storybook on `http://localhost:6006/`
3. Watch for changes and hot-reload automatically

Open your browser and navigate to `http://localhost:6006/` to view the Storybook interface.

### Building Storybook

To create a production build of Storybook:

```bash
npm run build-storybook
```

The static files will be generated in the `storybook-static/` directory. You can deploy these files to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:

```bash
npx http-server storybook-static
```

## Project Configuration

### Configuration Files

#### `.storybook/main.ts`

Main configuration file defining:

```typescript
{
  "stories": [
    "../src/**/*.mdx",              // MDX documentation files
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"  // Story files
  ],
  "addons": [
    "@storybook/addon-a11y",         // Accessibility testing
    "@storybook/addon-docs",         // Auto-documentation
    "@storybook/addon-onboarding"    // Onboarding guide
  ],
  "framework": "@storybook/angular"
}
```

#### `.storybook/preview.ts`

Global configurations applied to all stories:

```typescript
{
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,  // Auto-detect color controls
        date: /Date$/i,                  // Auto-detect date controls
      },
    },
  },
}
```

Includes Compodoc integration for enhanced documentation from JSDoc comments.

#### `angular.json` Storybook Configuration

```json
{
  "storybook": {
    "builder": "@storybook/angular:start-storybook",
    "options": {
      "configDir": ".storybook",
      "browserTarget": "ui-lib:build",
      "compodoc": true,           // Enable Compodoc integration
      "port": 6006               // Default port
    }
  },
  "build-storybook": {
    "builder": "@storybook/angular:build-storybook",
    "options": {
      "configDir": ".storybook",
      "browserTarget": "ui-lib:build",
      "compodoc": true,
      "outputDir": "storybook-static"
    }
  }
}
```

## Writing Stories

### Story File Structure

Stories use the Component Story Format (CSF) 3.0 syntax:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { YourComponent } from './your-component';

// Meta configuration for the component
const meta: Meta<YourComponent> = {
  title: 'Category/ComponentName',  // Navigation path in Storybook
  component: YourComponent,
  tags: ['autodocs'],               // Enable automatic documentation
  parameters: {
    layout: 'centered',             // Layout: 'centered', 'fullscreen', or 'padded'
  },
  argTypes: {
    // Define interactive controls
    propertyName: {
      control: 'text',              // Control type
      description: 'Property description',
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<YourComponent>;

// Individual stories
export const Default: Story = {
  args: {
    propertyName: 'value',
  },
};
```

### Control Types

Common control types for argTypes:

- **Text input**: `control: 'text'`
- **Number input**: `control: 'number'`
- **Boolean toggle**: `control: 'boolean'`
- **Color picker**: `control: 'color'`
- **Select dropdown**: `control: { type: 'select', options: ['option1', 'option2'] }`
- **Radio buttons**: `control: { type: 'radio', options: ['option1', 'option2'] }`
- **Date picker**: `control: 'date'`
- **Range slider**: `control: { type: 'range', min: 0, max: 100, step: 1 }`

### Example: Button Component Story

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { Button1Component } from './button-1.component';

const meta: Meta<Button1Component> = {
  component: Button1Component,
  title: 'Components/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'red', 'green', 'yellow', 'primary', 'secondary'],
      description: 'Button variant/color',
      defaultValue: 'blue',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<Button1Component>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};
```

### Story Naming Conventions

Use clear, descriptive names for stories:

```typescript
export const Default: Story = { /* ... */ };
export const Disabled: Story = { /* ... */ };
export const WithLongText: Story = { /* ... */ };
export const ErrorState: Story = { /* ... */ };
export const LoadingState: Story = { /* ... */ };
```

### Organizing Stories

Organize stories in a hierarchical structure using the `title` property:

```typescript
// Components
title: 'Components/Button'
title: 'Components/Card'

// Form Elements
title: 'Form Elements/Input'
title: 'Form Elements/Select'
title: 'Form Elements/Checkbox'

// Layout
title: 'Layout/Sidenav'
title: 'Layout/Header'

// Examples (demos)
title: 'Examples/LoginForm'
title: 'Examples/Dashboard'
```

## Best Practices

### 1. Component Documentation

Use JSDoc comments in your components - they appear automatically in Storybook via Compodoc:

```typescript
@Component({
  selector: 'app-button',
  // ...
})
export class ButtonComponent {
  /**
   * The button variant/color scheme
   * @default 'primary'
   */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Output() onClick = new EventEmitter<void>();
}
```

### 2. Create Multiple Story Variants

Show all important states and use cases:

```typescript
export const Default: Story = { /* ... */ };
export const Disabled: Story = { /* ... */ };
export const Loading: Story = { /* ... */ };
export const WithIcon: Story = { /* ... */ };
export const Small: Story = { /* ... */ };
export const Large: Story = { /* ... */ };
export const ErrorState: Story = { /* ... */ };
```

### 3. Use Parameters for Story Configuration

```typescript
export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
};
```

### 4. Add Decorators for Context

Wrap stories with necessary providers or context:

```typescript
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

const meta: Meta<YourComponent> = {
  // ...
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};
```

### 5. Test Component Interactions

Use the `play` function to test user interactions:

```typescript
import { userEvent, within } from '@storybook/test';

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
  },
};
```

## Advanced Features

### 1. Actions

Track component events in the Actions panel:

```typescript
import { fn } from '@storybook/test';

const meta: Meta<ButtonComponent> = {
  // ...
  args: {
    onClick: fn(),  // Automatically tracked in Actions panel
  },
};
```

### 2. Accessibility Testing

The `@storybook/addon-a11y` addon automatically checks for accessibility issues. View results in the "Accessibility" tab.

To configure accessibility rules:

```typescript
export const AccessibleButton: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### 3. MDX Documentation

Create rich documentation pages using MDX:

```mdx
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

# Button Component

The Button component is a versatile UI element...

<Canvas of={ButtonStories.Primary} />

## Usage

```typescript
<app-button variant="primary" size="medium">Click Me</app-button>
```
```

### 4. Viewport Testing

Test components at different screen sizes:

```typescript
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

### 5. Custom Backgrounds

Test components on different backgrounds:

```typescript
export const DarkBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#333' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
};
```

## Existing Stories in the Project

### Example Stories (`src/stories/`)
- **button.stories.ts**: Basic button component examples
- **header.stories.ts**: Header component with user authentication
- **page.stories.ts**: Complete page layout example

### Component Stories (`src/app/`)

**Buttons:**
- `buttons/button-1/button-1.component.stories.ts`
- `buttons/button-2/button-2.component.stories.ts`

**Form Elements:**
- `form-elements/checkbox/checkbox.component.stories.ts`
- `form-elements/currency-input/currency-input.component.stories.ts`
- `form-elements/date-picker/date-picker.component.stories.ts`
- `form-elements/listbox/listbox.component.stories.ts`
- `form-elements/multiselect/multiselect.component.stories.ts`
- `form-elements/radio-button/radio-button.component.stories.ts`
- `form-elements/select/select.component.stories.ts`
- `form-elements/select-button/select-button.component.stories.ts`
- `form-elements/textarea/textarea.component.stories.ts`

**Layout Components:**
- `sidenav/sidenav.component.stories.ts`
- `breadcrumbs/breadcrumb/breadcrumbs.component.stories.ts`
- `separator/separator.component.stories.ts`

**Auth Components:**
- `login/login.component.stories.ts`

## Troubleshooting

### Storybook Won't Start

1. **Check if port 6006 is already in use:**
   ```bash
   # Kill process on port 6006 (Windows)
   netstat -ano | findstr :6006
   taskkill /PID <PID> /F
   ```

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

### Component Not Rendering

1. **Check if component is standalone or needs module imports**
2. **Verify all required providers are included**
3. **Check browser console for errors**
4. **Ensure all component dependencies are imported in the story**

### Compodoc Documentation Not Showing

1. **Add JSDoc comments to your component**
2. **Ensure `compodoc: true` is set in `angular.json`**
3. **Restart Storybook to regenerate documentation**

### Hot Reload Not Working

1. **Restart Storybook**
2. **Check if file is being watched (look for glob pattern matches in `.storybook/main.ts`)**
3. **Clear browser cache**

## Additional Resources

- **Official Documentation**: [https://storybook.js.org/docs](https://storybook.js.org/docs)
- **Storybook for Angular**: [https://storybook.js.org/docs/get-started/angular](https://storybook.js.org/docs/get-started/angular)
- **Component Story Format**: [https://storybook.js.org/docs/api/csf](https://storybook.js.org/docs/api/csf)
- **Writing Stories**: [https://storybook.js.org/docs/writing-stories](https://storybook.js.org/docs/writing-stories)
- **Addons**: [https://storybook.js.org/addons](https://storybook.js.org/addons)
- **Angular Integration**: [https://github.com/storybookjs/storybook/tree/next/code/frameworks/angular](https://github.com/storybookjs/storybook/tree/next/code/frameworks/angular)

## Contributing

When adding new components to the library:

1. Create a corresponding `.stories.ts` file alongside the component
2. Use the established naming conventions and organization structure
3. Document all component inputs and outputs with JSDoc comments
4. Create stories for all major states and variants
5. Test accessibility with the a11y addon
6. Add interaction tests where appropriate

---

For questions or issues related to Storybook in this project, please open an issue in the project repository.

