import { Component, Optional, Self } from '@angular/core';

import { NgControl } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectButtonConfig, SelectButtonOptionType } from '../models/select-button-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import { FormComponentSizeEnum } from '../../common/form-element-common';

@Component({
  selector: 'lib-base-select-button',
  standalone: true,
  imports: [SelectButtonModule],
  template: '', // Base component doesn't need a template
})
export class BaseSelectButtonComponent extends BaseFormControlComponent<SelectButtonConfig, any> {
  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get selectButtonControl() {
    return this.formControl;
  }

  /**
   * Compare two option values for equality
   */
  compareOptions(value1: any, value2: any): boolean {
    return (
      value1 === value2 ||
      (value1 !== null && value2 !== null && value1.toString() === value2.toString())
    );
  }

  /**
   * Get the display label for an option
   */
  getOptionLabel(option: SelectButtonOptionType): string {
    return this.config.optionLabel
      ? option[this.config.optionLabel]
      : option.label || option.toString();
  }

  /**
   * Get the value for an option
   */
  getOptionValue(option: SelectButtonOptionType): any {
    return this.config.optionValue
      ? option[this.config.optionValue]
      : option.value !== undefined
        ? option.value
        : option;
  }

  /**
   * Check if an option is disabled
   */
  isOptionDisabled(option: SelectButtonOptionType): boolean {
    return this.config.optionDisabled
      ? option[this.config.optionDisabled]
      : option.disabled || false;
  }

  /**
   * Initialize the component with default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `select-button-${Math.random().toString(36).substring(2, 9)}`,
      size: this.config?.size || FormComponentSizeEnum.NORMAL,
      multiple: this.config?.multiple ?? false,
      disabled: this.config?.disabled ?? false,
      required: this.config?.required ?? false,
    };

    // Apply value to form control
    if (this.value !== undefined) {
      this.formControl.setValue(this.value);
    }

    // Apply disabled state through the FormControl's methods
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

    // If no specific error message was found, return a generic message
    return 'Invalid selection';
  }

  /**
   * Set the disabled state in the config
   */
  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
