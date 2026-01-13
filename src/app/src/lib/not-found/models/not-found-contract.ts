/**
 * Defines the available visual variants for the NotFound component
 * - '1': Standard card design
 * - '2': Minimal design with animated elements
 * - '3': Split panel design with illustration
 */
export type NotFoundVariant = '1' | '2' | '3';

/**
 * Configuration options for enabling/disabling NotFound component features
 */
export interface NotFoundFeatures {
  /**
   * Whether to show a link to the home page
   * @default true
   */
  showHomeLink?: boolean;

  /**
   * Whether to show a back button to navigate to the previous page
   * @default true
   */
  showBackButton?: boolean;

  /**
   * Whether to show a search box for users to search for content
   * @default false
   */
  showSearchBox?: boolean;
}

/**
 * The structure of a search result that can be displayed
 * on the 404 page when search is enabled
 */
export interface NotFoundSearchResult {
  /**
   * The title of the search result
   */
  title: string;

  /**
   * The URL of the search result
   */
  url: string;

  /**
   * An optional description of the search result
   */
  description?: string;
}

/**
 * Configuration for theme-specific styling of the NotFound component
 */
export interface NotFoundThemeConfig {
  /**
   * Primary color used for buttons and highlights
   */
  primaryColor?: string;

  /**
   * Background color for the entire component
   */
  backgroundColor?: string;

  /**
   * Text color for content
   */
  textColor?: string;

  /**
   * Card/container background color
   */
  surfaceColor?: string;

  /**
   * Border color for inputs and containers
   */
  borderColor?: string;
}

/**
 * Analytics data structure for 404 page events
 */
export interface NotFoundAnalyticsEvent {
  /**
   * The type of event that occurred
   */
  eventType: 'view' | 'search' | 'navigate_home' | 'navigate_back';

  /**
   * The URL that resulted in a 404
   */
  url: string;

  /**
   * Timestamp when the event occurred
   */
  timestamp: number;

  /**
   * Search query used (for search events)
   */
  searchQuery?: string;
}
