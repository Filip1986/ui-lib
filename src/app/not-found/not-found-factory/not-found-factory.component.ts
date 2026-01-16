import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NotFoundFeatures, NotFoundVariant } from '../models/not-found-contract';
import { NotFound1Component } from '../not-found-1/not-found-1.component';
import { NotFound2Component } from '../not-found-2/not-found-2.component';
import { NotFound3Component } from '../not-found-3/not-found-3.component';

@Component({
  selector: 'lib-not-found-factory',
  standalone: true,
  imports: [NotFound1Component, NotFound2Component, NotFound3Component],
  templateUrl: './not-found-factory.component.html',
  styleUrl: './not-found-factory.component.scss',
})
export class NotFoundFactoryComponent {
  @Input() title = '404 - Page Not Found';
  @Input() message = 'The page you are looking for does not exist or has been moved.';
  @Input() variant: NotFoundVariant = '1';
  @Input() features: NotFoundFeatures = {
    showHomeLink: true,
    showBackButton: true,
    showSearchBox: false,
  };

  @Output() goHome: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchEvent: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Handle go home event
   */
  onGoHome(): void {
    this.goHome.emit();
  }

  /**
   * Handle go back event
   */
  onGoBack(): void {
    this.goBack.emit();
  }

  /**
   * Handle search event
   * @param query Search query string
   */
  onSearch(query: Event): void {
    this.searchEvent.emit(query);
  }
}
