import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRegistrationComponent } from './base-registration.component';
import { RegisterFormData } from '../models/registration-contract';

describe('BaseRegistrationComponent', (): void => {
  let component: BaseRegistrationComponent;
  let fixture: ComponentFixture<BaseRegistrationComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', (): void => {
    it('should initialize the form with default values', (): void => {
      expect(component.registrationForm).toBeTruthy();
      expect(component.username?.value).toBe('');
      expect(component.email?.value).toBe('');
      expect(component.password?.value).toBe('');
      expect(component.confirmPassword?.value).toBe('');
      expect(component.acceptTerms?.value).toBe(false);
    });

    it('should validate form controls', (): void => {
      const usernameControl = component.username;
      const emailControl = component.email;
      const passwordControl = component.password;
      const confirmPasswordControl = component.confirmPassword;
      const acceptTermsControl = component.acceptTerms;

      usernameControl?.setValue('');
      expect(usernameControl?.valid).toBeFalsy();
      usernameControl?.setValue('us');
      expect(usernameControl?.valid).toBeFalsy();
      usernameControl?.setValue('validUsername');
      expect(usernameControl?.valid).toBeTruthy();

      emailControl?.setValue('');
      expect(emailControl?.valid).toBeFalsy();
      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBeFalsy();
      emailControl?.setValue('test@example.com');
      expect(emailControl?.valid).toBeTruthy();

      passwordControl?.setValue('');
      expect(passwordControl?.valid).toBeFalsy();
      passwordControl?.setValue('12345');
      expect(passwordControl?.valid).toBeFalsy();
      passwordControl?.setValue('validPassword');
      expect(passwordControl?.valid).toBeTruthy();

      confirmPasswordControl?.setValue('differentPassword');
      expect(component.registrationForm.errors?.['mismatch']).toBeTruthy();
      confirmPasswordControl?.setValue('validPassword');
      expect(component.registrationForm.errors?.['mismatch']).toBeFalsy();

      acceptTermsControl?.setValue(false);
      expect(acceptTermsControl?.valid).toBeFalsy();
      acceptTermsControl?.setValue(true);
      expect(acceptTermsControl?.valid).toBeTruthy();
    });
  });

  describe('Form Submission', (): void => {
    it('should not emit submitRegistration if the form is invalid', (): void => {
      const submitSpy = jest.spyOn(component.submitRegistration, 'emit');
      component.registrationForm.setValue({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });

      component.onSubmit();

      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('should emit submitRegistration if the form is valid', (): void => {
      const submitSpy = jest.spyOn(component.submitRegistration, 'emit');
      const formData: RegisterFormData = {
        username: 'validUsername',
        email: 'test@example.com',
        password: 'validPassword',
        acceptTerms: true,
      };

      component.registrationForm.setValue({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        acceptTerms: formData.acceptTerms,
      });

      component.onSubmit();

      expect(submitSpy).toHaveBeenCalledWith(formData);
    });
  });

  describe('Event Emitters', (): void => {
    it('should emit navigateToLoginRequest', (): void => {
      const navigateSpy = jest.spyOn(component.navigateToLoginRequest, 'emit');
      component.navigateToLogin();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('Utility Methods', (): void => {
    it('should calculate password strength', (): void => {
      expect(component.calculatePasswordStrength('')).toBe(0);
      expect(component.calculatePasswordStrength('weak')).toBe(1);
      expect(component.calculatePasswordStrength('Weak1')).toBe(3);
      expect(component.calculatePasswordStrength('Strong1!')).toBe(5);
    });

    it('should toggle password visibility', (): void => {
      const initialVisibility = component.showPassword();
      component.togglePasswordVisibility();
      expect(component.showPassword()).toBe(!initialVisibility);
    });

    it('should mark all fields as touched', (): void => {
      const controls = component.registrationForm.controls;

      // Spy on markAsTouched for each control
      Object.values(controls).forEach((control) => {
        jest.spyOn(control, 'markAsTouched');
      });

      component.markAllFieldsAsTouched();

      // Verify that markAsTouched was called for each control
      Object.values(controls).forEach((control) => {
        expect(control.markAsTouched).toHaveBeenCalled();
      });
    });
  });
});
