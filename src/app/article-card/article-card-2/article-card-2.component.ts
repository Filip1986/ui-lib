import { Component, Input } from '@angular/core';

import { BaseArticleCardComponent } from '../base-article-card/base-article-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

/**
 * Second variant of the article card - Compact layout
 * Uses a horizontal layout with the image on the left
 */
@Component({
  selector: 'lib-article-card-2',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './article-card-2.component.html',
  styleUrls: [
    '../base-article-card/base-article-card.component.scss',
    './article-card-2.component.scss',
  ],
})
export class ArticleCard2Component extends BaseArticleCardComponent {
  /**
   * Override default content preview length
   */
  @Input() override contentPreviewLength = 100;

  /**
   * Override default read more text
   */
  @Input() override readMoreText = 'Read Article';
}
