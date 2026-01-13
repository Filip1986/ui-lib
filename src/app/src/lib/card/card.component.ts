import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UiCardStyle } from './models/ui-card.types';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    RippleModule,
    TooltipModule
],
})
export class CardComponent implements OnInit {
  // Visual Style Properties
  @Input() style: UiCardStyle = 'default';
  @Input() cardStyle: { [key: string]: any } = {};
  @Input() clickable = false;
  @Input() disabled = false;
  @Input() loading = false;

  // Content Properties
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() description?: string;
  @Input() headerImage?: string;
  @Input() headerImageAlt?: string;
  @Input() headerIcon?: string;

  // NEW: Title Background Property
  @Input() titleBackground = false;

  // Tags and Metadata
  @Input() tags: Array<{
    label: string;
    severity?: 'success' | 'warn' | 'info' | 'secondary' | 'danger' | 'contrast' | undefined;
    style?: { [key: string]: any };
  }> = [];

  @Input() metadata: Array<{
    label: string;
    value: string;
    icon?: string;
  }> = [];

  // Footer Properties
  @Input() showFooter = false;
  @Input() footerText?: string;
  @Input() primaryAction?: {
    label: string;
    icon?: string;
    severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger';
    size?: 'small' | 'large';
    outlined?: boolean;
    loading?: boolean;
    disabled?: boolean;
    action?: () => void;
  };
  @Input() secondaryAction?: {
    label: string;
    icon?: string;
    severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger';
    size?: 'small' | 'large';
    outlined?: boolean;
    loading?: boolean;
    disabled?: boolean;
    action?: () => void;
  };

  // Status Properties
  @Input() status?: 'success' | 'warn' | 'error' | 'info' | 'active' | 'inactive';
  @Input() statusTooltip?: string;

  // Events
  @Input() cardClick?: () => void;

  // Internal state
  hasProjectedContent = false;
  hasProjectedFooter = false;

  ngOnInit() {
    // Check for projected content (this is a simplified check)
    // In a real implementation, you might use ViewChild or ContentChild
    this.hasProjectedContent = true; // Assume true for now
    this.hasProjectedFooter = this.showFooter;
  }

  /**
   * Get CSS classes for the card wrapper
   */
  getCardClasses(): string {
    const classes = [
      'styled-card',
      `styled-card-${this.style}`,
      this.clickable ? 'clickable' : '',
      this.disabled ? 'disabled' : '',
      this.loading ? 'loading' : '',
      this.status ? `status-${this.status}` : '',
      this.titleBackground ? 'title-background' : '', // NEW: Add conditional class
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Handle card click events
   */
  onCardClick(): void {
    if (this.clickable && !this.disabled && !this.loading && this.cardClick) {
      this.cardClick();
    }
  }

  /**
   * Handle action button clicks
   */
  onActionClick(action: any, event: Event): void {
    event.stopPropagation();
    if (action.action) {
      action.action();
    }
  }

  /**
   * Track by function for tags
   */
  trackByTag(index: number, tag: any): any {
    return tag.label || index;
  }

  /**
   * Track by function for metadata
   */
  trackByMetadata(index: number, meta: any): any {
    return meta.label || index;
  }
}
