import { Component, Input, Type } from '@angular/core';

import { SalesChartWidget1Component } from './sales-chart-widget-1/sales-chart-widget-1.component';
import { SalesChartWidget2Component } from './sales-chart-widget-2/sales-chart-widget-2.component';
import { SalesChartWidget3Component } from './sales-chart-widget-3/sales-chart-widget-3.component';
import { SalesChartData, TimePeriod } from './models/sales-chart-widget-contract';

/**
 * Main sales chart widget component that selects the appropriate widget implementation
 * based on the variant specified.
 *
 * This component uses the Factory Pattern to create the appropriate widget type.
 */
@Component({
  selector: 'lib-sales-chart-widget',
  standalone: true,
  imports: [
    SalesChartWidget1Component,
    SalesChartWidget2Component,
    SalesChartWidget3Component
],
  templateUrl: './sales-chart-widget.component.html',
  styleUrls: ['./sales-chart-widget.component.scss'],
})
export class SalesChartWidgetComponent {
  /**
   * The selected variant of the chart widget
   */
  @Input() variant: 'variant1' | 'variant2' | 'variant3' = 'variant1';

  /**
   * Title for the widget
   */
  @Input() title = 'Sales Overview';

  /**
   * Description for the widget
   */
  @Input() description = 'Performance by product category';

  /**
   * Height of the chart in pixels
   */
  @Input() height = 350;

  /**
   * Chart data to display
   */
  @Input() chartData: SalesChartData | null = null;

  /**
   * Error message to display if data loading fails
   */
  @Input() error = '';

  /**
   * Indicates if data is being loaded
   */
  @Input() loading = false;

  /**
   * Time period options for filtering
   */
  @Input() timePeriods: TimePeriod[] = [
    { name: 'Monthly', value: 'monthly' },
    { name: 'Quarterly', value: 'quarterly' },
  ];

  /**
   * Selected period for filtering
   */
  @Input() selectedPeriod = 'monthly';

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
   * Get the component type based on the selected variant
   */
  get widgetComponent(): Type<any> {
    switch (this.variant) {
      case 'variant1':
        return SalesChartWidget1Component;
      case 'variant2':
        return SalesChartWidget2Component;
      case 'variant3':
        return SalesChartWidget3Component;
      default:
        return SalesChartWidget1Component;
    }
  }
}
