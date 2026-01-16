import { Component, Input, Output, EventEmitter, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BaseDatePickerComponent } from './base-date-picker/base-date-picker.component';
import {
  DatePickerConfig,
  DatePickerModeEnum,
  DatePickerViewEnum,
  IconDisplayModeEnum,
  DatePickerHourFormatType,
  DatePickerHourFormatEnum,
} from './models/date-picker-contract';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import {
  FormLabelStyleEnum,
  FormLabelPositionEnum,
  FormComponentSizeEnum,
  FormComponentVariantEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses, getInputClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-date-picker.component.html',
  styleUrls: ['./lib-date-picker.component.scss'],
})
export class LibDatePickerComponent extends BaseDatePickerComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: DatePickerConfig = {
    required: false,
    disabled: false,
    selectionMode: DatePickerModeEnum.SINGLE,
    hourFormat: DatePickerHourFormatEnum.TWENTY_FOUR,
    variant: FormComponentVariantEnum.OUTLINED,
    view: DatePickerViewEnum.DATE,
    showTime: true,
    numberOfMonths: 1,
    iconDisplay: IconDisplayModeEnum.BUTTON,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Date value - can be set directly or through form controls
   */
  @Input() override value: Date | Date[] | null = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<Date | Date[] | null> = new EventEmitter<
    Date | Date[] | null
  >();

  /**
   * Event emitted on input focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on input blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  // Expose enum types for the template
  labelStyles: typeof FormLabelStyleEnum = FormLabelStyleEnum;
  labelPositions: typeof FormLabelPositionEnum = FormLabelPositionEnum;
  defaultDateFormat = 'mm/dd/yy';

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  /**
   * Label setter
   */
  @Input() set label(value: string) {
    this.config.label = value;
  }

  /**
   * Placeholder setter
   */
  @Input() set placeholder(value: string) {
    this.config.placeholder = value;
  }

  /**
   * Required setter
   */
  @Input() set required(value: boolean) {
    this.config.required = value;
  }

  /**
   * Disabled setter
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Selection mode setter
   */
  @Input() set selectionMode(value: DatePickerModeEnum) {
    this.config.selectionMode = value;
  }

  /**
   * Min date setter
   */
  @Input() set minDate(value: Date) {
    this.config.minDate = value;
  }

  /**
   * Max date setter
   */
  @Input() set maxDate(value: Date) {
    this.config.maxDate = value;
  }

  /**
   * Date format setter
   */
  @Input() set dateFormat(value: string) {
    this.config.dateFormat = value;
  }

  /**
   * Show icon setter
   */
  @Input() set showIcon(value: boolean) {
    this.config.showIcon = value;
  }

  /**
   * Icon display setter
   */
  @Input() set iconDisplay(value: IconDisplayModeEnum) {
    this.config.iconDisplay = value;
  }

  /**
   * View setter
   */
  @Input() set view(value: DatePickerViewEnum) {
    this.config.view = value;
  }

  /**
   * Number of months setter
   */
  @Input() set numberOfMonths(value: number) {
    this.config.numberOfMonths = value;
  }

  /**
   * Show time setter
   */
  @Input() set showTime(value: boolean) {
    this.config.showTime = value;
  }

  /**
   * Hour format setter
   */
  @Input() set hourFormat(value: DatePickerHourFormatType) {
    this.config.hourFormat = value;
  }

  /**
   * Time-only setter
   */
  @Input() set timeOnly(value: boolean) {
    this.config.timeOnly = value;
  }

  /**
   * Show week setter
   */
  @Input() set showWeek(value: boolean) {
    this.config.showWeek = value;
  }

  /**
   * Show button bar setter
   */
  @Input() set showButtonBar(value: boolean) {
    this.config.showButtonBar = value;
  }

  /**
   * Inline setter
   */
  @Input() set inline(value: boolean) {
    this.config.inline = value;
  }

  /**
   * Readonly input setter
   */
  @Input() set readonlyInput(value: boolean) {
    this.config.readonlyInput = value;
  }

  /**
   * Size setter
   */
  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
  }

  /**
   * Variant setter
   */
  @Input() set variant(value: FormComponentVariantEnum) {
    this.config.variant = value;
  }

  /**
   * Helper text setter
   */
  @Input() set helperText(value: string) {
    this.config.helperText = value;
  }

  /**
   * Error message setter
   */
  @Input() set errorMessage(value: string) {
    this.config.errorMessage = value;
  }

  /**
   * Label style setter
   */
  @Input() set labelStyle(value: FormLabelStyleEnum) {
    this.config.labelStyle = value;
  }

  /**
   * Label position setter
   */
  @Input() set labelPosition(value: FormLabelPositionEnum) {
    this.config.labelPosition = value;
  }

  /**
   * Returns the container CSS classes
   */
  get datePickerContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'datepicker-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  /**
   * Returns the CSS classes for the date picker input
   */
  getClasses(inputClass: string | undefined): { [key: string]: boolean } {
    return getInputClasses(inputClass, this.hasErrors, this.config.size);
  }
}
