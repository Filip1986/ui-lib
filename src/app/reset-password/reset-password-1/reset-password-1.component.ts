import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { BaseResetPasswordComponent } from '../base-reset-password/base-reset-password.component';
import { FormBuilder } from '@angular/forms';
import { ResetPasswordFeatures } from '../models/reset-password-contract';

@Component({
  selector: 'lib-reset-password-1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RouterModule,
  ],
  providers: [MessageService],
  templateUrl: './reset-password-1.component.html',
  styleUrl: './reset-password-1.component.scss',
})
export class ResetPassword1Component extends BaseResetPasswordComponent {
  @Input() override title = 'Reset Password';
  @Input() override isSubmitting: WritableSignal<boolean> = signal(false);
  @Input() override resetError = '';
  @Input() features: ResetPasswordFeatures = {
    showLoginLink: true,
    showPasswordStrength: true,
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
