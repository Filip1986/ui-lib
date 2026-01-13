import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseForgotPasswordComponent } from './base-forgot-password.component';
import { InputTextComponent } from '../../input-text';

describe('BaseForgotPasswordComponent', () => {
  let component: BaseForgotPasswordComponent;
  let fixture: ComponentFixture<BaseForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseForgotPasswordComponent, InputTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the forgot password form', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    expect(emailControl).toBeTruthy();
    expect(emailControl?.value).toBe('');
    expect(emailControl?.valid).toBe(false); // Updated
  });

  it('should validate the email field', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBe(false); // Updated
    expect(emailControl?.errors?.['required']).toBe(true); // Updated

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false); // Updated
    expect(emailControl?.errors?.['email']).toBe(true); // Updated

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBe(true); // Updated
  });

  it('should emit submitForgotPassword event on valid form submission', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.forgotPasswordForm.setValue({ email: 'test@example.com' });

    component.onSubmit();

    expect(component.submitForgotPassword.emit).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should mark all fields as touched on invalid form submission', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.forgotPasswordForm.setValue({ email: '' });

    component.onSubmit();

    expect(component.submitForgotPassword.emit).not.toHaveBeenCalled();
    expect(component.forgotPasswordForm.get('email')?.touched).toBe(true); // Updated
  });

  it('should set resetLinkSent to true', () => {
    component.setResetLinkSent();
    expect(component.resetLinkSent()).toBe(true); // Updated
  });

  it('should emit navigateToLoginRequest event', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');

    component.navigateToLogin();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });
});
