import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

// Import ApexCharts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

import {
  MonthlySalesData,
  QuarterlySalesData,
  SalesChartData,
  TimePeriod,
} from '../models/sales-chart-widget-contract';

// Chart options type definition
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

/**
 * Base component for sales chart widgets that displays sales data
 * This component can be extended or used directly to display sales charts
 */
@Component({
  selector: 'lib-base-sales-chart-widget',
  standalone: true,
  imports: [CardModule, NgApexchartsModule, SelectButtonModule, FormsModule],
  templateUrl: './base-sales-chart-widget.component.html',
  styleUrls: ['./base-sales-chart-widget.component.scss'],
})
export class BaseSalesChartWidgetComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  /**
   * Title for the chart widget
   */
  @Input() title = 'Sales Overview';

  /**
   * Description text for the widget
   */
  @Input() description = 'Performance by product category';

  /**
   * Whether the chart is in a loading state
   */
  @Input() loading = false;

  /**
   * Error message to display if data loading fails
   */
  @Input() error = '';

  /**
   * Height of the chart in pixels
   */
  @Input() height = 350;
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
   * Event emitted when the period changes
   */
  @Output() periodChange = new EventEmitter<{ value: string }>();

  /**
   * Preset chart data or data loaded from API
   * Using protected instead of private to allow subclasses to access it
   */
  protected _chartData: SalesChartData = {
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
   * Getter for chart data
   */
  @Input()
  get chartData(): SalesChartData {
    return this._chartData;
  }

  /**
   * Setter for chart data
   */
  set chartData(data: SalesChartData) {
    this._chartData = data;
    // If chart is already initialized, update it
    if (this.chartOptions) {
      this.updateChartData();
    }
  }

  /**
   * Initialize the component and set up default chart options
   */
  ngOnInit(): void {
    this.initChartOptions();
  }

  /**
   * Update the chart when inputs change
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.updateChartData();
    }

    if (changes['selectedPeriod'] && !changes['selectedPeriod'].firstChange) {
      this.updateChartData();
    }
  }

  /**
   * Handles period change and updates the chart accordingly
   * @param event Change event containing the new period value
   */
  onPeriodChange(event: any): void {
    this.selectedPeriod = event.value;
    this.updateChartData();
    this.periodChange.emit(event);
  }

  /**
   * Total sales calculation
   * @returns Total sales across all categories
   */
  getTotalSales(): number {
    const data =
      this.selectedPeriod === 'monthly'
        ? this.chartData.monthlySalesData
        : this.chartData.quarterlySalesData;

    return data.series.reduce((total, series) => {
      return total + series.data.reduce((sum, value) => sum + value, 0);
    }, 0);
  }

  /**
   * Year over year growth percentage
   * @returns Growth percentage
   */
  getYoYGrowth(): number {
    // Mock growth percentage - in a real implementation, this would be calculated from data
    return 24.8;
  }

  /**
   * Updates chart data based on selected time period
   * Made public so child classes can call it when needed
   */
  public updateChartData(): void {
    if (!this.chartOptions) {
      this.initChartOptions();
      return;
    }

    if (this.selectedPeriod === 'monthly') {
      this.chartOptions.series = this.chartData.monthlySalesData.series;
      this.chartOptions.xaxis.categories = this.chartData.monthlySalesData.months;
    } else {
      this.chartOptions.series = this.chartData.quarterlySalesData.series;
      this.chartOptions.xaxis.categories = this.chartData.quarterlySalesData.quarters;
    }

    // Update the chart
    if (this.chart && this.chart.updateOptions) {
      this.chart.updateOptions(this.chartOptions);
    }
  }

  /**
   * Initializes chart options with default configuration
   */
  protected initChartOptions(): void {
    // Use colors from chartData if provided, otherwise use defaults
    const colors = this.chartData.colors || ['#4caf50', '#2196f3', '#ff9800'];

    this.chartOptions = {
      series:
        this.selectedPeriod === 'monthly'
          ? this.chartData.monthlySalesData.series
          : this.chartData.quarterlySalesData.series,
      chart: {
        type: 'bar',
        height: this.height,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        fontFamily: 'inherit',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '60%',
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories:
          this.selectedPeriod === 'monthly'
            ? this.chartData.monthlySalesData.months
            : this.chartData.quarterlySalesData.quarters,
      },
      yaxis: {
        title: {
          text: 'Revenue ($1,000)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$' + val + 'k';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: 0,
        fontSize: '14px',
        markers: {
          fillColors: colors,
          shape: 'circle',
        },
      },
      title: {
        text: this.title,
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
    };
  }
}
