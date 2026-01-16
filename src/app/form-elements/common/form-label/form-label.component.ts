import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLabelPositionEnum } from '../form-element-common';

@Component({
  selector: 'lib-form-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrl: './form-label.component.scss',
})
export class FormLabelComponent {
  @Input() label?: string;
  @Input() for: string | undefined = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() position: FormLabelPositionEnum = FormLabelPositionEnum.ABOVE;
  @Input() labelClass = '';
}
