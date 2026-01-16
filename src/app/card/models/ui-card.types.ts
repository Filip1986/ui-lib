export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardConfig {
  variant?: CardVariant;
  shadow?: boolean;
  clickable?: boolean;
  className?: string;
}

/**
 * CardStyle variants for different visual styles
 */
export type UiCardStyle =
  | 'default' // Standard card with subtle shadow
  | 'elevated' // Card with strong elevation and hover effects
  | 'outlined' // Card with prominent border, no shadow
  | 'filled' // Card with gradient background
  | 'glass' // Modern glass-morphism effect
  | 'minimal' // Clean minimal design
  | 'gradient' // Card with gradient border
  | 'neon' // Vibrant neon-style borders
  | 'modern' // Contemporary design with accent colors
  | 'vintage'; // Retro-styled card with warm colors
