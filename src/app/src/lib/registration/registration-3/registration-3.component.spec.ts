import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Registration3Component } from './registration-3.component';
import { By } from '@angular/platform-browser';
import { BaseRegistrationComponent } from '../base-registration/base-registration.component';

describe('Registration3Component', () => {
  let component: Registration3Component;
  let fixture: ComponentFixture<Registration3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Registration3Component], // Add Registration3Component here
    }).compileComponents();

    fixture = TestBed.createComponent(Registration3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Template Rendering', () => {
    it('should render the title', () => {
      const titleElement = fixture.debugElement.query(
        By.css('[data-testid="registration-3-left-title"]'),
      );
      expect(titleElement).not.toBeNull();
      expect(titleElement.nativeElement.textContent).toContain('Create Account');
    });

    it('should render the form', () => {
      const formElement = fixture.debugElement.query(By.css('[data-testid="registration-3-form"]'));
      expect(formElement).not.toBeNull();
    });
  });

  describe('Form Submission', () => {
    it('should disable the submit button when the form is invalid', () => {
      const submitButton = fixture.debugElement.query(
        By.css('[data-testid="registration-3-submit-button"]'),
      );
      expect(submitButton.nativeElement.disabled).toBe(true);
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

  describe('Custom Methods', () => {
    it('should calculate password strength correctly for CustomEvent', () => {
      const customEvent = { detail: { value: 'Strong1!' } } as unknown as CustomEvent;
      const calculateSpy = jest.spyOn(component, 'calculatePasswordStrength');
      component.checkPasswordStrength(customEvent);
      expect(calculateSpy).toHaveBeenCalledWith('Strong1!');
    });

    it('should call super.checkPasswordStrength for standard Event', () => {
      const standardEvent = { target: { value: 'Strong1!' } } as unknown as Event;
      const superSpy = jest.spyOn(BaseRegistrationComponent.prototype, 'checkPasswordStrength');
      component.checkPasswordStrength(standardEvent);
      expect(superSpy).toHaveBeenCalledWith(standardEvent);
    });

    it('should navigate to login when login link is clicked', () => {
      const navigateSpy = jest.spyOn(component, 'navigateToLogin');
      component.navigateToLogin();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
