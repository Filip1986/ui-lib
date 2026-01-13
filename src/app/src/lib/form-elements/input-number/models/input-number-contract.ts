import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Enum for input number modes
 */
export enum InputNumberModeEnum {
  DECIMAL = 'decimal',
  INTEGER = 'integer',
}

/**
 * Enum for button layout
 */
export enum InputNumberButtonLayoutEnum {
  STACKED = 'stacked',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type InputNumberModeType = InputNumberModeEnum.DECIMAL | InputNumberModeEnum.INTEGER;

export type InputNumberButtonLayoutType =
  | InputNumberButtonLayoutEnum.STACKED
  | InputNumberButtonLayoutEnum.HORIZONTAL
  | InputNumberButtonLayoutEnum.VERTICAL;

/**
 * Interface for input number configuration
 * Extends the common base form component configuration
 */
export interface InputNumberConfig extends BaseFormComponentConfig {
  /**
   * Input mode
   */
  mode?: InputNumberModeType;

  /**
   * Whether to use grouping
   */
  useGrouping?: boolean;

  /**
   * Minimum fraction digits
   */
  minFractionDigits?: number;

  /**
   * Maximum fraction digits
   */
  maxFractionDigits?: number;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Prefix text
   */
  prefix?: string;

  /**
   * Suffix text
   */
  suffix?: string;

  /**
   * Show spinner buttons
   */
  showButtons?: boolean;

  /**
   * Button layout
   */
  buttonLayout?: InputNumberButtonLayoutType;

  /**
   * Step value for buttons
   */
  step?: number;
}

/**
 * Events interface for input number
 * Extends the common base form component events
 */
export interface InputNumberEvents extends BaseFormComponentEvents {
  /**
   * Event emitted when value changes
   */
  valueChange?: (value: number | null) => void;
}
