
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterFormData } from '../models/registration-contract';

@Component({
  selector: 'lib-base-registration',
  standalone: true,
  imports: [],
  templateUrl: './base-registration.component.html',
  styleUrl: './base-registration.component.scss',
})
export class BaseRegistrationComponent {
  @Input() isSubmitting = false;
  @Input() title = 'Create Account';
  @Input() registrationError = '';

  @Output() submitRegistration: EventEmitter<RegisterFormData> =
    new EventEmitter<RegisterFormData>();
  @Output() navigateToLoginRequest: EventEmitter<void> = new EventEmitter<void>();

  registrationForm: FormGroup;
  submitted = false;

  passwordStrength: WritableSignal<number> = signal<number>(0);
  showPassword: WritableSignal<boolean> = signal<boolean>(false);

  constructor(protected fb: FormBuilder) {
    this.registrationForm = this.createRegistrationForm();
  }

  /**
   * Form controls getters for easier access in templates
   */
  get username(): AbstractControl | null {
    return this.registrationForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registrationForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.registrationForm.get('confirmPassword');
  }

  get acceptTerms(): AbstractControl | null {
    return this.registrationForm.get('acceptTerms');
  }

  /**
   * Validates that password and confirm password match
   * @param form Form group to validate
   * @returns Validation error or null if valid
   */
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password !== confirmPassword ? { mismatch: true } : null;
  }

  /**
   * Submits the registration form if valid
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      const formData: RegisterFormData = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        acceptTerms: this.registrationForm.value.acceptTerms,
      };

      this.submitRegistration.emit(formData);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Calculates password strength (0-5)
   * Can be called from input-text component event handler
   * @param event The input event or value to check
   */
  checkPasswordStrength(event: Event | any): void {
    let password = '';

    // Handle different types of events
    if (typeof event === 'string') {
      // If directly passing a string
      password = event;
    } else if (event instanceof Event) {
      // Standard DOM event
      password = (event.target as HTMLInputElement).value;
    } else if (event?.detail?.value) {
      // CustomEvent from input-text component
      password = event.detail.value;
    }

    const strength: number = this.calculatePasswordStrength(password);
    this.passwordStrength.set(strength);
  }

  /**
   * Calculates password strength based on various criteria
   * @param password The password to evaluate
   * @returns A strength score from 0 to 5
   */
  calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  }

  /**
   * Returns a label describing password strength
   * @returns A text label based on the current strength
   */
  getPasswordStrengthLabel(): string {
    const labels: string[] = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[this.passwordStrength()] || 'Unknown';
  }

  /**
   * Returns a color representing password strength
   * @returns A color string based on the current strength
   */
  getPasswordStrengthColor(): string {
    const colors: string[] = ['red', 'orangered', 'orange', 'yellowgreen', 'green', 'darkgreen'];
    return colors[this.passwordStrength()] || 'gray';
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update((value: boolean): boolean => !value);
  }

  /**
   * Marks all form fields as touched to show validation errors
   */
  markAllFieldsAsTouched(): void {
    Object.keys(this.registrationForm.controls).forEach((field: string): void => {
      const control: AbstractControl | null = this.registrationForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Navigates to login page
   */
  navigateToLogin(): void {
    this.navigateToLoginRequest.emit();
  }

  /**
   * Creates the registration form with validation
   * @returns The initialized FormGroup
   */
  protected createRegistrationForm(): FormGroup {
    return this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }
}
