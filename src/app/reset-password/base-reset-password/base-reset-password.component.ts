
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordFormData } from '../models/reset-password-contract';

@Component({
  selector: 'lib-base-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '', // Base component doesn't need a template
})
export class BaseResetPasswordComponent {
  @Input() title = 'Reset Password';
  @Input() token = '';
  @Input() isSubmitting: WritableSignal<boolean> = signal(false);
  @Input() resetError = '';

  @Output() submitResetPassword: EventEmitter<ResetPasswordFormData> =
    new EventEmitter<ResetPasswordFormData>();
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateToForgotPasswordRequest: EventEmitter<void> = new EventEmitter<void>();

  resetPasswordForm: FormGroup;
  submitted = false;
  resetSuccessful: WritableSignal<boolean> = signal(false);
  tokenError: WritableSignal<boolean> = signal(false);
  passwordStrength: WritableSignal<number> = signal(0);
  showPassword: WritableSignal<boolean> = signal(false);

  constructor(protected fb: FormBuilder) {
    this.resetPasswordForm = this.createForm();
  }

  /**
   * Form controls getters for easier access in templates
   */
  get password(): AbstractControl | null {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.resetPasswordForm.get('confirmPassword');
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.resetPasswordForm.valid) {
      const formData: ResetPasswordFormData = {
        password: this.password?.value,
        confirmPassword: this.confirmPassword?.value,
      };

      this.submitResetPassword.emit(formData);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Sets the reset successful state
   */
  setResetSuccessful(): void {
    this.resetSuccessful.set(true);
  }

  /**
   * Sets the token error state
   */
  setTokenError(): void {
    this.tokenError.set(true);
  }

  /**
   * Navigates to login page
   */
  navigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }

  /**
   * Navigates to forgot password page
   */
  navigateToForgotPassword(): void {
    this.navigateToForgotPasswordRequest.emit();
  }

  /**
   * Calculates password strength (0-5)
   */
  checkPasswordStrength(event: Event): void {
    const password: string = (event.target as HTMLInputElement).value;
    const strength: number = this.calculatePasswordStrength(password);
    this.passwordStrength.set(strength);
  }

  /**
   * Calculates password strength based on various criteria
   */
  calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  }

  /**
   * Returns a label describing password strength
   */
  getPasswordStrengthLabel(): string {
    const labels: string[] = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[this.passwordStrength()] || 'Unknown';
  }

  /**
   * Returns a color representing password strength
   */
  getPasswordStrengthColor(): string {
    const colors: string[] = ['red', 'orangered', 'orange', 'yellowgreen', 'green', 'darkgreen'];
    return colors[this.passwordStrength()] || 'gray';
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update((value: boolean): boolean => !value);
  }

  /**
   * Marks all form fields as touched to display validation errors
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.resetPasswordForm.controls).forEach((field: string): void => {
      const control: AbstractControl | null = this.resetPasswordForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Creates the reset password form with validation
   */
  private createForm(): FormGroup {
    return this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  /**
   * Validates that password and confirm password match
   */
  private passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password !== confirmPassword ? { mismatch: true } : null;
  }
}
