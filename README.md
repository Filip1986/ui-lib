# UiLib

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Storybook

This project uses [Storybook](https://storybook.js.org/) for component development and documentation. Storybook provides an isolated environment to build, test, and showcase UI components.

### Running Storybook

To start Storybook in development mode, run:

```bash
npm run storybook
```

This will:
- Start the Storybook development server on `http://localhost:6006/`
- Generate component documentation using Compodoc
- Watch for file changes and hot reload automatically

### Building Storybook

To build Storybook for production deployment, run:

```bash
npm run build-storybook
```

This will create a static build in the `storybook-static/` directory that can be deployed to any static hosting service.

### Storybook Configuration

The Storybook configuration is located in the `.storybook/` directory:

- **`.storybook/main.ts`**: Main configuration file that defines:
  - Story file patterns: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)` and `../src/**/*.mdx`
  - Addons enabled:
    - `@storybook/addon-a11y` - Accessibility testing
    - `@storybook/addon-docs` - Automatic documentation generation
    - `@storybook/addon-onboarding` - Onboarding guide for new users
  - Framework: `@storybook/angular`

- **`.storybook/preview.ts`**: Global settings for all stories, including:
  - Control matchers for color and date properties
  - Compodoc integration for enhanced documentation

### Writing Stories

Stories are located in the `src/stories/` directory for examples and `src/app/src/lib/` for component-specific stories.

#### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { YourComponent } from './your-component';

const meta: Meta<YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'], // Enables automatic documentation
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
  },
  argTypes: {
    // Define controls for component inputs
    propertyName: {
      control: 'text', // or 'boolean', 'select', 'color', etc.
      description: 'Description of the property',
      defaultValue: 'default value',
    },
  },
};

export default meta;
type Story = StoryObj<YourComponent>;

// Define individual stories
export const Default: Story = {
  args: {
    propertyName: 'value',
  },
};

export const Variant: Story = {
  args: {
    propertyName: 'different value',
  },
};
```

#### Story Examples in the Project

- **Basic Examples**: `src/stories/button.stories.ts`, `src/stories/header.stories.ts`, `src/stories/page.stories.ts`
- **Component Stories**: 
  - Form elements: `src/app/src/lib/form-elements/*/*.stories.ts`
  - Buttons: `src/app/src/lib/buttons/*/*.stories.ts`
  - Layout components: `src/app/src/lib/sidenav/sidenav.component.stories.ts`
  - Auth components: `src/app/src/lib/login/login.component.stories.ts`

### Key Features

1. **Autodocs**: Stories tagged with `'autodocs'` automatically generate documentation pages
2. **Accessibility Testing**: Built-in a11y addon for checking accessibility issues
3. **Compodoc Integration**: Generates enhanced documentation from JSDoc comments in your components
4. **Interactive Controls**: Test component behavior by adjusting props in real-time
5. **Actions**: Track component events and method calls in the Actions panel

### Best Practices

1. **Organize stories by feature**: Use the `title` property to group related components (e.g., `'Components/Button'`, `'Form Elements/Input'`)
2. **Use argTypes**: Define clear controls and descriptions for all component inputs
3. **Create multiple variants**: Show different states and use cases (default, disabled, error, etc.)
4. **Add documentation**: Use JSDoc comments in your components; they'll appear in Storybook via Compodoc
5. **Test interactions**: Use `@storybook/test` to add interaction tests to your stories

### Addons Installed

- **@storybook/addon-a11y**: Accessibility testing and validation
- **@storybook/addon-docs**: Automatic documentation generation
- **@storybook/addon-onboarding**: Onboarding guide
- **@storybook/blocks**: Documentation components
- **@storybook/test**: Testing utilities for stories

### Storybook Documentation

For comprehensive Storybook documentation, see:
- **[Complete Storybook Guide](./docs/storybook/STORYBOOK.md)** - Everything you need to know
- **[Quick Reference](./docs/storybook/STORYBOOK_QUICK_REFERENCE.md)** - Commands and cheat sheet
- **[Story Creation Checklist](./docs/storybook/STORYBOOK_CHECKLIST.md)** - Don't forget anything

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Documentation Index](./docs/README.md)** - Complete documentation overview
- **[Storybook Guide](./docs/storybook/STORYBOOK.md)** - Component development with Storybook
- **Development Guides** - Coming soon
- **Architecture Docs** - Coming soon

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
