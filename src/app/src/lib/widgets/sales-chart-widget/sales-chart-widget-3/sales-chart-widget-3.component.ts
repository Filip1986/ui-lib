import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSalesChartWidgetComponent } from '../base-sales-chart-widget/base-sales-chart-widget.component';
import { SalesChartData } from '../models/sales-chart-widget-contract';
import { CardModule } from 'primeng/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

/**
 * Sales Chart Widget 3 - Line chart variant instead of bar chart
 * Uses the base component with a different chart type
 */
@Component({
  selector: 'lib-sales-chart-widget-3',
  standalone: true,
  imports: [CommonModule, CardModule, NgApexchartsModule, SelectButtonModule, FormsModule],
  templateUrl: '../base-sales-chart-widget/base-sales-chart-widget.component.html',
  styleUrls: [
    '../base-sales-chart-widget/base-sales-chart-widget.component.scss',
    './sales-chart-widget-3.component.scss',
  ],
})
export class SalesChartWidget3Component extends BaseSalesChartWidgetComponent implements OnInit {
  /**
   * Override default title
   */
  @Input() override title = 'Quarterly Sales Overview';

  /**
   * Override default description
   */
  @Input() override description = 'Quarterly performance analysis';

  /**
   * Default colors for this variant - uses a different palette than variant 1
   */
  @Input() colors: string[] = ['#673ab7', '#e91e63', '#03a9f4'];

  /**
   * Override default period
   */
  @Input() override selectedPeriod = 'quarterly';

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

  /**
   * Override chart initialization to use different plot options
   */
  override ngOnInit(): void {
    super.ngOnInit();

    // Update chart options with a different configuration
    if (this.chartOptions) {
      this.chartOptions.plotOptions = {
        bar: {
          horizontal: false,
          borderRadius: 6,
          columnWidth: '50%',
          distributed: false,
        },
      };

      // Set different colors
      this.chartOptions.colors = this.colors;

      // Update the chart if it exists
      if (this.chart && this.chart.updateOptions) {
        this.chart.updateOptions(this.chartOptions);
      }
    }
  }
}
