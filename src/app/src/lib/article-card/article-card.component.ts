import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { ArticleCard1Component } from './article-card-1/article-card-1.component';
import { ArticleCard2Component } from './article-card-2/article-card-2.component';
import { ArticleCard3Component } from './article-card-3/article-card-3.component';
import { ArticleData } from './models/article-card-contract';

/**
 * Main article card component that selects the appropriate widget implementation
 * based on the variant specified.
 *
 * This component uses the Factory Pattern to create the appropriate variant.
 */
@Component({
  selector: 'lib-article-card',
  standalone: true,
  imports: [ArticleCard1Component, ArticleCard2Component, ArticleCard3Component],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  /**
   * The selected variant of the article card
   */
  @Input() variant: '1' | '2' | '3' = '1';

  /**
   * The article data to be displayed
   */
  @Input() article: ArticleData = {
    title: 'Sample Article Title',
    content: 'Sample article content goes here.',
  };

  /**
   * Whether the card is in a loading state
   */
  @Input() loading = false;

  /**
   * Error message if data loading failed
   */
  @Input() error = '';

  /**
   * Whether to show the article image
   */
  @Input() showImage = true;

  /**
   * Whether to show tags
   */
  @Input() showTags = true;

  /**
   * Whether to show social metrics
   */
  @Input() showMetrics = true;

  /**
   * Whether to show read more button
   */
  @Input() showReadMore = true;

  /**
   * Read more button text
   */
  @Input() readMoreText = 'Read More';

  /**
   * Content preview length
   */
  @Input() contentPreviewLength?: number;

  /**
   * Author avatar URL (for variant3)
   */
  @Input() authorAvatarUrl?: string;

  /**
   * Whether to overlay title on image (for variant3)
   */
  @Input() overlayTitle = true;

  /**
   * Whether to use gradient overlay (for variant3)
   */
  @Input() useGradientOverlay = true;

  /**
   * Whether to show featured badge (for variant3)
   */
  @Input() showFeaturedBadge = false;

  /**
   * Event emitted when read more button is clicked
   */
  @Output() readMore = new EventEmitter<ArticleData>();

  /**
   * Event emitted when like button is clicked
   */
  @Output() like = new EventEmitter<ArticleData>();

  /**
   * Event emitted when comments button is clicked
   */
  @Output() comment = new EventEmitter<ArticleData>();

  /**
   * Event emitted when share button is clicked
   */
  @Output() share = new EventEmitter<ArticleData>();

  /**
   * Get the component type based on the selected variant
   */
  get widgetComponent(): Type<any> {
    switch (this.variant) {
      case '1':
        return ArticleCard1Component;
      case '2':
        return ArticleCard2Component;
      case '3':
        return ArticleCard3Component;
      default:
        return ArticleCard1Component;
    }
  }

  /**
   * Handles read more event from child component
   * @param article The article data
   */
  onReadMore(article: ArticleData): void {
    this.readMore.emit(article);
  }

  /**
   * Handles like event from child component
   * @param article The article data
   */
  onLike(article: ArticleData): void {
    this.like.emit(article);
  }

  /**
   * Handles comment event from child component
   * @param article The article data
   */
  onComment(article: ArticleData): void {
    this.comment.emit(article);
  }

  /**
   * Handles share event from child component
   * @param article The article data
   */
  onShare(article: ArticleData): void {
    this.share.emit(article);
  }
}
