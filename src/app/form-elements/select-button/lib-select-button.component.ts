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
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectButtonConfig, SelectButtonOptionType } from './models/select-button-contract';
import { BaseSelectButtonComponent } from './base-select-button/base-select-button.component';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { MessageContainerComponent } from '../common/message-container/message-container.component';

@Component({
  selector: 'lib-select-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    MessageContainerComponent,
  ],
  templateUrl: './lib-select-button.component.html',
  styleUrls: ['./lib-select-button.component.scss'],
})
export class LibSelectButtonComponent extends BaseSelectButtonComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: SelectButtonConfig = {
    options: [],
    multiple: false,
    required: false,
    disabled: false,
    size: FormComponentSizeEnum.NORMAL,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    labelPosition: FormLabelPositionEnum.ABOVE,
    variant: FormComponentVariantEnum.OUTLINED,
  };

  /**
   * Select button value - can be set directly or through form controls
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
   * Event emitted when selection changes
   */
  @Output() override onChange: EventEmitter<any> = new EventEmitter<any>();

  // Template content children for custom item template
  @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  /**
   * Options setter
   */
  @Input() set options(value: SelectButtonOptionType[]) {
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
   * Multiple setter
   */
  @Input() set multiple(value: boolean) {
    this.config.multiple = value;
  }

  /**
   * Disabled setter
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Required setter
   */
  @Input() set required(value: boolean) {
    this.config.required = value;
  }

  /**
   * Size setter
   */
  @Input() set size(value: FormComponentSizeEnum) {
    this.config.size = value;
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
   * ARIA label setter
   */
  @Input() set ariaLabelledBy(value: string) {
    this.config.ariaLabelledBy = value;
  }

  /**
   * Returns the container CSS classes
   */
  get selectButtonContainerClass(): { [key: string]: boolean } {
    return {
      'select-button-container': true,
      [this.config.containerClass || '']: !!this.config.containerClass,
    };
  }

  /**
   * Determine if the component has errors
   */
  override get hasErrors(): boolean {
    const control = this.ngControl ? this.ngControl.control : this.selectButtonControl;
    return Boolean(control?.touched && control?.invalid);
  }

  /**
   * Get style class based on size
   */
  getSizeClass(): string {
    switch (this.config.size) {
      case FormComponentSizeEnum.SMALL:
        return 'p-selectbutton-sm';
      case FormComponentSizeEnum.LARGE:
        return 'p-selectbutton-lg';
      default:
        return '';
    }
  }

  /**
   * Get the ngClass for styling
   */
  getNgClass(): { [key: string]: boolean } {
    return {
      'ng-invalid ng-dirty': this.hasErrors,
      [this.getSizeClass()]: true,
    };
  }

  /**
   * Handle value change from PrimeNG SelectButton
   */
  handleValueChange(value: any): void {
    this.value = value;
    this.selectButtonControl.setValue(value, { emitEvent: false });
    this.onChange.emit(value);
  }
}
