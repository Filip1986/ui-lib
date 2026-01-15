import type { Meta, StoryObj } from '@storybook/angular';
import { LibRadioButtonComponent } from './lib-radio-button.component';
import { RadioButtonModeEnum } from './models/radio-button-contract';
import { FormComponentSizeEnum, FormComponentVariantEnum } from '../common/form-element-common';

const meta: Meta<LibRadioButtonComponent> = {
  component: LibRadioButtonComponent,
  title: 'Form Elements/Radio Button',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: Object.values(RadioButtonModeEnum),
      control: { type: 'select' },
      description: 'Mode of the radio button',
    },
    size: {
      options: Object.values(FormComponentSizeEnum),
      control: { type: 'select' },
      description: 'Size of the radio button',
    },
    variant: {
      options: Object.values(FormComponentVariantEnum),
      control: { type: 'select' },
      description: 'Visual style of the radio button',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
  },
  args: {
    label: 'Radio Button Label',
    name: 'radio-group',
    radioValue: 'option1',
    disabled: false,
    mode: RadioButtonModeEnum.STANDARD,
    size: FormComponentSizeEnum.NORMAL,
    variant: FormComponentVariantEnum.OUTLINED,
  },
};

export default meta;
type Story = StoryObj<LibRadioButtonComponent>;

export const Default: Story = {
  args: {},
};

export const Selected: Story = {
  args: {
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    value: 'option1',
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
    helperText: 'Please select an option',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

// Example of a radio button group
export const RadioButtonGroup: Story = {
  render: (args) => ({
    template: `
      <div class="flex flex-col space-y-2">
        <lib-radio-button
          label="Option 1"
          name="radioGroup"
          [radioValue]="'option1'"
          [(ngModel)]="selected"
        ></lib-radio-button>
        <lib-radio-button
          label="Option 2"
          name="radioGroup"
          [radioValue]="'option2'"
          [(ngModel)]="selected"
        ></lib-radio-button>
        <lib-radio-button
          label="Option 3"
          name="radioGroup"
          [radioValue]="'option3'"
          [(ngModel)]="selected"
        ></lib-radio-button>
      </div>
      <div class="mt-4">
        <p>Selected value: {{ selected }}</p>
      </div>
    `,
    props: {
      selected: 'option1',
    },
  }),
};

// Example with different sizes in one group
export const RadioButtonSizes: Story = {
  render: (args) => ({
    template: `
      <div class="flex flex-col space-y-2">
        <lib-radio-button
          label="Small Option"
          name="sizeGroup"
          [radioValue]="'small'"
          [(ngModel)]="selected"
          size="small"
        ></lib-radio-button>
        <lib-radio-button
          label="Normal Option"
          name="sizeGroup"
          [radioValue]="'normal'"
          [(ngModel)]="selected"
        ></lib-radio-button>
        <lib-radio-button
          label="Large Option"
          name="sizeGroup"
          [radioValue]="'large'"
          [(ngModel)]="selected"
          size="large"
        ></lib-radio-button>
      </div>
    `,
    props: {
      selected: 'normal',
    },
  }),
};

// Example with invalid state
export const Invalid: Story = {
  args: {
    containerClass: 'ng-invalid ng-dirty',
    errorMessage: 'Please select an option',
  },
};
