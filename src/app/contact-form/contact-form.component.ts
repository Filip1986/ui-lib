import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ContactFormFactoryComponent } from './contact-form-factory/contact-form-factory.component';
import {
  ContactFormData,
  ContactFormFeatures,
  ContactFormVariant,
} from './models/contact-form-contract';

@Component({
  selector: 'lib-contact-form',
  standalone: true,
  imports: [ToastModule, ContactFormFactoryComponent],
  providers: [MessageService],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() title = 'Contact Us';
  @Input() submitButtonText = 'Send Message';
  @Input() variant: ContactFormVariant = '1';
  @Input() isSubmitting = false;
  @Input() formError = '';
  @Input() formSuccess = '';

  /**
   * Configure which features are enabled in the contact form
   */
  @Input() features: ContactFormFeatures = {
    showPhoneField: true,
    showSubjectField: true,
    enableFileAttachment: false,
  };

  /**
   * Emits the form data when the form is submitted
   */
  @Output() submitContactForm: EventEmitter<ContactFormData> = new EventEmitter<ContactFormData>();

  constructor(private messageService: MessageService) {}

  /**
   * Handles the contact form submission
   * @param data The form data
   */
  onSubmitContactForm(data: ContactFormData): void {
    this.submitContactForm.emit(data);
  }

  /**
   * Shows a success message
   * @param message The message to show
   */
  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  /**
   * Shows an error message
   * @param message The message to show
   */
  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
