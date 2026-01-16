import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  RegisterFeatures,
  RegisterFormData,
  RegisterVariant,
} from '../models/registration-contract';
import { Registration1Component } from '../registration-1/registration-1.component';
import { Registration3Component } from '../registration-3/registration-3.component';
import { Registration2Component } from '../registration-2/registration-2.component';

@Component({
  selector: 'lib-registration-factory',
  standalone: true,
  imports: [Registration1Component, Registration3Component, Registration2Component],
  templateUrl: './registration-factory.component.html',
  styleUrl: './registration-factory.component.scss',
})
export class RegistrationFactoryComponent {
  @Input() title = 'Create Account';
  @Input() variant: RegisterVariant = '1';
  @Input() isSubmitting = false;
  @Input() registrationError = '';
  @Input() features: RegisterFeatures = {
    showTermsLinks: true,
    showPasswordStrength: true,
    showLoginLink: true,
  };

  @Output() submitRegistration: EventEmitter<RegisterFormData> =
    new EventEmitter<RegisterFormData>();
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  onSubmitRegistration(data: RegisterFormData): void {
    this.submitRegistration.emit(data);
  }

  onNavigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }
}
