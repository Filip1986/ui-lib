# Quick Answer: Where Should Documentation Go?

## 🎯 Simple Decision Tree

```
┌─────────────────────────────────────────────┐
│  Where should I put this documentation?     │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Is it one of these?         │
    │ • README                    │
    │ • LICENSE                   │
    │ • CONTRIBUTING              │
    │ • CODE_OF_CONDUCT           │
    │ • CHANGELOG                 │
    └─────┬───────────────────────┘
          │
    YES ──┴──> Put in ROOT (/)
          │
          NO
          │
          ▼
    ┌─────────────────────────────┐
    │ Is it about a specific      │
    │ topic with multiple docs?   │
    │ (Storybook, Testing, etc.)  │
    └─────┬───────────────────────┘
          │
    YES ──┴──> Put in docs/{topic}/
          │      Example: docs/storybook/
          │
          NO
          │
          ▼
    ┌─────────────────────────────┐
    │ Is it a general guide       │
    │ or tutorial?                │
    └─────┬───────────────────────┘
          │
    YES ──┴──> Put in docs/guides/
          │
          NO
          │
          ▼
    Put in docs/misc/ or reconsider if needed
```

## 📁 Current Structure

```
ui-lib/
│
├── README.md                          ← Project overview & quick start
│
└── docs/                              ← All detailed documentation
    │
    ├── README.md                      ← Documentation index (start here)
    ├── DOCUMENTATION_GUIDE.md         ← Full guidelines (read this!)
    │
    ├── storybook/                     ← Everything about Storybook
    │   ├── STORYBOOK.md
    │   ├── STORYBOOK_QUICK_REFERENCE.md
    │   └── STORYBOOK_CHECKLIST.md
    │
    ├── guides/                        ← General how-to guides
    │   ├── component-development.md   (future)
    │   ├── styling-guide.md           (future)
    │   └── testing-guide.md           (future)
    │
    ├── architecture/                  ← System architecture docs
    │   ├── project-structure.md       (future)
    │   └── state-management.md        (future)
    │
    └── design-system/                 ← Design system docs
        ├── design-tokens.md           (future)
        └── accessibility.md           (future)
```

## ✅ Examples

### Example 1: Adding Testing Documentation

**Question**: I want to add documentation about testing. Where does it go?

**Answer**: 
1. Will you have multiple testing docs? **YES** → Create `docs/testing/`
2. Create files:
   ```
   docs/testing/
   ├── TESTING_GUIDE.md           (main guide)
   ├── unit-testing.md            (specific topic)
   ├── e2e-testing.md             (specific topic)
   └── testing-checklist.md       (checklist)
   ```
3. Update `docs/README.md` to add links

### Example 2: Adding a Simple Guide

**Question**: I want to add a "How to deploy" guide (just one document).

**Answer**:
1. It's a single guide → Put in `docs/guides/deployment.md`
2. If later you add more deployment docs → Create `docs/deployment/`

### Example 3: Contributing Guide

**Question**: Where does CONTRIBUTING.md go?

**Answer**: 
- Root level: `CONTRIBUTING.md`
- It's a standard GitHub file that belongs in root

## 🚦 Quick Rules

### ✅ DO

- Put README, LICENSE, CONTRIBUTING in root
- Group related docs by topic (docs/storybook/)
- Use descriptive directory names (storybook, not sb)
- Update docs/README.md when adding docs
- Use relative links between docs

### ❌ DON'T

- Put detailed guides in root
- Mix unrelated docs in same directory
- Create directories for 1-2 docs (use docs/guides/ instead)
- Use absolute URLs for internal links
- Forget to update the index

## 📝 File Naming Cheat Sheet

| Type | Location | Naming |
|------|----------|--------|
| Main README | `/` | `README.md` |
| License | `/` | `LICENSE.md` |
| Contributing | `/` | `CONTRIBUTING.md` |
| Docs index | `/docs/` | `README.md` |
| Main topic guide | `/docs/{topic}/` | `TOPIC.md` or `topic-guide.md` |
| Quick reference | `/docs/{topic}/` | `TOPIC_QUICK_REFERENCE.md` |
| Checklist | `/docs/{topic}/` | `TOPIC_CHECKLIST.md` |
| General guide | `/docs/guides/` | `guide-name.md` |

## 🎓 Remember

**Root directory** = Essential files only (README, LICENSE, CONTRIBUTING)

**docs/** = Everything else, organized by topic

**docs/README.md** = Your documentation homepage

---

**Need more details?** See [DOCUMENTATION_GUIDE.md](./DOCUMENTATION_GUIDE.md)

