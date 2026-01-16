# UiLib

This project is an Angular component library providing a comprehensive set of UI components organized by category.

> **📢 Recent Update - January 16, 2026**  
> Components moved to `src/app/` (removed extra `/src` nesting). All components now directly in the app folder!  
> See [MIGRATION_NOTICE_V2.md](MIGRATION_NOTICE_V2.md) for details. External imports are **unchanged**.

## 📚 Documentation

- **[📋 Final Update Summary](FINAL_UPDATE_SUMMARY.md)** - ⭐ Complete overview of all changes
- **[🔄 Latest Migration V2](MIGRATION_NOTICE_V2.md)** - Moved to src/app/ directly
- **[🔄 Previous Migration V1](MIGRATION_NOTICE.md)** - Removed /lib folder
- **[📖 Folder Structure V2](docs/FOLDER_STRUCTURE_V2.md)** - Current structure guide
- **[⚡ Quick Reference](QUICK_REFERENCE.md)** - Fast lookup guide
- **[📑 Component Index](docs/COMPONENT_INDEX.md)** - Complete component list
- **[📂 Component Organization](docs/guides/COMPONENT_ORGANIZATION.md)** - How components are organized
- **[✅ Final Status](FINAL_MIGRATION_STATUS.md)** - Migration completion report

## 📦 Component Categories

### 🔐 Authentication
Login, registration, password recovery, and account management components.
- **Login** - Multiple login form variants
- **Registration** - User registration forms
- **Forgot Password** - Password recovery flows
- **Reset Password** - Password reset functionality

### 📝 Form Elements
Comprehensive form controls and input components.
- **Input Text** - Text input with various styles
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox controls
- **Radio Button** - Radio button groups
- **Date Picker** - Date selection
- **Currency Input** - Formatted currency input
- **Input Number** - Numeric input
- **Listbox** - List selection
- **Multiselect** - Multiple selection
- **Select Button** - Button-style selection
- **Time Picker** - Time selection
- **Icon Select** - Icon picker

### 🧭 Navigation
Navigation and wayfinding components.
- **Breadcrumbs** - Page navigation trails (3 variants)
- **Sidenav** - Side navigation menus (3 variants)
- **Sidenav Footer** - Navigation footer components (3 variants)

### 📐 Layout
Structural and container components.
- **Card** - Content cards
- **Separator** - Visual dividers

### 🔘 Buttons
Action buttons with various styles.
- **Button 1** - Primary button variant
- **Button 2** - Animated button variant

### 📄 Content
Content display and organization components.
- **Article Card** - Article preview cards (3 variants)
- **Contact Form** - Contact forms (3 variants)

### 💬 Feedback
User feedback and error handling.
- **Not Found** - 404 error pages (3 variants)

### ✍️ Editors
Rich text and WYSIWYG editors.
- **TipTap Editor** - Modern editor
- **Quill Editor** - Delta-based editor
- **CKEditor** - Classic WYSIWYG editor
- **TinyMCE Editor** - Full-featured editor
- **Editor Selection** - Editor type selector

### 📊 Widgets
Dashboard and data visualization widgets.
- **Location Widget** - Map-based location display (3 variants)
- **Sales Chart Widget** - Sales data visualization (3 variants)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Storybook

To start Storybook for component development and documentation:

```bash
npm run storybook
```

Navigate to `http://localhost:6006/` to view the component library in Storybook.

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

Stories are located in the `src/stories/` directory for examples and throughout component directories for component-specific stories.

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
  - Form elements: `src/app/form-elements/*/*.stories.ts`
  - Buttons: `src/app/buttons/*/*.stories.ts`
  - Layout components: `src/app/sidenav/sidenav.component.stories.ts`
  - Auth components: `src/app/login/login.component.stories.ts`

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
