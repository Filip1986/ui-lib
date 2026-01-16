import { Component, Optional, Self } from '@angular/core';

import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseFormControlComponent } from '../base/base-form-control/base-form-control.component';
import { CurrencyDisplayModeEnum, CurrencyInputConfig } from './models/currency-input-contract';
import { FormLabelStyleEnum, FormLabelPositionEnum } from '../common/form-element-common';

@Component({
  selector: 'lib-base-currency-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    FloatLabelModule,
    IftaLabelModule
],
  template: '', // Base component doesn't need a template
})
export class BaseCurrencyInputComponent extends BaseFormControlComponent<
  CurrencyInputConfig,
  number
> {
  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get inputNumberControl(): FormControl<number | null> {
    return this.formControl;
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `currency-input-${Math.random().toString(36).substring(2, 9)}`,
      mode: 'currency',
      currency: this.config?.currency || 'USD',
      locale: this.config?.locale || 'en-US',
      currencyDisplay: this.config?.currencyDisplay || CurrencyDisplayModeEnum.SYMBOL,
      useGrouping: this.config?.useGrouping ?? true,
      showButtons: this.config?.showButtons ?? false,
      minFractionDigits: this.config?.minFractionDigits ?? 2,
      maxFractionDigits: this.config?.maxFractionDigits ?? 2,
      labelStyle: this.config?.labelStyle || FormLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || FormLabelPositionEnum.ABOVE,
      required: this.config?.required ?? false,
      disabled: this.config?.disabled ?? false,
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

    if (errors['min']) {
      return `Value must be at least ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `Value cannot exceed ${errors['max'].max}`;
    }

    // If no specific error message was found, return a generic message
    return 'Invalid input';
  }

  /**
   * Set the disabled state in the config
   */
  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
