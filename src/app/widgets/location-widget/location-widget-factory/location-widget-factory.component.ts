import { Component, Input, OnInit } from '@angular/core';

import { LocationWidgetComponent } from '../location-widget.component';
import { LocationData } from '../models/location-map-contract';

/**
 * Factory component for creating location widgets with common configurations.
 *
 * This component simplifies the creation of location widgets by providing
 * preset configurations for common use cases.
 */
@Component({
  selector: 'lib-location-widget-factory',
  standalone: true,
  imports: [LocationWidgetComponent],
  templateUrl: './location-widget-factory.component.html',
  styleUrls: ['./location-widget-factory.component.scss'],
})
export class LocationWidgetFactoryComponent implements OnInit {
  /**
   * The widget type to create
   */
  @Input() widgetType: 'active-users' | 'registered-users' | 'sales-distribution' | 'custom' =
    'custom';

  /**
   * Location data to display
   */
  @Input() locationData: LocationData[] = [];

  /**
   * Whether data is being loaded
   */
  @Input() loading = false;

  /**
   * Error message if data loading failed
   */
  @Input() error = '';

  /**
   * Height of the map in pixels
   */
  @Input() height = 350;

  /**
   * For custom widget type, the variant to use
   */
  @Input() variant: 'variant1' | 'variant2' | 'variant3' = 'variant1';

  /**
   * For custom widget type, the title to use
   */
  @Input() title = 'Geographic Distribution';

  /**
   * For custom widget type, the description to use
   */
  @Input() description = '';

  /**
   * For custom widget type, the color of map points
   */
  @Input() pointColor = '#3b82f6';

  /**
   * Configuration for the widget
   */
  widgetConfig: {
    variant: 'variant1' | 'variant2' | 'variant3';
    title: string;
    description: string;
    itemLabel: string;
    pointColor: string;
  } = {
    variant: 'variant1',
    title: 'Geographic Distribution',
    description: '',
    itemLabel: 'items',
    pointColor: '#3b82f6',
  };

  /**
   * Initialize the widget configuration based on the widget type
   */
  ngOnInit(): void {
    switch (this.widgetType) {
      case 'active-users':
        this.widgetConfig = {
          variant: 'variant1',
          title: 'Active Users by Location',
          description: 'Real-time distribution of currently online users',
          itemLabel: 'users',
          pointColor: '#4caf50', // Green
        };
        break;

      case 'registered-users':
        this.widgetConfig = {
          variant: 'variant1',
          title: 'Registered Users by Location',
          description: 'Geographic distribution of all registered accounts',
          itemLabel: 'users',
          pointColor: '#2196f3', // Blue
        };
        break;

      case 'sales-distribution':
        this.widgetConfig = {
          variant: 'variant2',
          title: 'Sales Distribution',
          description: 'Geographic distribution of sales',
          itemLabel: 'sales',
          pointColor: '#ff9800', // Orange
        };
        break;

      case 'custom':
      default:
        this.widgetConfig = {
          variant: this.variant,
          title: this.title,
          description: this.description,
          itemLabel: 'items',
          pointColor: this.pointColor,
        };
        break;
    }
  }
}
