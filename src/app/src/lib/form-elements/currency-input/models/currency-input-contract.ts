import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Enum for currency display modes
 */
export enum CurrencyDisplayModeEnum {
  SYMBOL = 'symbol',
  CODE = 'code',
}

/**
 * Enum for button layout
 */
export enum CurrencyInputButtonLayoutEnum {
  STACKED = 'stacked',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type CurrencyDisplayModeType = CurrencyDisplayModeEnum.SYMBOL | CurrencyDisplayModeEnum.CODE;

export type CurrencyInputButtonLayoutType =
  | CurrencyInputButtonLayoutEnum.STACKED
  | CurrencyInputButtonLayoutEnum.HORIZONTAL
  | CurrencyInputButtonLayoutEnum.VERTICAL;

/**
 * Interface for currency input configuration
 * Extends the base form component configuration
 */
export interface CurrencyInputConfig extends BaseFormComponentConfig {
  /**
   * Currency code (e.g., USD, EUR, GBP)
   */
  currency?: string;

  /**
   * Locale for formatting (e.g., en-US, de-DE)
   */
  locale?: string;

  /**
   * Currency display mode - how the currency is displayed
   */
  currencyDisplay?: CurrencyDisplayModeType;

  /**
   * Whether to use grouping separators (thousands)
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
   * Minimum value allowed
   */
  min?: number;

  /**
   * Maximum value allowed
   */
  max?: number;

  /**
   * Whether to show spinner buttons
   */
  showButtons?: boolean;

  /**
   * Layout for the spinner buttons
   */
  buttonLayout?: CurrencyInputButtonLayoutType;

  /**
   * Step value for buttons
   */
  step?: number;

  /**
   * Prefix text (e.g., $)
   */
  prefix?: string;

  /**
   * Suffix text
   */
  suffix?: string;

  /**
   * Mode - always set to currency for this component
   */
  mode?: string;
}

/**
 * Interface for currency input events
 * Extends the base form component events
 */
export interface CurrencyInputEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the value changes
   */
  valueChange?: (value: number | null) => void;
}
