import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Enum for display mode
 */
export enum MultiSelectDisplayModeEnum {
  COMMA = 'comma',
  CHIP = 'chip',
}

export type MultiSelectDisplayModeType =
  | MultiSelectDisplayModeEnum.COMMA
  | MultiSelectDisplayModeEnum.CHIP;

/**
 * Configuration options for the multiselect component
 * Extends the common base form component configuration
 */
export interface MultiSelectConfig extends BaseFormComponentConfig {
  /**
   * Options for the multiselect
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
   * Option disabled property (for complex objects)
   */
  optionDisabled?: string;

  /**
   * Option group property (for grouped options)
   */
  optionGroupLabel?: string;

  /**
   * Option group children property (for grouped options)
   */
  optionGroupChildren?: string;

  /**
   * Whether filtering is enabled
   */
  filter?: boolean;

  /**
   * Display mode (comma or chip)
   */
  display?: MultiSelectDisplayModeType;

  /**
   * Whether to show the select all checkbox
   */
  showToggleAll?: boolean;

  /**
   * Maximum number of selected labels to display
   */
  maxSelectedLabels?: number;

  /**
   * Select all label
   */
  selectAllLabel?: string;

  /**
   * Height of the dropdown
   */
  scrollHeight?: string;

  /**
   * Whether to enable virtual scrolling
   */
  virtualScroll?: boolean;

  /**
   * Size of each item for virtual scrolling
   */
  virtualScrollItemSize?: number;

  /**
   * Whether the component is in loading state
   */
  loading?: boolean;

  /**
   * Whether to use groups
   */
  group?: boolean;

  /**
   * Icon to display for the dropdown button
   */
  dropdownIcon?: string;
}

/**
 * Interface for multiselect events
 * Extends the common base form component events
 */
export interface MultiSelectEvents extends BaseFormComponentEvents {
  /**
   * Emitted when select all changes
   */
  selectAllChange?: (event: { checked: boolean }) => void;

  /**
   * Emitted when panel shows
   */
  panelShow?: () => void;

  /**
   * Emitted when panel hides
   */
  panelHide?: () => void;
}
