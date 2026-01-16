import { Component, EventEmitter, Optional, Output, Self } from '@angular/core';

import { FormControl, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SelectConfig } from '../models/select-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import {
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../../common/form-element-common';

@Component({
  selector: 'lib-base-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SelectModule],
  template: '', // Base component doesn't need a template
})
export class BaseSelectComponent extends BaseFormControlComponent<SelectConfig, any> {
  /**
   * Event emitted when panel is shown
   */
  @Output() onShow: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when panel is hidden
   */
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when clear button is clicked
   */
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access to maintain backward compatibility
  get selectControl(): FormControl<any | null> {
    return this.formControl;
  }

  /**
   * Handle panel show event
   */
  handleOnShow(): void {
    this.onShow.emit();
  }

  /**
   * Handle panel hide event
   */
  handleOnHide(): void {
    this.onHide.emit();
  }

  /**
   * Handle clear event
   */
  handleOnClear(): void {
    this.value = null;
    this.formControl.setValue(null);
    this.onClear.emit();
  }

  // Override BaseFormControlComponent methods
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `select-${Math.random().toString(36).substring(2, 9)}`,
      labelStyle: this.config?.labelStyle || FormLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || FormLabelPositionEnum.ABOVE,
      scrollHeight: this.config?.scrollHeight || '200px',
      variant: this.config?.variant || FormComponentVariantEnum.OUTLINED,
      required: this.config?.required || false,
      disabled: this.config?.disabled || false,
      options: this.config?.options || [],
    };

    // Apply value to form control
    if (this.value !== undefined) {
      this.formControl.setValue(this.value);
    }

    // Apply disabled state
    if (this.config.disabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

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

  protected override setDisabled(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }
}
