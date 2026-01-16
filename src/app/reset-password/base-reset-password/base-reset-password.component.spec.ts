import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseResetPasswordComponent } from './base-reset-password.component';

describe('BaseResetPasswordComponent', () => {
  let component: BaseResetPasswordComponent;
  let fixture: ComponentFixture<BaseResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseResetPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitResetPassword event on valid form submission', () => {
    jest.spyOn(component.submitResetPassword, 'emit');
    component.resetPasswordForm.setValue({
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!',
    });

    component.onSubmit();

    expect(component.submitResetPassword.emit).toHaveBeenCalledWith({
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!',
    });
  });

  it('should mark all fields as touched on invalid form submission', () => {
    jest.spyOn(component.submitResetPassword, 'emit');
    component.resetPasswordForm.setValue({
      password: '',
      confirmPassword: '',
    });

    component.onSubmit();

    expect(component.submitResetPassword.emit).not.toHaveBeenCalled();
    expect(component.resetPasswordForm.get('password')?.touched).toBe(true);
    expect(component.resetPasswordForm.get('confirmPassword')?.touched).toBe(true);
  });

  it('should emit navigateToLoginRequest event', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    component.navigateToLogin();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });

  it('should emit navigateToForgotPasswordRequest event', () => {
    jest.spyOn(component.navigateToForgotPasswordRequest, 'emit');

    component.navigateToForgotPassword();

    expect(component.navigateToForgotPasswordRequest.emit).toHaveBeenCalled();
  });

  it('should calculate password strength correctly', () => {
    const strength = component.calculatePasswordStrength('StrongPass123!');
    expect(strength).toBe(5); // Very Strong
  });

  it('should toggle password visibility', () => {
    const initialVisibility = component.showPassword();
    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(!initialVisibility);
  });

  it('should set resetSuccessful to true', () => {
    component.setResetSuccessful();
    expect(component.resetSuccessful()).toBe(true);
  });

  it('should set tokenError to true', () => {
    component.setTokenError();
    expect(component.tokenError()).toBe(true);
  });

  it('should validate password and confirmPassword mismatch', () => {
    component.resetPasswordForm.setValue({
      password: 'Password123',
      confirmPassword: 'DifferentPassword123',
    });

    const errors = component.resetPasswordForm.errors;
    expect(errors).toEqual({ mismatch: true });
  });
});
