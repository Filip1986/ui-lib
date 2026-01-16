import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-base-sidenav-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './base-sidenav-footer.component.html',
  styleUrl: './base-sidenav-footer.component.scss',
})
export class BaseSidenavFooterComponent {
  @Input() logo?: string;
  @Input() expanded = true;
  @Input() isBetaTester = false;

  @Output() logoutClick: EventEmitter<void> = new EventEmitter<void>();
}
