import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseArticleCardComponent } from '../base-article-card/base-article-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

/**
 * First variant of the article card - Standard layout
 * Uses a traditional card layout with the image at the top
 */
@Component({
  selector: 'lib-article-card-1',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule],
  templateUrl: '../base-article-card/base-article-card.component.html',
  styleUrls: [
    '../base-article-card/base-article-card.component.scss',
    './article-card-1.component.scss',
  ],
})
export class ArticleCard1Component extends BaseArticleCardComponent {
  /**
   * Override default content preview length
   */
  @Input() override contentPreviewLength = 150;

  /**
   * Override default read more text
   */
  @Input() override readMoreText = 'Continue Reading';
}
