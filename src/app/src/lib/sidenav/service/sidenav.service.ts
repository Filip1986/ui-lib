import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavItem } from '../models/sidenav-contract';

/**
 * Service for managing sidenav state and navigation items
 */
@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  // Observable for mobile state detection
  public isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  // Storage key constants
  private readonly STORAGE_KEY_EXPANDED = 'sidenav_expanded';
  private readonly STORAGE_KEY_ACTIVE_ROUTE = 'sidenav_active_route';
  private readonly STORAGE_KEY_EXPANDED_ITEMS = 'sidenav_expanded_items';

  // BehaviorSubject for tracking expanded state
  private expandedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  expanded$: Observable<boolean> = this.expandedSubject.asObservable().pipe(distinctUntilChanged());

  // BehaviorSubject for tracking navigation items
  private itemsSubject: BehaviorSubject<NavItem[]> = new BehaviorSubject<NavItem[]>([]);
  items$: Observable<NavItem[]> = this.itemsSubject.asObservable();

  // BehaviorSubject for tracking active item
  private activeItemSubject: BehaviorSubject<NavItem | null> = new BehaviorSubject<NavItem | null>(
    null,
  );
  activeItem$ = this.activeItemSubject.asObservable();

  // BehaviorSubject for tracking mobile sidenav open state
  private isMobileSidenavOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  isMobileSidenavOpen$: Observable<boolean> = this.isMobileSidenavOpenSubject.asObservable();

  constructor() {
    this.initFromLocalStorage();
    this.setupResizeListener();
  }

  /**
   * Set the expanded state of the sidenav
   * @param expanded Whether the sidenav is expanded
   */
  setExpanded(expanded: boolean): void {
    this.expandedSubject.next(expanded);
    this.saveToLocalStorage(this.STORAGE_KEY_EXPANDED, expanded);
  }

  /**
   * Toggle the expanded state of the sidenav
   */
  toggleExpanded(): void {
    this.setExpanded(!this.expandedSubject.value);
  }

  /**
   * Open the mobile sidenav
   */
  openMobileSidenav(): void {
    if (this.isMobileSubject.value) {
      this.isMobileSidenavOpenSubject.next(true);
    }
  }

  /**
   * Close the mobile sidenav
   */
  closeMobileSidenav(): void {
    this.isMobileSidenavOpenSubject.next(false);
  }

  /**
   * Set the navigation items
   * @param items The navigation items to set
   */
  setItems(items: NavItem[]): void {
    // When setting new items, try to restore expanded state from localStorage
    const expandedItems = this.getExpandedItemsFromStorage();

    // Apply expanded state to new items if available
    if (expandedItems && expandedItems.length > 0) {
      items = this.applyExpandedStateFromStorage(items, expandedItems);
    }

    this.itemsSubject.next([...items]); // Use spread operator to ensure a new array reference

    // Try to activate by route if available
    const activeRoute = this.getFromLocalStorage<string>(this.STORAGE_KEY_ACTIVE_ROUTE);
    if (activeRoute) {
      this.activateByRoute(activeRoute);
    }
  }

  /**
   * Get current items
   * @returns Current navigation items array
   */
  getItems(): NavItem[] {
    return this.itemsSubject.value;
  }

  /**
   * Update navigation items using a callback function
   * @param callback Function that transforms the items array
   */
  updateItems(callback: (items: NavItem[]) => NavItem[]): void {
    // Create a deep copy of the current items to ensure we're not mutating the state directly
    const currentItems = JSON.parse(JSON.stringify(this.itemsSubject.value)) as NavItem[];
    const updatedItems = callback(currentItems);

    // Emit the new items to subscribers
    this.itemsSubject.next(updatedItems);

    // Save expanded state to localStorage
    this.saveExpandedItemsToStorage(updatedItems);
  }

  /**
   * Set the active navigation item
   * @param item The active item
   */
  setActiveItem(item: NavItem | null): void {
    this.activeItemSubject.next(item);
    if (item?.route) {
      this.saveToLocalStorage(this.STORAGE_KEY_ACTIVE_ROUTE, item.route);
    }
  }

  /**
   * Clear the active navigation item
   */
  clearActiveItem(): void {
    this.activeItemSubject.next(null);
    this.removeFromLocalStorage(this.STORAGE_KEY_ACTIVE_ROUTE);
  }

  /**
   * Expand the item with the specified route
   * @param route The route to expand
   */
  expandItemWithRoute(route: string): void {
    this.updateItems((items) =>
      this.recursivelyUpdateItems(items, (item) => {
        if (item.route === route) {
          return { ...item, expanded: true };
        }
        return item;
      }),
    );
  }

  /**
   * Activate the item with the specified route
   * @param route The route to activate
   */
  activateByRoute(route: string): void {
    this.updateItems((items) =>
      this.recursivelyUpdateItems(items, (item) => {
        if (item.route === route) {
          this.setActiveItem(item);
          return { ...item, expanded: true };
        }
        return item;
      }),
    );
  }

  /**
   * Collapse all expandable items
   */
  collapseAll(): void {
    this.updateItems((items) => this.setExpandedStateRecursive(items, false));
  }

  /**
   * Expand all expandable items
   */
  expandAll(): void {
    this.updateItems((items) => this.setExpandedStateRecursive(items, true));
  }

  /**
   * Set up resize listener for responsive behavior
   */
  private setupResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.checkMobileView());
    this.checkMobileView();
  }

  /**
   * Check if the view is mobile based on window width
   */
  private checkMobileView(): void {
    const isMobile = window.innerWidth < 1024;
    this.isMobileSubject.next(isMobile);
    if (isMobile) {
      this.setExpanded(false);
    }
  }

  /**
   * Initialize state from localStorage
   */
  private initFromLocalStorage(): void {
    const expanded = this.getFromLocalStorage<boolean>(this.STORAGE_KEY_EXPANDED);
    if (expanded !== null) {
      this.expandedSubject.next(expanded);
    }
  }

  /**
   * Recursively update items using a callback function
   */
  private recursivelyUpdateItems(
    items: NavItem[],
    callback: (item: NavItem) => NavItem,
  ): NavItem[] {
    return items.map((item) => {
      const updatedItem = callback(item);
      if (updatedItem.children) {
        updatedItem.children = this.recursivelyUpdateItems(updatedItem.children, callback);
      }
      return updatedItem;
    });
  }

  /**
   * Set expanded state recursively on all items
   */
  private setExpandedStateRecursive(items: NavItem[], expanded: boolean): NavItem[] {
    return this.recursivelyUpdateItems(items, (item) => ({
      ...item,
      expanded: item.children ? expanded : item.expanded,
    }));
  }

  /**
   * Save a value to localStorage
   */
  private saveToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get a value from localStorage
   */
  private getFromLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Remove a value from localStorage
   */
  private removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Save expanded items state to localStorage
   */
  private saveExpandedItemsToStorage(items: NavItem[]): void {
    // Extract IDs or labels of expanded items
    const expandedItems: string[] = [];
    this.collectExpandedItems(items, expandedItems);
    this.saveToLocalStorage(this.STORAGE_KEY_EXPANDED_ITEMS, expandedItems);
  }

  /**
   * Collect labels of expanded items recursively
   */
  private collectExpandedItems(items: NavItem[], result: string[]): void {
    items.forEach((item) => {
      if (item.expanded && item.label) {
        result.push(item.label);
      }
      if (item.children && item.children.length > 0) {
        this.collectExpandedItems(item.children, result);
      }
    });
  }

  /**
   * Get expanded items from localStorage
   */
  private getExpandedItemsFromStorage(): string[] | null {
    return this.getFromLocalStorage<string[]>(this.STORAGE_KEY_EXPANDED_ITEMS);
  }

  /**
   * Apply expanded state from storage to items
   */
  private applyExpandedStateFromStorage(items: NavItem[], expandedLabels: string[]): NavItem[] {
    return this.recursivelyUpdateItems(items, (item) => {
      if (item.label && expandedLabels.includes(item.label)) {
        return { ...item, expanded: true };
      }
      return item;
    });
  }
}
