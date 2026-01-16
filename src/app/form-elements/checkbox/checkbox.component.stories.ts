import type { Meta, StoryObj } from '@storybook/angular';
import { LibCheckboxComponent } from './lib-checkbox.component';
import { CheckboxModeEnum } from './models/checkbox-contract';
import { FormComponentSizeEnum, FormComponentVariantEnum } from '../common/form-element-common';

const meta: Meta<LibCheckboxComponent> = {
  component: LibCheckboxComponent,
  title: 'Form Elements/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: Object.values(CheckboxModeEnum),
      control: { type: 'select' },
      description: 'Mode of the checkbox',
    },
    size: {
      options: Object.values(FormComponentSizeEnum),
      control: { type: 'select' },
      description: 'Size of the checkbox',
    },
    variant: {
      options: Object.values(FormComponentVariantEnum),
      control: { type: 'select' },
      description: 'Visual style of the checkbox',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
  },
  args: {
    label: 'Checkbox Label',
    disabled: false,
    indeterminate: false,
    mode: CheckboxModeEnum.BINARY,
    size: FormComponentSizeEnum.NORMAL,
    variant: FormComponentVariantEnum.OUTLINED,
  },
};

export default meta;
type Story = StoryObj<LibCheckboxComponent>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    value: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    value: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Small: Story = {
  args: {
    size: FormComponentSizeEnum.SMALL,
  },
};

export const Large: Story = {
  args: {
    size: FormComponentSizeEnum.LARGE,
  },
};

export const Filled: Story = {
  args: {
    variant: FormComponentVariantEnum.FILLED,
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Please check this box if you agree',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

// Example of grouped checkboxes
export const GroupedCheckboxes: Story = {
  render: (args) => ({
    template: `
      <div class="flex flex-col space-y-2">
        <lib-checkbox
          label="Option 1"
          [mode]="'group'"
          [checkboxValue]="1"
          name="group"
        ></lib-checkbox>
        <lib-checkbox
          label="Option 2"
          [mode]="'group'"
          [checkboxValue]="2"
          name="group"
        ></lib-checkbox>
        <lib-checkbox
          label="Option 3"
          [mode]="'group'"
          [checkboxValue]="3"
          name="group"
        ></lib-checkbox>
      </div>
    `,
  }),
};
