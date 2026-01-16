import { Component, EventEmitter, Optional, Output, Self } from '@angular/core';

import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  MultiSelectBlurEvent,
  MultiSelectFocusEvent,
  MultiSelectModule,
} from 'primeng/multiselect';
import { MultiSelectConfig, MultiSelectDisplayModeEnum } from '../models/multiselect-contract';
import { BaseFormControlComponent } from '../../base/base-form-control/base-form-control.component';
import { FormLabelStyleEnum, FormLabelPositionEnum } from '../../common/form-element-common';

@Component({
  selector: 'lib-base-multiselect',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MultiSelectModule],
  template: '', // Base component doesn't need a template
})
export class BaseMultiSelectComponent extends BaseFormControlComponent<MultiSelectConfig, any[]> {
  // Replace the base class events to match PrimeNG's event types
  @Output() override valueChange: EventEmitter<any[] | null> = new EventEmitter<any[] | null>();
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  // Add specific events for PrimeNG's specialized events
  @Output() primeFocusEvent: EventEmitter<MultiSelectFocusEvent> =
    new EventEmitter<MultiSelectFocusEvent>();
  @Output() primeBlurEvent: EventEmitter<MultiSelectBlurEvent> =
    new EventEmitter<MultiSelectBlurEvent>();
  @Output() selectAllChange: EventEmitter<{ checked: boolean }> = new EventEmitter<{
    checked: boolean;
  }>();
  @Output() panelShow: EventEmitter<void> = new EventEmitter<void>();
  @Output() panelHide: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // For renamed property access
  get multiSelectControl(): FormControl<any[] | null> {
    return this.formControl;
  }

  /**
   * Handle selects all change events
   */
  onSelectAllChange(event: { checked: boolean }): void {
    this.selectAllChange.emit(event);
  }

  /**
   * Handle panel show event
   */
  onPanelShow(): void {
    this.panelShow.emit();
  }

  /**
   * Handle panel hide event
   */
  onPanelHide(): void {
    this.panelHide.emit();
  }

  /**
   * Override the base focus handler to work with PrimeNG events
   */
  override onFocus(event: Event): void {
    // Call the parent class focus handler with base Event
    super.onFocus(event);
  }

  /**
   * Handle PrimeNG specific focus event
   */
  onPrimeFocus(event: MultiSelectFocusEvent): void {
    // Call the base class focus handler with the original DOM event
    this.onFocus(event.originalEvent);
    // Also emit the PrimeNG event
    this.primeFocusEvent.emit(event);
  }

  /**
   * Override the base blur handler to work with PrimeNG events
   */
  override onBlur(event: Event): void {
    // Call a parent class blur handler with base Event
    super.onBlur(event);
  }

  /**
   * Handle PrimeNG specific blur event
   */
  onPrimeBlur(event: MultiSelectBlurEvent): void {
    // Call the base class blur handler with the original DOM event
    this.onBlur(event.originalEvent);
    // Also emit the PrimeNG event
    this.primeBlurEvent.emit(event);
  }

  /**
   * Initialize the component with the default configuration
   */
  protected override initializeComponent(): void {
    // Set default config values
    this.config = {
      ...this.config,
      id: this.config?.id || `multiselect-${Math.random().toString(36).substring(2, 9)}`,
      labelStyle: this.config?.labelStyle || FormLabelStyleEnum.DEFAULT,
      labelPosition: this.config?.labelPosition || FormLabelPositionEnum.ABOVE,
      display: this.config?.display || MultiSelectDisplayModeEnum.COMMA,
      showToggleAll: this.config?.showToggleAll ?? true,
      scrollHeight: this.config?.scrollHeight || '200px',
      filter: this.config?.filter ?? false,
      group: this.config?.group ?? false,
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
