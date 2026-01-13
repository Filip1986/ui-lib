import { Component, Input, Output, EventEmitter, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BaseTimePickerComponent } from './base-time-picker/base-time-picker.component';
import {
  TimePickerConfig,
  TimePickerHourFormatType,
  TimePickerHourFormatEnum,
} from './models/time-picker-contract';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses, getInputClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-time-picker.component.html',
  styleUrls: ['./lib-time-picker.component.scss'],
})
export class LibTimePickerComponent extends BaseTimePickerComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: TimePickerConfig = {
    required: false,
    disabled: false,
    hourFormat: TimePickerHourFormatEnum.TWENTY_FOUR,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Time value - can be set directly or through form controls
   */
  @Input() override value: Date | null = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<Date | null> = new EventEmitter<Date | null>();

  /**
   * Event emitted on input focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on input blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  labelStyles: typeof FormLabelStyleEnum = FormLabelStyleEnum;
  labelPositions: typeof FormLabelPositionEnum = FormLabelPositionEnum;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  // Input properties setters
  @Input() set label(value: string) {
    this.config.label = value;
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

  @Input() set hourFormat(value: TimePickerHourFormatType) {
    this.config.hourFormat = value;
  }

  @Input() set showButtonBar(value: boolean) {
    this.config.showButtonBar = value;
  }

  @Input() set readonlyInput(value: boolean) {
    this.config.readonlyInput = value;
  }

  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
  }

  @Input() set variant(value: FormComponentVariantEnum) {
    this.config.variant = value;
  }

  @Input() set helperText(value: string) {
    this.config.helperText = value;
  }

  @Input() set errorMessage(value: string) {
    this.config.errorMessage = value;
  }

  @Input() set labelStyle(value: FormLabelStyleEnum) {
    this.config.labelStyle = value;
  }

  @Input() set labelPosition(value: FormLabelPositionEnum) {
    this.config.labelPosition = value;
  }

  /**
   * Returns the container CSS classes
   */
  get timePickerContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'timepicker-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
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
