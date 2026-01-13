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
import { RippleModule } from 'primeng/ripple';
import { BaseRegistrationComponent } from '../base-registration/base-registration.component';
import { RegisterFeatures } from '../models/registration-contract';
import {
  LibInputTextComponent,
  InputTextConfig,
  InputTextIconPositionEnum,
  InputTextTypeEnum,
} from '../../form-elements/input-text';
import {
  FormComponentSizeEnum,
  FormComponentVariantEnum,
  FormLabelPositionEnum,
  FormLabelStyleEnum,
} from '../../form-elements';

@Component({
  selector: 'lib-registration-3',
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
    RippleModule,
    LibInputTextComponent
],
  providers: [MessageService],
  templateUrl: './registration-3.component.html',
  styleUrl: './registration-3.component.scss',
})
export class Registration3Component extends BaseRegistrationComponent {
  @Input() override isSubmitting = false;
  @Input() override title = 'Create Account';
  @Input() override registrationError = '';
  @Input() features: RegisterFeatures = {
    showTermsLinks: true,
    showPasswordStrength: true,
    showLoginLink: true,
  };

  // Configuration for input fields with styling specific to variant 3
  usernameConfig: InputTextConfig = {
    id: 'registration-3-username',
    label: 'Username',
    required: true,
    autofocus: true,
    disabled: false,
    minLength: 3,
    maxLength: 30,
    placeholder: 'Choose a username (3-30 characters)',
    helperText: 'Choose a unique username',
    inputClass: 'registration-3-input',
    containerClass: 'registration-3-field',
    icon: 'pi pi-user',
    iconPosition: InputTextIconPositionEnum.LEFT,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  emailConfig: InputTextConfig = {
    id: 'registration-3-email',
    label: 'Email Address',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.EMAIL,
    placeholder: 'Enter your email address',
    helperText: 'We will send a verification link',
    inputClass: 'registration-3-input',
    containerClass: 'registration-3-field',
    icon: 'pi pi-envelope',
    iconPosition: InputTextIconPositionEnum.LEFT,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  passwordConfig: InputTextConfig = {
    id: 'registration-3-password',
    label: 'Password',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    placeholder: 'Create a password (min. 6 characters)',
    helperText: 'Use a strong password',
    minLength: 6,
    inputClass: 'registration-3-input pl-10',
    containerClass: 'registration-3-field',
    icon: 'pi pi-lock',
    iconPosition: InputTextIconPositionEnum.LEFT,
    variant: FormComponentVariantEnum.OUTLINED,
    labelPosition: FormLabelPositionEnum.ABOVE,
    labelStyle: FormLabelStyleEnum.DEFAULT,
    size: FormComponentSizeEnum.NORMAL,
  };

  confirmPasswordConfig: InputTextConfig = {
    id: 'registration-3-confirm-password',
    label: 'Confirm Password',
    required: true,
    autofocus: false,
    disabled: false,
    type: InputTextTypeEnum.PASSWORD,
    placeholder: 'Confirm your password',
    inputClass: 'registration-3-input pl-10',
    containerClass: 'registration-3-field',
    icon: 'pi pi-lock-open',
    iconPosition: InputTextIconPositionEnum.LEFT,
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
