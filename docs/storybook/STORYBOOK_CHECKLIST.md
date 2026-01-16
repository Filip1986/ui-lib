# Storybook Story Creation Checklist

Use this checklist when creating a new story for a component.

## ☐ Before You Start

- [ ] Component is created and working
- [ ] Component has JSDoc comments for inputs/outputs
- [ ] Component is standalone or you know its module dependencies
- [ ] Storybook is running (`npm run storybook`)

## ☐ Create Story File

- [ ] Create `component-name.component.stories.ts` next to component file
- [ ] Import necessary types from `@storybook/angular`
- [ ] Import your component

## ☐ Configure Meta Object

```typescript
const meta: Meta<YourComponent> = {
  // Required
  title: 'Category/ComponentName',      // ✓ Set hierarchical title
  component: YourComponent,              // ✓ Set component reference
  
  // Recommended
  tags: ['autodocs'],                    // ✓ Enable auto-documentation
  
  // Optional but useful
  parameters: {
    layout: 'centered',                  // ☐ Choose layout (centered/fullscreen/padded)
  },
  
  argTypes: {
    // ☐ Define controls for each input
  },
};
```

## ☐ Define ArgTypes

For each component `@Input()`, add an argType:

```typescript
argTypes: {
  inputName: {
    control: 'text',                     // ☐ Choose appropriate control type
    description: 'Clear description',    // ☐ Add description
    defaultValue: 'default',             // ☐ Set default value (optional)
  },
}
```

### Control Type Checklist

- [ ] **Text**: `control: 'text'`
- [ ] **Number**: `control: 'number'`
- [ ] **Boolean**: `control: 'boolean'`
- [ ] **Color**: `control: 'color'`
- [ ] **Select**: `control: { type: 'select', options: [...] }`
- [ ] **Radio**: `control: { type: 'radio', options: [...] }`
- [ ] **Date**: `control: 'date'`
- [ ] **Range**: `control: { type: 'range', min: 0, max: 100, step: 1 }`

## ☐ Create Story Variants

Create at least these stories:

- [ ] **Default**: Normal/default state
  ```typescript
  export const Default: Story = {
    args: { /* default values */ },
  };
  ```

- [ ] **Common variants based on component**:
  - [ ] Disabled state
  - [ ] Loading state
  - [ ] Error state
  - [ ] Different sizes (small, medium, large)
  - [ ] Different variants (primary, secondary, etc.)
  - [ ] With different content lengths

## ☐ Add Actions (If Component Has Outputs)

```typescript
import { fn } from '@storybook/test';

const meta: Meta<YourComponent> = {
  // ...
  args: {
    outputEvent: fn(),    // ☐ Add fn() for each @Output()
  },
};
```

## ☐ Add Decorators (If Needed)

Add decorators if your component needs:

- [ ] Router
- [ ] HTTP Client
- [ ] Custom providers
- [ ] Theme provider

```typescript
import { applicationConfig } from '@storybook/angular';

const meta: Meta<YourComponent> = {
  // ...
  decorators: [
    applicationConfig({
      providers: [
        // ☐ Add required providers
      ],
    }),
  ],
};
```

## ☐ Test Your Stories

- [ ] Run Storybook: `npm run storybook`
- [ ] Navigate to your component in the sidebar
- [ ] Verify all stories render correctly
- [ ] Test all controls in the Controls panel
- [ ] Check Actions panel for events (if applicable)
- [ ] Review Accessibility tab for issues
- [ ] Test responsive behavior (use viewport addon)

## ☐ Documentation

- [ ] Component has JSDoc comments on all inputs/outputs
- [ ] ArgTypes have descriptions
- [ ] Complex usage is documented in story descriptions
- [ ] Add parameters for special cases

## ☐ Quality Checks

- [ ] All important states are covered
- [ ] Story names are descriptive
- [ ] No console errors or warnings
- [ ] Accessibility score is good (check a11y addon)
- [ ] Component looks good on different backgrounds
- [ ] Component is responsive (test different viewports)

## ☐ Advanced Features (Optional)

- [ ] Add interaction tests with `play` function
- [ ] Create MDX documentation page
- [ ] Add custom backgrounds
- [ ] Configure viewport presets
- [ ] Add visual regression testing

## 📝 Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { YourComponent } from './your-component.component';

const meta: Meta<YourComponent> = {
  title: 'Category/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Add your argTypes here
  },
};

export default meta;
type Story = StoryObj<YourComponent>;

export const Default: Story = {
  args: {
    // Add default args
  },
};

export const Variant: Story = {
  args: {
    // Add variant args
  },
};
```

## 🐛 Troubleshooting

If your story doesn't work:

- [ ] Check browser console for errors
- [ ] Verify component imports are correct
- [ ] Check if component needs providers (add decorators)
- [ ] Ensure component is standalone or module imports are correct
- [ ] Restart Storybook server
- [ ] Clear browser cache

## ✅ Ready to Commit

- [ ] All stories render without errors
- [ ] Documentation is complete
- [ ] Accessibility checks pass
- [ ] Code follows project conventions
- [ ] Story file is named correctly (`*.component.stories.ts`)

---

**Pro Tips:**
- Start simple and add complexity gradually
- Look at existing stories for patterns (check `src/stories/` and `src/app/`)
- Use the Controls panel to experiment before hardcoding args
- Review the a11y tab for every story
- Test your stories on different screen sizes

For more details, see:
- **Quick Reference**: `STORYBOOK_QUICK_REFERENCE.md`
- **Full Guide**: `STORYBOOK.md`

