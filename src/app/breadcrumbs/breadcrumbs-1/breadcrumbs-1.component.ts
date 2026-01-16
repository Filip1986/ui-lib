import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BaseBreadcrumbsComponent } from '../base-breadcrumbs/base-breadcrumbs.component';

@Component({
  selector: 'lib-breadcrumbs-1',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs-1.component.html',
  styleUrl: './breadcrumbs-1.component.scss',
})
export class Breadcrumbs1Component extends BaseBreadcrumbsComponent {
  @Input() separator = '›';
}
