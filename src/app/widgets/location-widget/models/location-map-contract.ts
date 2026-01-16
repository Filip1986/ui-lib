/**
 * Interface for location data that will be displayed on the map
 */
export interface LocationData {
  /** Country or region name */
  country: string;
  /** Country code (ISO 2-letter code) */
  countryCode?: string;
  /** Number of users or items in this location */
  count: number;
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
}
