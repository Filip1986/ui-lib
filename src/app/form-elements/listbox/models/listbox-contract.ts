import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Available label styles for the listBox component
 */
export enum ListBoxLabelStyleEnum {
  DEFAULT = 'default',
  FLOAT = 'float',
  FLOAT_IN = 'float-in',
  FLOAT_ON = 'float-on',
  IFTA = 'ifta',
}

/**
 * Enum for available label positions
 */
export enum ListBoxLabelPositionEnum {
  ABOVE = 'above',
  INLINE = 'inline',
}

export type ListBoxLabelStyleType =
  | ListBoxLabelStyleEnum.DEFAULT
  | ListBoxLabelStyleEnum.FLOAT
  | ListBoxLabelStyleEnum.FLOAT_IN
  | ListBoxLabelStyleEnum.FLOAT_ON
  | ListBoxLabelStyleEnum.IFTA;

export type ListBoxLabelPositionType =
  | ListBoxLabelPositionEnum.ABOVE
  | ListBoxLabelPositionEnum.INLINE;

/**
 * Configuration options for the listBox component
 * Extends the common base form component config
 */
export interface ListBoxConfig extends BaseFormComponentConfig {
  /**
   * Options for the listBox
   */
  options: any[];

  /**
   * Option label property (for complex objects)
   */
  optionLabel?: string;

  /**
   * Option value property (for complex objects)
   */
  optionValue?: string;

  /**
   * Whether multiple selection is allowed
   */
  multiple?: boolean;

  /**
   * Whether checkboxes are used for multiple selection
   */
  checkbox?: boolean;

  /**
   * Whether to display a checkmark on selection
   */
  checkmark?: boolean;

  /**
   * Whether to highlight on select
   */
  highlightOnSelect?: boolean;

  /**
   * Whether filtering is enabled
   */
  filter?: boolean;

  /**
   * Virtual scroll configuration
   */
  virtualScroll?: boolean;
  virtualScrollItemSize?: number;

  /**
   * Striped row configuration
   */
  striped?: boolean;
}

/**
 * Events interface for the listBox component
 * Extends the common base form component events
 */
export interface ListBoxEvents extends BaseFormComponentEvents {
  /**
   * Emitted when value changes
   */
  valueChange?: (value: any) => void;

  /**
   * Emitted when select all changes
   */
  selectAllChange?: (event: { checked: boolean }) => void;
}
