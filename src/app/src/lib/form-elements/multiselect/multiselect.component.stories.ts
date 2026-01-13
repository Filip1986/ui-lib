import type { Meta, StoryObj } from '@storybook/angular';
import { LibMultiSelectComponent } from './lib-multi-select.component';
import {
  MultiSelectLabelStyleEnum,
  MultiSelectLabelPositionEnum,
  MultiSelectDisplayModeEnum,
  MultiSelectSizeEnum,
  MultiSelectVariantEnum,
} from './models/multiselect-contract';

const cityOptions = [
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

const meta: Meta<LibMultiSelectComponent> = {
  component: LibMultiSelectComponent,
  title: 'Form Elements/MultiSelect',
  tags: ['autodocs'],
  argTypes: {
    labelStyle: {
      options: Object.values(MultiSelectLabelStyleEnum),
      control: { type: 'select' },
      description: 'Style of the label',
    },
    labelPosition: {
      options: Object.values(MultiSelectLabelPositionEnum),
      control: { type: 'select' },
      description: 'Position of the label',
    },
    display: {
      options: Object.values(MultiSelectDisplayModeEnum),
      control: { type: 'select' },
      description: 'Display mode for selected values',
    },
    size: {
      options: Object.values(MultiSelectSizeEnum),
      control: { type: 'select' },
      description: 'Size of the multiselect',
    },
    variant: {
      options: Object.values(MultiSelectVariantEnum),
      control: { type: 'select' },
      description: 'Style variant of the multiselect',
    },
    valueChange: { action: 'valueChange' },
    selectAllChange: { action: 'selectAllChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
    panelShow: { action: 'panelShow' },
    panelHide: { action: 'panelHide' },
  },
  args: {
    label: 'Select Cities',
    options: cityOptions,
    optionLabel: 'name',
    optionValue: 'code',
    required: false,
    disabled: false,
    filter: false,
    display: MultiSelectDisplayModeEnum.COMMA,
    showToggleAll: true,
    maxSelectedLabels: 3,
    scrollHeight: '200px',
    labelStyle: MultiSelectLabelStyleEnum.DEFAULT,
    labelPosition: MultiSelectLabelPositionEnum.ABOVE,
    size: MultiSelectSizeEnum.NORMAL,
    variant: MultiSelectVariantEnum.OUTLINED,
  },
};

export default meta;
type Story = StoryObj<LibMultiSelectComponent>;

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
    value: [cityOptions[0].code, cityOptions[1].code],
  },
};

export const WithFilter: Story = {
  args: {
    filter: true,
  },
};

export const ChipDisplay: Story = {
  args: {
    display: MultiSelectDisplayModeEnum.CHIP,
  },
};

export const Grouped: Story = {
  args: {
    options: groupedCities,
    group: true,
    optionLabel: 'name',
    optionValue: 'code',
    optionGroupLabel: 'label',
    optionGroupChildren: 'items',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select one or more cities',
  },
};

export const FloatLabel: Story = {
  args: {
    labelStyle: MultiSelectLabelStyleEnum.FLOAT,
    placeholder: 'Select Cities',
  },
};

export const FloatInLabel: Story = {
  args: {
    labelStyle: MultiSelectLabelStyleEnum.FLOAT_IN,
    placeholder: 'Select Cities',
  },
};

export const FloatOnLabel: Story = {
  args: {
    labelStyle: MultiSelectLabelStyleEnum.FLOAT_ON,
    placeholder: 'Select Cities',
  },
};

export const IftaLabel: Story = {
  args: {
    labelStyle: MultiSelectLabelStyleEnum.IFTA,
  },
};

export const InlineLabel: Story = {
  args: {
    labelPosition: MultiSelectLabelPositionEnum.INLINE,
  },
};

export const SmallSize: Story = {
  args: {
    size: MultiSelectSizeEnum.SMALL,
  },
};

export const LargeSize: Story = {
  args: {
    size: MultiSelectSizeEnum.LARGE,
  },
};

export const FilledVariant: Story = {
  args: {
    variant: MultiSelectVariantEnum.FILLED,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Invalid: Story = {
  args: {
    required: true,
    errorMessage: 'Please select at least one city',
  },
};

export const VirtualScrolling: Story = {
  args: {
    options: Array.from({ length: 10000 }, (_, i) => ({
      name: `City ${i + 1}`,
      code: `CITY_${i + 1}`,
    })),
    virtualScroll: true,
    virtualScrollItemSize: 43,
  },
};
