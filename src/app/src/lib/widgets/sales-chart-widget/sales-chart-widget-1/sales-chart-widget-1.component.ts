import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSalesChartWidgetComponent } from '../base-sales-chart-widget/base-sales-chart-widget.component';
import { SalesChartData } from '../models/sales-chart-widget-contract';
import { CardModule } from 'primeng/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

/**
 * Sales Chart Widget 1 - Standard column chart implementation
 * Extends the base component with specific styling and behavior
 */
@Component({
  selector: 'lib-sales-chart-widget-1',
  standalone: true,
  imports: [CommonModule, CardModule, NgApexchartsModule, SelectButtonModule, FormsModule],
  templateUrl: '../base-sales-chart-widget/base-sales-chart-widget.component.html',
  styleUrls: [
    '../base-sales-chart-widget/base-sales-chart-widget.component.scss',
    './sales-chart-widget-1.component.scss',
  ],
})
export class SalesChartWidget1Component extends BaseSalesChartWidgetComponent {
  /**
   * Override default title
   */
  @Input() override title = 'Monthly Sales Performance';

  /**
   * Override default description
   */
  @Input() override description = 'Revenue by product category';

  /**
   * Default colors for this variant
   */
  @Input() colors: string[] = ['#4caf50', '#2196f3', '#ff9800'];

  /**
   * Override chartData input to set colors
   */
  @Input()
  override get chartData(): SalesChartData {
    return this._chartData;
  }

  override set chartData(data: SalesChartData) {
    // Make sure colors are set if not provided in data
    if (data && !data.colors) {
      data = { ...data, colors: this.colors };
    }
    // Use the protected property from the base class
    this._chartData = data;
    // Call parent's updateChartData if it exists
    if (this.chartOptions) {
      this.updateChartData();
    }
  }
}
