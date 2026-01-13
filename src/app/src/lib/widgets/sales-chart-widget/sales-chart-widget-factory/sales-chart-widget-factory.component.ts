import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SalesChartWidget1Component } from '../sales-chart-widget-1/sales-chart-widget-1.component';
import { SalesChartWidget2Component } from '../sales-chart-widget-2/sales-chart-widget-2.component';
import { SalesChartWidget3Component } from '../sales-chart-widget-3/sales-chart-widget-3.component';
import { SalesChartData, TimePeriod } from '../models/sales-chart-widget-contract';

/**
 * Factory component for creating sales chart widgets with common configurations
 * This simplifies the creation of sales widgets with preset configurations
 */
@Component({
  selector: 'lib-sales-chart-widget-factory',
  standalone: true,
  imports: [
    SalesChartWidget1Component,
    SalesChartWidget2Component,
    SalesChartWidget3Component
],
  templateUrl: './sales-chart-widget-factory.component.html',
  styleUrls: ['./sales-chart-widget-factory.component.scss'],
})
export class SalesChartWidgetFactoryComponent implements OnInit {
  /**
   * The widget variant to create
   */
  @Input() variant: 'variant1' | 'variant2' | 'variant3' = 'variant1';

  /**
   * Preset widget types with common configurations
   */
  @Input() widgetType: 'monthly-sales' | 'quarterly-performance' | 'annual-comparison' | 'custom' =
    'custom';

  /**
   * Chart data to display
   */
  @Input() chartData: SalesChartData | null = null;

  /**
   * Whether data is being loaded
   */
  @Input() loading = false;

  /**
   * Error message if data loading failed
   */
  @Input() error = '';

  /**
   * Height of the chart in pixels
   */
  @Input() height = 350;

  /**
   * Title for custom widget type
   */
  @Input() title = 'Sales Performance';

  /**
   * Description for custom widget type
   */
  @Input() description = '';

  /**
   * Time period options
   */
  @Input() timePeriods: TimePeriod[] = [
    { name: 'Monthly', value: 'monthly' },
    { name: 'Quarterly', value: 'quarterly' },
  ];

  /**
   * Selected period
   */
  @Input() selectedPeriod = 'monthly';

  /**
   * Event emitted when period changes
   */
  @Output() periodChange = new EventEmitter<{ value: string }>();

  /**
   * The processed configuration for the widget
   */
  widgetConfig: {
    variant: 'variant1' | 'variant2' | 'variant3';
    title: string;
    description: string;
    chartData: SalesChartData | null;
    timePeriods: TimePeriod[];
    selectedPeriod: string;
  } = {
    variant: 'variant1',
    title: 'Sales Performance',
    description: '',
    chartData: null,
    timePeriods: [
      { name: 'Monthly', value: 'monthly' },
      { name: 'Quarterly', value: 'quarterly' },
    ],
    selectedPeriod: 'monthly',
  };

  /**
   * Default chart data to use when no data is provided
   */
  defaultChartData: SalesChartData = {
    monthlySalesData: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          name: 'Software',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 68, 78, 74],
        },
        {
          name: 'Hardware',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 95, 105],
        },
        {
          name: 'Services',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 58, 62],
        },
      ],
    },
    quarterlySalesData: {
      quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          name: 'Software',
          data: [156, 175, 189, 220],
        },
        {
          name: 'Hardware',
          data: [262, 290, 299, 286],
        },
        {
          name: 'Services',
          data: [112, 119, 146, 175],
        },
      ],
    },
    colors: ['#4caf50', '#2196f3', '#ff9800'],
  };

  /**
   * Initialize widget configuration based on the widget type
   */
  ngOnInit(): void {
    // Configure widget based on type
    switch (this.widgetType) {
      case 'monthly-sales':
        this.widgetConfig = {
          variant: 'variant1',
          title: 'Monthly Sales',
          description: 'Monthly revenue breakdown by product category',
          chartData: this.chartData,
          timePeriods: [{ name: 'Monthly', value: 'monthly' }],
          selectedPeriod: 'monthly',
        };
        break;

      case 'quarterly-performance':
        this.widgetConfig = {
          variant: 'variant2',
          title: 'Quarterly Performance',
          description: 'Quarterly revenue breakdown by product category',
          chartData: this.chartData,
          timePeriods: [{ name: 'Quarterly', value: 'quarterly' }],
          selectedPeriod: 'quarterly',
        };
        break;

      case 'annual-comparison':
        this.widgetConfig = {
          variant: 'variant3',
          title: 'Annual Performance',
          description: 'Yearly comparison by product category',
          chartData: this.chartData,
          timePeriods: [
            { name: 'Monthly', value: 'monthly' },
            { name: 'Quarterly', value: 'quarterly' },
          ],
          selectedPeriod: 'quarterly',
        };
        break;

      case 'custom':
      default:
        this.widgetConfig = {
          variant: this.variant,
          title: this.title,
          description: this.description,
          chartData: this.chartData,
          timePeriods: this.timePeriods,
          selectedPeriod: this.selectedPeriod,
        };
        break;
    }
  }

  /**
   * Handle period change events from child components
   * @param event - The period change event
   */
  handlePeriodChange(event: any): void {
    this.periodChange.emit(event);
  }
}
