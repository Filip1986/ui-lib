import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BaseSidenavComponent } from '../base-sidenav/base-sidenav.component';

@Component({
  selector: 'lib-sidenav-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav-2.component.html',
  styleUrl: './sidenav-2.component.scss',
})
export class Sidenav2Component extends BaseSidenavComponent {}
