import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BaseSidenavComponent } from '../base-sidenav/base-sidenav.component';

@Component({
  selector: 'lib-sidenav-3',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav-3.component.html',
  styleUrl: './sidenav-3.component.scss',
})
export class Sidenav3Component extends BaseSidenavComponent {}
