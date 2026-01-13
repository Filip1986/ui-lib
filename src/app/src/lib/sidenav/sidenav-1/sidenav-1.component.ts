import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BaseSidenavComponent } from '../base-sidenav/base-sidenav.component';
import { SidenavService } from '../service/sidenav.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { NavItem } from '../models/sidenav-contract';

@Component({
  selector: 'lib-sidenav-1',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav-1.component.html',
  styleUrl: './sidenav-1.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-20px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class Sidenav1Component extends BaseSidenavComponent implements OnInit, OnDestroy {
  // Mock data for demonstration
  mockChildItems: NavItem[] = [
    { label: 'Child Item 1', icon: 'pi pi-circle', route: '/child1' },
    { label: 'Child Item 2', icon: 'pi pi-circle', route: '/child2' },
    { label: 'Child Item 3', icon: 'pi pi-circle', route: '/child3' },
  ];

  // Add a subscription to track and clean up subscriptions
  private itemsSubscription: Subscription = new Subscription();

  constructor(
    protected override sidenavService: SidenavService,
    protected override router: Router,
  ) {
    super(router, sidenavService);
  }

  /**
   * Get the mobile state as an observable
   */
  get isMobile$(): Observable<boolean> {
    return this.sidenavService.isMobile$;
  }

  /**
   * Get the mobile sidenav open state as an observable
   */
  get isMobileSidenavOpen$(): Observable<boolean> {
    return this.sidenavService.isMobileSidenavOpen$;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Subscribe to items changes to ensure component reflects the latest state
    this.itemsSubscription = this.sidenavService.items$.subscribe((items: NavItem[]) => {
      this.items = items;
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Clean up subscriptions to prevent memory leaks
    this.itemsSubscription.unsubscribe();
  }

  /**
   * Checks if any item is currently expanded
   * @returns boolean indicating if any navigation item is expanded
   */
  hasExpandedItem(): boolean {
    return this.items?.some((navItem: NavItem): boolean => !!navItem.expanded) ?? false;
  }

  /**
   * Closes the mobile sidenav
   */
  closeMobileSidenav(): void {
    this.sidenavService.closeMobileSidenav();
  }

  /**
   * Opens the mobile sidenav
   */
  openMobileSidenav(): void {
    this.sidenavService.openMobileSidenav();
  }

  /**
   * Toggle expand state of the sidenav
   * This function handles both mobile and desktop scenarios
   */
  override toggleExpand(): void {
    combineLatest([this.isMobile$, this.isMobileSidenavOpen$]).subscribe(
      ([isMobile, isOpen]: [boolean, boolean]): void => {
        if (isMobile) {
          return isOpen ? this.closeMobileSidenav() : this.openMobileSidenav();
        } else {
          this.sidenavService.toggleExpanded();
        }
      },
    );
  }

  /**
   * Override the toggleItemExpand method to ensure proper expansion
   * This ensures that clicking parent items with children will toggle their expanded state
   * @param item The navigation item to toggle
   */
  override toggleItemExpand(item: NavItem): void {
    if (!item.children?.length) {
      return;
    }

    // Update the item's expanded state in the service
    this.sidenavService.updateItems((items: NavItem[]): NavItem[] => {
      return this.updateItemExpandedState(items, item);
    });
  }

  /**
   * Override handleItemClick to better handle items with children
   * @param item The navigation item that was clicked
   */
  override handleItemClick(item: NavItem): void {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      // For items with children, toggle expanded state
      this.toggleItemExpand(item);
    } else {
      // For items without children, handle navigation
      this.sidenavService.setActiveItem(item);

      if (item.action) {
        item.action();
      }

      if (item.route) {
        void this.router.navigate([item.route]);
      }

      this.itemClick.emit(item);
    }
  }

  /**
   * Gets tooltip text for items when sidenav is collapsed
   * @param label The label of the navigation item
   * @returns Tooltip text or empty string
   */
  getTooltip(label: string): string {
    return this.expanded ? '' : label;
  }

  /**
   * Helper method to update the expanded state of an item in the items array
   * @param items The array of navigation items
   * @param targetItem The item to update
   * @returns Updated array of navigation items
   */
  private updateItemExpandedState(items: NavItem[], targetItem: NavItem): NavItem[] {
    return items.map((item: NavItem): NavItem => {
      // Find the item by label rather than reference equality which might not work if items are recreated
      if (item.label === targetItem.label) {
        return { ...item, expanded: !item.expanded };
      }

      // If this item has children, recursively search for the target item
      if (item.children?.length) {
        const updatedChildren = this.updateItemExpandedState(item.children, targetItem);
        // Only create a new item object if children have changed
        if (updatedChildren !== item.children) {
          return { ...item, children: updatedChildren };
        }
      }

      return item;
    });
  }

  /**
   * Ensure child items are properly initialized for demonstration
   */
  private ensureChildItemsAreAccessible(): void {
    this.items.forEach((item) => {
      if (item.children && item.children.length === 0) {
        item.children = [...this.mockChildItems];
      }
    });
  }
}
