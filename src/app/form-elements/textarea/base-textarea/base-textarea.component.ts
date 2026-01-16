import { Component, EventEmitter, Optional, Output, Self } from '@angular/core';

import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AutoFocusModule } from 'primeng/autofocus';
import { TextareaConfig } from '../models/textarea-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import { FormLabelPositionEnum, FormLabelStyleEnum } from '../../common/form-element-common';

@Component({
  selector: 'lib-base-textarea',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabelModule,
    IftaLabelModule,
    AutoFocusModule
],
  template: '', // Base component doesn't need a template
})
export class BaseTextareaComponent extends BaseFormControlComponent<TextareaConfig, string> {
  /**
   * Event emitted on keydown
   */
  @Output() keydownEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted on keyup
   */
  @Output() keyupEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when enter key is pressed
   */
  @Output() enter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when textarea is cleared
   */
  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get textareaControl() {
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
   * Handle clear action
   */
  onClear(): void {
    this.value = '';
    this.formControl.setValue('');
    this.clear.emit();
  }

  /**
   * Initialize the component with default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `textarea-${Math.random().toString(36).substring(2, 9)}`,
      labelStyle: this.config?.labelStyle || FormLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || FormLabelPositionEnum.ABOVE,
      rows: this.config?.rows || 3,
      cols: this.config?.cols || 30,
      autoResize: this.config?.autoResize || false,
      required: this.config?.required || false,
      autofocus: this.config?.autofocus || false,
      disabled: this.config?.disabled || false,
    };

    // Apply value to form control
    if (this.value) {
      this.formControl.setValue(this.value);
    }

    // Apply disabled state through the FormControl
    if (this.config.disabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

  /**
   * Get validation message for specific errors
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

    if (errors['minlength']) {
      return `Please enter at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `Please enter no more than ${errors['maxlength'].requiredLength} characters`;
    }

    // If no specific error message was found, return a generic message
    return 'This field is invalid';
  }

  /**
   * Set disabled state in the config
   */
  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
