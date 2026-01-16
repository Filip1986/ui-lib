import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Enum for icon display mode
 */
export enum IconDisplayModeEnum {
  BUTTON = 'button',
  INPUT = 'input',
}

/**
 * Enum for date picker hour format
 */
export enum DatePickerHourFormatEnum {
  TWELVE = '12',
  TWENTY_FOUR = '24',
}

/**
 * Available date picker modes
 */
export enum DatePickerModeEnum {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  RANGE = 'range',
}

/**
 * Available date picker views
 */
export enum DatePickerViewEnum {
  DATE = 'date',
  MONTH = 'month',
  YEAR = 'year',
}

// TYPES
export type DatePickerHourFormatType =
  | DatePickerHourFormatEnum.TWELVE
  | DatePickerHourFormatEnum.TWENTY_FOUR;

export type IconDisplayModeType = IconDisplayModeEnum.BUTTON | IconDisplayModeEnum.INPUT;

export type DatePickerModeType =
  | DatePickerModeEnum.SINGLE
  | DatePickerModeEnum.MULTIPLE
  | DatePickerModeEnum.RANGE;

export type DatePickerViewType =
  | DatePickerViewEnum.DATE
  | DatePickerViewEnum.MONTH
  | DatePickerViewEnum.YEAR;

// INTERFACES
/**
 * Interface for the date picker component configuration
 * Extends the common base form component configuration
 */
export interface DatePickerConfig extends BaseFormComponentConfig {
  /**
   * Minimum allowed date
   */
  minDate?: Date;

  /**
   * Maximum allowed date
   */
  maxDate?: Date;

  /**
   * Date format string
   */
  dateFormat?: string;

  /**
   * Whether to show an icon
   */
  showIcon?: boolean;

  /**
   * Icon display mode
   */
  iconDisplay: IconDisplayModeEnum;

  /**
   * Selection mode (single, multiple, range)
   */
  selectionMode?: DatePickerModeType;

  /**
   * View type (date, month, year)
   */
  view: DatePickerViewType;

  /**
   * Number of months to display
   */
  numberOfMonths: number;

  /**
   * Whether to show time selection
   */
  showTime: boolean;

  /**
   * Hour format (12 or 24)
   */
  hourFormat: DatePickerHourFormatType;

  /**
   * Whether to show only time
   */
  timeOnly?: boolean;

  /**
   * Whether to show week numbers
   */
  showWeek?: boolean;

  /**
   * Whether to show button bar
   */
  showButtonBar?: boolean;

  /**
   * Whether to display as inline
   */
  inline?: boolean;

  /**
   * Readonly input
   */
  readonlyInput?: boolean;

  /**
   * Additional CSS classes for the input
   */
  inputClass?: string;
}

/**
 * Interface for date picker events
 * Extends the common base form component events
 */
export interface DatePickerEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the date value changes
   */
  valueChange?: (value: Date | Date[] | null) => void;
}
