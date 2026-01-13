import { Component, Optional, Self } from '@angular/core';

import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AutoFocusModule } from 'primeng/autofocus';
import {
  DatePickerConfig,
  DatePickerModeEnum,
  DatePickerViewEnum,
  IconDisplayModeEnum,
  DatePickerHourFormatEnum,
} from '../models/date-picker-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import { FormLabelStyleEnum, FormLabelPositionEnum } from '../../common/form-element-common';

@Component({
  selector: 'lib-base-date-picker',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    IftaLabelModule,
    AutoFocusModule
],
  template: '', // Base component doesn't need a template
})
export class BaseDatePickerComponent extends BaseFormControlComponent<
  DatePickerConfig,
  Date | Date[] | null
> {
  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access to maintain backward compatibility
  get datePickerControl() {
    return this.formControl;
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `datepicker-${Math.random().toString(36).substring(2, 9)}`,
      labelStyle: this.config?.labelStyle || FormLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || FormLabelPositionEnum.ABOVE,
      selectionMode: this.config?.selectionMode || DatePickerModeEnum.SINGLE,
      hourFormat: this.config?.hourFormat || DatePickerHourFormatEnum.TWENTY_FOUR,
      dateFormat: this.config?.dateFormat || 'mm/dd/yy',
      showIcon: this.config?.showIcon ?? false,
      iconDisplay: this.config?.iconDisplay || IconDisplayModeEnum.BUTTON,
      required: this.config?.required || false,
      disabled: this.config?.disabled || false,
      view: this.config?.view || DatePickerViewEnum.DATE,
      showTime: this.config?.showTime || false,
      numberOfMonths: this.config?.numberOfMonths || 1,
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

    if (errors['minDate']) {
      return `Date must be after ${errors['minDate'].minDate.toLocaleDateString()}`;
    }

    if (errors['maxDate']) {
      return `Date must be before ${errors['maxDate'].maxDate.toLocaleDateString()}`;
    }

    // If no specific error message was found, return a generic message
    return 'Invalid date';
  }

  /**
   * Set the disabled state in the config
   */
  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
