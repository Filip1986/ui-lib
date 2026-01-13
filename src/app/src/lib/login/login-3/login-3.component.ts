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
import { InputTextIconPositionEnum, LibInputTextComponent } from '../../form-elements/input-text';
import { FormLabelStyleEnum } from '../../form-elements/common/form-element-common';

@Component({
  selector: 'lib-login-3',
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
  templateUrl: './login-3.component.html',
  styleUrls: ['./login-3.component.scss'],
})
export class Login3Component extends BaseLoginComponent implements OnInit {
  /**
   * Override loading property from base component
   */
  @Input() override loading = false;

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder, new MessageService());
  }

  /**
   * Customize configurations for Login3 variant
   */
  override ngOnInit(): void {
    super.ngOnInit();

    // Customizations specific to Login3 style
    this.usernameConfig = {
      ...this.usernameConfig,
      // Login3 uses a different label style and icon position
      labelStyle: FormLabelStyleEnum.FLOAT,
      iconPosition: InputTextIconPositionEnum.LEFT,
      // Add styling specific to Login3
      containerClass: 'login-3-input-container',
      inputClass: 'login-3-input',
      // Enhanced validation messages
      errorMessage: 'Please enter a valid username or email address',
    };

    this.passwordConfig = {
      ...this.passwordConfig,
      // Login3 uses a different label style and icon position
      labelStyle: FormLabelStyleEnum.FLOAT,
      iconPosition: InputTextIconPositionEnum.LEFT,
      // Add styling specific to Login3
      containerClass: 'login-3-input-container',
      inputClass: 'login-3-input',
      // Enhanced validation messages
      errorMessage: 'Password is required',
    };
  }
}
