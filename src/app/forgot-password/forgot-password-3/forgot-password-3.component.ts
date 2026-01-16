import { Component, Input } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { BaseForgotPasswordComponent } from '../base-forgot-password/base-forgot-password.component';
import { ForgotPasswordFeatures } from '../models/forgot-password-contract';
import {
  InputTextIconPositionEnum,
  LibInputTextComponent,
  InputTextConfig,
} from '../../form-elements/input-text';

@Component({
  selector: 'lib-forgot-password-3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    LibInputTextComponent
],
  providers: [MessageService],
  templateUrl: './forgot-password-3.component.html',
  styleUrl: './forgot-password-3.component.scss',
})
export class ForgotPassword3Component extends BaseForgotPasswordComponent {
  @Input() override title = 'Forgot Password';
  @Input() override isSubmitting = false;
  @Input() override forgotPasswordError = '';
  @Input() features: ForgotPasswordFeatures = {
    showLoginLink: true,
  };

  emailConfig: InputTextConfig = {
    ...this.baseEmailConfig,
    id: 'forgot-password-3-email',
    icon: 'pi pi-envelope',
    iconPosition: InputTextIconPositionEnum.LEFT,
    label: 'Email Address',
    inputClass: 'pl-10',
    containerClass: 'forgot-password-3-field',
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
