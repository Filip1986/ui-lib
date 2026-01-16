// Angular i18n
import '@angular/localize/init';

/**
 * ============================================================================
 * UI LIBRARY - PUBLIC API
 * ============================================================================
 * This file serves as the main entry point for the component library.
 * Components are organized by category for easy discovery and usage.
 */

// ============================================================================
// CORE - Services, Utilities, and Base Functionality
// ============================================================================
export * from './core/services/theme.service';

// ============================================================================
// AUTHENTICATION - Login, Registration, Password Management
// ============================================================================
export * from './login/index';
export * from './registration/index';
export * from './forgot-password/index';
export * from './reset-password/index';

// Category export (alternative import path)
export * from './authentication/index';

// ============================================================================
// FORM ELEMENTS - Input Components and Form Controls
// ============================================================================
export * from './form-elements/index';

// ============================================================================
// NAVIGATION - Breadcrumbs, Menus, and Navigation Components
// ============================================================================
export * from './breadcrumbs/index';
export * from './sidenav/index';
export * from './sidenav-footer/index';

// Category export (alternative import path)
export * from './navigation/index';

// ============================================================================
// LAYOUT - Cards, Containers, and Layout Components
// ============================================================================
export * from './card/index';
export * from './separator/separator.component';

// Category export (alternative import path)
export * from './layout/index';

// ============================================================================
// BUTTONS - Button Components and Variants
// ============================================================================
export * from './buttons/button-1/button-1.component';
export * from './buttons/button-2/button-2.component';

// ============================================================================
// CONTENT - Article Cards, Contact Forms, and Content Components
// ============================================================================
export * from './article-card/index';
export * from './contact-form';

// Category export (alternative import path)
export * from './content/index';

// ============================================================================
// FEEDBACK - Error Pages, Notifications, and User Feedback
// ============================================================================
export * from './not-found/index';

// Category export (alternative import path)
export * from './feedback/index';

// ============================================================================
// EDITORS - WYSIWYG Editors and Rich Text Components
// ============================================================================
export * from './wysiwyg-editors';

// ============================================================================
// WIDGETS - Dashboard Widgets and Data Visualization
// ============================================================================
export * from './widgets/location-widget/index';
export * from './widgets/sales-chart-widget/index';
