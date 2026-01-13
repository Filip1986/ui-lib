import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';

import {
  ResetPasswordFeatures,
  ResetPasswordFormData,
  ResetPasswordVariant,
} from '../models/reset-password-contract';
import { ResetPassword1Component } from '../reset-password-1/reset-password-1.component';
import { ResetPassword2Component } from '../reset-password-2/reset-password-2.component';
import { ResetPassword3Component } from '../reset-password-3/reset-password-3.component';

@Component({
  selector: 'lib-reset-password-factory',
  standalone: true,
  imports: [
    ResetPassword1Component,
    ResetPassword2Component,
    ResetPassword3Component
],
  templateUrl: './reset-password-factory.component.html',
  styleUrl: './reset-password-factory.component.scss',
})
export class ResetPasswordFactoryComponent {
  @Input() title = 'Reset Password';
  @Input() variant: ResetPasswordVariant = '1';
  @Input() token = '';
  @Input() isSubmitting: WritableSignal<boolean> = signal(false);
  @Input() resetError = '';
  @Input() features: ResetPasswordFeatures = {
    showLoginLink: true,
    showPasswordStrength: true,
  };

  @Input() resetSuccessful = false;
  @Input() tokenError = false;

  @Output() submitResetPassword: EventEmitter<ResetPasswordFormData> =
    new EventEmitter<ResetPasswordFormData>();
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateToForgotPasswordRequest: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Handles the reset password form submission
   * @param data The form data
   */
  onSubmitResetPassword(data: ResetPasswordFormData): void {
    this.submitResetPassword.emit(data);
  }

  /**
   * Handles the navigation to login request
   */
  onNavigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }

  /**
   * Handles the navigation to forgot password request
   */
  onNavigateToForgotPassword(): void {
    this.navigateToForgotPasswordRequest.emit();
  }
}
