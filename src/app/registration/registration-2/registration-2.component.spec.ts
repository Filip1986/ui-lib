import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Registration2Component } from './registration-2.component';
import { InputTextComponent } from '../../input-text';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { By } from '@angular/platform-browser';

describe('Registration2Component', () => {
  let component: Registration2Component;
  let fixture: ComponentFixture<Registration2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputTextComponent,
        ButtonModule,
        CheckboxModule,
        CardModule,
        Registration2Component,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Registration2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Configurations', () => {
    it('should have correct username configuration', () => {
      expect(component.usernameConfig).toEqual({
        id: 'registration-2-username',
        label: 'Username',
        required: true,
        autofocus: true,
        disabled: false,
        minLength: 3,
        maxLength: 30,
        placeholder: 'Username (3-30 characters)',
        helperText: 'Choose a unique username',
        inputClass: 'registration-2-input',
        containerClass: 'registration-2-field',
        errorMessage: '',
      });
    });

    it('should have correct email configuration', () => {
      expect(component.emailConfig).toEqual({
        id: 'registration-2-email',
        label: 'Email address',
        required: true,
        autofocus: false,
        disabled: false,
        type: 'email',
        placeholder: 'Email address',
        helperText: 'We will send a verification link',
        inputClass: 'registration-2-input',
        containerClass: 'registration-2-field',
        errorMessage: '',
      });
    });
  });

  describe('Form Submission', () => {
    it('should disable the submit button when isSubmitting is true', () => {
      component.isSubmitting = true; // Set isSubmitting to true
      fixture.detectChanges(); // Trigger change detection
      const button = fixture.debugElement.query(
        By.css('[data-testid="registration-2-submit-button"]'),
      );
      expect(button).not.toBeNull(); // Ensure the button exists
      expect(button?.nativeElement.disabled).toBe(true); // Check if the button is disabled
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
    it('should disable the submit button when isSubmitting is true', () => {
      component.isSubmitting = true; // Ensure the button is rendered
      fixture.detectChanges();
      const button = fixture.debugElement.query(
        By.css('[data-testid="registration-2-submit-button"]'),
      );
      expect(button?.nativeElement.disabled).toBe(true); // Use optional chaining to avoid null errors
    });
  });

  describe('Login Navigation', () => {
    it('should call navigateToLogin when login link is clicked', () => {
      const navigateSpy = jest.spyOn(component, 'navigateToLogin');
      const loginLink = fixture.debugElement.query(
        By.css('[data-testid="registration-2-login-link"]'),
      );
      loginLink.triggerEventHandler('click', null);

      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
