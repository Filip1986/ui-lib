import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { BaseListBoxComponent } from './base-listbox/base-list-box.component';
import { ListBoxConfig } from './models/listbox-contract';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../common/form-element-common';
import { FormLabelComponent } from '../common/form-label/form-label.component';
import { MessageContainerComponent } from '../common/message-container/message-container.component';
import { getContainerClasses } from '../common/utils/form-utils';

@Component({
  selector: 'lib-listbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    FloatLabelModule,
    IftaLabelModule,
    FormLabelComponent,
    MessageContainerComponent,
  ],
  templateUrl: './lib-listbox.component.html',
  styleUrls: ['./lib-listbox.component.scss'],
})
export class LibListboxComponent extends BaseListBoxComponent implements OnInit {
  /**
   * Component configuration - all input options
   */
  @Input() override config: ListBoxConfig = {
    required: false,
    disabled: false,
    multiple: false,
    checkbox: false,
    options: [],
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  /**
   * Listbox value - can be set directly or through form controls
   */
  @Input() override value: any = null;

  /**
   * Event emitted when the value changes
   */
  @Output() override valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event emitted on listbox focus
   */
  @Output() override focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on listbox blur
   */
  @Output() override blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted when select all changes
   */
  @Output() override selectAllChange: EventEmitter<{ checked: boolean }> = new EventEmitter<{
    checked: boolean;
  }>();

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
    this.setDisabledState(value);
  }

  /**
   * Options setter
   */
  @Input() set options(value: any[]) {
    this.config.options = value;
  }

  /**
   * Multiple selection setter
   */
  @Input() set multiple(value: boolean) {
    this.config.multiple = value;
  }

  /**
   * Checkbox setter
   */
  @Input() set checkbox(value: boolean) {
    this.config.checkbox = value;
  }

  /**
   * Checkmark setter
   */
  @Input() set checkmark(value: boolean) {
    this.config.checkmark = value;
  }

  /**
   * Highlight on select setter
   */
  @Input() set highlightOnSelect(value: boolean) {
    this.config.highlightOnSelect = value;
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
   * Filter setter
   */
  @Input() set filter(value: boolean) {
    this.config.filter = value;
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
   * Striped setter
   */
  @Input() set striped(value: boolean) {
    this.config.striped = value;
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
   * Returns the container CSS classes
   */
  get listboxContainerClass(): { [key: string]: boolean } {
    return getContainerClasses(
      'listbox-container',
      this.config.containerClass,
      this.config.labelStyle,
      !!this.config.label,
      this.config.size,
      this.config.variant,
    );
  }

  /**
   * Returns the CSS classes for the listbox
   */
  getNgClass(listboxClass: string | undefined, hasErrors: boolean): { [key: string]: boolean } {
    return {
      [listboxClass || '']: !!listboxClass,
      'ng-invalid ng-dirty': hasErrors,
    };
  }

  /**
   * Handle selects all change events
   */
  override onSelectAllChange(event: { checked: boolean }): void {
    if (this.config.multiple && this.config.checkbox) {
      this.value = event.checked ? this.config.options : [];
      this.listBoxControl.setValue(this.value);
      this.valueChange.emit(this.value);
    }
    this.selectAllChange.emit(event);
  }

  // Override focus/blur methods to handle FocusEvent
  override onFocus(event: Event): void {
    super.onFocus(event as unknown as Event);
    this.focusEvent.emit(event);
  }

  override onBlur(event: Event): void {
    super.onBlur(event as unknown as Event);
    this.blurEvent.emit(event);
  }
}
