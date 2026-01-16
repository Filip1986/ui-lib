import { Component, EventEmitter, Optional, Output, Self } from '@angular/core';

import { FormControl, NgControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AutoFocusModule } from 'primeng/autofocus';
import {
  InputTextConfig,
  InputTextIconPositionEnum,
  InputTextTypeEnum,
} from '../models/input-text-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';

@Component({
  selector: 'lib-base-input-text',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    IftaLabelModule,
    InputIconModule,
    IconFieldModule,
    AutoFocusModule
],
  template: '', // Base component doesn't need a template
})
export class BaseInputTextComponent extends BaseFormControlComponent<InputTextConfig, string> {
  /**
   * Event emitted on keydown
   */
  @Output() keydownEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted on keyup
   */
  @Output() keyupEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when an enter key is pressed
   */
  @Output() enter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when input is cleared
   */
  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when the icon is clicked
   */
  @Output() iconClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get inputControl(): FormControl<string | null> {
    return this.formControl;
  }

  /**
   * Handle keydown event
   */
  onKeydown(event: KeyboardEvent): void {
    this.keydownEvent.emit(event);
    if (event.key === 'Enter') {
      this.enter.emit(event);
    }
  }

  /**
   * Handle keyup event
   */
  onKeyup(event: KeyboardEvent): void {
    this.keyupEvent.emit(event);
  }

  /**
   * Handle icon click event
   */
  onIconClick(event: MouseEvent): void {
    this.iconClick.emit(event);
    if (this.config.type === 'search' && this.value) {
      this.onClear();
    }
  }

  /**
   * Handle clear action
   */
  onClear(): void {
    this.value = '';
    this.formControl.setValue('');
    this.clear.emit();
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values with destructuring to ensure we don't lose existing values
    this.config = {
      ...this.config,
      id: this.config?.id || `input-${Math.random().toString(36).substring(2, 9)}`,
      type: this.config?.type || InputTextTypeEnum.TEXT,
      iconPosition: this.config?.iconPosition || InputTextIconPositionEnum.LEFT,
      required: this.config?.required || false,
      autofocus: this.config?.autofocus || false,
      disabled: this.config?.disabled || false,
    };

    // Apply value to form control if present
    if (this.value) {
      this.formControl.setValue(this.value);
    }

    // Apply the disabled state through the FormControl
    if (this.config.disabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

  /**
   * Get a validation message for specific errors
   */
  protected override getValidationMessage(errors: any): string | null {
    // Return the custom error message if set
    if (this.config.errorMessage) {
      return this.config.errorMessage;
    }

    // Otherwise, return a message based on the error type
    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    if (errors['minlength']) {
      return `Please enter at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `Please enter no more than ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['pattern']) {
      return 'Please enter a valid value';
    }

    if (errors['min']) {
      return `Value must be at least ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `Value must be no more than ${errors['max'].max}`;
    }

    // If no specific error message was found, return a generic message
    return 'This field is invalid';
  }

  /**
   * Set the disabled state in the config
   */
  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
