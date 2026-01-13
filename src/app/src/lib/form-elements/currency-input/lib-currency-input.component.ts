import { Component, Input, Output, EventEmitter, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import {
  CurrencyInputConfig,
  CurrencyDisplayModeEnum,
  CurrencyInputButtonLayoutEnum,
} from './models/currency-input-contract';
import { BaseCurrencyInputComponent } from './base-currency-input.component';
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
  selector: 'lib-currency-input',
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
  templateUrl: './lib-currency-input.component.html',
  styleUrls: ['./lib-currency-input.component.scss'],
})
export class LibCurrencyInputComponent extends BaseCurrencyInputComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: CurrencyInputConfig = {
    mode: 'currency',
    currency: 'USD',
    locale: 'en-US',
    currencyDisplay: CurrencyDisplayModeEnum.SYMBOL,
    useGrouping: true,
    showButtons: false,
    minFractionDigits: 2,
    maxFractionDigits: 2,
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
   * Currency code setter (USD, EUR, GBP, etc.)
   */
  @Input() set currency(value: string) {
    this.config.currency = value;
  }

  /**
   * Locale setter (en-US, de-DE, etc.)
   */
  @Input() set locale(value: string) {
    this.config.locale = value;
  }

  /**
   * Currency display mode setter (symbol or code)
   */
  @Input() set currencyDisplay(value: CurrencyDisplayModeEnum) {
    this.config.currencyDisplay = value;
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
   * Show buttons setter
   */
  @Input() set showButtons(value: boolean) {
    this.config.showButtons = value;
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
   * Button layout setter
   */
  @Input() set buttonLayout(value: CurrencyInputButtonLayoutEnum) {
    this.config.buttonLayout = value;
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
   * Success message setter
   */
  @Input() set successMessage(value: string) {
    this.config.successMessage = value;
  }

  /**
   * Container class setter
   */
  @Input() set containerClass(value: string) {
    this.config.containerClass = value;
  }

  /**
   * Returns the container CSS classes
   */
  get currencyInputContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'currency-input-container',
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
