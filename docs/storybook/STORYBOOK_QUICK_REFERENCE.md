# Storybook Quick Reference

Quick commands and examples for working with Storybook in UI-Lib.

## Commands

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook

# Preview production build locally
npx http-server storybook-static
```

## Quick Start: Create a New Story

1. **Create a story file next to your component:**
   ```
   your-component.component.ts
   your-component.component.html
   your-component.component.scss
   your-component.component.stories.ts  👈 Create this
   ```

2. **Basic story template:**

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { YourComponent } from './your-component.component';

const meta: Meta<YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Add controls for your inputs
    inputProperty: {
      control: 'text',
      description: 'Description of property',
    },
  },
};

export default meta;
type Story = StoryObj<YourComponent>;

export const Default: Story = {
  args: {
    inputProperty: 'default value',
  },
};
```

3. **Run Storybook to see your story:**
   ```bash
   npm run storybook
   ```

## Common Control Types

```typescript
argTypes: {
  // Text input
  text: { control: 'text' },
  
  // Number input
  count: { control: 'number' },
  
  // Boolean toggle
  enabled: { control: 'boolean' },
  
  // Color picker
  color: { control: 'color' },
  
  // Select dropdown
  size: { 
    control: 'select',
    options: ['small', 'medium', 'large']
  },
  
  // Radio buttons
  variant: {
    control: 'radio',
    options: ['primary', 'secondary']
  },
  
  // Range slider
  opacity: {
    control: { type: 'range', min: 0, max: 1, step: 0.1 }
  },
  
  // Date picker
  date: { control: 'date' },
}
```

## Story Variants

```typescript
// Default state
export const Default: Story = {
  args: { /* default values */ },
};

// Disabled state
export const Disabled: Story = {
  args: { disabled: true },
};

// Loading state
export const Loading: Story = {
  args: { isLoading: true },
};

// Error state
export const Error: Story = {
  args: { error: 'Something went wrong' },
};

// Different sizes
export const Small: Story = {
  args: { size: 'small' },
};

export const Large: Story = {
  args: { size: 'large' },
};
```

## Story Parameters

```typescript
export const MyStory: Story = {
  args: { /* ... */ },
  parameters: {
    // Layout options
    layout: 'centered',  // 'centered', 'fullscreen', 'padded'
    
    // Background
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#333' },
        { name: 'light', value: '#fff' },
      ],
    },
    
    // Viewport
    viewport: {
      defaultViewport: 'mobile1',
    },
    
    // Accessibility
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};
```

## Adding Actions

Track component events:

```typescript
import { fn } from '@storybook/test';

const meta: Meta<YourComponent> = {
  // ...
  args: {
    onClick: fn(),
    onSubmit: fn(),
  },
};
```

## Adding Decorators

Provide context (providers, routing, etc.):

```typescript
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<YourComponent> = {
  // ...
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        provideHttpClient(),
      ],
    }),
  ],
};
```

## Interaction Testing

```typescript
import { userEvent, within, expect } from '@storybook/test';

export const FilledForm: Story = {
  args: { /* ... */ },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Type in input
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    
    // Click button
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    
    // Assert
    await expect(canvas.getByText('Success!')).toBeInTheDocument();
  },
};
```

## JSDoc for Auto-Documentation

Add JSDoc comments to your component for automatic documentation:

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
  @Input() variant: 'primary' | 'secondary' = 'primary';

  /**
   * Size of the button
   * @default 'medium'
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Emitted when button is clicked
   */
  @Output() onClick = new EventEmitter<void>();
}
```

## Story Organization

Use consistent naming in the `title` property:

```
Components/Button
Components/Card
Components/Modal

Form Elements/Input
Form Elements/Select
Form Elements/Checkbox

Layout/Header
Layout/Sidenav
Layout/Footer

Pages/Login
Pages/Dashboard
```

## Common Issues

### Story not showing?
- Check file is named `*.stories.ts`
- Verify it's in `src/` directory
- Restart Storybook

### Component not rendering?
- Check component is standalone or imports are correct
- Verify required providers in decorators
- Check browser console for errors

### Hot reload not working?
- Save the file again
- Restart Storybook
- Clear browser cache

## Project Structure

```
src/
├── stories/                          # Example stories
│   ├── button.stories.ts
│   ├── header.stories.ts
│   └── page.stories.ts
└── app/                      # Component stories
    ├── buttons/
    │   ├── button-1/
    │   │   ├── button-1.component.ts
    │   │   └── button-1.component.stories.ts
    │   └── button-2/
    │       └── button-2.component.stories.ts
    ├── form-elements/
    │   ├── checkbox/
    │   │   └── checkbox.component.stories.ts
    │   ├── select/
    │   │   └── select.component.stories.ts
    │   └── ...
    └── ...

.storybook/                           # Storybook configuration
├── main.ts                           # Main config
├── preview.ts                        # Global preview settings
└── tsconfig.json                     # TypeScript config
```

## Available Addons

- **@storybook/addon-a11y**: Accessibility testing
- **@storybook/addon-docs**: Auto-documentation
- **@storybook/addon-onboarding**: Getting started guide
- **@storybook/blocks**: Documentation components
- **@storybook/test**: Testing utilities

## Useful URLs

- Local dev server: `http://localhost:6006/`
- Official docs: [storybook.js.org/docs](https://storybook.js.org/docs)
- Angular guide: [storybook.js.org/docs/get-started/angular](https://storybook.js.org/docs/get-started/angular)

---

For detailed information, see [STORYBOOK.md](./STORYBOOK.md)

