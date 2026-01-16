
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactFormData } from '../models/contact-form-contract';

@Component({
  selector: 'lib-base-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '', // Base component doesn't need a template
})
export class BaseContactFormComponent {
  @Input() title = 'Contact Us';
  @Input() submitButtonText = 'Send Message';
  @Input() isSubmitting = false;
  @Input() formError = '';
  @Input() formSuccess = '';

  /**
   * Emits form data when the form is submitted
   */
  @Output() submitContactForm: EventEmitter<ContactFormData> = new EventEmitter<ContactFormData>();

  contactForm: FormGroup;
  submitted = false;

  constructor(protected fb: FormBuilder) {
    this.contactForm = this.createContactForm();
  }

  /**
   * Getters for form controls to simplify access in templates
   */
  get name(): AbstractControl | null {
    return this.contactForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get phone(): AbstractControl | null {
    return this.contactForm.get('phone');
  }

  get subject(): AbstractControl | null {
    return this.contactForm.get('subject');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData: ContactFormData = {
        name: this.name?.value,
        email: this.email?.value,
        phone: this.phone?.value,
        subject: this.subject?.value,
        message: this.message?.value,
      };

      this.submitContactForm.emit(formData);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Validates a phone number pattern
   * @param control The form control to validate
   * @returns Validation result object or null if valid
   */
  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null; // Phone is optional
    }

    // Basic phone validation - can be customized based on requirements
    const isValid = /^\+?[\d\s()-]{7,20}$/.test(control.value);
    return isValid ? null : { invalidPhone: true };
  }

  /**
   * Marks all form fields as touched to trigger validation display
   */
  markAllFieldsAsTouched(): void {
    Object.keys(this.contactForm.controls).forEach((field: string): void => {
      const control: AbstractControl | null = this.contactForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Creates the contact form with appropriate validators
   * @returns A new FormGroup instance with validators
   */
  protected createContactForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [this.phoneValidator.bind(this)]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }
}
