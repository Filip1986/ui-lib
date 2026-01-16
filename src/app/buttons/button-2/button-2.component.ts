import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-2.component.html',
  styleUrl: './button-2.component.scss',
})
export class Button2Component {
  /**
   * The icon to display (PrimeNG icon name without the pi- prefix)
   */
  @Input() icon = '';

  /**
   * Button text content (used instead of ng-content for better positioning control)
   */
  @Input() text = '';

  /**
   * Position of the icon and content
   */
  @Input() position: 'left' | 'right' = 'left';

  /**
   * Button style variant
   */
  @Input() variant: 'default' | 'arrow' | 'gear' | 'slant' = 'default';

  /**
   * Button color variant
   */
  @Input() color: 'default' | 'blue' | 'red' | 'green' = 'default';

  /**
   * Button size
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button is disabled
   */
  @Input() disabled = false;

  /**
   * Type of the button (submit, button, reset)
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Href attribute for anchor tag
   */
  @Input() href?: string;

  /**
   * Click event emitter
   */
  @Output() clickEvent = new EventEmitter<Event>();

  /**
   * Handles the button click event
   */
  handleClick(event: Event): void {
    if (!this.disabled) {
      this.clickEvent.emit(event);

      // If button has href but we want to handle the click in Angular,
      // we can prevent default navigation
      if (this.href) {
        event.preventDefault();
      }
    }
  }
}
