import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NavItem, SidenavVariant } from './models/sidenav-contract';
import { SidenavService } from './service/sidenav.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidenavFactoryComponent } from './sidenav-factory/sidenav-factory.component';

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [RouterModule, SidenavFactoryComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() title = 'Navigation';
  @Input() variant: SidenavVariant = '1';
  @Input() items: NavItem[] = [];
  @Input() logo?: string;
  @Input() isBetaTester = false;

  expanded = true;

  @Output() itemClick: EventEmitter<NavItem> = new EventEmitter<NavItem>();
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.expanded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((expanded: boolean): void => {
        this.expanded = expanded;
      });

    if (this.items.length > 0) {
      this.sidenavService.setItems(this.items);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onItemClick(item: NavItem): void {
    this.itemClick.emit(item);
  }

  onExpandChange(expanded: boolean): void {
    this.expandChange.emit(expanded);
  }
}
