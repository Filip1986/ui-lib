import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassword3Component } from './reset-password-3.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ResetPassword3Component', () => {
  let component: ResetPassword3Component;
  let fixture: ComponentFixture<ResetPassword3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ResetPassword3Component],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword3Component);
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
    component.features = {
      showLoginLink: false,
      showPasswordStrength: false,
    };
    fixture.detectChanges();

    expect(component.features.showLoginLink).toBe(false);
    expect(component.features.showPasswordStrength).toBe(false);
  });

  it('should display password strength indicator when enabled', () => {
    component.features.showPasswordStrength = true;
    component.resetPasswordForm.get('password')?.setValue('StrongPass123#!');
    fixture.detectChanges();

    const strengthIndicator = fixture.nativeElement.querySelector(
      '[data-testid="reset-password-3-password-strength"]',
    );
    expect(strengthIndicator).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.resetPasswordForm.setValue({
      password: '',
      confirmPassword: '',
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="reset-password-3-submit-button"]',
    );
    expect(submitButton.disabled).toBe(true);
  });

  it('should show error message when resetError is set', () => {
    component.resetError = 'An error occurred';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector(
      '[data-testid="reset-password-3-error"]',
    );
    expect(errorElement.textContent).toContain('An error occurred');
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
});
