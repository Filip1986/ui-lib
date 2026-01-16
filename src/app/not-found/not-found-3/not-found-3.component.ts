import { Component, Input } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormBuilder } from '@angular/forms';

import { BaseNotFoundComponent } from '../base-not-found/base-not-found.component';
import { NotFoundFeatures } from '../models/not-found-contract';

@Component({
  selector: 'lib-not-found-3',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, RippleModule],
  templateUrl: './not-found-3.component.html',
  styleUrl: './not-found-3.component.scss',
})
export class NotFound3Component extends BaseNotFoundComponent {
  @Input() override title = '404 - Page Not Found';
  @Input() override message = 'The page you are looking for does not exist or has been moved.';
  @Input() override features: NotFoundFeatures = {
    showHomeLink: true,
    showBackButton: true,
    showSearchBox: false,
  };

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }
}
