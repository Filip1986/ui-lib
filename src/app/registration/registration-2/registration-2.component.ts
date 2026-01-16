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
import { DividerModule } from 'primeng/divider';
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
  selector: 'lib-registration-2',
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
    DividerModule,
    LibInputTextComponent
],
  providers: [MessageService],
  templateUrl: './registration-2.component.html',
  styleUrl: './registration-2.component.scss',
})
export class Registration2Component extends BaseRegistrationComponent {
  @Input() override isSubmitting = false;
  @Input() override title = 'Create Account';
  @Input() override registrationError = '';
  @Input() features: RegisterFeatures = {
    showTermsLinks: true,
    showPasswordStrength: true,
    showLoginLink: true,
  };

  // Configuration for input fields with different styling for variant 2
  usernameConfig: InputTextConfig = {
    id: 'registration-2-username',
    label: 'Username',
    required: true,
    autofocus: true,
    disabled: false,
    minLength: 3,
    maxLength: 30,
    placeholder: 'Username (3-30 characters)',
    helperText: 'Choose a unique username',
    // Add specific styling for variant 2
    inputClass: 'registration-2-input',
    containerClass: 'registration-2-field',
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  emailConfig: InputTextConfig = {
    id: 'registration-2-email',
    label: 'Email address',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.EMAIL,
    placeholder: 'Email address',
    helperText: 'We will send a verification link',
    // Add specific styling for variant 2
    inputClass: 'registration-2-input',
    containerClass: 'registration-2-field',
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  passwordConfig: InputTextConfig = {
    id: 'registration-2-password',
    label: 'Password',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    placeholder: 'Password (min. 6 characters)',
    helperText: 'Use a strong password',
    minLength: 6,
    // Add specific styling for variant 2
    inputClass: 'registration-2-input',
    containerClass: 'registration-2-field',
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  confirmPasswordConfig: InputTextConfig = {
    id: 'registration-2-confirm-password',
    label: 'Confirm Password',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    placeholder: 'Confirm password',
    // Add specific styling for variant 2
    inputClass: 'registration-2-input',
    containerClass: 'registration-2-field',
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
}
