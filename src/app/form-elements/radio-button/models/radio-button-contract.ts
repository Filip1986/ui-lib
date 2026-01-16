import {
  BaseFormComponentConfig,
  BaseFormComponentEvents,
  FormComponentSizeType,
} from '../../common/form-element-common';

/**
 * Available radio button modes
 */
export enum RadioButtonModeEnum {
  STANDARD = 'standard',
  GROUP = 'group',
}

// Define the type for mode
export type RadioButtonModeType = RadioButtonModeEnum.STANDARD | RadioButtonModeEnum.GROUP;

/**
 * Interface for the radio button component configuration
 * Extends the base form component configuration
 */
export interface RadioButtonConfig extends BaseFormComponentConfig {
  /**
   * Name attribute for the radio button (required for radio button groups)
   */
  name?: string;

  /**
   * Value of the radio button
   */
  value?: any;

  /**
   * The mode of the radio button (binary or group)
   */
  mode?: RadioButtonModeType;

  /**
   * Size of the radio button
   * Using the common size type from base form component
   */
  size: FormComponentSizeType;

  /**
   * Accessibility label
   */
  ariaLabel?: string;

  /**
   * Accessibility labeled by
   */
  ariaLabelledBy?: string;

  /**
   * CSS classes for the radio button input
   */
  radioClass?: string;
}

/**
 * Interface for radio button events
 * Extends the base form component events
 */
export interface RadioButtonEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the radio button value changes
   */
  valueChange?: (value: any) => void;
}
