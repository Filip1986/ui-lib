import { Component, Input } from '@angular/core';

import { BaseArticleCardComponent } from '../base-article-card/base-article-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

/**
 * Third variant of the article card - Featured layout
 * Uses an enhanced layout with overlay elements and author avatar
 */
@Component({
  selector: 'lib-article-card-3',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, AvatarModule],
  templateUrl: './article-card-3.component.html',
  styleUrls: [
    '../base-article-card/base-article-card.component.scss',
    './article-card-3.component.scss',
  ],
})
export class ArticleCard3Component extends BaseArticleCardComponent {
  /**
   * Override default content preview length
   */
  @Input() override contentPreviewLength = 200;

  /**
   * Override default read more text
   */
  @Input() override readMoreText = 'View Full Article';

  /**
   * Avatar URL for the author
   */
  @Input() authorAvatarUrl?: string;

  /**
   * Whether to overlay the title on the image
   */
  @Input() overlayTitle = true;

  /**
   * Whether to use a gradient overlay on the image
   */
  @Input() useGradientOverlay = true;

  /**
   * Whether to show a featured badge
   */
  @Input() showFeaturedBadge = false;
}
