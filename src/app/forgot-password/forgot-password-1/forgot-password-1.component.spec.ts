import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassword1Component } from './forgot-password-1.component';

describe('ForgotPassword1Component', () => {
  let component: ForgotPassword1Component;
  let fixture: ComponentFixture<ForgotPassword1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Reset Your Password';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Reset Your Password');
  });

  it('should configure the email field correctly', () => {
    expect(component.emailConfig.id).toBe('forgot-password-1-email');
    expect(component.emailConfig.icon).toBe('pi pi-envelope');
    expect(component.emailConfig.iconPosition).toBe('left');
  });

  it('should configure the email field correctly', () => {
    expect(component.emailConfig.id).toBe('forgot-password-1-email');
    expect(component.emailConfig.icon).toBe('pi pi-envelope');
    expect(component.emailConfig.iconPosition).toBe('left');
  });

  it('should mark email field as touched on invalid form submission', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.forgotPasswordForm.setValue({ email: '' });

    component.onSubmit();

    expect(component.submitForgotPassword.emit).not.toHaveBeenCalled();
    expect(component.forgotPasswordForm.get('email')?.touched).toBe(true);
  });

  it('should emit navigateToLoginRequest event on login button click', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    component.navigateToLogin();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });
});
