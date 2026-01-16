import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPassword3Component } from './forgot-password-3.component';

describe('ForgotPassword3Component', () => {
  let component: ForgotPassword3Component;
  let fixture: ComponentFixture<ForgotPassword3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword3Component, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and subtitle', () => {
    component.title = 'Password Recovery';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-3-right-title"]',
    );
    const subtitleElement = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-3-right-subtitle"]',
    );

    expect(titleElement.textContent).toContain('Password Recovery');
    expect(subtitleElement.textContent).toContain('Enter your email to receive a reset link');
  });

  it('should configure the email field correctly', () => {
    expect(component.emailConfig.id).toBe('forgot-password-3-email');
    expect(component.emailConfig.icon).toBe('pi pi-envelope');
    expect(component.emailConfig.iconPosition).toBe('left');
  });

  it('should emit submitForgotPassword event on valid form submission', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.forgotPasswordForm.setValue({ email: 'test@example.com' });

    component.onSubmit();

    expect(component.submitForgotPassword.emit).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should mark email field as touched on invalid form submission', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.forgotPasswordForm.setValue({ email: '' });

    component.onSubmit();

    expect(component.submitForgotPassword.emit).not.toHaveBeenCalled();
    expect(component.forgotPasswordForm.get('email')?.touched).toBe(true);
  });

  it('should display error message when forgotPasswordError is set', () => {
    component.forgotPasswordError = 'Invalid email address';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-3-error"]',
    );
    expect(errorElement.textContent).toContain('Invalid email address');
  });

  it('should emit navigateToLoginRequest event on login link click', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    const loginLink = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-3-login-link"]',
    );
    loginLink.click();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });

  it('should display success message when resetLinkSent is true', () => {
    jest.spyOn(component, 'resetLinkSent').mockReturnValue(true);
    fixture.detectChanges();

    const successElement = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-3-success"]',
    );
    expect(successElement).toBeTruthy();
  });
});
