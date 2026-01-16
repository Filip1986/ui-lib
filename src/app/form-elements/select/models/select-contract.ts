import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

export const DEFAULT_SCROLL_HEIGHT = '200px';

/**
 * Interface for the select component configuration
 * Extends the common base form component configuration
 */
export interface SelectConfig extends BaseFormComponentConfig {
  /**
   * Options for the select
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
   * Whether to show a checkmark for selected option
   */
  checkmark?: boolean;

  /**
   * Whether filtering is enabled
   */
  filter?: boolean;

  /**
   * Filter By property
   */
  filterBy?: string;

  /**
   * Show clear button
   */
  showClear?: boolean;

  /**
   * Whether the component is in loading state
   */
  loading?: boolean;

  /**
   * Whether select is editable
   */
  editable?: boolean;

  /**
   * Whether to enable virtual scrolling
   */
  virtualScroll?: boolean;

  /**
   * Size of each item for virtual scrolling
   */
  virtualScrollItemSize?: number;

  /**
   * Whether to use groups
   */
  group?: boolean;

  /**
   * Dropdown icon
   */
  dropdownIcon?: string;

  /**
   * Scrolling height
   */
  scrollHeight: string;

  /**
   * Additional CSS classes for the select element
   */
  selectClass?: string;
}

/**
 * Interface for select events
 * Extends the common base form component events
 */
export interface SelectEvents extends BaseFormComponentEvents {
  /**
   * Emitted when a panel is shown
   */
  onShow?: () => void;

  /**
   * Emitted when a panel is hidden
   */
  onHide?: () => void;

  /**
   * Emitted when the clear button is clicked
   */
  onClear?: () => void;
}
