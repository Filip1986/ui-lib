import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ArticleData } from '../models/article-card-contract';

/**
 * Base component for article card widgets that displays article information
 * This component can be extended or used directly to display article data
 */
@Component({
  selector: 'lib-base-article-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './base-article-card.component.html',
  styleUrls: ['./base-article-card.component.scss'],
})
export class BaseArticleCardComponent {
  /**
   * The article data to be displayed
   */
  @Input() article: ArticleData = {
    title: 'Sample Article Title',
    content: 'Sample article content goes here.',
  };

  /**
   * Whether to show the article image
   */
  @Input() showImage = true;

  /**
   * Maximum length of content preview
   */
  @Input() contentPreviewLength = 150;

  /**
   * Whether the card is in a loading state
   */
  @Input() loading = false;

  /**
   * Whether the card is in an error state
   */
  @Input() error = '';

  /**
   * Whether to show tags
   */
  @Input() showTags = true;

  /**
   * Whether to show social metrics (likes, comments, shares)
   */
  @Input() showMetrics = true;

  /**
   * Whether to show read more button
   */
  @Input() showReadMore = true;

  /**
   * Text for read more button
   */
  @Input() readMoreText = 'Read More';

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
   * Formats date to readable string
   * @param date The date to format
   * @returns A formatted date string
   */
  formatDate(date: Date | string | undefined): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Truncates text to specified length with ellipsis
   * @param text The text to truncate
   * @param maxLength Maximum allowed length
   * @returns Truncated text
   */
  truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Handles the read more button click
   */
  onReadMore(): void {
    this.readMore.emit(this.article);
  }

  /**
   * Handles the like button click
   */
  onLike(): void {
    this.like.emit(this.article);
  }

  /**
   * Handles the comment button click
   */
  onComment(): void {
    this.comment.emit(this.article);
  }

  /**
   * Handles the share button click
   */
  onShare(): void {
    this.share.emit(this.article);
  }
}
