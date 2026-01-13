import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BaseRadioButtonComponent } from './base-radio-button/base-radio-button.component';
import { RadioButtonConfig, RadioButtonModeEnum } from './models/radio-button-contract';
import {
  FormComponentSizeEnum,
  FormComponentSizeType,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-radio-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-radio-button.component.html',
  styleUrls: ['./lib-radio-button.component.scss'],
})
export class LibRadioButtonComponent extends BaseRadioButtonComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: RadioButtonConfig = {
    required: false,
    disabled: false,
    variant: FormComponentVariantEnum.OUTLINED,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Radio button value - can be set directly or through form controls
   */
  @Input() override value: any = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event emitted on radio button focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on radio button blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();
  protected readonly FormComponentSizeEnum = FormComponentSizeEnum;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  /**
   * Radio button label
   */
  @Input() set label(value: string) {
    this.config.label = value;
  }

  /**
   * Radio button name (required for groups)
   */
  @Input() set name(value: string) {
    this.config.name = value;
  }

  /**
   * Radio button specific value
   */
  @Input() set radioValue(value: any) {
    this.config.value = value;
  }

  /**
   * Whether the radio button is disabled
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Radio button mode
   */
  @Input() set mode(value: RadioButtonModeEnum) {
    this.config.mode = value;
  }

  /**
   * Radio button size
   */
  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
  }

  /**
   * Radio button variant
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
   * Sets the aria labeled by attribute
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
   * Sets the radio button CSS class
   */
  @Input() set radioClass(value: string) {
    this.config.radioClass = value;
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
   * Get the CSS classes for the radio button container
   */
  get radioContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'radio-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  /**
   * Returns the CSS classes for the radio button element
   */
  getNgClass(): { [key: string]: boolean } {
    return {
      [this.config.radioClass || '']: !!this.config.radioClass,
      'ng-invalid ng-dirty': this.hasErrors,
    };
  }

  override onFocus(event: Event): void {
    super.onFocus(event as unknown as Event);
  }

  override onBlur(event: Event): void {
    super.onBlur(event as unknown as Event);
  }
}
