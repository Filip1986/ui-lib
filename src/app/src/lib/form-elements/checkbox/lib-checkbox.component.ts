import { Component, Input, Output, EventEmitter, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { BaseCheckboxComponent } from './base-checkbox/base-checkbox.component';
import { CheckboxConfig, CheckboxModeEnum } from './models/checkbox-contract';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-checkbox.component.html',
  styleUrls: ['./lib-checkbox.component.scss'],
})
export class LibCheckboxComponent extends BaseCheckboxComponent {
  /**
   * Component configuration - all input options
   */
  @Input() override config: CheckboxConfig = {
    disabled: false,
    mode: CheckboxModeEnum.BINARY,
    size: FormComponentSizeEnum.NORMAL,
    variant: FormComponentVariantEnum.OUTLINED,
    required: false,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
  };

  /**
   * Checkbox value - can be set directly or through form controls
   */
  @Input() override value: any = false;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event emitted on checkbox focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on checkbox blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  configModes: typeof CheckboxModeEnum = CheckboxModeEnum;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  /**
   * Sets the label for the checkbox
   */
  @Input() set label(value: string) {
    this.config.label = value;
  }

  /**
   * Sets the name for the checkbox
   */
  @Input() set name(value: string) {
    this.config.name = value;
  }

  /**
   * Sets the checkbox's specific value (for group checkboxes)
   */
  @Input() set checkboxValue(value: any) {
    this.config.value = value;
  }

  /**
   * Sets whether the checkbox is disabled
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Sets whether the checkbox is in an indeterminate state
   */
  @Input() set indeterminate(value: boolean) {
    this.config.indeterminate = value;
  }

  /**
   * Sets the checkbox mode
   */
  @Input() set mode(value: CheckboxModeEnum) {
    this.config.mode = value;
  }

  /**
   * Sets the checkbox size
   */
  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
  }

  /**
   * Sets the checkbox variant
   */
  @Input() set variant(value: FormComponentVariantEnum) {
    this.config.variant = value;
  }

  /**
   * Sets the required flag
   */
  @Input() set required(value: boolean) {
    this.config.required = value;
  }

  /**
   * Sets the aria label
   */
  @Input() set ariaLabel(value: string) {
    this.config.ariaLabel = value;
  }

  /**
   * Sets the aria labelled by attribute
   */
  @Input() set ariaLabelledBy(value: string) {
    this.config.ariaLabelledBy = value;
  }

  /**
   * Sets the container CSS class
   */
  @Input() set containerClass(value: string) {
    this.config.containerClass = value;
  }

  /**
   * Sets the checkbox CSS class
   */
  @Input() set checkboxClass(value: string) {
    this.config.checkboxClass = value;
  }

  /**
   * Sets the helper text
   */
  @Input() set helperText(value: string) {
    this.config.helperText = value;
  }

  /**
   * Sets the error message
   */
  @Input() set errorMessage(value: string) {
    this.config.errorMessage = value;
  }

  /**
   * Get the CSS classes for the checkbox container
   */
  get checkboxContainerClass(): { [key: string]: boolean } {
    return {
      ...getContainerClasses(
        'checkbox-container',
        this.config.containerClass,
        this.config.labelStyle,
        !!this.config.label,
        this.config.size,
        this.config.variant,
      ),
      [`p-checkbox-${this.config.size}`]: !!this.config.size, // Component-specific class
    };
  }

  /**
   * Toggle checkbox when label is clicked
   * This is needed because the lib-form-label might not properly
   * forward the click to the p-checkbox element
   */
  toggleCheckbox(): void {
    if (this.config.disabled) {
      return; // Don't toggle if disabled
    }

    // For binary mode
    if (this.config.mode === CheckboxModeEnum.BINARY) {
      const newValue = !this.checkboxControl.value;
      this.checkboxControl.setValue(newValue);
      this.value = newValue;
      this.valueChange.emit(newValue);

      // Ensure the control is touched
      this.checkboxControl.markAsTouched();
      this.touched = true;
    }
    // For group mode
    else {
      const selectedValue = this.checkboxControl.value;
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.includes(this.config.value)
        : selectedValue === this.config.value;

      let newValue: any;

      // If the value is already selected, remove it
      if (isSelected && Array.isArray(selectedValue)) {
        newValue = selectedValue.filter((v) => v !== this.config.value);
      }
      // If the value is not selected, add it
      else if (Array.isArray(selectedValue)) {
        newValue = [...selectedValue, this.config.value];
      }
      // For single values in group mode
      else {
        newValue = this.config.value;
      }

      this.checkboxControl.setValue(newValue);
      this.value = newValue;
      this.valueChange.emit(newValue);

      // Ensure the control is touched
      this.checkboxControl.markAsTouched();
      this.touched = true;
    }
  }

  /**
   * Returns the CSS classes for the checkbox element
   */
  getNgClass(): { [key: string]: boolean } {
    return {
      [this.config.checkboxClass || '']: !!this.config.checkboxClass,
      'ng-invalid ng-dirty': this.hasErrors,
    };
  }

  // Override focus/blur methods to handle FocusEvent
  override onFocus(event: Event): void {
    super.onFocus(event);
  }

  override onBlur(event: Event): void {
    super.onBlur(event);
  }
}
