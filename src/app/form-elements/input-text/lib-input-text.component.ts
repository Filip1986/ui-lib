import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AutoFocusModule } from 'primeng/autofocus';
import { BaseInputTextComponent } from './base-input-text/base-input-text.component';
import {
  InputTextConfig,
  InputTextIconPositionEnum,
  InputTextModeEnum,
  InputTextTypeEnum,
} from './models/input-text-contract';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { getContainerClasses, getInputClasses } from '../common/utils/form-utils';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';

@Component({
  selector: 'lib-input-text',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    IftaLabelModule,
    InputIconModule,
    IconFieldModule,
    AutoFocusModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-input-text.component.html',
  styleUrls: ['./lib-input-text.component.scss'],
})
export class LibInputTextComponent extends BaseInputTextComponent implements OnInit {
  /**
   * Component configuration
   */
  @Input() override config: InputTextConfig = {
    required: false,
    autofocus: false,
    disabled: false,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Input value
   */
  @Input() override value = '';

  // Expose enums for the template
  labelStyles: typeof FormLabelStyleEnum = FormLabelStyleEnum;
  labelPositions: typeof FormLabelPositionEnum = FormLabelPositionEnum;
  iconPositions: typeof InputTextIconPositionEnum = InputTextIconPositionEnum;
  inputModes: typeof InputTextModeEnum = InputTextModeEnum;
  inputTypes: typeof InputTextTypeEnum = InputTextTypeEnum;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // Input properties via setters
  @Input() set type(value: InputTextTypeEnum) {
    this.config.type = value;
  }

  @Input() set label(value: string) {
    this.config.label = value;
  }

  @Input() set labelPosition(value: FormLabelPositionEnum) {
    this.config.labelPosition = value;
  }

  @Input() set placeholder(value: string) {
    this.config.placeholder = value;
  }

  @Input() set required(value: boolean) {
    this.config.required = value;
  }

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  @Input() set icon(value: string) {
    this.config.icon = value;
  }

  @Input() set iconPosition(value: InputTextIconPositionEnum) {
    this.config.iconPosition = value;
  }

  @Input() set labelStyle(value: FormLabelStyleEnum) {
    this.config.labelStyle = value;
  }

  @Input() set helperText(value: string) {
    this.config.helperText = value;
  }

  @Input() set errorMessage(value: string) {
    this.config.errorMessage = value;
  }

  @Input() set successMessage(value: string) {
    this.config.successMessage = value;
  }

  @Input() set inputMode(value: string) {
    this.config.inputMode = value as any;
  }

  @Input() set minLength(value: number) {
    this.config.minLength = value;
  }

  @Input() set maxLength(value: number) {
    this.config.maxLength = value;
  }

  @Input() set pattern(value: string) {
    this.config.pattern = value;
  }

  @Input() set containerClass(value: string) {
    this.config.containerClass = value;
  }

  @Input() set inputClass(value: string) {
    this.config.inputClass = value;
  }

  @Input() set id(value: string) {
    this.config.id = value;
  }

  /**
   * Get container CSS classes
   */
  get inputContainerClass(): { [key: string]: boolean } {
    return {
      ...getContainerClasses(
        'input-container',
        this.config.containerClass,
        this.config.labelStyle,
        !!this.config.label,
        this.config.size,
        this.config.variant,
      ),
      'has-icon': !!this.config.icon, // Component-specific class
    };
  }

  // Handle focus/blur events with correct typing
  override onFocus(event: Event): void {
    super.onFocus(event as unknown as Event);
  }

  override onBlur(event: Event): void {
    super.onBlur(event as unknown as Event);
  }

  /**
   * Returns standardized CSS classes for the input element
   */
  getClasses(inputClass: string | undefined): { [key: string]: boolean } {
    return getInputClasses(
      inputClass, // Component-specific class from config
      this.hasErrors, // Error state
      this.config.size, // Size configuration
    );
  }
}
