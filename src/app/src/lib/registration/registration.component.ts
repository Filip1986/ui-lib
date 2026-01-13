import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  RegisterFeatures,
  RegisterFormData,
  RegisterVariant,
} from './models/registration-contract';
import { RegistrationFactoryComponent } from './registration-factory/registration-factory.component';

@Component({
  selector: 'lib-registration',
  standalone: true,
  imports: [RegistrationFactoryComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
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
}
