import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ForgotPasswordFactoryComponent } from './forgot-password-factory/forgot-password-factory.component';
import {
  ForgotPasswordFeatures,
  ForgotPasswordFormData,
  ForgotPasswordVariant,
} from './models/forgot-password-contract';

@Component({
  selector: 'lib-forgot-password',
  standalone: true,
  imports: [ToastModule, ForgotPasswordFactoryComponent],
  providers: [MessageService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  @Input() title = 'Forgot Password';
  @Input() variant: ForgotPasswordVariant = '1';
  @Input() isSubmitting = false;
  @Input() forgotPasswordError = '';

  /**
   * Configure which features are enabled in the forgot password component
   */
  @Input() features: ForgotPasswordFeatures = {
    showLoginLink: true,
  };

  /**
   * Emits the form data when the form is submitted
   */
  @Output() submitForgotPassword: EventEmitter<ForgotPasswordFormData> =
    new EventEmitter<ForgotPasswordFormData>();

  /**
   * Emits when the user clicks the login link
   */
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  resetLinkSent: WritableSignal<boolean> = signal(false);

  constructor(private messageService: MessageService) {}

  /**
   * Handles the forgot password form submission
   * @param data The form data
   */
  onSubmitForgotPassword(data: ForgotPasswordFormData): void {
    this.submitForgotPassword.emit(data);
  }

  /**
   * Sets the reset link sent status to true
   */
  setResetLinkSent(): void {
    this.resetLinkSent.set(true);
  }

  /**
   * Handles the navigation to login request
   */
  onNavigateToLogin(): void {
    this.navigateToLoginRequest.emit();
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
