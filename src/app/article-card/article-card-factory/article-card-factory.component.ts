import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ArticleCardComponent } from '../article-card.component';
import { ArticleData } from '../models/article-card-contract';

/**
 * Factory component for creating article card widgets with common configurations
 * This simplifies the creation of article cards with preset configurations
 */
@Component({
  selector: 'lib-article-card-factory',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './article-card-factory.component.html',
  styleUrls: ['./article-card-factory.component.scss'],
})
export class ArticleCardFactoryComponent implements OnInit {
  /**
   * Preset widget types with common configurations
   */
  @Input() widgetType: 'standard' | 'compact' | 'featured' | 'custom' = 'standard';

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
   * For custom widget type, the variant to use
   */
  @Input() variant: '1' | '2' | '3' = '1';

  /**
   * For custom widget type, whether to show the image
   */
  @Input() showImage = true;

  /**
   * For custom widget type, whether to show tags
   */
  @Input() showTags = true;

  /**
   * For custom widget type, whether to show metrics
   */
  @Input() showMetrics = true;

  /**
   * For custom widget type, whether to show read more button
   */
  @Input() showReadMore = true;

  /**
   * For custom widget type, the read more button text
   */
  @Input() readMoreText = 'Read More';

  /**
   * For custom widget type, the content preview length
   */
  @Input() contentPreviewLength?: number;

  /**
   * For featured variant, the author avatar URL
   */
  @Input() authorAvatarUrl?: string;

  /**
   * For featured variant, whether to show the featured badge
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

  // Add the missing inputs
  @Input() overlayTitle = true;
  @Input() useGradientOverlay = true;

  /**
   * The processed configuration for the widget
   */
  widgetConfig: {
    variant: '1' | '2' | '3';
    showImage: boolean;
    showTags: boolean;
    showMetrics: boolean;
    showReadMore: boolean;
    readMoreText: string;
    contentPreviewLength?: number;
    authorAvatarUrl?: string;
    overlayTitle: boolean; // Changed from optional to required
    useGradientOverlay: boolean; // Changed from optional to required
    showFeaturedBadge: boolean; // Changed from optional to required
  } = {
    variant: '1',
    showImage: true,
    showTags: true,
    showMetrics: true,
    showReadMore: true,
    readMoreText: 'Read More',
    overlayTitle: false, // Add default value
    useGradientOverlay: false, // Add default value
    showFeaturedBadge: false, // Add default value
  };

  /**
   * Initialize widget configuration based on the widget type
   */
  ngOnInit(): void {
    // Configure widget based on type
    switch (this.widgetType) {
      case 'standard':
        this.widgetConfig = {
          variant: '1',
          showImage: true,
          showTags: true,
          showMetrics: true,
          showReadMore: true,
          readMoreText: 'Continue Reading',
          contentPreviewLength: 150,
          overlayTitle: false, // Add explicit boolean value
          useGradientOverlay: false, // Add explicit boolean value
          showFeaturedBadge: false, // Add explicit boolean value
        };
        break;

      case 'compact':
        this.widgetConfig = {
          variant: '2',
          showImage: true,
          showTags: true,
          showMetrics: true,
          showReadMore: true,
          readMoreText: 'Read Article',
          contentPreviewLength: 100,
          overlayTitle: false, // Add explicit boolean value
          useGradientOverlay: false, // Add explicit boolean value
          showFeaturedBadge: false, // Add explicit boolean value
        };
        break;

      case 'featured':
        this.widgetConfig = {
          variant: '3',
          showImage: true,
          showTags: true,
          showMetrics: true,
          showReadMore: true,
          readMoreText: 'View Full Article',
          contentPreviewLength: 200,
          authorAvatarUrl: this.authorAvatarUrl,
          overlayTitle: true, // Use explicit boolean, not optional
          useGradientOverlay: true, // Use explicit boolean, not optional
          showFeaturedBadge: this.showFeaturedBadge || false, // Ensure boolean value
        };
        break;

      case 'custom':
      default:
        this.widgetConfig = {
          variant: this.variant,
          showImage: this.showImage,
          showTags: this.showTags,
          showMetrics: this.showMetrics,
          showReadMore: this.showReadMore,
          readMoreText: this.readMoreText,
          contentPreviewLength: this.contentPreviewLength,
          authorAvatarUrl: this.authorAvatarUrl,
          overlayTitle: this.overlayTitle || false, // Ensure boolean value
          useGradientOverlay: this.useGradientOverlay || false, // Ensure boolean value
          showFeaturedBadge: this.showFeaturedBadge || false, // Ensure boolean value
        };
        break;
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
