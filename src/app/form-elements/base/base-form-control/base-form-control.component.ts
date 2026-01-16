import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getValidationMessage } from '../../common/utils/form-utils';

interface BaseConfig {
  errorMessage?: string;
  // Add other common properties if needed
}

@Component({
  template: '', // Base component without a template
})
export abstract class BaseFormControlComponent<TConfig extends BaseConfig, TValue = unknown>
  implements OnInit, OnDestroy, ControlValueAccessor
{
  /**
   * Component configuration - all input options
   */
  @Input() config!: TConfig;

  /**
   * Component value - can be set directly or through form controls
   */
  @Input() value: TValue | null = null;

  /**
   * Event emitted when the value changes
   */
  @Output() valueChange: EventEmitter<TValue | null> = new EventEmitter<TValue | null>();

  /**
   * Event emitted on component focus
   */
  @Output() focusEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Event emitted on component blur
   */
  @Output() blurEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Form control for the component
   */
  protected formControl: FormControl<TValue | null> = new FormControl<TValue | null>(null as any);

  /**
   * Whether the component is touched
   */
  protected touched = false;

  /**
   * Whether the component is focused
   */
  protected focused = false;

  /**
   * Subject used to clean up subscriptions on destruction
   */
  protected destroy$: Subject<void> = new Subject<void>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    // Connect the injected NgControl to this component's ControlValueAccessor interface
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Check if the component has errors and has been touched
   */
  get hasErrors(): boolean {
    const control: AbstractControl<any, any> | null = this.ngControl
      ? this.ngControl.control
      : this.formControl;
    return Boolean(control?.touched && control?.invalid);
  }

  /**
   * Get the validation state of the component
   */
  get isValid(): boolean {
    // If not using NgControl, check the formControl directly
    if (!this.ngControl) {
      return this.formControl.valid;
    }

    // Otherwise, check the NgControl
    return this.ngControl.valid ?? true;
  }

  /**
   * Get the validation error message
   */
  get validationMessage(): string | null {
    const control: AbstractControl<any, any> = this.ngControl?.control || this.formControl;

    if (!control || !control.errors) {
      return null;
    }

    return this.getValidationMessage(control.errors);
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    // Apply initial configuration
    this.initializeComponent();

    // Subscribe to value changes
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: TValue | null): void => {
        this.value = value;
        this.onChange(value);
        this.valueChange.emit(value);
        this.onValueChange(value);
      });
  }

  /**
   * Clean up subscriptions on destruction
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Write a new value to the element
   * Implements ControlValueAccessor
   */
  writeValue(value: TValue | null): void {
    this.value = value;
    this.formControl.setValue(value, { emitEvent: false });
  }

  /**
   * Register a function called when the control value changes
   * Implements ControlValueAccessor
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register a function called when the control is touched
   * Implements ControlValueAccessor
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Enable or disable the component
   * Implements ControlValueAccessor
   */
  setDisabledState(isDisabled: boolean): void {
    this.setDisabled(isDisabled);
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

  /**
   * Handle focus event
   */
  onFocus(event: Event): void {
    this.focused = true;
    this.focusEvent.emit(event);
  }

  /**
   * Handle blur event
   */
  onBlur(event: Event): void {
    this.focused = false;
    this.touched = true;
    this.onTouched();
    this.blurEvent.emit(event);
  }

  /**
   * Initialize the component with a default configuration - to be implemented by derived classes
   */
  protected abstract initializeComponent(): void;

  /**
   * Get a validation message for specific errors - to be implemented by derived classes
   */
  protected getValidationMessage(errors: any): string | null {
    return getValidationMessage(errors, this.config.errorMessage);
  }

  /**
   * Set the disabled state in the config - to be implemented by derived classes
   */
  protected abstract setDisabled(isDisabled: boolean): void;

  /**
   * Handle value changes - can be overridden by derived classes
   */
  protected onValueChange(value: TValue | null): void {}

  /**
   * Function called when the control value changes
   */
  protected onChange: any = (): void => {};

  /**
   * Function called when the control is touched
   */
  protected onTouched: any = (): void => {};
}
