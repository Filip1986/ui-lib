import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-1.component.html',
  styleUrl: './button-1.component.scss',
})
export class Button1Component {
  /**
   * The button variant/color
   * Options: 'blue', 'red', 'green', 'yellow', 'primary', 'secondary', 'flat', 'outline'
   */
  @Input() variant:
    | 'blue'
    | 'red'
    | 'green'
    | 'yellow'
    | 'primary'
    | 'secondary'
    | 'flat'
    | 'outline' = 'blue';

  /**
   * Specifies if button has animation effect
   */
  @Input() animate = true;

  /**
   * Button size
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether button has rounded corners
   */
  @Input() rounded = false;

  /**
   * Button is disabled
   */
  @Input() disabled = false;

  /**
   * Type of the button (submit, button, reset)
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Icon to display (PrimeNG icon name without the pi- prefix)
   */
  @Input() icon = '';

  /**
   * Position of the icon
   */
  @Input() iconPosition: 'left' | 'right' | 'none' = 'none';

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
    }
  }
}
