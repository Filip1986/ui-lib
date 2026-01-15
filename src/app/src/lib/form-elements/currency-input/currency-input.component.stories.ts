import type { Meta, StoryObj } from '@storybook/angular';
import { LibCurrencyInputComponent } from './lib-currency-input.component';
import { CurrencyDisplayModeEnum } from './models/currency-input-contract';
import { FormLabelStyleEnum, FormLabelPositionEnum, FormComponentSizeEnum, FormComponentVariantEnum } from '../common/form-element-common';

const meta: Meta<LibCurrencyInputComponent> = {
  component: LibCurrencyInputComponent,
  title: 'Form Elements/Currency Input',
  tags: ['autodocs'],
  argTypes: {
    currency: {
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'],
      control: { type: 'select' },
      description: 'Currency code',
    },
    locale: {
      options: ['en-US', 'de-DE', 'fr-FR', 'ja-JP', 'en-GB', 'en-IN', 'zh-CN'],
      control: { type: 'select' },
      description: 'Locale for number formatting',
    },
    currencyDisplay: {
      options: Object.values(CurrencyDisplayModeEnum),
      control: { type: 'select' },
      description: 'How to display the currency',
    },
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
    size: {
      options: Object.values(FormComponentSizeEnum),
      control: { type: 'select' },
      description: 'Size of the input',
    },
    variant: {
      options: Object.values(FormComponentVariantEnum),
      control: { type: 'select' },
      description: 'Visual style of the input',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
  },
  args: {
    label: 'Price',
    currency: 'USD',
    locale: 'en-US',
    currencyDisplay: CurrencyDisplayModeEnum.SYMBOL,
    useGrouping: true,
    minFractionDigits: 2,
    maxFractionDigits: 2,
    showButtons: false,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
    size: FormComponentSizeEnum.NORMAL,
    variant: FormComponentVariantEnum.OUTLINED,
  },
};

export default meta;
type Story = StoryObj<LibCurrencyInputComponent>;

export const Default: Story = {
  args: {},
};

export const EuroWithCode: Story = {
  args: {
    label: 'Amount',
    currency: 'EUR',
    locale: 'de-DE',
    currencyDisplay: CurrencyDisplayModeEnum.CODE,
    value: 1234.56,
  },
};

export const JapaneseYen: Story = {
  args: {
    label: '価格',
    currency: 'JPY',
    locale: 'ja-JP',
    value: 5000,
    minFractionDigits: 0,
    maxFractionDigits: 0,
  },
};

export const IndianRupee: Story = {
  args: {
    label: 'Total Amount',
    currency: 'INR',
    locale: 'en-IN',
    currencyDisplay: CurrencyDisplayModeEnum.CODE,
    value: 42500.5,
  },
};

export const BritishPound: Story = {
  args: {
    label: 'Price',
    currency: 'GBP',
    locale: 'en-GB',
    value: 999.99,
  },
};

export const WithButtons: Story = {
  args: {
    label: 'Quantity Price',
    showButtons: true,
    value: 100,
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Budget',
    min: 0,
    max: 10000,
    value: 5000,
    helperText: 'Budget must be between $0 and $10,000',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Enter the price in your local currency',
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Price',
  },
};

export const Invalid: Story = {
  args: {
    required: true,
    containerClass: 'ng-invalid ng-dirty',
    errorMessage: 'Please enter a valid price',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 299.99,
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Discount Amount',
    value: 50,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Tax Rate',
    currency: 'USD',
    currencyDisplay: CurrencyDisplayModeEnum.CODE,
    value: 2500,
  },
};

export const FloatLabel: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT,
    placeholder: '',
  },
};

export const FloatInLabel: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT_IN,
    placeholder: '',
  },
};

export const FloatOnLabel: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT_ON,
    placeholder: '',
  },
};

export const IftaLabel: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.IFTA,
  },
};

export const InlineLabel: Story = {
  args: {
    labelPosition: FormLabelPositionEnum.INLINE,
  },
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

export const FilledVariant: Story = {
  args: {
    variant: FormComponentVariantEnum.FILLED,
  },
};

export const NoGrouping: Story = {
  args: {
    label: 'Serial Number Price',
    useGrouping: false,
    value: 1234567.89,
  },
};

export const HighPrecision: Story = {
  args: {
    label: 'Cryptocurrency Value',
    currency: 'USD',
    minFractionDigits: 2,
    maxFractionDigits: 8,
    value: 0.00045678,
  },
};

export const MultiCurrencyComparison: Story = {
  render: (args) => ({
    template: `
      <div class="space-y-4">
        <lib-currency-input
          label="United States"
          currency="USD"
          locale="en-US"
          [value]="1500"
        />
        <lib-currency-input
          label="Germany"
          currency="EUR"
          locale="de-DE"
          [value]="1500"
        />
        <lib-currency-input
          label="Japan"
          currency="JPY"
          locale="ja-JP"
          [value]="1500"
          [minFractionDigits]="0"
          [maxFractionDigits]="0"
        />
        <lib-currency-input
          label="India"
          currency="INR"
          locale="en-IN"
          [value]="1500"
        />
      </div>
    `,
  }),
};
