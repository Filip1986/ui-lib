import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BaseBreadcrumbsComponent } from '../base-breadcrumbs/base-breadcrumbs.component';

@Component({
  selector: 'lib-breadcrumbs-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs-2.component.html',
  styleUrl: './breadcrumbs-2.component.scss',
})
export class Breadcrumbs2Component extends BaseBreadcrumbsComponent {
  @Input() separator = '/';
}
