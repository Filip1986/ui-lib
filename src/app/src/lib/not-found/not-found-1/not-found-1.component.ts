import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder } from '@angular/forms';

import { BaseNotFoundComponent } from '../base-not-found/base-not-found.component';
import { NotFoundFeatures } from '../models/not-found-contract';

/**
 * Standard card-based 404 page implementation (variant 1)
 *
 * This component features a card-based design with:
 * - Prominent 404 message
 * - Optional search box
 * - Navigation buttons for home and back
 */
@Component({
  selector: 'lib-not-found-1',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './not-found-1.component.html',
  styleUrl: './not-found-1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound1Component extends BaseNotFoundComponent {
  /** Apply a host class for easier styling */
  @HostBinding('class') hostClass = 'not-found-variant-1';

  /** The title displayed on the 404 page */
  @Input() override title = '404 - Page Not Found';

  /** The descriptive message displayed on the 404 page */
  @Input() override message = 'The page you are looking for does not exist or has been moved.';

  /** Features configuration */
  @Input() override features: NotFoundFeatures = {
    showHomeLink: true,
    showBackButton: true,
    showSearchBox: false,
  };

  /**
   * Animation state for the 404 text
   * This can be used for subtle animations using Angular animations
   */
  animationState = 'idle';

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }

  /**
   * Triggers the animation for the 404 text
   * This can be called on hover or other interaction events
   */
  triggerAnimation(): void {
    this.animationState = 'active';

    // Reset to idle state after animation completes
    setTimeout(() => {
      this.animationState = 'idle';
    }, 1000);
  }

  /**
   * Get ARIA attributes for different elements
   * @returns Object with ARIA attributes
   */
  getAriaAttributes(): { [key: string]: string } {
    return {
      container: 'main',
      role: 'region',
      label: 'Page not found content',
    };
  }

  /**
   * Handle keyboard navigation for better accessibility
   * @param event - Keyboard event
   */
  handleKeyboardNavigation(event: KeyboardEvent): void {
    // Handle keyboard navigation between buttons
    if (event.key === 'Tab') {
      // Handle tab navigation logic
    } else if (event.key === 'Enter') {
      // Handle enter key for current focused element
    }
  }

  /**
   * Handle search form errors and display appropriate messages
   * @returns A error message if validation fails, empty string otherwise
   */
  getSearchErrorMessage(): string {
    if (!this.searchQuery) return '';

    if (this.searchQuery.hasError('required')) {
      return 'Please enter a search term';
    }

    if (this.searchQuery.hasError('minlength')) {
      return 'Search term must be at least 2 characters';
    }

    if (this.searchQuery.hasError('maxlength')) {
      return 'Search term cannot exceed 100 characters';
    }

    return '';
  }
}
