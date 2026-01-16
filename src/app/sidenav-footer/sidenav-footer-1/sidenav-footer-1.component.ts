import { Component } from '@angular/core';

import { BaseSidenavFooterComponent } from '../base-sidenav-footer/base-sidenav-footer.component';

@Component({
  selector: 'lib-sidenav-footer-1',
  standalone: true,
  imports: [],
  templateUrl: './sidenav-footer-1.component.html',
  styleUrl: './sidenav-footer-1.component.scss',
})
export class SidenavFooter1Component extends BaseSidenavFooterComponent {
  onLogoutClick(): void {
    this.logoutClick.emit();
  }
}
