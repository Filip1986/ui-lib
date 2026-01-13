import { BaseFormComponentConfig, BaseFormComponentEvents } from '../../common/form-element-common';

/**
 * Interface for the textarea component configuration
 * Extends the common base form component configuration
 */
export interface TextareaConfig extends BaseFormComponentConfig {
  /**
   * Number of rows
   */
  rows?: number;

  /**
   * Number of columns
   */
  cols?: number;

  /**
   * Whether the textarea should auto resize
   */
  autoResize?: boolean;

  /**
   * Minimum length of the textarea value
   */
  minLength?: number;

  /**
   * Maximum length of the textarea value
   */
  maxLength?: number;

  /**
   * Additional CSS classes for the textarea element
   */
  textareaClass?: string;

  /**
   * Whether the textarea should autofocus
   */
  autofocus: boolean;
}

/**
 * Interface for all possible events from the textarea component
 * Extends the common base form component events
 */
export interface TextareaEvents extends BaseFormComponentEvents {
  /**
   * Emitted when the textarea element receives key down event
   */
  keydown?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the textarea element receives key up event
   */
  keyup?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the enter key is pressed
   */
  enter?: (event: KeyboardEvent) => void;

  /**
   * Emitted when the textarea is cleared
   */
  clear?: () => void;
}
