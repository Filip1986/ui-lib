/**
 * Interface for time period option in sales chart filter
 */
export interface TimePeriod {
  name: string;
  value: string;
}

/**
 * Data series for sales data
 */
export interface SalesDataSeries {
  name: string;
  data: number[];
}

/**
 * Monthly sales data model
 */
export interface MonthlySalesData {
  months: string[];
  series: SalesDataSeries[];
}

/**
 * Quarterly sales data model
 */
export interface QuarterlySalesData {
  quarters: string[];
  series: SalesDataSeries[];
}

/**
 * Combined sales data model
 */
export interface SalesChartData {
  monthlySalesData: MonthlySalesData;
  quarterlySalesData: QuarterlySalesData;
  colors?: string[];
}
