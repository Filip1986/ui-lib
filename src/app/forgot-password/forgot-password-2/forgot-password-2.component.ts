import { Component, Input } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BaseForgotPasswordComponent } from '../base-forgot-password/base-forgot-password.component';
import { ForgotPasswordFeatures } from '../models/forgot-password-contract';
import { LibInputTextComponent, InputTextConfig } from '../../form-elements/input-text';
import { FormLabelStyleEnum } from '../../form-elements/common/form-element-common';

@Component({
  selector: 'lib-forgot-password-2',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, ToastModule, LibInputTextComponent],
  providers: [MessageService],
  templateUrl: './forgot-password-2.component.html',
  styleUrl: './forgot-password-2.component.scss',
})
export class ForgotPassword2Component extends BaseForgotPasswordComponent {
  @Input() override title = 'Forgot Password';
  @Input() override isSubmitting = false;
  @Input() override forgotPasswordError = '';
  @Input() features: ForgotPasswordFeatures = {
    showLoginLink: true,
  };

  emailConfig: InputTextConfig = {
    ...this.baseEmailConfig,
    id: 'forgot-password-2-email',
    labelStyle: FormLabelStyleEnum.FLOAT,
    inputClass: 'registration-2-input',
    containerClass: 'registration-2-field',
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
