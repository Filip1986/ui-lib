# Component Index

A complete alphabetical and categorical index of all components in the UI library.

## Alphabetical Index

| Component | Category | Variants | Description |
|-----------|----------|----------|-------------|
| Article Card | Content | 3 | Article preview and display cards |
| Breadcrumbs | Navigation | 3 | Navigation breadcrumb trails |
| Button 1 | Buttons | 1 | Standard action button |
| Button 2 | Buttons | 1 | Animated action button |
| Card | Layout | 1 | Content container card |
| Checkbox | Forms | 1 | Checkbox input control |
| CKEditor | Editors | 1 | Classic WYSIWYG editor |
| Contact Form | Content | 3 | Contact form components |
| Currency Input | Forms | 1 | Formatted currency input |
| Date Picker | Forms | 1 | Date selection control |
| Editor Selection | Editors | 1 | Editor type selector |
| Forgot Password | Authentication | 3 | Password recovery forms |
| Icon Select | Forms | 1 | Icon picker control |
| Input Number | Forms | 1 | Numeric input control |
| Input Text | Forms | 1 | Text input control |
| Listbox | Forms | 1 | List selection control |
| Location Widget | Widgets | 3 | Map-based location display |
| Login | Authentication | 3 | Login form components |
| Multiselect | Forms | 1 | Multiple selection control |
| Not Found | Feedback | 3 | 404 error pages |
| Quill Editor | Editors | 1 | Delta-based rich text editor |
| Radio Button | Forms | 1 | Radio button control |
| Registration | Authentication | 3 | User registration forms |
| Reset Password | Authentication | 3 | Password reset forms |
| Sales Chart Widget | Widgets | 3 | Sales data visualization |
| Select | Forms | 1 | Dropdown selection control |
| Select Button | Forms | 1 | Button-style selection |
| Separator | Layout | 1 | Visual divider |
| Sidenav | Navigation | 3 | Side navigation menu |
| Sidenav Footer | Navigation | 3 | Navigation footer |
| Textarea | Forms | 1 | Multi-line text input |
| Time Picker | Forms | 1 | Time selection control |
| TinyMCE Editor | Editors | 1 | Full-featured WYSIWYG editor |
| TipTap Editor | Editors | 1 | Modern rich text editor |

---

## By Category

### 🔐 Authentication (4 components, 12 variants)
- **Login** (3 variants) - User authentication forms
- **Registration** (3 variants) - New user signup forms  
- **Forgot Password** (3 variants) - Password recovery flows
- **Reset Password** (3 variants) - Password reset forms

### 📝 Form Elements (13 components)
- **Checkbox** - Boolean input control
- **Currency Input** - Formatted monetary input
- **Date Picker** - Calendar date selection
- **Icon Select** - Icon picker with preview
- **Input Number** - Numeric value input
- **Input Text** - Single-line text input
- **Listbox** - List-based selection
- **Multiselect** - Multiple item selection
- **Radio Button** - Single choice from group
- **Select** - Dropdown selection
- **Select Button** - Button-style selection
- **Textarea** - Multi-line text input
- **Time Picker** - Time selection control

### 🧭 Navigation (3 components, 9 variants)
- **Breadcrumbs** (3 variants) - Hierarchical page navigation
- **Sidenav** (3 variants) - Collapsible side menu
- **Sidenav Footer** (3 variants) - Navigation footer section

### 📐 Layout (2 components)
- **Card** - Flexible content container
- **Separator** - Horizontal/vertical divider

### 🔘 Buttons (2 components)
- **Button 1** - Standard action button
- **Button 2** - Animated button with effects

### 📄 Content (2 components, 6 variants)
- **Article Card** (3 variants) - Blog/news article previews
- **Contact Form** (3 variants) - User contact forms

### 💬 Feedback (1 component, 3 variants)
- **Not Found** (3 variants) - Custom 404 error pages

### ✍️ Editors (5 components)
- **CKEditor** - Classic WYSIWYG editor
- **Editor Selection** - Editor type chooser
- **Quill Editor** - Delta-format editor
- **TinyMCE Editor** - Feature-rich editor
- **TipTap Editor** - Modern ProseMirror-based editor

### 📊 Widgets (2 components, 6 variants)
- **Location Widget** (3 variants) - Interactive map displays
- **Sales Chart Widget** (3 variants) - Sales data charts

---

## Statistics

- **Total Component Families**: 34
- **Total Variants**: 46
- **Categories**: 9
- **Most Variants**: Authentication (12), Navigation (9)
- **Form Components**: 13

---

## Import Paths

All components can be imported from the main entry point:

```typescript
import { ComponentName } from '@ui-lib';
```

Or from category-specific paths:

```typescript
import { ComponentName } from '@ui-lib/authentication';
import { ComponentName } from '@ui-lib/form-elements';
import { ComponentName } from '@ui-lib/navigation';
import { ComponentName } from '@ui-lib/layout';
import { ComponentName } from '@ui-lib/content';
import { ComponentName } from '@ui-lib/feedback';
import { ComponentName } from '@ui-lib/wysiwyg-editors';
import { ComponentName } from '@ui-lib/widgets';
```

---

## Component Naming Conventions

### Prefixes
- `Lib` prefix: Core form components (e.g., `LibInputTextComponent`)
- No prefix: Feature components (e.g., `LoginComponent`)
- `Base` prefix: Abstract base classes (e.g., `BaseLoginComponent`)

### Suffixes
- `Component`: All component classes
- `Factory`: Factory components that switch between variants
- `Service`: Injectable services
- Numbers (1, 2, 3): Variant indicators

### Examples
- `LibInputTextComponent` - Form input component
- `Login1Component` - First variant of login
- `LoginFactoryComponent` - Factory for login variants
- `BaseLoginComponent` - Abstract base class

---

**Last Updated**: January 16, 2026

