import { Component, EventEmitter, Input, Output } from '@angular/core';


import {
  ContactFormData,
  ContactFormFeatures,
  ContactFormVariant,
} from '../models/contact-form-contract';
import { ContactForm1Component } from '../contact-form-1/contact-form-1.component';
import { ContactForm2Component } from '../contact-form-2/contact-form-2.component';
import { ContactForm3Component } from '../contact-form-3/contact-form-3.component';

@Component({
  selector: 'lib-contact-form-factory',
  standalone: true,
  imports: [ContactForm1Component, ContactForm2Component, ContactForm3Component],
  templateUrl: './contact-form-factory.component.html',
  styleUrl: './contact-form-factory.component.scss',
})
export class ContactFormFactoryComponent {
  @Input() title = 'Contact Us';
  @Input() submitButtonText = 'Send Message';
  @Input() variant: ContactFormVariant = '1';
  @Input() isSubmitting = false;
  @Input() formError = '';
  @Input() formSuccess = '';
  @Input() features: ContactFormFeatures = {
    showPhoneField: true,
    showSubjectField: true,
    enableFileAttachment: false,
  };

  @Output() submitContactForm: EventEmitter<ContactFormData> = new EventEmitter<ContactFormData>();

  /**
   * Handles the contact form submission from the variant component
   * @param data The form data to be emitted
   */
  onSubmitContactForm(data: ContactFormData): void {
    this.submitContactForm.emit(data);
  }
}
