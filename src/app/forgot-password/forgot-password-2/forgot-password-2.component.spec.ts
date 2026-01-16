import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPassword2Component } from './forgot-password-2.component';

describe('ForgotPassword2Component', () => {
  let component: ForgotPassword2Component;
  let fixture: ComponentFixture<ForgotPassword2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword2Component, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Reset Your Password';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '[data-testid="forgot-password-2-title"]',
    );
    expect(titleElement.textContent).toContain('Reset Your Password');
  });

  it('should configure the email field correctly', () => {
    component.emailConfig = {
      id: 'forgot-password-2-email',
      icon: 'pi pi-envelope',
      iconPosition: 'left',
      required: false,
      disabled: false,
      autofocus: false,
    };
    fixture.detectChanges();

    expect(component.emailConfig.id).toBe('forgot-password-2-email');
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
      '[data-testid="forgot-password-2-error"]',
    );
    expect(errorElement.textContent).toContain('Invalid email address');
  });

  it('should emit navigateToLoginRequest event on login button click', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    component.navigateToLogin();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });
});
