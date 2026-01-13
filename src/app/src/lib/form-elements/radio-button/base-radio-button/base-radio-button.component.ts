import { Component, Optional, Self } from '@angular/core';

import { FormControl, NgControl } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RadioButtonConfig, RadioButtonModeEnum } from '../models/radio-button-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import { FormComponentVariantEnum } from '../../common/form-element-common';

@Component({
  selector: 'lib-base-radio-button',
  standalone: true,
  imports: [RadioButtonModule],
  template: '', // Base component doesn't need a template
})
export class BaseRadioButtonComponent extends BaseFormControlComponent<RadioButtonConfig, any> {
  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get radioControl(): FormControl<any> {
    return this.formControl;
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `radio-${Math.random().toString(36).substring(2, 9)}`,
      mode: this.config?.mode || RadioButtonModeEnum.STANDARD,
      size: this.config?.size,
      variant: this.config?.variant || FormComponentVariantEnum.OUTLINED,
      required: this.config?.required || false,
      disabled: this.config?.disabled || false,
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
