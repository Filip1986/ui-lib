import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NavItem, SidenavVariant } from '../models/sidenav-contract';
import { Sidenav1Component } from '../sidenav-1/sidenav-1.component';
import { Sidenav3Component } from '../sidenav-3/sidenav-3.component';
import { Sidenav2Component } from '../sidenav-2/sidenav-2.component';

@Component({
  selector: 'lib-sidenav-factory',
  standalone: true,
  imports: [RouterModule, Sidenav1Component, Sidenav3Component, Sidenav2Component],
  templateUrl: './sidenav-factory.component.html',
  styleUrl: './sidenav-factory.component.scss',
})
export class SidenavFactoryComponent {
  @Input() title = 'Navigation';
  @Input() variant: SidenavVariant = '1';
  @Input() items: NavItem[] = [];
  @Input() logo?: string;
  @Input() expanded = true;
  @Input() isBetaTester = false;

  @Output() itemClick: EventEmitter<NavItem> = new EventEmitter<NavItem>();
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onItemClick(item: NavItem): void {
    this.itemClick.emit(item);
  }

  onExpandChange(expanded: boolean): void {
    this.expandChange.emit(expanded);
  }
}
