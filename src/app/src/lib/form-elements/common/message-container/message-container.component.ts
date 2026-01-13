import { Component, Input } from '@angular/core';


@Component({
  selector: 'lib-message-container',
  standalone: true,
  imports: [],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
})
export class MessageContainerComponent {
  @Input() helperText?: string;
  @Input() validationMessage?: string | null;
  @Input() successMessage?: string;
  @Input() hasErrors = false;
  @Input() isValid = true;
  @Input() touched = false;
}
