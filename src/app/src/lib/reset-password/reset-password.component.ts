import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordFactoryComponent } from './reset-password-factory/reset-password-factory.component';
import {
  ResetPasswordFeatures,
  ResetPasswordFormData,
  ResetPasswordVariant,
} from './models/reset-password-contract';

@Component({
  selector: 'lib-reset-password',
  standalone: true,
  imports: [RouterModule, ToastModule, ResetPasswordFactoryComponent],
  providers: [MessageService],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  @Input() title = 'Reset Password';
  @Input() variant: ResetPasswordVariant = '1';
  @Input() token = '';
  @Input() isSubmitting: WritableSignal<boolean> = signal(false);
  @Input() resetError = '';

  /**
   * Configure which features are enabled in the reset password component
   */
  @Input() features: ResetPasswordFeatures = {
    showLoginLink: true,
    showPasswordStrength: true,
  };

  /**
   * Emits the form data when the form is submitted
   */
  @Output() submitResetPassword: EventEmitter<ResetPasswordFormData> =
    new EventEmitter<ResetPasswordFormData>();

  /**
   * Emits when the user clicks the login link
   */
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits when the user clicks the forgot password link
   */
  @Output() navigateToForgotPasswordRequest: EventEmitter<void> = new EventEmitter<void>();

  resetSuccessful: WritableSignal<boolean> = signal(false);
  tokenError: WritableSignal<boolean> = signal(false);

  constructor(private messageService: MessageService) {}

  /**
   * Handles the reset password form submission
   * @param data The form data
   */
  onSubmitResetPassword(data: ResetPasswordFormData): void {
    this.submitResetPassword.emit(data);
  }

  /**
   * Sets the reset successful status to true
   */
  setResetSuccessful(): void {
    this.resetSuccessful.set(true);
  }

  /**
   * Sets the token error status to true
   */
  setTokenError(): void {
    this.tokenError.set(true);
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

  /**
   * Shows a success message
   * @param message The message to show
   */
  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  /**
   * Shows an error message
   * @param message The message to show
   */
  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
