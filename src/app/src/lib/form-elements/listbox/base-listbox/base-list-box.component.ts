import { Component, EventEmitter, Optional, Output, Self } from '@angular/core';

import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import {
  ListBoxConfig,
  ListBoxLabelStyleEnum,
  ListBoxLabelPositionEnum,
} from '../models/listbox-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';

@Component({
  selector: 'lib-base-listbox',
  standalone: true,
  imports: [ReactiveFormsModule, ListboxModule],
  template: '', // Base component doesn't need a template
})
export class BaseListBoxComponent extends BaseFormControlComponent<ListBoxConfig, any> {
  /**
   * Event emitted when select all changes
   */
  @Output() selectAllChange: EventEmitter<{ checked: boolean }> = new EventEmitter<{
    checked: boolean;
  }>();

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access to maintain backward compatibility
  get listBoxControl(): FormControl<any> {
    return this.formControl;
  }

  /**
   * Handle selects all change events (specific to listbox)
   */
  onSelectAllChange(event: { checked: boolean }): void {
    this.selectAllChange.emit(event);
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `listbox-${Math.random().toString(36).substring(2, 9)}`,
      labelStyle: this.config?.labelStyle || ListBoxLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || ListBoxLabelPositionEnum.ABOVE,
      multiple: this.config?.multiple || false,
      filter: this.config?.filter || false,
      striped: this.config?.striped || false,
      required: this.config?.required ?? false,
      disabled: this.config?.disabled ?? false,
      options: this.config?.options ?? [],
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
