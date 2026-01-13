import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Interface for select button options
 */
export interface SelectButtonOptionType {
  label?: string;
  value: any;
  icon?: string;
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Interface for the select button component configuration
 * Extends the base form component configuration
 */
export interface SelectButtonConfig extends BaseFormComponentConfig {
  /**
   * Options to display in the select button
   */
  options: SelectButtonOptionType[];

  /**
   * Property name for the option's label
   */
  optionLabel?: string;

  /**
   * Property name for the option's value
   */
  optionValue?: string;

  /**
   * Property name for the option's disabled state
   */
  optionDisabled?: string;

  /**
   * Whether multiple selections are allowed
   */
  multiple?: boolean;

  /**
   * Additional CSS classes for the buttons
   */
  buttonClass?: string;
}

/**
 * Interface for select button events
 * Extends the base form component events
 */
export interface SelectButtonEvents extends BaseFormComponentEvents {
  /**
   * Emitted when selection changes
   */
  onChange?: (value: any) => void;
}
