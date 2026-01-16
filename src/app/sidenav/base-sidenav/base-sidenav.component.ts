import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { NavItem } from '../models/sidenav-contract';
import { SidenavService } from '../service/sidenav.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-base-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './base-sidenav.component.html',
  styleUrl: './base-sidenav.component.scss',
})
export class BaseSidenavComponent implements OnInit, OnDestroy {
  @Input() title = 'Navigation';
  @Input() items: NavItem[] = [];
  @Input() logo?: string;
  @Input() expanded = true;
  @Input() isBetaTester = false;

  @Output() itemClick: EventEmitter<NavItem> = new EventEmitter<NavItem>();
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    protected router: Router,
    protected sidenavService: SidenavService,
  ) {}

  ngOnInit(): void {
    this.sidenavService.expanded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((expanded: boolean): void => {
        this.expanded = expanded;
      });

    if (this.items.length > 0) {
      this.sidenavService.setItems(this.items);
    } else {
      this.sidenavService.items$
        .pipe(takeUntil(this.destroy$))
        .subscribe((items: NavItem[]): void => {
          this.items = items;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleExpand(): void {
    this.sidenavService.toggleExpanded();
    this.expandChange.emit(this.expanded);
  }

  toggleItemExpand(item: NavItem): void {
    if (item.children?.length) {
      this.sidenavService.updateItems((items: NavItem[]): NavItem[] =>
        items.map((i: NavItem): NavItem => (i === item ? { ...i, expanded: !i.expanded } : i)),
      );
    }
  }

  handleItemClick(item: NavItem): void {
    if (item.disabled) return;

    this.sidenavService.setActiveItem(item);

    if (item.action) {
      item.action();
    }

    if (item.route) {
      void this.router.navigate([item.route]);
    }

    this.itemClick.emit(item);
  }

  isActiveItem(item: NavItem): boolean {
    return item.route
      ? this.router.isActive(item.route, {
          paths: 'exact',
          queryParams: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
        })
      : false;
  }
}
