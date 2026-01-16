import { Component, Input } from '@angular/core';

import { BaseLocationWidgetComponent } from '../base-location-widget/base-location-widget.component';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'lib-location-widget-2',
  standalone: true,
  imports: [Card, PrimeTemplate, ProgressSpinner],
  templateUrl: './location-widget-2.component.html',
  styleUrl: './location-widget-2.component.scss',
})
export class LocationWidget2Component extends BaseLocationWidgetComponent {
  /**
   * Whether to show the card header
   */
  @Input() showHeader = true;

  /**
   * Whether to show the card footer with statistics
   */
  @Input() showFooter = true;

  /**
   * Label for "items" in the tooltip and footer (e.g., "users", "devices", etc.)
   */
  @Input() itemLabel = 'items';
}
