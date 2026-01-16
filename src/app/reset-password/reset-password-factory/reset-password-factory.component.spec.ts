import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordFactoryComponent } from './reset-password-factory.component';
import { ResetPassword1Component } from '../reset-password-1/reset-password-1.component';
import { ResetPassword2Component } from '../reset-password-2/reset-password-2.component';
import { ResetPassword3Component } from '../reset-password-3/reset-password-3.component';
import { signal } from '@angular/core';

describe('ResetPasswordFactoryComponent', () => {
  let component: ResetPasswordFactoryComponent;
  let fixture: ComponentFixture<ResetPasswordFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordFactoryComponent,
        ResetPassword1Component,
        ResetPassword2Component,
        ResetPassword3Component,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render ResetPassword1Component for variant "1"', () => {
    component.variant = '1';
    fixture.detectChanges();

    const resetPassword1 = fixture.nativeElement.querySelector('lib-reset-password-1');
    expect(resetPassword1).toBeTruthy();
  });

  it('should render ResetPassword2Component for variant "2"', () => {
    component.variant = '2';
    fixture.detectChanges();

    const resetPassword2 = fixture.nativeElement.querySelector('lib-reset-password-2');
    expect(resetPassword2).toBeTruthy();
  });

  it('should render ResetPassword3Component for variant "3"', () => {
    component.variant = '3';
    fixture.detectChanges();

    const resetPassword3 = fixture.nativeElement.querySelector('lib-reset-password-3');
    expect(resetPassword3).toBeTruthy();
  });

  it('should emit submitResetPassword event', () => {
    jest.spyOn(component.submitResetPassword, 'emit');
    const formData = { password: 'ValidPass123!', confirmPassword: 'ValidPass123!' };

    component.onSubmitResetPassword(formData);

    expect(component.submitResetPassword.emit).toHaveBeenCalledWith(formData);
  });

  it('should emit navigateToLoginRequest event', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    component.onNavigateToLogin();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });

  it('should emit navigateToForgotPasswordRequest event', () => {
    jest.spyOn(component.navigateToForgotPasswordRequest, 'emit');

    component.onNavigateToForgotPassword();

    expect(component.navigateToForgotPasswordRequest.emit).toHaveBeenCalled();
  });

  it('should handle resetError input correctly', () => {
    component.resetError = 'An error occurred';
    fixture.detectChanges();

    expect(component.resetError).toBe('An error occurred');
  });

  it('should handle isSubmitting input correctly', () => {
    component.isSubmitting = signal(true);
    fixture.detectChanges();

    expect(component.isSubmitting()).toBe(true);
  });

  it('should handle features input correctly', () => {
    component.features = { showLoginLink: false, showPasswordStrength: true };
    fixture.detectChanges();

    expect(component.features.showLoginLink).toBe(false);
    expect(component.features.showPasswordStrength).toBe(true);
  });
});
