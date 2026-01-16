# Component Organization Guide

## Overview
This document explains how components are organized in the UI library and how to import them efficiently.

## Component Categories

### 1. Authentication (`/authentication`)
**Purpose**: User authentication and account management  
**Components**:
- Login (3 variants)
- Registration (3 variants)
- Forgot Password (3 variants)
- Reset Password (3 variants)

**Usage**:
```typescript
// Import individual components
import { LoginComponent, Login1Component, Login2Component, Login3Component } from '@ui-lib';

// Import entire category
import * as Auth from '@ui-lib/authentication';
```

---

### 2. Form Elements (`/form-elements`)
**Purpose**: Input controls and form components  
**Components**:
- Input Text, Textarea, Select, Checkbox, Radio Button
- Date Picker, Time Picker, Currency Input, Input Number
- Listbox, Multiselect, Select Button, Icon Select

**Usage**:
```typescript
import { 
  LibInputTextComponent, 
  LibTextareaComponent,
  LibSelectComponent 
} from '@ui-lib';

// Or import from forms category
import { LibInputTextComponent } from '@ui-lib/form-elements';
```

---

### 3. Navigation (`/navigation`)
**Purpose**: Navigation and wayfinding  
**Components**:
- Breadcrumbs (3 variants)
- Sidenav (3 variants)
- Sidenav Footer (3 variants)

**Usage**:
```typescript
import { 
  BreadcrumbsComponent,
  SidenavComponent,
  SidenavFooterComponent 
} from '@ui-lib';

// Or from navigation category
import * as Nav from '@ui-lib/navigation';
```

---

### 4. Layout (`/layout`)
**Purpose**: Structural and container components  
**Components**:
- Card
- Separator

**Usage**:
```typescript
import { CardComponent, SeparatorComponent } from '@ui-lib';
```

---

### 5. Buttons (`/buttons`)
**Purpose**: Action buttons  
**Components**:
- Button 1 (Standard button)
- Button 2 (Animated button)

**Usage**:
```typescript
import { Button1Component, Button2Component } from '@ui-lib';
```

---

### 6. Content (`/content`)
**Purpose**: Content display and forms  
**Components**:
- Article Card (3 variants)
- Contact Form (3 variants)

**Usage**:
```typescript
import { 
  ArticleCardComponent,
  ContactFormComponent 
} from '@ui-lib';
```

---

### 7. Feedback (`/feedback`)
**Purpose**: User feedback and error handling  
**Components**:
- Not Found (404 pages, 3 variants)

**Usage**:
```typescript
import { 
  NotFoundComponent,
  NotFound1Component,
  NotFound2Component,
  NotFound3Component 
} from '@ui-lib';
```

---

### 8. Editors (`/wysiwyg-editors`)
**Purpose**: Rich text editing  
**Components**:
- TipTap Editor
- Quill Editor
- CKEditor
- TinyMCE Editor
- Editor Selection Component

**Usage**:
```typescript
import { 
  TiptapEditorComponent,
  QuillEditorComponent,
  CkeditorEditorComponent,
  TinymceEditorComponent,
  EditorSelectionComponent,
  EditorFactoryService
} from '@ui-lib';
```

---

### 9. Widgets (`/widgets`)
**Purpose**: Dashboard and data visualization  
**Components**:
- Location Widget (3 variants)
- Sales Chart Widget (3 variants)

**Usage**:
```typescript
import { 
  LocationWidgetComponent,
  SalesChartWidgetComponent 
} from '@ui-lib';
```

---

### 10. Core (`/core`)
**Purpose**: Services and utilities  
**Exports**:
- ThemeService

**Usage**:
```typescript
import { ThemeService } from '@ui-lib';
```

---

## Import Strategies

### Strategy 1: Individual Imports (Recommended)
Best for tree-shaking and smaller bundle sizes.

```typescript
import { LoginComponent } from '@ui-lib';
import { LibInputTextComponent } from '@ui-lib';
```

### Strategy 2: Category Imports
Good for feature modules that use multiple components from one category.

```typescript
import * as Auth from '@ui-lib/authentication';
import * as Forms from '@ui-lib/form-elements';
import * as Nav from '@ui-lib/navigation';
```

### Strategy 3: Bulk Import
Use sparingly, only for demo/testing applications.

```typescript
import * as UILib from '@ui-lib';
```

---

## Component Variants

Many components come in multiple variants (e.g., Login1, Login2, Login3). These provide different visual styles for the same functionality.

**Pattern**:
- Base component: `ComponentName` (abstract/interface)
- Factory component: `ComponentNameFactory` (switches between variants)
- Variant components: `ComponentName1`, `ComponentName2`, `ComponentName3`

**Example**:
```typescript
import { 
  LoginComponent,           // Main component
  BaseLoginComponent,       // Base class
  Login1Component,          // Variant 1
  Login2Component,          // Variant 2
  Login3Component,          // Variant 3
  LoginFactoryComponent     // Factory
} from '@ui-lib';
```

---

## Finding Components

1. **By Category**: Check the category that matches your use case
2. **By Name**: Use IDE autocomplete after importing from '@ui-lib'
3. **Storybook**: Browse all components at `http://localhost:6006`
4. **README**: Check main README for component list

---

## Adding New Components

When adding a new component, place it in the appropriate category:

1. Determine the category (authentication, forms, navigation, etc.)
2. Create component in `/src/app/{category}/`
3. Add export to category's `index.ts`
4. Add export to main `public-api.ts` at `/src/app/index.ts`
5. Create Storybook story in `/stories/{category}/`
6. Add documentation to `/docs/guides/components/`

---

**Last Updated**: January 16, 2026

