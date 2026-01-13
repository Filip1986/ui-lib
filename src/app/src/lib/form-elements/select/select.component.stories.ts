import type { Meta, StoryObj } from '@storybook/angular';
import { LibSelectComponent } from './lib-select.component';
import {
  SelectLabelStyleEnum,
  SelectLabelPositionEnum,
  SelectSizeEnum,
  SelectVariantEnum,
} from './models/select-contract';

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

const groupedCities = [
  {
    label: 'USA',
    value: 'usa',
    items: [
      { name: 'New York', code: 'NY' },
      { name: 'Chicago', code: 'CHI' },
      { name: 'Los Angeles', code: 'LA' },
      { name: 'San Francisco', code: 'SF' },
    ],
  },
  {
    label: 'Europe',
    value: 'eu',
    items: [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Madrid', code: 'MAD' },
    ],
  },
];

const meta: Meta<LibSelectComponent> = {
  component: LibSelectComponent,
  title: 'Form Elements/Select',
  tags: ['autodocs'],
  argTypes: {
    labelStyle: {
      options: Object.values(SelectLabelStyleEnum),
      control: { type: 'select' },
      description: 'Style of the label',
    },
    labelPosition: {
      options: Object.values(SelectLabelPositionEnum),
      control: { type: 'select' },
      description: 'Position of the label',
    },
    size: {
      options: Object.values(SelectSizeEnum),
      control: { type: 'select' },
      description: 'Size of the select',
    },
    variant: {
      options: Object.values(SelectVariantEnum),
      control: { type: 'select' },
      description: 'Visual style of the select',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
    onShow: { action: 'onShow' },
    onHide: { action: 'onHide' },
    onClear: { action: 'onClear' },
  },
  args: {
    label: 'Select a City',
    placeholder: 'Choose a city',
    options: cities,
    optionLabel: 'name',
    optionValue: 'code',
    required: false,
    disabled: false,
    filter: false,
    checkmark: false,
    showClear: false,
    editable: false,
    group: false,
    loading: false,
    labelStyle: SelectLabelStyleEnum.DEFAULT,
    labelPosition: SelectLabelPositionEnum.ABOVE,
    size: SelectSizeEnum.NORMAL,
    variant: SelectVariantEnum.OUTLINED,
  },
};

export default meta;
type Story = StoryObj<LibSelectComponent>;

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
    value: cities[0].code,
  },
};

export const WithFilter: Story = {
  args: {
    filter: true,
    filterBy: 'name',
  },
};

export const WithCheckmark: Story = {
  args: {
    checkmark: true,
  },
};

export const WithClearButton: Story = {
  args: {
    showClear: true,
  },
};

export const Editable: Story = {
  args: {
    editable: true,
  },
};

export const Grouped: Story = {
  args: {
    options: groupedCities,
    group: true,
    optionGroupLabel: 'label',
    optionGroupChildren: 'items',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Please select a city from the list',
  },
};

export const WithLoading: Story = {
  args: {
    loading: true,
  },
};

export const FloatLabel: Story = {
  args: {
    labelStyle: SelectLabelStyleEnum.FLOAT,
  },
};

export const FloatInLabel: Story = {
  args: {
    labelStyle: SelectLabelStyleEnum.FLOAT_IN,
  },
};

export const FloatOnLabel: Story = {
  args: {
    labelStyle: SelectLabelStyleEnum.FLOAT_ON,
  },
};

export const IftaLabel: Story = {
  args: {
    labelStyle: SelectLabelStyleEnum.IFTA,
  },
};

export const InlineLabel: Story = {
  args: {
    labelPosition: SelectLabelPositionEnum.INLINE,
  },
};

export const SmallSize: Story = {
  args: {
    size: SelectSizeEnum.SMALL,
  },
};

export const LargeSize: Story = {
  args: {
    size: SelectSizeEnum.LARGE,
  },
};

export const FilledVariant: Story = {
  args: {
    variant: SelectVariantEnum.FILLED,
  },
};

export const Invalid: Story = {
  args: {
    required: true,
    containerClass: 'ng-invalid ng-dirty',
    errorMessage: 'Please select a city',
  },
};

export const VirtualScrolling: Story = {
  args: {
    options: Array.from({ length: 10000 }, (_, i) => ({
      name: `City ${i + 1}`,
      code: `CITY_${i + 1}`,
    })),
    virtualScroll: true,
    virtualScrollItemSize: 38,
    filter: true,
  },
};
