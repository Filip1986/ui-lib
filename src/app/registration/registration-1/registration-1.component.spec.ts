import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Registration1Component } from './registration-1.component';
import { InputTextComponent } from '../../input-text';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { By } from '@angular/platform-browser';

describe('Registration1Component', () => {
  let component: Registration1Component;
  let fixture: ComponentFixture<Registration1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputTextComponent,
        ButtonModule,
        CheckboxModule,
        CardModule,
        Registration1Component,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Registration1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Configurations', () => {
    it('should have correct username configuration', () => {
      expect(component.usernameConfig).toEqual({
        id: 'username',
        label: 'Username',
        required: true,
        autofocus: true,
        disabled: false,
        minLength: 3,
        maxLength: 30,
        placeholder: 'Enter your username (3-30 characters)',
        helperText: 'Choose a username between 3 and 30 characters',
        errorMessage: '', // Include the errorMessage property
      });
    });

    it('should have correct email configuration', () => {
      expect(component.emailConfig).toEqual({
        id: 'email',
        label: 'Email',
        required: true,
        autofocus: false,
        disabled: false,
        type: 'email',
        placeholder: 'Enter your email address',
        helperText: 'We will send a verification link to this address',
        errorMessage: '', // Include the errorMessage property
      });
    });
  });

  describe('Form Submission', () => {
    it('should disable the submit button when isSubmitting is true', () => {
      component.isSubmitting = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
      expect(button.nativeElement.disabled).toBe(true);
    });

    it('should emit submitRegistration on valid form submission', () => {
      const submitSpy = jest.spyOn(component.submitRegistration, 'emit');
      component.registrationForm.setValue({
        username: 'validUsername',
        email: 'test@example.com',
        password: 'validPassword',
        confirmPassword: 'validPassword',
        acceptTerms: true,
      });

      component.onSubmit();

      expect(submitSpy).toHaveBeenCalledWith({
        username: 'validUsername',
        email: 'test@example.com',
        password: 'validPassword',
        acceptTerms: true,
      });
    });
  });

  describe('Password Strength', () => {
    it('should calculate password strength on input', () => {
      const passwordInput = fixture.debugElement.query(By.css('[data-testid="password-input"]'));
      passwordInput.triggerEventHandler('input', { detail: { value: 'Strong1!' } });

      expect(component.passwordStrength()).toBe(5);
    });
  });

  describe('Login Navigation', () => {
    it('should call navigateToLogin when login link is clicked', () => {
      const navigateSpy = jest.spyOn(component, 'navigateToLogin');
      const loginLink = fixture.debugElement.query(By.css('[data-testid="login-link"]'));
      loginLink.triggerEventHandler('click', null);

      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
