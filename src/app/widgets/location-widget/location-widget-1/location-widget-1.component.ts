import { Component, Input } from '@angular/core';

import { BaseLocationWidgetComponent } from '../base-location-widget/base-location-widget.component';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/**
 * A specialized location widget implementation that uses a card layout
 * and displays geographical data points on a world map.
 */
@Component({
  selector: 'lib-location-widget-1',
  standalone: true,
  imports: [CardModule, ProgressSpinnerModule],
  templateUrl: './location-widget-1.component.html',
  styleUrls: ['./location-widget-1.component.scss'],
})
export class LocationWidget1Component extends BaseLocationWidgetComponent {
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
