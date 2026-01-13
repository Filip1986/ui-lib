import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BaseBreadcrumbsComponent } from '../base-breadcrumbs/base-breadcrumbs.component';

@Component({
  selector: 'lib-breadcrumbs-3',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs-3.component.html',
  styleUrl: './breadcrumbs-3.component.scss',
})
export class Breadcrumbs3Component extends BaseBreadcrumbsComponent {
  // No additional properties needed for this variant
}
