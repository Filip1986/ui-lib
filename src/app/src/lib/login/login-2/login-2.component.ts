import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { BaseLoginComponent } from '../base-login/base-login.component';
import { LibInputTextComponent } from '../../form-elements/input-text';
import { FormLabelStyleEnum } from '../../form-elements/common/form-element-common';

@Component({
  selector: 'lib-login-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LibInputTextComponent,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    RippleModule
],
  providers: [MessageService],
  templateUrl: './login-2.component.html',
  styleUrls: ['./login-2.component.scss'],
})
export class Login2Component extends BaseLoginComponent implements OnInit {
  /**
   * Override loading property from base component
   */
  @Input() override loading = false;

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder, new MessageService());
  }

  /**
   * Customize configurations for Login2 variant
   */
  override ngOnInit(): void {
    super.ngOnInit();

    // Customizations specific to Login2 style
    this.usernameConfig = {
      ...this.usernameConfig,
      // Remove label since Login2 uses placeholder-only style
      label: undefined,
      labelStyle: FormLabelStyleEnum.DEFAULT,
      // Adjust styling for Login2's minimalist look
      containerClass: 'login-2-input-container',
      inputClass: 'login-2-input',
      // Different error handling approach
      errorMessage: 'Username is required',
    };

    this.passwordConfig = {
      ...this.passwordConfig,
      // Similar customizations for password field
      label: undefined,
      labelStyle: FormLabelStyleEnum.DEFAULT,
      containerClass: 'login-2-input-container',
      inputClass: 'login-2-input',
      errorMessage: 'Password is required',
    };
  }
}
