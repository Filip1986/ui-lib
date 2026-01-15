import type { Meta, StoryObj } from '@storybook/angular';
import { LibTextareaComponent } from './lib-textarea.component';
import { FormLabelStyleEnum, FormLabelPositionEnum, FormComponentSizeEnum, FormComponentVariantEnum } from '../common/form-element-common';

const meta: Meta<LibTextareaComponent> = {
  component: LibTextareaComponent,
  title: 'Form Elements/Textarea',
  tags: ['autodocs'],
  argTypes: {
    labelStyle: {
      options: Object.values(FormLabelStyleEnum),
      control: { type: 'select' },
      description: 'Style of the label',
    },
    labelPosition: {
      options: Object.values(FormLabelPositionEnum),
      control: { type: 'select' },
      description: 'Position of the label',
    },
    variant: {
      options: ['outlined', 'filled'],
      control: { type: 'radio' },
      description: 'Visual style of the textarea',
    },
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
      description: 'Size of the textarea',
    },
    autoResize: {
      control: { type: 'boolean' },
      description: 'Whether the textarea should auto resize',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
    keydownEvent: { action: 'keydownEvent' },
    keyupEvent: { action: 'keyupEvent' },
    enter: { action: 'enter' },
    clear: { action: 'clear' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter description here...',
    required: false,
    disabled: false,
    rows: 4,
    cols: 30,
    autoResize: false,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
    variant: FormComponentVariantEnum.OUTLINED,
    size: FormComponentSizeEnum.NORMAL,
  },
};

export default meta;
type Story = StoryObj<LibTextareaComponent>;

export const Default: Story = {
  args: {},
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Please provide a detailed description',
  },
};

export const WithValidation: Story = {
  args: {
    required: true,
    minLength: 10,
    maxLength: 500,
    helperText: 'Must be between 10 and 500 characters',
  },
};

export const WithErrorMessage: Story = {
  args: {
    required: true,
    errorMessage: 'This field is required and cannot be empty',
  },
};

export const WithSuccessMessage: Story = {
  args: {
    successMessage: 'Your input is valid!',
  },
};

export const WithAutoResize: Story = {
  args: {
    autoResize: true,
    helperText: 'Try typing multiple lines to see the textarea automatically resize',
  },
};

export const Filled: Story = {
  args: {
    variant: FormComponentVariantEnum.FILLED,
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

export const FloatLabelStyle: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT,
    placeholder: '',
  },
};

export const FloatInLabelStyle: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT_IN,
    placeholder: '',
  },
};

export const FloatOnLabelStyle: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT_ON,
    placeholder: '',
  },
};

export const IftaLabelStyle: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.IFTA,
  },
};

export const InlineLabel: Story = {
  args: {
    labelPosition: FormLabelPositionEnum.INLINE,
  },
};
