import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Available hour formats for the time picker
 */
export enum TimePickerHourFormatEnum {
  TWELVE = '12',
  TWENTY_FOUR = '24',
}

export type TimePickerHourFormatType =
  | TimePickerHourFormatEnum.TWELVE
  | TimePickerHourFormatEnum.TWENTY_FOUR;

/**
 * Interface for the time picker component configuration
 * Extends the common base form component configuration
 */
export interface TimePickerConfig extends BaseFormComponentConfig {
  /**
   * Hour format (12 or 24 hour)
   */
  hourFormat: TimePickerHourFormatType;

  /**
   * Whether to show the button bar (for today and clear buttons)
   */
  showButtonBar?: boolean;

  /**
   * Whether the input field is readonly
   */
  readonlyInput?: boolean;

  /**
   * Additional class for the input element
   */
  inputClass?: string;
}

/**
 * Interface for time picker events
 * Extends the common base form component events
 */
export interface TimePickerEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the time value changes
   */
  valueChange?: (value: Date | null) => void;
}
