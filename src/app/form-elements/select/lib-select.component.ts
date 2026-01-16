import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseSelectComponent } from './base-select/base-select.component';
import { SelectConfig } from './models/select-contract';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelPositionType,
  FormLabelStyleEnum,
  FormLabelStyleType,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses, getInputClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-select.component.html',
  styleUrls: ['./lib-select.component.scss'],
})
export class LibSelectComponent extends BaseSelectComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: SelectConfig = {
    required: false,
    disabled: false,
    options: [],
    scrollHeight: '200px',
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Select value - can be set directly or through form controls
   */
  @Input() override value: any = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event emitted on focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted when panel is shown
   */
  @Output() override onShow: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when panel is hidden
   */
  @Output() override onHide: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when clear button is clicked
   */
  @Output() override onClear: EventEmitter<void> = new EventEmitter<void>();

  // Template content children for projection
  @ContentChild('selectedItem') selectedItemTemplate: TemplateRef<any> | undefined;
  @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;
  @ContentChild('group') groupTemplate: TemplateRef<any> | undefined;
  @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;
  @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;
  @ContentChild('empty') emptyTemplate: TemplateRef<any> | undefined;
  @ContentChild('emptyFilter') emptyFilterTemplate: TemplateRef<any> | undefined;
  @ContentChild('dropdownicon') dropdownIconTemplate: TemplateRef<any> | undefined;

  labelStyles: FormLabelStyleType = FormLabelStyleEnum.DEFAULT;
  labelPositions: FormLabelPositionType = FormLabelPositionEnum.ABOVE;
  protected readonly FormLabelStyleEnum = FormLabelStyleEnum;
  protected readonly FormLabelPositionEnum = FormLabelPositionEnum;

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
      this.selectControl.disable({ emitEvent: false });
    } else {
      this.selectControl.enable({ emitEvent: false });
    }
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
   * Option disabled setter
   */
  @Input() set optionDisabled(value: string) {
    this.config.optionDisabled = value;
  }

  /**
   * Filter setter
   */
  @Input() set filter(value: boolean) {
    this.config.filter = value;
  }

  /**
   * Filter by setter
   */
  @Input() set filterBy(value: string) {
    this.config.filterBy = value;
  }

  /**
   * Show clear setter
   */
  @Input() set showClear(value: boolean) {
    this.config.showClear = value;
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
   * Checkmark setter
   */
  @Input() set checkmark(value: boolean) {
    this.config.checkmark = value;
  }

  /**
   * Editable setter
   */
  @Input() set editable(value: boolean) {
    this.config.editable = value;
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
   * Success message setter
   */
  @Input() set successMessage(value: string) {
    this.config.successMessage = value;
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
   * Loading setter
   */
  @Input() set loading(value: boolean) {
    this.config.loading = value;
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
   * Container class setter
   */
  @Input() set containerClass(value: string) {
    this.config.containerClass = value;
  }

  /**
   * Select class setter
   */
  @Input() set selectClass(value: string) {
    this.config.selectClass = value;
  }

  /**
   * Scroll height setter
   */
  @Input() set scrollHeight(value: string) {
    this.config.scrollHeight = value;
  }

  /**
   * Dropdown icon setter
   */
  @Input() set dropdownIcon(value: string) {
    this.config.dropdownIcon = value;
  }

  /**
   * Returns the container CSS classes
   */
  get selectContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'select-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  /**
   * Determine if the component has errors
   */
  override get hasErrors(): boolean {
    const control = this.ngControl ? this.ngControl.control : this.selectControl;
    return Boolean(control?.touched && control?.invalid);
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
   * Get style class based on size
   */
  getSizeClass(): string {
    if (this.config.size === FormComponentSizeEnum.SMALL) {
      return 'p-inputtext-sm';
    } else if (this.config.size === FormComponentSizeEnum.LARGE) {
      return 'p-inputtext-lg';
    }
    return '';
  }

  /**
   * Initialize the component
   */
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
