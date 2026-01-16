import { IconItem } from './icon-select.component';

/**
 * List of PrimeNG icons organized by category
 */
export const PRIME_ICONS: IconItem[] = [
  // User & People Icons
  { class: 'pi pi-user', name: 'User', category: 'People' },
  { class: 'pi pi-users', name: 'Users', category: 'People' },
  { class: 'pi pi-user-plus', name: 'User Plus', category: 'People' },
  { class: 'pi pi-user-minus', name: 'User Minus', category: 'People' },
  { class: 'pi pi-user-edit', name: 'User Edit', category: 'People' },

  // Navigation Icons
  { class: 'pi pi-home', name: 'Home', category: 'Navigation' },
  { class: 'pi pi-arrow-up', name: 'Arrow Up', category: 'Navigation' },
  { class: 'pi pi-arrow-down', name: 'Arrow Down', category: 'Navigation' },
  { class: 'pi pi-arrow-left', name: 'Arrow Left', category: 'Navigation' },
  { class: 'pi pi-arrow-right', name: 'Arrow Right', category: 'Navigation' },
  { class: 'pi pi-chevron-up', name: 'Chevron Up', category: 'Navigation' },
  { class: 'pi pi-chevron-down', name: 'Chevron Down', category: 'Navigation' },
  { class: 'pi pi-chevron-left', name: 'Chevron Left', category: 'Navigation' },
  { class: 'pi pi-chevron-right', name: 'Chevron Right', category: 'Navigation' },
  { class: 'pi pi-angle-double-up', name: 'Angle Double Up', category: 'Navigation' },
  { class: 'pi pi-angle-double-down', name: 'Angle Double Down', category: 'Navigation' },
  { class: 'pi pi-angle-double-left', name: 'Angle Double Left', category: 'Navigation' },
  { class: 'pi pi-angle-double-right', name: 'Angle Double Right', category: 'Navigation' },
  { class: 'pi pi-bars', name: 'Bars', category: 'Navigation' },
  { class: 'pi pi-external-link', name: 'External Link', category: 'Navigation' },

  // Actions & Controls
  { class: 'pi pi-check', name: 'Check', category: 'Actions' },
  { class: 'pi pi-times', name: 'Times', category: 'Actions' },
  { class: 'pi pi-plus', name: 'Plus', category: 'Actions' },
  { class: 'pi pi-minus', name: 'Minus', category: 'Actions' },
  { class: 'pi pi-trash', name: 'Trash', category: 'Actions' },
  { class: 'pi pi-pencil', name: 'Pencil', category: 'Actions' },
  { class: 'pi pi-refresh', name: 'Refresh', category: 'Actions' },
  { class: 'pi pi-save', name: 'Save', category: 'Actions' },
  { class: 'pi pi-upload', name: 'Upload', category: 'Actions' },
  { class: 'pi pi-download', name: 'Download', category: 'Actions' },
  { class: 'pi pi-cog', name: 'Cog', category: 'Actions' },
  { class: 'pi pi-wrench', name: 'Wrench', category: 'Actions' },
  { class: 'pi pi-filter', name: 'Filter', category: 'Actions' },
  { class: 'pi pi-sort', name: 'Sort', category: 'Actions' },

  // Notifications & Feedback
  { class: 'pi pi-info-circle', name: 'Info Circle', category: 'Notifications' },
  { class: 'pi pi-exclamation-triangle', name: 'Warning', category: 'Notifications' },
  { class: 'pi pi-exclamation-circle', name: 'Exclamation', category: 'Notifications' },
  { class: 'pi pi-question-circle', name: 'Question', category: 'Notifications' },
  { class: 'pi pi-bell', name: 'Bell', category: 'Notifications' },
  { class: 'pi pi-heart', name: 'Heart', category: 'Notifications' },
  { class: 'pi pi-star', name: 'Star', category: 'Notifications' },

  // Communication
  { class: 'pi pi-envelope', name: 'Envelope', category: 'Communication' },
  { class: 'pi pi-phone', name: 'Phone', category: 'Communication' },
  { class: 'pi pi-comment', name: 'Comment', category: 'Communication' },
  { class: 'pi pi-comments', name: 'Comments', category: 'Communication' },
  { class: 'pi pi-share-alt', name: 'Share', category: 'Communication' },

  // Media & Files
  { class: 'pi pi-image', name: 'Image', category: 'Media' },
  { class: 'pi pi-camera', name: 'Camera', category: 'Media' },
  { class: 'pi pi-video', name: 'Video', category: 'Media' },
  { class: 'pi pi-play', name: 'Play', category: 'Media' },
  { class: 'pi pi-pause', name: 'Pause', category: 'Media' },
  { class: 'pi pi-stop', name: 'Stop', category: 'Media' },
  { class: 'pi pi-volume-off', name: 'Volume Off', category: 'Media' },
  { class: 'pi pi-volume-up', name: 'Volume Up', category: 'Media' },
  { class: 'pi pi-file', name: 'File', category: 'Files' },
  { class: 'pi pi-file-pdf', name: 'PDF', category: 'Files' },
  { class: 'pi pi-file-excel', name: 'Excel', category: 'Files' },
  { class: 'pi pi-file-word', name: 'Word', category: 'Files' },
  { class: 'pi pi-folder', name: 'Folder', category: 'Files' },
  { class: 'pi pi-folder-open', name: 'Folder Open', category: 'Files' },

  // Security
  { class: 'pi pi-lock', name: 'Lock', category: 'Security' },
  { class: 'pi pi-unlock', name: 'Unlock', category: 'Security' },
  { class: 'pi pi-key', name: 'Key', category: 'Security' },
  { class: 'pi pi-shield', name: 'Shield', category: 'Security' },
  { class: 'pi pi-eye', name: 'Eye', category: 'Security' },
  { class: 'pi pi-eye-slash', name: 'Eye Slash', category: 'Security' },

  // Data & Charts
  { class: 'pi pi-chart-bar', name: 'Bar Chart', category: 'Data' },
  { class: 'pi pi-chart-line', name: 'Line Chart', category: 'Data' },
  { class: 'pi pi-chart-pie', name: 'Pie Chart', category: 'Data' },
  { class: 'pi pi-table', name: 'Table', category: 'Data' },
  { class: 'pi pi-list', name: 'List', category: 'Data' },
  { class: 'pi pi-database', name: 'Database', category: 'Data' },
  { class: 'pi pi-sitemap', name: 'Sitemap', category: 'Data' },

  // Finance
  { class: 'pi pi-dollar', name: 'Dollar', category: 'Finance' },
  { class: 'pi pi-euro', name: 'Euro', category: 'Finance' },
  { class: 'pi pi-money-bill', name: 'Money Bill', category: 'Finance' },
  { class: 'pi pi-percentage', name: 'Percentage', category: 'Finance' },
  { class: 'pi pi-wallet', name: 'Wallet', category: 'Finance' },
  { class: 'pi pi-credit-card', name: 'Credit Card', category: 'Finance' },

  // Date & Time
  { class: 'pi pi-calendar', name: 'Calendar', category: 'Date & Time' },
  { class: 'pi pi-calendar-plus', name: 'Calendar Plus', category: 'Date & Time' },
  { class: 'pi pi-calendar-minus', name: 'Calendar Minus', category: 'Date & Time' },
  { class: 'pi pi-calendar-times', name: 'Calendar Times', category: 'Date & Time' },
  { class: 'pi pi-clock', name: 'Clock', category: 'Date & Time' },
  { class: 'pi pi-history', name: 'History', category: 'Date & Time' },

  // Location & Travel
  { class: 'pi pi-map', name: 'Map', category: 'Location' },
  { class: 'pi pi-map-marker', name: 'Map Marker', category: 'Location' },
  { class: 'pi pi-compass', name: 'Compass', category: 'Location' },
  { class: 'pi pi-globe', name: 'Globe', category: 'Location' },
  { class: 'pi pi-car', name: 'Car', category: 'Location' },
  { class: 'pi pi-plane', name: 'Plane', category: 'Location' },

  // Shopping & E-commerce
  { class: 'pi pi-shopping-cart', name: 'Shopping Cart', category: 'Shopping' },
  { class: 'pi pi-shopping-bag', name: 'Shopping Bag', category: 'Shopping' },
  { class: 'pi pi-tag', name: 'Tag', category: 'Shopping' },
  { class: 'pi pi-tags', name: 'Tags', category: 'Shopping' },
  { class: 'pi pi-gift', name: 'Gift', category: 'Shopping' },

  // Other
  { class: 'pi pi-link', name: 'Link', category: 'Other' },
  { class: 'pi pi-paperclip', name: 'Paperclip', category: 'Other' },
  { class: 'pi pi-cloud', name: 'Cloud', category: 'Other' },
  { class: 'pi pi-cloud-upload', name: 'Cloud Upload', category: 'Other' },
  { class: 'pi pi-cloud-download', name: 'Cloud Download', category: 'Other' },
  { class: 'pi pi-bookmark', name: 'Bookmark', category: 'Other' },
  { class: 'pi pi-language', name: 'Language', category: 'Other' },
  { class: 'pi pi-print', name: 'Print', category: 'Other' },
  { class: 'pi pi-search', name: 'Search', category: 'Other' },
  { class: 'pi pi-sync', name: 'Sync', category: 'Other' },
  { class: 'pi pi-book', name: 'Book', category: 'Other' },
];
