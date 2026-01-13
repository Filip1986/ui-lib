/**
 * Interface for article data that will be displayed in the card
 */
export interface ArticleData {
  /** Article title */
  title: string;
  /** Article subtitle or brief description */
  subtitle?: string;
  /** Full article content or body */
  content: string;
  /** Article author name */
  author?: string;
  /** Publication date */
  date?: Date | string;
  /** Read time in minutes */
  readTime?: number;
  /** URL of the article image */
  imageUrl?: string;
  /** Article tags or categories */
  tags?: string[];
  /** URL to the full article */
  articleUrl?: string;
  /** Number of likes */
  likes?: number;
  /** Number of comments */
  comments?: number;
  /** Number of shares */
  shares?: number;
}

/**
 * Enum for the different card variants
 */
export enum ArticleCardVariant {
  DEFAULT = 'default',
  COMPACT = 'compact',
  FEATURED = 'featured',
}

/**
 * Interface for component event handlers
 */
export interface ArticleCardEvents {
  /** Event emitted when read more is clicked */
  onReadMore?: (articleId: string) => void;
  /** Event emitted when share is clicked */
  onShare?: (article: ArticleData) => void;
  /** Event emitted when card is clicked */
  onClick?: (articleId: string) => void;
  /** Event emitted when like button is clicked */
  onLike?: (articleId: string) => void;
  /** Event emitted when save/bookmark is clicked */
  onSave?: (articleId: string) => void;
}
