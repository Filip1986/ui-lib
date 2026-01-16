import { Component, Input } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BaseForgotPasswordComponent } from '../base-forgot-password/base-forgot-password.component';
import { ForgotPasswordFeatures } from '../models/forgot-password-contract';
import {
  InputTextIconPositionEnum,
  LibInputTextComponent,
  InputTextConfig,
} from '../../form-elements/input-text';

@Component({
  selector: 'lib-forgot-password-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    ToastModule,
    LibInputTextComponent
],
  providers: [MessageService],
  templateUrl: './forgot-password-1.component.html',
  styleUrl: './forgot-password-1.component.scss',
})
export class ForgotPassword1Component extends BaseForgotPasswordComponent {
  @Input() override title = 'Forgot Password';
  @Input() override isSubmitting = false;
  @Input() override forgotPasswordError = '';
  @Input() features: ForgotPasswordFeatures = {
    showLoginLink: true,
  };

  emailConfig: InputTextConfig = {
    ...this.baseEmailConfig,
    id: 'forgot-password-1-email',
    icon: 'pi pi-envelope',
    iconPosition: InputTextIconPositionEnum.LEFT,
    containerClass: 'forgot-password-1-field',
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
