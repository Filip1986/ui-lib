import type { Meta, StoryObj } from '@storybook/angular';
import { LibListboxComponent } from './lib-listbox.component';
import { FormLabelStyleEnum, FormLabelPositionEnum } from '../common/form-element-common';

const cityOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

const meta: Meta<LibListboxComponent> = {
  component: LibListboxComponent,
  title: 'Form Elements/Listbox',
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
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
  },
  args: {
    label: 'Select a City',
    options: cityOptions,
    optionLabel: 'name',
    optionValue: 'code',
    required: false,
    disabled: false,
    multiple: false,
    checkbox: false,
    filter: false,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
  },
};

export default meta;
type Story = StoryObj<LibListboxComponent>;

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
  },
};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
    checkbox: true,
  },
};

export const FilteredListbox: Story = {
  args: {
    filter: true,
    label: 'Search Cities',
  },
};

export const InlineLabelPosition: Story = {
  args: {
    labelPosition: FormLabelPositionEnum.INLINE,
  },
};

export const FloatLabelStyle: Story = {
  args: {
    labelStyle: FormLabelStyleEnum.FLOAT,
    placeholder: '',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Please select your preferred city',
  },
};

export const StripedListbox: Story = {
  args: {
    striped: true,
  },
};

export const VirtualScrollListbox: Story = {
  args: {
    virtualScroll: true,
    virtualScrollItemSize: 40,
    options: Array.from({ length: 100 }, (_, i) => ({
      name: `City ${i + 1}`,
      code: `CITY_${i + 1}`,
    })),
  },
};
