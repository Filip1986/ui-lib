import {
  BaseFormComponentConfig,
  BaseFormComponentEvents,
  FormComponentSizeType,
  FormComponentVariantType,
} from '../../common/form-element-common';

/**
 * Available checkbox input modes
 */
export enum CheckboxModeEnum {
  BINARY = 'binary',
  GROUP = 'group',
}

// Define the type for mode
export type CheckboxModeType = CheckboxModeEnum.BINARY | CheckboxModeEnum.GROUP;

/**
 * Interface for the checkbox component configuration
 * Extends the base form component configuration
 */
export interface CheckboxConfig extends BaseFormComponentConfig {
  /**
   * Name attribute for the checkbox (useful for grouped checkboxes)
   */
  name?: string;

  /**
   * Value of the checkbox
   */
  value?: any;

  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;

  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;

  /**
   * The mode of the checkbox (binary or group)
   */
  mode?: CheckboxModeType;

  /**
   * Size of the checkbox
   * Using the common size type
   */
  size: FormComponentSizeType;

  /**
   * Variant of the checkbox
   * Using the common variant type
   */
  variant: FormComponentVariantType;

  /**
   * Accessibility label
   */
  ariaLabel?: string;

  /**
   * Accessibility labeled by
   */
  ariaLabelledBy?: string;

  /**
   * CSS classes for the checkbox input
   */
  checkboxClass?: string;
}

/**
 * Interface for checkbox events
 * Extends the base form component events
 */
export interface CheckboxEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the checkbox value changes
   */
  valueChange?: (value: any) => void;
}
