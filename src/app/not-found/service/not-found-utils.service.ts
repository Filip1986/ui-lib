import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NotFoundAnalyticsEvent, NotFoundSearchResult } from '../models/not-found-contract';

/**
 * Utility service for NotFound component functionality
 * Provides methods for logging analytics, searching, and other shared functionality
 */
@Injectable({
  providedIn: 'root',
})
export class NotFoundUtilsService {
  /**
   * Keep track of viewed 404 pages to prevent duplicate analytics events
   */
  private viewedPages: Set<string> = new Set<string>();

  constructor() {}

  /**
   * Log a 404 page analytics event
   * @param event - The analytics event to log
   * @returns True if the event was logged successfully
   */
  public logAnalyticsEvent(event: NotFoundAnalyticsEvent): boolean {
    try {
      // Prevent duplicate view events for the same URL
      if (event.eventType === 'view' && this.viewedPages.has(event.url)) {
        return false;
      }

      // Add to viewed pages if it's a view event
      if (event.eventType === 'view') {
        this.viewedPages.add(event.url);
      }

      // In a real app, you would send this to your analytics service
      console.debug('404 Analytics Event:', event);

      return true;
    } catch (error) {
      console.error('Failed to log 404 analytics event:', error);
      return false;
    }
  }

  /**
   * Search for content related to the 404 page
   * @param query - The search query string
   * @param currentUrl - The current URL that resulted in a 404
   * @returns Observable of search results
   */
  public searchRelatedContent(
    query: string,
    currentUrl: string,
  ): Observable<NotFoundSearchResult[]> {
    // Log the search event
    this.logAnalyticsEvent({
      eventType: 'search',
      url: currentUrl,
      timestamp: Date.now(),
      searchQuery: query,
    });

    // In a real app, this would call your search API
    // For demonstration, return mock results
    return of(query).pipe(
      delay(500), // Simulate network delay
      map((searchTerm) => this.getMockSearchResults(searchTerm)),
    );
  }

  /**
   * Generate helpful suggestions based on the current URL
   * @param currentUrl - The current URL that resulted in a 404
   * @returns Array of suggested URLs that might be helpful
   */
  public generateSuggestions(currentUrl: string): string[] {
    const suggestions: string[] = [];

    // Remove trailing slashes
    const normalizedUrl = currentUrl.replace(/\/+$/, '');

    // Add the parent path
    const parentPath = normalizedUrl.substring(0, normalizedUrl.lastIndexOf('/'));
    if (parentPath && parentPath !== normalizedUrl) {
      suggestions.push(parentPath);
    }

    // Add the home page
    suggestions.push('/');

    // Add other common pages
    suggestions.push('/search');
    suggestions.push('/sitemap');
    suggestions.push('/contact');

    return suggestions;
  }

  /**
   * Track how the user exited the 404 page
   * @param exitType - The type of exit (back, home, search)
   * @param currentUrl - The current URL that resulted in a 404
   */
  public trackExit(exitType: 'navigate_home' | 'navigate_back', currentUrl: string): void {
    this.logAnalyticsEvent({
      eventType: exitType,
      url: currentUrl,
      timestamp: Date.now(),
    });
  }

  /**
   * Get mock search results for demonstration purposes
   * @param query - The search query
   * @returns Array of mock search results
   * @private
   */
  private getMockSearchResults(query: string): NotFoundSearchResult[] {
    // In a real app, this would be replaced with actual search results
    return [
      {
        title: `Page related to "${query}"`,
        url: `/search-results?q=${encodeURIComponent(query)}`,
        description: `A page containing information about ${query}`,
      },
      {
        title: `${query} documentation`,
        url: `/docs/${query.toLowerCase().replace(/\s+/g, '-')}`,
        description: 'Documentation page with related information',
      },
      {
        title: 'Homepage',
        url: '/',
        description: 'Go to the homepage to start over',
      },
    ];
  }
}
