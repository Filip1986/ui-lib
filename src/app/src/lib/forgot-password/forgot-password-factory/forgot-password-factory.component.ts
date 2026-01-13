import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  ForgotPasswordFeatures,
  ForgotPasswordFormData,
  ForgotPasswordVariant,
} from '../models/forgot-password-contract';
import { ForgotPassword1Component } from '../forgot-password-1/forgot-password-1.component';
import { ForgotPassword2Component } from '../forgot-password-2/forgot-password-2.component';
import { ForgotPassword3Component } from '../forgot-password-3/forgot-password-3.component';

@Component({
  selector: 'lib-forgot-password-factory',
  standalone: true,
  imports: [
    ForgotPassword1Component,
    ForgotPassword2Component,
    ForgotPassword3Component
],
  templateUrl: './forgot-password-factory.component.html',
  styleUrl: './forgot-password-factory.component.scss',
})
export class ForgotPasswordFactoryComponent {
  @Input() title = 'Forgot Password';
  @Input() variant: ForgotPasswordVariant = '1';
  @Input() isSubmitting = false;
  @Input() forgotPasswordError = '';
  @Input() features: ForgotPasswordFeatures = {
    showLoginLink: true,
  };

  /**
   * Reference to whether the reset link has been sent
   */
  @Input() resetLinkSent = false;

  @Output() submitForgotPassword: EventEmitter<ForgotPasswordFormData> =
    new EventEmitter<ForgotPasswordFormData>();
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Handles the forgot password form submission
   * @param data The form data
   */
  onSubmitForgotPassword(data: ForgotPasswordFormData): void {
    this.submitForgotPassword.emit(data);
  }

  /**
   * Handles the navigation to login request
   */
  onNavigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }
}
