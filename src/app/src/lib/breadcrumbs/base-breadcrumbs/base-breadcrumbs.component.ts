import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../models/breadcrumbs-contract';

@Component({
  standalone: true,
  template: '',
})
export class BaseBreadcrumbsComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];
  @Input() homePage: BreadcrumbItem | null = null;

  /**
   * Initialize the component
   * If homePage is provided, add it to the beginning of the items array
   */
  ngOnInit(): void {
    if (this.homePage) {
      this.items = [this.homePage, ...this.items];
    }
  }
}
