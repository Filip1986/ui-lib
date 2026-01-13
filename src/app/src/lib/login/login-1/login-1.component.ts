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

@Component({
  selector: 'lib-login-1',
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
  templateUrl: './login-1.component.html',
  styleUrls: ['./login-1.component.scss'],
})
export class Login1Component extends BaseLoginComponent implements OnInit {
  /**
   * Override loading property from base component
   */
  @Input() override loading = false;

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder, new MessageService());
  }

  /**
   * Customize username configuration for Login1 variant
   */
  override ngOnInit(): void {
    super.ngOnInit();

    this.usernameConfig = {
      ...this.usernameConfig,
      errorMessage: 'Please enter a valid username or email',
    };

    this.passwordConfig = {
      ...this.passwordConfig,
      errorMessage: 'Password is required',
    };
  }
}
