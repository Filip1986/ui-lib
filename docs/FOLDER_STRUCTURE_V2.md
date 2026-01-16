# Folder Structure Guide - Updated January 16, 2026

## Current Structure (Final Simplified Version)

```
ui-lib/
├── 📁 .angular/                 # Angular build cache
├── 📁 .storybook/               # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
│   └── preview-head.html
│
├── 📁 docs/                     # Documentation
│   ├── 📁 architecture/
│   ├── 📁 design-system/
│   ├── 📁 guides/
│   └── 📁 storybook/
│
├── 📁 src/
│   ├── 📁 app/                  # ⭐ All library components here
│   │   │
│   │   ├── 📁 authentication/   # 🔐 Auth category exports
│   │   ├── 📁 navigation/       # 🧭 Nav category exports
│   │   ├── 📁 layout/           # 📐 Layout category exports
│   │   ├── 📁 content/          # 📄 Content category exports
│   │   ├── 📁 feedback/         # 💬 Feedback category exports
│   │   │
│   │   ├── 📁 login/            # Components
│   │   ├── 📁 registration/
│   │   ├── 📁 forgot-password/
│   │   ├── 📁 reset-password/
│   │   ├── 📁 form-elements/
│   │   ├── 📁 breadcrumbs/
│   │   ├── 📁 sidenav/
│   │   ├── 📁 sidenav-footer/
│   │   ├── 📁 card/
│   │   ├── 📁 separator/
│   │   ├── 📁 buttons/
│   │   ├── 📁 article-card/
│   │   ├── 📁 contact-form/
│   │   ├── 📁 not-found/
│   │   ├── 📁 wysiwyg-editors/
│   │   ├── 📁 widgets/
│   │   ├── 📁 core/
│   │   │
│   │   ├── app.ts               # Demo app
│   │   ├── app.config.ts
│   │   └── index.ts             # ⭐ Public API
│   │
│   ├── 📁 stories/              # Example stories
│   ├── styles.scss
│   ├── main.ts
│   └── index.html
│
├── 📄 package.json
├── 📄 angular.json
├── 📄 README.md
└── 📄 tsconfig.json
```

## Key Directories

### 📁 `src/app/` ⭐
**The main library code.** All components are directly here - maximum simplicity!

**Evolution:**
- **v1**: `src/app/src/lib/login/` (too nested)
- **v2**: `src/app/src/login/` (removed /lib)
- **v3 (Current)**: `src/app/login/` (removed /src) ✨

### Category Folders
These provide alternative import paths:
- `authentication/` - Auth component exports
- `navigation/` - Navigation component exports
- `layout/` - Layout component exports
- `content/` - Content component exports
- `feedback/` - Feedback component exports

Example:
```typescript
import { LoginComponent } from '@ui-lib/authentication';
```

### Component Folders
Each component has:
- Main component file
- Variant components (if any)
- Base/abstract component
- Factory component (if applicable)
- Models/interfaces
- `index.ts` (barrel export)

## Import Patterns

### Pattern 1: Direct Import (Recommended)
```typescript
import { LoginComponent } from '@ui-lib';
```

### Pattern 2: Category Import
```typescript
import { LoginComponent } from '@ui-lib/authentication';
```

### Pattern 3: Internal Import (Development)
```typescript
import { LoginComponent } from './login/login.component';
```

## File Naming Conventions

### Components
- `component-name.component.ts` - Main component
- `component-name.component.html` - Template
- `component-name.component.scss` - Styles
- `component-name.component.spec.ts` - Tests
- `component-name.component.stories.ts` - Storybook stories

### Special Files
- `index.ts` - Barrel exports
- `base-component-name.component.ts` - Abstract base
- `component-name-factory.component.ts` - Factory
- `component-name-contract.ts` - Interfaces, types

## Where to Add New Components

| Component Type | Location | Category Export |
|----------------|----------|-----------------|
| Auth component | `/src/app/` | ✅ authentication/ |
| Form control | `/src/app/form-elements/` | ✅ Yes |
| Navigation | `/src/app/` | ✅ navigation/ |
| Layout | `/src/app/` | ✅ layout/ |
| Button | `/src/app/buttons/` | ⚠️ Consider adding |
| Content | `/src/app/` | ✅ content/ |
| Feedback | `/src/app/` | ✅ feedback/ |
| Editor | `/src/app/wysiwyg-editors/` | ⚠️ Consider adding |
| Widget | `/src/app/widgets/` | ⚠️ Consider adding |
| Service | `/src/app/core/services/` | N/A |
| Utility | `/src/app/core/utils/` | N/A |
| Model | `/src/app/core/models/` | N/A |

## Best Practices

### ✅ DO
- Keep components directly in `src/app/`
- Use barrel exports (`index.ts`)
- Create category-level exports
- Follow consistent naming
- Keep related files together

### ❌ DON'T
- Create deep nesting
- Mix library with demo code in wrong places
- Export internal details
- Create circular dependencies
- Forget public API updates

## Benefits of Current Structure

✅ **Maximum Simplicity** - Flattest possible structure  
✅ **Shortest Paths** - `src/app/login/` vs `src/app/src/lib/login/`  
✅ **Easy Navigation** - Direct access  
✅ **Industry Standard** - Common Angular pattern  
✅ **Clear Separation** - Library code in app/, examples in stories/  

---

**Last Updated**: January 16, 2026  
**Current Version**: v3 (Final simplified structure)

