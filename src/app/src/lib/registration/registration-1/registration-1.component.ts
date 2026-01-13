import { Component, Input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BaseRegistrationComponent } from '../base-registration/base-registration.component';
import { RegisterFeatures } from '../models/registration-contract';
import {
  InputTextIconPositionEnum,
  LibInputTextComponent,
  InputTextConfig,
  InputTextTypeEnum,
} from '../../form-elements/input-text';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../../form-elements';

@Component({
  selector: 'lib-registration-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule,
    CheckboxModule,
    ToastModule,
    CardModule,
    LibInputTextComponent
],
  providers: [MessageService],
  templateUrl: './registration-1.component.html',
  styleUrl: './registration-1.component.scss',
})
export class Registration1Component extends BaseRegistrationComponent {
  @Input() override isSubmitting = false;
  @Input() override title = 'Create Account';
  @Input() override registrationError = '';
  @Input() features: RegisterFeatures = {
    showTermsLinks: true,
    showPasswordStrength: true,
    showLoginLink: true,
  };

  // Configuration for input fields
  usernameConfig: InputTextConfig = {
    id: 'username',
    label: $localize`:@@registration.username.label:Username`,
    required: true,
    autofocus: true,
    disabled: false,
    minLength: 3,
    maxLength: 30,
    placeholder: $localize`:@@ui-lib.registration.username.placeholder:Enter your username (3-30 characters)`,
    helperText: $localize`:@@ui-lib.registration.username.help:Choose a username between 3 and 30 characters`,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  emailConfig: InputTextConfig = {
    id: 'email',
    label: $localize`:@@ui-lib.registration.email.label:Email`,
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.EMAIL,
    placeholder: $localize`:@@ui-lib.registration.email.placeholder:Enter your email address`,
    helperText: $localize`:@@ui-lib.registration.email.help:We will send a verification link to this address`,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  passwordConfig: InputTextConfig = {
    id: 'password',
    label: $localize`:@@ui-lib.registration.password.label:Password`,
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    minLength: 6,
    placeholder: $localize`:@@ui-lib.registration.password.placeholder:Create a password (min. 6 characters)`,
    helperText: $localize`:@@ui-lib.registration.password.help:Use a strong password with at least 6 characters`,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  confirmPasswordConfig: InputTextConfig = {
    id: 'confirmPassword',
    label: $localize`:@@ui-lib.registration.confirmPassword.label:Confirm Password`,
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    placeholder: $localize`:@@ui-lib.registration.confirmPassword.placeholder:Confirm your password`,
    helperText: $localize`:@@ui-lib.registration.confirmPassword.help:Re-enter your password to confirm`,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  protected readonly IconPosition = InputTextIconPositionEnum;
  protected readonly InputTextType = InputTextTypeEnum;

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }

  /**
   * Handle input event from password field
   * This is needed to maintain the password strength functionality
   * @param event Input event from the password field
   */
  override checkPasswordStrength(event: Event): void {
    // If the event is from the InputTextComponent, it will be a CustomEvent
    // We need to extract the input element value
    if (event instanceof CustomEvent && event.detail) {
      const inputValue = event.detail.value || '';
      const strength = this.calculatePasswordStrength(inputValue);
      this.passwordStrength.set(strength);
    } else {
      // Original implementation for direct input events
      super.checkPasswordStrength(event);
    }
  }

  // Helper methods for error messages with i18n
  getUsernameErrorMessage(): string {
    if (!this.submitted || !this.username?.errors) return '';

    if (this.username.errors['required']) {
      return $localize`:@@ui-lib.registration.username.errors.required:Username is required`;
    }
    if (this.username.errors['minlength']) {
      return $localize`:@@ui-lib.registration.username.errors.minLength:Username must be at least 3 characters`;
    }
    if (this.username.errors['maxlength']) {
      return $localize`:@@ui-lib.registration.username.errors.maxLength:Username cannot exceed 30 characters`;
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (!this.submitted || !this.email?.errors) return '';

    if (this.email.errors['required']) {
      return $localize`:@@ui-lib.registration.email.errors.required:Email is required`;
    }
    if (this.email.errors['email']) {
      return $localize`:@@ui-lib.registration.email.errors.invalid:Please enter a valid email address`;
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (!this.submitted || !this.password?.errors) return '';

    if (this.password.errors['required']) {
      return $localize`:@@ui-lib.registration.password.errors.required:Password is required`;
    }
    if (this.password.errors['minlength']) {
      return $localize`:@@ui-lib.registration.password.errors.minLength:Password must be at least 6 characters`;
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (!this.submitted) return '';

    if (this.confirmPassword?.errors?.['required']) {
      return $localize`:@@ui-lib.registration.confirmPassword.errors.required:Please confirm your password`;
    }
    if (this.registrationForm.errors?.['mismatch']) {
      return $localize`:@@ui-lib.registration.confirmPassword.errors.mismatch:Passwords do not match`;
    }
    return '';
  }

  getTermsErrorMessage(): string {
    if (!this.submitted || !this.acceptTerms?.errors?.['required']) return '';
    return $localize`:@@ui-lib.registration.terms.errors.required:You must accept the terms and conditions`;
  }
}
