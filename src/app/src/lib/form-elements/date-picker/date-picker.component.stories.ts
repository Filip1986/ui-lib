import type { Meta, StoryObj } from '@storybook/angular';
import { LibDatePickerComponent } from './lib-date-picker.component';
import {
  DatePickerLabelStyleEnum,
  DatePickerLabelPositionEnum,
  DatePickerModeEnum,
  DatePickerViewEnum,
} from './models/date-picker-contract';

const meta: Meta<LibDatePickerComponent> = {
  component: LibDatePickerComponent,
  title: 'Form Elements/Date Picker',
  tags: ['autodocs'],
  argTypes: {
    labelStyle: {
      options: Object.values(DatePickerLabelStyleEnum),
      control: { type: 'select' },
      description: 'Style of the label',
    },
    labelPosition: {
      options: Object.values(DatePickerLabelPositionEnum),
      control: { type: 'select' },
      description: 'Position of the label',
    },
    selectionMode: {
      options: Object.values(DatePickerModeEnum),
      control: { type: 'select' },
      description: 'Selection mode for the date picker',
    },
    view: {
      options: Object.values(DatePickerViewEnum),
      control: { type: 'select' },
      description: 'View type for the date picker',
    },
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
      description: 'Size of the date picker',
    },
    variant: {
      options: ['outlined', 'filled'],
      control: { type: 'radio' },
      description: 'Visual style of the date picker',
    },
    valueChange: { action: 'valueChange' },
    focusEvent: { action: 'focusEvent' },
    blurEvent: { action: 'blurEvent' },
  },
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date',
    required: false,
    disabled: false,
    selectionMode: DatePickerModeEnum.SINGLE,
    view: DatePickerViewEnum.DATE,
    dateFormat: 'mm/dd/yy',
    showIcon: true,
    iconDisplay: 'button',
    size: 'normal',
    variant: 'outlined',
  },
};

export default meta;
type Story = StoryObj<LibDatePickerComponent>;

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
    value: new Date(),
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Please select a date',
  },
};

export const MultipleSelection: Story = {
  args: {
    selectionMode: DatePickerModeEnum.MULTIPLE,
    label: 'Select Multiple Dates',
  },
};

export const DateRange: Story = {
  args: {
    selectionMode: DatePickerModeEnum.RANGE,
    label: 'Select Date Range',
  },
};

export const MonthView: Story = {
  args: {
    view: DatePickerViewEnum.MONTH,
    dateFormat: 'mm/yy',
    label: 'Select Month',
  },
};

export const YearView: Story = {
  args: {
    view: DatePickerViewEnum.YEAR,
    dateFormat: 'yy',
    label: 'Select Year',
  },
};

export const WithMinMaxDates: Story = {
  args: {
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    label: 'Select Date within 2024',
  },
};

export const WithTimeSelection: Story = {
  args: {
    showTime: true,
    hourFormat: 24,
    label: 'Select Date and Time',
  },
};

export const TimeOnly: Story = {
  args: {
    timeOnly: true,
    label: 'Select Time',
  },
};

export const FloatLabelStyle: Story = {
  args: {
    labelStyle: DatePickerLabelStyleEnum.FLOAT,
    placeholder: '',
  },
};

export const FloatInLabelStyle: Story = {
  args: {
    labelStyle: DatePickerLabelStyleEnum.FLOAT_IN,
    placeholder: '',
  },
};

export const InlineLabelPosition: Story = {
  args: {
    labelPosition: DatePickerLabelPositionEnum.INLINE,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const Invalid: Story = {
  args: {
    required: true,
    containerClass: 'ng-invalid ng-dirty',
    errorMessage: 'Please select a date',
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    label: 'Inline Date Picker',
  },
};
