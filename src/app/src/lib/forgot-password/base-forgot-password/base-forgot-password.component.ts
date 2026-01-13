
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotPasswordFormData } from '../models/forgot-password-contract';
import { InputTextConfig, InputTextTypeEnum } from '../../form-elements/input-text';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../../form-elements/common/form-element-common';

@Component({
  selector: 'lib-base-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './base-forgot-password.component.html',
  styleUrl: './base-forgot-password.component.scss',
})
export class BaseForgotPasswordComponent {
  @Input() title = 'Forgot Password';

  /**
   * Loading state for the submit button
   */
  @Input() isSubmitting = false;

  /**
   * Error message to display
   */
  @Input() forgotPasswordError = '';

  /**
   * Emits the form data when the form is submitted
   */
  @Output() submitForgotPassword: EventEmitter<ForgotPasswordFormData> =
    new EventEmitter<ForgotPasswordFormData>();

  /**
   * Emits when the user wants to navigate back to login
   */
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  forgotPasswordForm: FormGroup;
  submitted = false;
  resetLinkSent: WritableSignal<boolean> = signal<boolean>(false);

  // Base configuration for email input that can be extended by child components
  baseEmailConfig: InputTextConfig = {
    id: 'forgot-password-email',
    label: 'Email address',
    required: true,
    autofocus: true,
    disabled: false,
    type: InputTextTypeEnum.EMAIL,
    placeholder: 'Enter your email address',
    helperText: 'We will send a password reset link to this address',
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  constructor(protected fb: FormBuilder) {
    this.forgotPasswordForm = this.createForgotPasswordForm();
  }

  /**
   * Getter for email form control
   */
  get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.submitForgotPassword.emit({ email });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Sets the reset link sent state to true
   */
  setResetLinkSent(): void {
    this.resetLinkSent.set(true);
  }

  /**
   * Navigates to login page
   */
  navigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }

  /**
   * Marks all form fields as touched to display validation errors
   */
  protected markAllFieldsAsTouched(): void {
    Object.values(this.forgotPasswordForm.controls).forEach((control: AbstractControl): void => {
      control.markAsTouched({ onlySelf: true });
    });
  }

  /**
   * Creates the forgot password form with validation
   */
  private createForgotPasswordForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
