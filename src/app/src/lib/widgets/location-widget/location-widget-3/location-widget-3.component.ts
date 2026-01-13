import { Component, Input } from '@angular/core';

import { BaseLocationWidgetComponent } from '../base-location-widget/base-location-widget.component';

@Component({
  selector: 'lib-location-widget-3',
  standalone: true,
  imports: [],
  templateUrl: './location-widget-3.component.html',
  styleUrl: './location-widget-3.component.scss',
})
export class LocationWidget3Component extends BaseLocationWidgetComponent {
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
