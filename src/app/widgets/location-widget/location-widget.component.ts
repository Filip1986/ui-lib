import { Component, Input, Type } from '@angular/core';

import { LocationWidget1Component } from './location-widget-1/location-widget-1.component';
import { LocationWidget2Component } from './location-widget-2/location-widget-2.component';
import { LocationWidget3Component } from './location-widget-3/location-widget-3.component';
import { LocationData } from './models/location-map-contract';

/**
 * Main location widget component that selects the appropriate widget implementation
 * based on the variant specified.
 *
 * This component uses the Factory Pattern to create the appropriate widget type.
 */
@Component({
  selector: 'lib-location-widget',
  standalone: true,
  imports: [
    LocationWidget1Component,
    LocationWidget2Component,
    LocationWidget3Component
],
  templateUrl: './location-widget.component.html',
  styleUrls: ['./location-widget.component.scss'],
})
export class LocationWidgetComponent {
  /**
   * The selected variant of the location widget
   */
  @Input() variant: 'variant1' | 'variant2' | 'variant3' = 'variant1';

  /**
   * Title for the widget
   */
  @Input() title = 'Geographic Distribution';

  /**
   * Description for the widget
   */
  @Input() description = '';

  /**
   * Height of the map in pixels
   */
  @Input() height = 350;

  /**
   * Location data to display on the map
   */
  @Input() locationData: LocationData[] = [];

  /**
   * Error message to display if data loading fails
   */
  @Input() error = '';

  /**
   * Indicates if data is being loaded
   */
  @Input() loading = false;

  /**
   * Color for map points
   */
  @Input() pointColor = '#3b82f6';

  /**
   * Label for items in the stats display
   */
  @Input() itemLabel = 'items';

  /**
   * Whether to show the header
   */
  @Input() showHeader = true;

  /**
   * Whether to show the footer
   */
  @Input() showFooter = true;

  /**
   * Get the component type based on the selected variant
   */
  get widgetComponent(): Type<any> {
    switch (this.variant) {
      case 'variant1':
        return LocationWidget1Component;
      case 'variant2':
        return LocationWidget2Component;
      case 'variant3':
        return LocationWidget3Component;
      default:
        return LocationWidget1Component;
    }
  }
}
