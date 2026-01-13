import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { BaseContactFormComponent } from '../base-contact-form/base-contact-form.component';
import { FormBuilder } from '@angular/forms';
import { ContactFormFeatures } from '../models/contact-form-contract';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'lib-contact-form-2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './contact-form-2.component.html',
  styleUrl: './contact-form-2.component.scss',
})
export class ContactForm2Component extends BaseContactFormComponent {
  @Input() override title = 'Contact Us';
  @Input() override submitButtonText = 'Send Message';
  @Input() override isSubmitting = false;
  @Input() override formError = '';
  @Input() override formSuccess = '';
  @Input() features: ContactFormFeatures = {
    showPhoneField: true,
    showSubjectField: true,
    enableFileAttachment: false,
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
