import { BaseFormComponentConfig } from '../../common/form-element-common';

/**
 * Available input types for the input text component
 */
export enum InputTextTypeEnum {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url',
  NUMBER = 'number',
}

/**
 * Available input modes
 */
export enum InputTextModeEnum {
  NONE = 'none',
  TEXT = 'text',
  DECIMAL = 'decimal',
  NUMERIC = 'numeric',
  TEL = 'tel',
  SEARCH = 'search',
  EMAIL = 'email',
  URL = 'url',
}

/**
 * Enum for available icon positions
 */
export enum InputTextIconPositionEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

// TYPES
export type InputTextTypeType =
  | InputTextTypeEnum.TEXT
  | InputTextTypeEnum.EMAIL
  | InputTextTypeEnum.PASSWORD
  | InputTextTypeEnum.SEARCH
  | InputTextTypeEnum.TEL
  | InputTextTypeEnum.URL
  | InputTextTypeEnum.NUMBER;

export type InputTextModeType =
  | InputTextModeEnum.NONE
  | InputTextModeEnum.TEXT
  | InputTextModeEnum.DECIMAL
  | InputTextModeEnum.NUMERIC
  | InputTextModeEnum.TEL
  | InputTextModeEnum.SEARCH
  | InputTextModeEnum.EMAIL
  | InputTextModeEnum.URL;

export type InputTextIconPositionType =
  | InputTextIconPositionEnum.LEFT
  | InputTextIconPositionEnum.RIGHT;

/**
 * Interface for the input text component configuration
 */
export interface InputTextConfig extends BaseFormComponentConfig {
  /**
   * The input type
   */
  type?: InputTextTypeType;

  /**
   * The input mode
   */
  inputMode?: InputTextModeType;

  /**
   * Icon to display (CSS class name)
   */
  icon?: string;

  /**
   * Position of the icon
   */
  iconPosition?: InputTextIconPositionType;

  /**
   * Whether the input should autofocus
   */
  autofocus: boolean;

  /**
   * Autocomplete setting
   */
  autocomplete?: string;

  /**
   * Additional CSS classes for the input element
   */
  inputClass?: string;

  /**
   * Minimum length of the input value
   */
  minLength?: number;

  /**
   * Maximum length of the input value
   */
  maxLength?: number;

  /**
   * Pattern for the input value
   */
  pattern?: string;

  /**
   * Minimum value for number inputs
   */
  min?: number;

  /**
   * Maximum value for number inputs
   */
  max?: number;

  /**
   * Step value for number inputs
   */
  step?: number;

  /**
   * Custom validation function
   */
  validator?: (value: any) => { valid: boolean; message?: string };
}

/**
 * Interface for all possible events from the input text component
 */
export interface InputTextEvents {
  /**
   * Emitted when the input value changes
   */
  valueChange?: (value: any) => void;

  /**
   * Emitted when the input element receives focus
   */
  focus?: (event: Event) => void;

  /**
   * Emitted when the input element loses focus
   */
  blur?: (event: Event) => void;

  /**
   * Emitted when the input element receives a key down event
   */
  keydown?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the input element receives a key up event
   */
  keyup?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the enter key is pressed
   */
  enter?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the input is cleared
   */
  clear?: () => void;

  /**
   * Emitted when the icon is clicked
   */
  iconClick?: (event: MouseEvent) => void;
}
