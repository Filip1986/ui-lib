import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Import AmCharts
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { LocationData } from '../models/location-map-contract';

/**
 * Base component for location widget that displays a geographical map with data points
 * This component can be extended or used directly to display location-based data
 */
@Component({
  selector: 'lib-base-location-widget',
  standalone: true,
  imports: [CardModule, ProgressSpinnerModule],
  templateUrl: './base-location-widget.component.html',
  styleUrls: ['./base-location-widget.component.scss'],
})
export class BaseLocationWidgetComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * Title for the map widget
   */
  @Input() title = 'Geographic Distribution';

  /**
   * Indicates if data is being loaded
   */
  @Input() loading = false;

  /**
   * Location data for the map
   */
  @Input() locationData: LocationData[] = [];

  /**
   * Description text for the widget
   */
  @Input() description = '';

  /**
   * Error message to display if data loading fails
   */
  @Input() error = '';

  /**
   * Height of the map in pixels
   */
  @Input() height = 350;

  /**
   * Color for the map points
   */
  @Input() pointColor = '#3b82f6';

  /**
   * Reference to the map container element
   */
  @ViewChild('chartdiv') chartDiv!: ElementRef<HTMLElement>;

  /**
   * AmCharts root instance
   */
  protected root?: am5.Root;

  /**
   * Flag to track if map has been initialized
   */
  protected mapInitialized = false;

  /**
   * The map chart instance
   */
  protected chart?: am5map.MapChart;

  /**
   * Series for the pins (markers) on the map
   */
  protected pointSeries?: am5map.MapPointSeries;

  constructor(
    protected cdr: ChangeDetectorRef,
    protected zone: NgZone,
  ) {}

  /**
   * Initialize the map after the view is initialized
   */
  ngAfterViewInit(): void {
    // Use NgZone to prevent amCharts from triggering unnecessary Angular change detection
    this.zone.runOutsideAngular(() => {
      this.initMap();
    });
  }

  /**
   * Update the map when inputs change
   * @param changes SimpleChanges object containing the changed inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] || changes['error']) {
      this.cdr.detectChanges(); // Ensure the DOM is updated
      this.tryInitializeMap();
    }

    if (changes['locationData'] && !changes['locationData'].firstChange && this.mapInitialized) {
      this.updateChartData();
    }

    // If point color changes, update the color
    if (changes['pointColor'] && !changes['pointColor'].firstChange && this.pointSeries) {
      this.updatePointColor();
    }
  }

  /**
   * Clean up resources when the component is destroyed
   */
  ngOnDestroy(): void {
    // Dispose of the chart when the component is destroyed
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  /**
   * Calculate the total number of items across all locations
   * @returns Total count
   */
  getTotalCount(): number {
    return this.locationData.reduce((total, location) => total + location.count, 0);
  }

  /**
   * Check if we can initialize the map and do so if possible
   */
  protected tryInitializeMap(): void {
    if (!this.mapInitialized && !this.loading && !this.error && this.chartDiv) {
      this.zone.runOutsideAngular(() => {
        this.initMap();
        this.mapInitialized = true;
      });
    }
  }

  /**
   * Initialize the map chart
   */
  protected initMap(): void {
    if (!this.chartDiv) {
      return;
    }

    // Create root element
    this.root = am5.Root.new(this.chartDiv.nativeElement);

    // Set themes
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create the map chart
    this.chart = this.root.container.children.push(
      am5map.MapChart.new(this.root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        homeZoomLevel: 1,
        homeGeoPoint: { longitude: 10, latitude: 52 },
      }),
    );

    // Create polygon series for the map background
    const polygonSeries = this.chart.series.push(
      am5map.MapPolygonSeries.new(this.root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'], // Exclude Antarctica
        fill: am5.color(0xdddddd),
        stroke: am5.color(0xffffff),
      }),
    );

    // Create point series for user locations
    this.pointSeries = this.chart.series.push(am5map.MapPointSeries.new(this.root, {}));

    // Configure point series
    this.pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(this.root!, {
        radius: 6,
        tooltipText: '{name}: {value} items',
        fillOpacity: 0.7,
        fill: am5.color(this.pointColor),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
      });

      // Adapt circle size based on value
      circle.adapters.add('radius', (radius, target) => {
        const dataItem = target.dataItem as am5.DataItem<am5map.IMapPointSeriesDataItem>;
        if (dataItem) {
          const value = dataItem.get('value') || 0;
          return Math.max(5, Math.min(20, 5 + value / 5)); // Scale with min/max limits
        }
        return radius;
      });

      return am5.Bullet.new(this.root!, {
        sprite: circle,
      });
    });

    // Add initial data
    this.updateChartData();

    // Add zoom controls
    this.chart.set('zoomControl', am5map.ZoomControl.new(this.root, {}));
  }

  /**
   * Update chart data when locationData changes
   */
  protected updateChartData(): void {
    if (!this.pointSeries) return;

    // Clear existing data
    this.pointSeries.data.clear();

    // Add new data points
    const data = this.locationData.map((location) => ({
      geometry: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      name: location.country,
      value: location.count,
    }));

    this.pointSeries.data.setAll(data);
  }

  /**
   * Update the color of map points when pointColor changes
   */
  protected updatePointColor(): void {
    if (!this.pointSeries || !this.root) return;

    this.pointSeries.bullets.clear();
    this.pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(this.root!, {
        radius: 6,
        tooltipText: '{name}: {value} items',
        fillOpacity: 0.7,
        fill: am5.color(this.pointColor),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
      });

      // Adapt circle size based on value
      circle.adapters.add('radius', (radius, target) => {
        const dataItem = target.dataItem as am5.DataItem<am5map.IMapPointSeriesDataItem>;
        if (dataItem) {
          const value = dataItem.get('value') || 0;
          return Math.max(5, Math.min(20, 5 + value / 5));
        }
        return radius;
      });

      return am5.Bullet.new(this.root!, {
        sprite: circle,
      });
    });

    // Re-apply data to refresh the bullets
    this.updateChartData();
  }
}
