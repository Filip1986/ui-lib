import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SidenavFooter1Component } from '../sidenav-footer-1/sidenav-footer-1.component';
import { SidenavFooter2Component } from '../sidenav-footer-2/sidenav-footer-2.component';
import { SidenavFooter3Component } from '../sidenav-footer-3/sidenav-footer-3.component';
import { SidenavFooterVariant } from '../models/sidenav-footer-contract';

@Component({
  selector: 'lib-sidenav-footer-factory',
  standalone: true,
  imports: [
    SidenavFooter1Component,
    SidenavFooter2Component,
    SidenavFooter3Component
],
  templateUrl: './sidenav-footer-factory.component.html',
  styleUrl: './sidenav-footer-factory.component.scss',
})
export class SidenavFooterFactoryComponent {
  @Input() variant: SidenavFooterVariant = '1';
  @Input() logo?: string;
  @Input() expanded = true;
  @Input() isBetaTester = false;

  @Output() logoutClick: EventEmitter<void> = new EventEmitter<void>();

  onItemClick(): void {
    this.logoutClick.emit();
  }
}
