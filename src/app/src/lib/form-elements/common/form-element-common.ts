/**
 * Common label style options for all form components
 */
export enum FormLabelStyleEnum {
  DEFAULT = 'default',
  FLOAT = 'float',
  FLOAT_IN = 'float-in',
  FLOAT_ON = 'float-on',
  IFTA = 'ifta',
}

/**
 * Common label position options for all form components
 */
export enum FormLabelPositionEnum {
  ABOVE = 'above',
  INLINE = 'inline',
}

/**
 * Common component size options
 */
export enum FormComponentSizeEnum {
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}

/**
 * Common component variant options
 */
export enum FormComponentVariantEnum {
  OUTLINED = 'outlined',
  FILLED = 'filled',
}

/**
 * Type aliases for enum values
 */
export type FormLabelStyleType =
  | FormLabelStyleEnum.DEFAULT
  | FormLabelStyleEnum.FLOAT
  | FormLabelStyleEnum.FLOAT_IN
  | FormLabelStyleEnum.FLOAT_ON
  | FormLabelStyleEnum.IFTA;

export type FormLabelPositionType = FormLabelPositionEnum.ABOVE | FormLabelPositionEnum.INLINE;

export type FormComponentSizeType =
  | FormComponentSizeEnum.SMALL
  | FormComponentSizeEnum.NORMAL
  | FormComponentSizeEnum.LARGE;

export type FormComponentVariantType =
  | FormComponentVariantEnum.OUTLINED
  | FormComponentVariantEnum.FILLED;

/**
 * Base interface for common form component configuration
 */
export interface BaseFormComponentConfig {
  /**
   * Unique identifier for the component
   */
  id?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabelledBy?: string;

  /**
   * Label for the component
   */
  label?: string;

  /**
   * Position of the label
   */
  labelPosition: FormLabelPositionType;

  /**
   * Style of the label
   */
  labelStyle: FormLabelStyleType;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the component is required
   */
  required: boolean;

  /**
   * Whether the component is disabled
   */
  disabled: boolean;

  /**
   * Size of the component
   */
  size: FormComponentSizeType;

  /**
   * Visual variant of the component
   */
  variant: FormComponentVariantType;

  /**
   * Helper text to display below the component
   */
  helperText?: string;

  /**
   * Error message to display when validation fails
   */
  errorMessage?: string;

  /**
   * Success message to display
   */
  successMessage?: string;

  /**
   * Additional CSS classes for the container
   */
  containerClass?: string;
}

/**
 * Base interface for common form component events
 */
export interface BaseFormComponentEvents {
  /**
   * Emitted when the value changes
   */
  valueChange?: (value: any) => void;

  /**
   * Emitted when the component receives focus
   */
  focus?: (event: Event) => void;

  /**
   * Emitted when the component loses focus
   */
  blur?: (event: Event) => void;
}
