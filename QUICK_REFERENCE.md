# 📋 Quick Reference - Component Library Structure

## 🎯 Quick Navigation

| Need | Go To |
|------|-------|
| Find a component | [COMPONENT_INDEX.md](docs/COMPONENT_INDEX.md) |
| Learn how to import | [COMPONENT_ORGANIZATION.md](docs/guides/COMPONENT_ORGANIZATION.md) |
| Understand structure | [FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) |
| Plan migration | [RESTRUCTURE_PLAN.md](RESTRUCTURE_PLAN.md) |
| See what changed | [IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md) |

---

## 🔍 Find Components Fast

### By Category
- **🔐 Auth**: Login, Registration, Password Recovery
- **📝 Forms**: 13 input components
- **🧭 Nav**: Breadcrumbs, Sidenav, Footer
- **📐 Layout**: Card, Separator
- **🔘 Buttons**: 2 button variants
- **📄 Content**: Article Cards, Contact Forms
- **💬 Feedback**: 404 Pages
- **✍️ Editors**: 4 WYSIWYG editors
- **📊 Widgets**: Location, Sales Charts

### By Name (Most Used)
```typescript
// Authentication
import { LoginComponent } from '@ui-lib';
import { RegistrationComponent } from '@ui-lib';
import { ForgotPasswordComponent } from '@ui-lib';

// Forms
import { LibInputTextComponent } from '@ui-lib';
import { LibTextareaComponent } from '@ui-lib';
import { LibSelectComponent } from '@ui-lib';
import { LibCheckboxComponent } from '@ui-lib';

// Navigation
import { BreadcrumbsComponent } from '@ui-lib';
import { SidenavComponent } from '@ui-lib';

// Layout
import { CardComponent } from '@ui-lib';

// Content
import { ArticleCardComponent } from '@ui-lib';
import { ContactFormComponent } from '@ui-lib';
```

---

## 📦 Import Strategies

### Strategy 1: Individual (Recommended)
```typescript
import { LoginComponent } from '@ui-lib';
```
**Use when**: Importing 1-3 components  
**Benefit**: Best tree-shaking, smallest bundle

### Strategy 2: Category
```typescript
import * as Auth from '@ui-lib/authentication';
```
**Use when**: Need multiple components from one category  
**Benefit**: Clean imports, organized code

### Strategy 3: Bulk
```typescript
import * as UILib from '@ui-lib';
```
**Use when**: Demo/testing apps only  
**Warning**: Larger bundle size

---

## 📂 Folder Structure (Simplified)

```
ui-lib/
├── 📁 src/app/                  ⭐ All components here!
│   ├── 📁 authentication/       🔐 Auth category
│   ├── 📁 navigation/           🧭 Nav category
│   ├── 📁 layout/               📐 Layout category
│   ├── 📁 content/              📄 Content category
│   ├── 📁 feedback/             💬 Feedback category
│   ├── 📁 form-elements/        📝 All form controls
│   ├── 📁 wysiwyg-editors/      ✍️ Text editors
│   ├── 📁 widgets/              📊 Dashboard widgets
│   ├── 📁 buttons/              🔘 Action buttons
│   └── 📁 core/                 🔧 Services & utils
├── 📁 docs/                     📚 Documentation
└── 📁 .storybook/               📖 Storybook config
```

---

## 🎨 Component Categories

| Category | Count | Examples |
|----------|-------|----------|
| 🔐 Authentication | 12 variants | Login, Registration, Reset Password |
| 📝 Form Elements | 13 components | Input, Select, Checkbox, Date Picker |
| 🧭 Navigation | 9 variants | Breadcrumbs, Sidenav |
| 📐 Layout | 2 | Card, Separator |
| 🔘 Buttons | 2 | Standard, Animated |
| 📄 Content | 6 variants | Article Card, Contact Form |
| 💬 Feedback | 3 variants | 404 Pages |
| ✍️ Editors | 5 | TipTap, Quill, CKEditor, TinyMCE |
| 📊 Widgets | 6 variants | Location, Sales Charts |

**Total**: 34 component families, 46 variants

---

## 🚀 Quick Tasks

### View in Storybook
```bash
npm run storybook
# Open http://localhost:6006
```

### Run Dev Server
```bash
npm start
# Open http://localhost:4200
```

### Run Tests
```bash
npm test
```

### Build Library
```bash
npm run build
```

---

## 💡 Component Naming

| Pattern | Example | Meaning |
|---------|---------|---------|
| `Lib` prefix | `LibInputTextComponent` | Core form control |
| Number suffix | `Login1Component` | Variant number |
| `Factory` suffix | `LoginFactoryComponent` | Variant switcher |
| `Base` prefix | `BaseLoginComponent` | Abstract base |
| No prefix | `CardComponent` | Feature component |

---

## 📝 Adding New Components

1. Choose category from list above
2. Create in `/src/app/{category}/`
3. Add to category's `index.ts`
4. Add to main `index.ts`
5. Create story in `/stories/{category}/`
6. Document in `/docs/guides/components/`

---

## 🎯 Component Variants

Many components have 3 visual variants:

```typescript
// Base/interface
LoginComponent

// Variants
Login1Component  // Style 1
Login2Component  // Style 2
Login3Component  // Style 3

// Factory (switches between variants)
LoginFactoryComponent
```

**Use factory when**: Need to switch variants dynamically  
**Use variant directly when**: Know which style you want

---

## ⚡ Performance Tips

1. **Use individual imports** for best tree-shaking
2. **Import from category** for related components
3. **Avoid bulk imports** in production
4. **Use lazy loading** for large component groups
5. **Import only what you need**

---

## 🔗 Useful Links

- [Component Index](docs/COMPONENT_INDEX.md) - All components listed
- [Organization Guide](docs/guides/COMPONENT_ORGANIZATION.md) - Usage examples
- [Folder Structure](docs/FOLDER_STRUCTURE.md) - Directory layout
- [Restructure Plan](RESTRUCTURE_PLAN.md) - Migration strategy
- [Summary](IMPROVEMENTS_SUMMARY.md) - What changed

---

## ❓ FAQs

**Q: How do I find a specific component?**  
A: Check [COMPONENT_INDEX.md](docs/COMPONENT_INDEX.md) - alphabetical and by category

**Q: What's the difference between import paths?**  
A: All work the same, choose based on preference:
- `from '@ui-lib'` - Direct import
- `from '@ui-lib/authentication'` - Category import
- `from '@ui-lib/login'` - Component-specific

**Q: How are components organized?**  
A: By category (auth, forms, navigation, etc.) - see [COMPONENT_ORGANIZATION.md](docs/guides/COMPONENT_ORGANIZATION.md)

**Q: Where do I add new components?**  
A: Choose the right category folder - see [FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md)

**Q: What changed recently?**  
A: See [IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md) for full details

---

## 🎉 Quick Start

```typescript
// 1. Import what you need
import { LoginComponent, LibInputTextComponent, CardComponent } from '@ui-lib';

// 2. Or import by category
import * as Auth from '@ui-lib/authentication';
import * as Forms from '@ui-lib/form-elements';

// 3. Use in your component
@Component({
  selector: 'app-my-component',
  imports: [LoginComponent, LibInputTextComponent, CardComponent],
  // ...
})
```

---

**Last Updated**: January 16, 2026  
**Library Version**: 0.0.0  
**Components**: 34 families, 46 variants  
**Categories**: 9

