import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassword2Component } from './reset-password-2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ResetPasswordFeatures } from '../models/reset-password-contract';

describe('ResetPassword2Component', () => {
  let component: ResetPassword2Component;
  let fixture: ComponentFixture<ResetPassword2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ResetPassword2Component],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title as "Reset Password"', () => {
    expect(component.title).toBe('Reset Password');
  });

  it('should handle features input correctly', () => {
    const features: ResetPasswordFeatures = {
      showLoginLink: false,
      showPasswordStrength: false,
    };
    component.features = features;
    fixture.detectChanges();

    expect(component.features.showLoginLink).toBe(false);
    expect(component.features.showPasswordStrength).toBe(false);
  });

  it('should update isSubmitting signal correctly', () => {
    component.isSubmitting.set(true);
    expect(component.isSubmitting()).toBe(true);

    component.isSubmitting.set(false);
    expect(component.isSubmitting()).toBe(false);
  });

  it('should display resetError when set', () => {
    component.resetError = 'An error occurred';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector(
      '[data-testid="reset-password-2-error"]',
    );
    expect(errorElement.textContent).toContain('An error occurred');
  });

  it('should inherit form submission behavior from BaseResetPasswordComponent', () => {
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

  it('should validate password and confirmPassword mismatch', () => {
    component.resetPasswordForm.setValue({
      password: 'Password123',
      confirmPassword: 'DifferentPassword123',
    });

    const errors = component.resetPasswordForm.errors;
    expect(errors).toEqual({ mismatch: true });
  });

  it('should toggle password visibility', () => {
    const initialVisibility = component.showPassword();
    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(!initialVisibility);
  });

  it('should disable submit button when form is invalid', () => {
    component.resetPasswordForm.setValue({
      password: '',
      confirmPassword: '',
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="reset-password-2-submit-button"]',
    );
    expect(submitButton.disabled).toBe(true);
  });
});
