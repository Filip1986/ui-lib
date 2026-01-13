import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NotFoundFactoryComponent } from './not-found-factory/not-found-factory.component';
import { NotFoundFeatures, NotFoundVariant } from './models/not-found-contract';

/**
 * NotFoundComponent - A customizable 404 page component with multiple variants
 *
 * This component provides a user-friendly 404 page with options for:
 * - Different visual styles (variants)
 * - Search functionality
 * - Navigation options (home, back)
 * - Customizable messaging
 *
 * @example
 * ```html
 * <lib-not-found
 *   [title]="'Oops! Page Not Found'"
 *   [message]="'The page you requested could not be found.'"
 *   [variant]="'3'"
 *   [features]="{ showSearchBox: true, showHomeLink: true }"
 *   (goHome)="navigateToHome()"
 *   (searchEvent)="performSearch($event)">
 * </lib-not-found>
 * ```
 */
@Component({
  selector: 'lib-not-found',
  standalone: true,
  imports: [NotFoundFactoryComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimize change detection
})
export class NotFoundComponent implements OnInit {
  /**
   * The title displayed on the 404 page
   * @default '404 - Page Not Found'
   */
  @Input() title = '404 - Page Not Found';

  /**
   * The descriptive message displayed on the 404 page
   * @default 'The page you are looking for does not exist or has been moved.'
   */
  @Input() message = 'The page you are looking for does not exist or has been moved.';

  /**
   * The visual style variant to use
   * - '1': Standard card design
   * - '2': Minimal design with animated elements
   * - '3': Split panel design with illustration
   * @default '1'
   */
  @Input() variant: NotFoundVariant = '1';

  /**
   * Configuration features to enable/disable component functionality
   */
  @Input() features: NotFoundFeatures = {
    showHomeLink: true,
    showBackButton: true,
    showSearchBox: false,
  };

  /**
   * Emitted when the user clicks the "Go Home" button
   * The consumer should handle navigation to the home page
   */
  @Output() goHome: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emitted when the user clicks the "Go Back" button
   * The consumer should handle navigation back
   */
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emitted when the user performs a search
   * @param query - The search query string entered by the user
   */
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Initialize component
   */
  ngOnInit(): void {
    // Log component initialization for debugging
    console.debug('NotFoundComponent initialized with variant:', this.variant);

    // Validate inputs
    this.validateInputs();
  }

  /**
   * Handle the "Go Home" button click
   * @param event - The mouse event
   */
  onGoHome(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.goHome.emit();
  }

  /**
   * Handle the "Go Back" button click
   * @param event - The mouse event
   */
  onGoBack(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.goBack.emit();
  }

  /**
   * Handle the search form submission
   * @param event
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input?.value?.trim();

    if (query && query.length > 0) {
      this.searchEvent.emit(query);
    } else {
      console.warn('Empty search query submitted');
    }
  }

  /**
   * Validates the component inputs to ensure they meet requirements
   * @private
   */
  private validateInputs(): void {
    // Validate variant
    const validVariants: NotFoundVariant[] = ['1', '2', '3'];
    if (!validVariants.includes(this.variant)) {
      console.warn(
        `Invalid variant "${this.variant}" provided to NotFoundComponent. Falling back to default variant "1".`,
      );
      this.variant = '1';
    }

    // Ensure title and message are not empty
    if (!this.title?.trim()) {
      console.warn('Empty title provided to NotFoundComponent. Using default title.');
      this.title = '404 - Page Not Found';
    }

    if (!this.message?.trim()) {
      console.warn('Empty message provided to NotFoundComponent. Using default message.');
      this.message = 'The page you are looking for does not exist or has been moved.';
    }
  }
}
