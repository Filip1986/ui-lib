import type { Meta, StoryObj } from '@storybook/angular';
import { LibSelectButtonComponent } from './lib-select-button.component';
import { FormComponentSizeEnum } from '../common/form-element-common';

const paymentOptions = [
  { name: 'Credit Card', value: 'CC', icon: 'pi pi-credit-card' },
  { name: 'PayPal', value: 'PP', icon: 'pi pi-paypal' },
  { name: 'Wire Transfer', value: 'WT', icon: 'pi pi-money-bill' },
];

const stateOptions = [
  { label: 'Off', value: 'off' },
  { label: 'On', value: 'on' },
];

const justifyOptions = [
  { icon: 'pi pi-align-left', justify: 'left' },
  { icon: 'pi pi-align-center', justify: 'center' },
  { icon: 'pi pi-align-right', justify: 'right' },
  { icon: 'pi pi-align-justify', justify: 'justify' },
];

const levelOptions = [
  { label: 'Beginner', value: 'beginner', constant: false },
  { label: 'Intermediate', value: 'intermediate', constant: false },
  { label: 'Expert', value: 'expert', constant: true }, // This will be disabled
];

const meta: Meta<LibSelectButtonComponent> = {
  component: LibSelectButtonComponent,
  title: 'Form Elements/Select Button',
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: Object.values(FormComponentSizeEnum),
      control: { type: 'select' },
      description: 'Size of the select button',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
    onChange: { action: 'onChange' },
  },
  args: {
    options: stateOptions,
    optionLabel: 'label',
    optionValue: 'value',
    multiple: false,
    disabled: false,
    required: false,
    size: FormComponentSizeEnum.NORMAL,
  },
};

export default meta;
type Story = StoryObj<LibSelectButtonComponent>;

export const Default: Story = {
  args: {},
};

export const BinaryState: Story = {
  args: {
    options: stateOptions,
    optionLabel: 'label',
    optionValue: 'value',
    value: 'off',
  },
};

export const Multiple: Story = {
  args: {
    options: paymentOptions,
    optionLabel: 'name',
    optionValue: 'value',
    multiple: true,
    value: ['CC', 'PP'],
  },
};

export const WithIcons: Story = {
  args: {
    options: paymentOptions,
    optionLabel: 'name',
    optionValue: 'value',
    value: 'CC',
  },
};

export const CustomTemplate: Story = {
  render: (args) => ({
    template: `
      <lib-select-button
        [options]="justifyOptions"
        [(ngModel)]="value"
        optionLabel="justify"
      >
        <ng-template #item let-item>
          <i [class]="item.icon"></i>
        </ng-template>
      </lib-select-button>
    `,
    props: {
      ...args,
      justifyOptions: justifyOptions,
      value: 'left',
    },
  }),
};

export const SmallSize: Story = {
  args: {
    size: FormComponentSizeEnum.SMALL,
  },
};

export const LargeSize: Story = {
  args: {
    size: FormComponentSizeEnum.LARGE,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithValidation: Story = {
  args: {
    required: true,
    containerClass: 'ng-invalid ng-dirty',
    errorMessage: 'Please select an option',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'on',
  },
};

export const DisabledOptions: Story = {
  args: {
    options: levelOptions,
    optionLabel: 'label',
    optionValue: 'value',
    optionDisabled: 'constant',
    value: 'beginner',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select your preference',
  },
};

export const WithSuccessMessage: Story = {
  args: {
    value: 'on',
    successMessage: 'Good choice!',
  },
};

export const RTL: Story = {
  render: (args) => ({
    template: `
      <div dir="rtl">
        <lib-select-button
          [options]="options"
          [(ngModel)]="value"
          [optionLabel]="optionLabel"
          [optionValue]="optionValue"
        />
      </div>
    `,
    props: {
      ...args,
    },
  }),
};

// Complex example with form integration
export const FormIntegration: Story = {
  render: (args) => ({
    template: `
      <form [formGroup]="formGroup">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Payment Method *
          </label>
          <lib-select-button
            formControlName="paymentMethod"
            [options]="paymentOptions"
            optionLabel="name"
            optionValue="value"
            [required]="true"
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Notification Preferences
          </label>
          <lib-select-button
            formControlName="notifications"
            [options]="notificationOptions"
            optionLabel="label"
            optionValue="value"
            [multiple]="true"
            [helperText]="'Select which notifications you want to receive'"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          [disabled]="!formGroup.valid"
        >
          Submit
        </button>
      </form>
    `,
    props: {
      formGroup: (() => {
        const fb = require('@angular/forms').FormBuilder;
        const formBuilder = new fb();
        return formBuilder.group({
          paymentMethod: ['', [require('@angular/forms').Validators.required]],
          notifications: [['email']],
        });
      })(),
      paymentOptions: paymentOptions,
      notificationOptions: [
        { label: 'Email', value: 'email' },
        { label: 'SMS', value: 'sms' },
        { label: 'Push', value: 'push' },
      ],
    },
  }),
};
