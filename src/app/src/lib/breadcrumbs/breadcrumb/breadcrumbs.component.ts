import { Component, Input } from '@angular/core';

import { Breadcrumbs2Component } from '../breadcrumbs-2/breadcrumbs-2.component';
import { Breadcrumbs3Component } from '../breadcrumbs-3/breadcrumbs-3.component';
import { Breadcrumbs1Component } from '../breadcrumbs-1/breadcrumbs-1.component';
import { BreadcrumbItem, BreadcrumbVariant } from '../models/breadcrumbs-contract';

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [Breadcrumbs2Component, Breadcrumbs3Component, Breadcrumbs1Component],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  @Input() variant: BreadcrumbVariant = '1';
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator = '/';
  @Input() homePage: BreadcrumbItem | null = null;

  // Getter to normalize variant values for backward compatibility
  get normalizedVariant(): string {
    switch (this.variant) {
      case '1':
      case '2':
      case '3':
      default:
        return '1';
    }
  }
}
