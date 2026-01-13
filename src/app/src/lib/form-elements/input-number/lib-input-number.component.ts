import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseInputNumberComponent } from './base-input-number/base-input-number.component';
import {
  InputNumberButtonLayoutEnum,
  InputNumberConfig,
  InputNumberModeEnum,
} from './models/input-number-contract';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormComponentVariantType,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-input-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-input-number.component.html',
  styleUrls: ['./lib-input-number.component.scss'],
})
export class LibInputNumberComponent extends BaseInputNumberComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: InputNumberConfig = {
    mode: InputNumberModeEnum.DECIMAL,
    useGrouping: true,
    showButtons: false,
    buttonLayout: InputNumberButtonLayoutEnum.STACKED,
    required: false,
    disabled: false,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Input value - can be set directly or through form controls
   */
  @Input() override value: number | null = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<number | null> = new EventEmitter<number | null>();

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
    this.config.disabled = value;
    if (value) {
      this.inputNumberControl.disable({ emitEvent: false });
    } else {
      this.inputNumberControl.enable({ emitEvent: false });
    }
  }

  /**
   * Mode setter
   */
  @Input() set mode(value: InputNumberModeEnum) {
    this.config.mode = value;
  }

  /**
   * Minimum value setter
   */
  @Input() set min(value: number) {
    this.config.min = value;
  }

  /**
   * Maximum value setter
   */
  @Input() set max(value: number) {
    this.config.max = value;
  }

  /**
   * Step setter
   */
  @Input() set step(value: number) {
    this.config.step = value;
  }

  /**
   * Show buttons setter
   */
  @Input() set showButtons(value: boolean) {
    this.config.showButtons = value;
  }

  /**
   * Button layout setter
   */
  @Input() set buttonLayout(value: InputNumberButtonLayoutEnum) {
    this.config.buttonLayout = value;
  }

  /**
   * Prefix setter
   */
  @Input() set prefix(value: string) {
    this.config.prefix = value;
  }

  /**
   * Suffix setter
   */
  @Input() set suffix(value: string) {
    this.config.suffix = value;
  }

  /**
   * Use grouping setter
   */
  @Input() set useGrouping(value: boolean) {
    this.config.useGrouping = value;
  }

  /**
   * Minimum fraction digits setter
   */
  @Input() set minFractionDigits(value: number) {
    this.config.minFractionDigits = value;
  }

  /**
   * Maximum fraction digits setter
   */
  @Input() set maxFractionDigits(value: number) {
    this.config.maxFractionDigits = value;
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
  @Input() set variant(value: FormComponentVariantType) {
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
   * Returns the container CSS classes
   */
  get inputNumberContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'inputnumber-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  get buttonLayoutValue(): string {
    return this.config.buttonLayout?.toString() || '';
  }

  /**
   * Determine if the component has errors
   */
  override get hasErrors(): boolean {
    const control = this.ngControl ? this.ngControl.control : this.inputNumberControl;
    return Boolean(control?.touched && control?.invalid);
  }

  /**
   * Returns the CSS classes for the input
   */
  getNgClass(inputClass: string | undefined, hasErrors: boolean): { [key: string]: boolean } {
    return {
      [inputClass || '']: !!inputClass,
      'ng-invalid ng-dirty': hasErrors,
      small: this.config.size === 'small',
      large: this.config.size === 'large',
      filled: this.config.variant === 'filled',
    };
  }
}
