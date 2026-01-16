import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseTextareaComponent } from './base-textarea/base-textarea.component';
import { TextareaConfig } from './models/textarea-contract';
import { AutoFocusModule } from 'primeng/autofocus';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormComponentVariantType,
  FormLabelPositionEnum,
  FormLabelPositionType,
  FormLabelStyleEnum,
  FormLabelStyleType,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses, getInputClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    FloatLabelModule,
    IftaLabelModule,
    AutoFocusModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-textarea.component.html',
  styleUrls: ['./lib-textarea.component.scss'],
})
export class LibTextareaComponent extends BaseTextareaComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: TextareaConfig = {
    required: false,
    autofocus: false,
    disabled: false,
    size: FormComponentSizeEnum.NORMAL,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
  };

  /**
   * Textarea value - can be set directly or through form controls
   */
  @Input() override value: any = '';

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event emitted on textarea focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on textarea blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on keydown
   */
  @Output() override keydownEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted on keyup
   */
  @Output() override keyupEvent: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when enter key is pressed
   */
  @Output() override enter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event emitted when textarea is cleared
   */
  @Output() override clear: EventEmitter<void> = new EventEmitter<void>();

  labelStyles: FormLabelStyleType = FormLabelStyleEnum.DEFAULT;
  labelPositions: FormLabelPositionType = FormLabelPositionEnum.ABOVE;
  variants: FormComponentVariantType = FormComponentVariantEnum.OUTLINED;
  protected readonly FormComponentVariantEnum = FormComponentVariantEnum;
  protected readonly FormLabelStyleEnum = FormLabelStyleEnum;
  protected readonly FormLabelPositionEnum = FormLabelPositionEnum;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  /**
   * Textarea label
   */
  @Input() set label(value: string) {
    this.config.label = value;
  }

  /**
   * Label position (above or inline)
   */
  @Input() set labelPosition(value: FormLabelPositionEnum) {
    this.config.labelPosition = value;
  }

  /**
   * Textarea placeholder
   */
  @Input() set placeholder(value: string) {
    this.config.placeholder = value;
  }

  /**
   * Whether the textarea is required
   */
  @Input() set required(value: boolean) {
    this.config.required = value;
  }

  /**
   * Whether the textarea is disabled
   */
  @Input() set disabled(value: boolean) {
    this.config.disabled = value;
    if (value) {
      this.textareaControl.disable();
    } else {
      this.textareaControl.enable();
    }
  }

  /**
   * Label style (default, float, or ifta)
   */
  @Input() set labelStyle(value: FormLabelStyleEnum) {
    this.config.labelStyle = value;
  }

  /**
   * Helper text to display below the textarea
   */
  @Input() set helperText(value: string) {
    this.config.helperText = value;
  }

  /**
   * Error message to display when textarea is invalid
   */
  @Input() set errorMessage(value: string) {
    this.config.errorMessage = value;
  }

  /**
   * Success message to display when textarea is valid
   */
  @Input() set successMessage(value: string) {
    this.config.successMessage = value;
  }

  /**
   * Number of rows for the textarea
   */
  @Input() set rows(value: number) {
    this.config.rows = value;
  }

  /**
   * Number of columns for the textarea
   */
  @Input() set cols(value: number) {
    this.config.cols = value;
  }

  /**
   * Whether the textarea should auto resize
   */
  @Input() set autoResize(value: boolean) {
    this.config.autoResize = value;
  }

  /**
   * The variant of the textarea (filled or outlined)
   */
  @Input() set variant(value: FormComponentVariantEnum) {
    this.config.variant = value;
  }

  /**
   * The size of the textarea (small, normal, large)
   */
  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
  }

  /**
   * Minimum length for the textarea value
   */
  @Input() set minLength(value: number) {
    this.config.minLength = value;
  }

  /**
   * Maximum length for the textarea value
   */
  @Input() set maxLength(value: number) {
    this.config.maxLength = value;
  }

  /**
   * Additional CSS classes for the textarea container
   */
  @Input() set containerClass(value: string) {
    this.config.containerClass = value;
  }

  /**
   * Additional CSS classes for the textarea element
   */
  @Input() set textareaClass(value: string) {
    this.config.textareaClass = value;
  }

  /**
   * ID for the textarea element
   */
  @Input() set id(value: string) {
    this.config.id = value;
  }

  get textareaContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'textarea-container',
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

  /**
   * Initialize the component
   */
  override ngOnInit(): void {
    super.ngOnInit();
  }

  // Override these methods to handle FocusEvent instead of Event
  override onFocus(event: Event): void {
    super.onFocus(event as unknown as Event);
    this.focusEvent.emit(event);
  }

  override onBlur(event: Event): void {
    super.onBlur(event as unknown as Event);
    this.blurEvent.emit(event);
  }
}
