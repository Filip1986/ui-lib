import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Optional,
  Self,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  MultiSelectBlurEvent,
  MultiSelectFocusEvent,
  MultiSelectModule,
} from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseMultiSelectComponent } from './base-multiselect/base-multiselect.component';
import { MultiSelectConfig, MultiSelectDisplayModeEnum } from './models/multiselect-contract';
import {
  FormLabelStyleEnum,
  FormLabelPositionEnum,
  FormComponentSizeEnum,
  FormComponentVariantEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-multiselect',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-multi-select.component.html',
  styleUrls: ['./lib-multi-select.component.scss'],
})
export class LibMultiSelectComponent extends BaseMultiSelectComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: MultiSelectConfig = {
    required: false,
    disabled: false,
    options: [],
    variant: FormComponentVariantEnum.OUTLINED,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * MultiSelect value - can be set directly or through form controls
   */
  @Input() override value: any[] = [];

  /**
   * Event emitters for PrimeNG specific events
   * These replace the ones in the base component
   */
  @Output() override primeFocusEvent = new EventEmitter<MultiSelectFocusEvent>();
  @Output() override primeBlurEvent = new EventEmitter<MultiSelectBlurEvent>();
  @Output() override selectAllChange = new EventEmitter<{ checked: boolean }>();
  @Output() override panelShow = new EventEmitter<void>();
  @Output() override panelHide = new EventEmitter<void>();

  // Template content children for projection
  @ContentChild('itemTemplate') itemTemplate: TemplateRef<any> | undefined;
  @ContentChild('groupTemplate') groupTemplate: TemplateRef<any> | undefined;
  @ContentChild('headerTemplate') headerTemplate: TemplateRef<any> | undefined;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any> | undefined;
  @ContentChild('emptyTemplate') emptyTemplate: TemplateRef<any> | undefined;
  @ContentChild('emptyFilterTemplate') emptyFilterTemplate: TemplateRef<any> | undefined;
  @ContentChild('headerCheckboxIconTemplate') headerCheckboxIconTemplate:
    | TemplateRef<any>
    | undefined;
  @ContentChild('filterIconTemplate') filterIconTemplate: TemplateRef<any> | undefined;
  @ContentChild('dropdownIconTemplate') dropdownIconTemplate: TemplateRef<any> | undefined;

  // Map enum types for template use - maintain backward compatibility with refactored names
  labelStyles = FormLabelStyleEnum;
  labelPositions = FormLabelPositionEnum;
  multiSelectSizes = FormComponentSizeEnum;
  // Keep component-specific enums
  displayModes = MultiSelectDisplayModeEnum;

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
   * Options setter
   */
  @Input() set options(value: any[]) {
    this.config.options = value;
  }

  /**
   * Option label setter
   */
  @Input() set optionLabel(value: string) {
    this.config.optionLabel = value;
  }

  /**
   * Option value setter
   */
  @Input() set optionValue(value: string) {
    this.config.optionValue = value;
  }

  /**
   * Display mode setter
   */
  @Input() set display(value: MultiSelectDisplayModeEnum) {
    this.config.display = value;
  }

  /**
   * Filter setter
   */
  @Input() set filter(value: boolean) {
    this.config.filter = value;
  }

  /**
   * Show toggle all setter
   */
  @Input() set showToggleAll(value: boolean) {
    this.config.showToggleAll = value;
  }

  /**
   * Max selected labels setter
   */
  @Input() set maxSelectedLabels(value: number) {
    this.config.maxSelectedLabels = value;
  }

  /**
   * Select all label setter
   */
  @Input() set selectAllLabel(value: string) {
    this.config.selectAllLabel = value;
  }

  /**
   * Scroll height setter
   */
  @Input() set scrollHeight(value: string) {
    this.config.scrollHeight = value;
  }

  /**
   * Virtual scroll setter
   */
  @Input() set virtualScroll(value: boolean) {
    this.config.virtualScroll = value;
  }

  /**
   * Virtual scroll item size setter
   */
  @Input() set virtualScrollItemSize(value: number) {
    this.config.virtualScrollItemSize = value;
  }

  /**
   * Loading setter
   */
  @Input() set loading(value: boolean) {
    this.config.loading = value;
  }

  /**
   * Group setter
   */
  @Input() set group(value: boolean) {
    this.config.group = value;
  }

  /**
   * Option group label setter
   */
  @Input() set optionGroupLabel(value: string) {
    this.config.optionGroupLabel = value;
  }

  /**
   * Option group children setter
   */
  @Input() set optionGroupChildren(value: string) {
    this.config.optionGroupChildren = value;
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
  get multiSelectContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'multiselect-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  /**
   * Returns the CSS classes for the multiselect
   */
  getNgClass(inputClass: string | undefined, hasErrors: boolean): { [key: string]: boolean } {
    return {
      [inputClass || '']: !!inputClass,
      'ng-invalid ng-dirty': hasErrors,
      'p-multiselect-filled': this.config.variant === FormComponentVariantEnum.FILLED,
    };
  }

  /**
   * Handles PrimeNG's Focus event
   */
  handleFocus(event: MultiSelectFocusEvent): void {
    this.onPrimeFocus(event);
  }

  /**
   * Handles PrimeNG's Blur event
   */
  handleBlur(event: MultiSelectBlurEvent): void {
    this.onPrimeBlur(event);
  }
}
