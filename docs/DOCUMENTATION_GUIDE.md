# Documentation Best Practices

Guidelines for organizing and maintaining documentation in the UI-Lib project.

## 📁 Documentation Structure

### Root Level (`/`)
Keep only essential, high-level documentation in the project root:

✅ **Should be in root**:
- `README.md` - Project overview, quick start, essential commands
- `LICENSE.md` - Project license
- `CONTRIBUTING.md` - How to contribute
- `CODE_OF_CONDUCT.md` - Community guidelines
- `CHANGELOG.md` - Version history and changes

❌ **Should NOT be in root**:
- Detailed guides
- Tutorial series
- API documentation
- Architecture diagrams
- Topic-specific documentation

### Documentation Directory (`/docs/`)
All detailed documentation belongs here, organized by topic:

```
docs/
├── README.md                          # Documentation index/hub
├── storybook/                         # Component development with Storybook
│   ├── STORYBOOK.md
│   ├── STORYBOOK_QUICK_REFERENCE.md
│   └── STORYBOOK_CHECKLIST.md
├── guides/                            # How-to guides and tutorials
│   ├── component-development.md
│   ├── styling-guide.md
│   ├── testing-guide.md
│   └── typescript-guide.md
├── architecture/                      # System architecture
│   ├── project-structure.md
│   ├── state-management.md
│   └── api-integration.md
├── design-system/                     # Design system documentation
│   ├── design-tokens.md
│   ├── component-library.md
│   └── accessibility.md
└── api/                              # API documentation (if needed)
    └── components/
```

## 📝 File Naming Conventions

### Documentation Files

1. **Root-level files**: UPPERCASE (e.g., `README.md`, `CONTRIBUTING.md`)
   ```
   README.md
   LICENSE.md
   CONTRIBUTING.md
   CODE_OF_CONDUCT.md
   ```

2. **Topic directories**: lowercase kebab-case
   ```
   docs/storybook/
   docs/guides/
   docs/architecture/
   ```

3. **Documentation files**: lowercase kebab-case
   ```
   component-development.md
   styling-guide.md
   api-integration.md
   ```

4. **Exception**: Files that are commonly UPPERCASE
   ```
   docs/storybook/STORYBOOK.md            # Main guide
   docs/storybook/STORYBOOK_QUICK_REFERENCE.md
   ```

### When to Use What

- **UPPERCASE**: Important, frequently accessed docs (README, main guides)
- **kebab-case**: Supporting documentation, detailed guides
- **Consistency**: Pick one style per category and stick with it

## 🗂️ Organization Principles

### 1. Group by Topic, Not Type

✅ **Good**:
```
docs/
├── storybook/
│   ├── STORYBOOK.md
│   ├── STORYBOOK_QUICK_REFERENCE.md
│   └── examples/
└── testing/
    ├── TESTING_GUIDE.md
    ├── unit-testing.md
    └── e2e-testing.md
```

❌ **Bad**:
```
docs/
├── guides/
│   ├── storybook.md
│   └── testing.md
├── quick-references/
│   ├── storybook-ref.md
│   └── testing-ref.md
└── examples/
    ├── storybook-examples.md
    └── testing-examples.md
```

### 2. Use Clear Hierarchies

- **Level 1**: Major topics (storybook, testing, architecture)
- **Level 2**: Subtopics within a major topic
- **Level 3**: Specific guides or references

### 3. Create Index Files

Every directory should have a `README.md` that:
- Lists all documentation in that directory
- Provides quick links
- Explains the organization
- Guides users to the right document

## 📋 Documentation Types

### 1. Tutorials (How-To Guides)
**Purpose**: Teach specific tasks step-by-step

**Location**: `docs/guides/`

**Structure**:
```markdown
# How to Create a Component

## Prerequisites
## Step 1: ...
## Step 2: ...
## Troubleshooting
## Next Steps
```

### 2. Reference Documentation
**Purpose**: Quick lookup of information

**Location**: `docs/{topic}/` with "REFERENCE" or "QUICK_REFERENCE" in name

**Structure**:
```markdown
# Component API Reference

## Props
## Methods
## Events
## Examples
```

### 3. Explanatory Documentation
**Purpose**: Explain concepts and architecture

**Location**: `docs/architecture/` or `docs/concepts/`

**Structure**:
```markdown
# Understanding State Management

## Overview
## Key Concepts
## Implementation
## Best Practices
```

### 4. Checklists
**Purpose**: Ensure quality and completeness

**Location**: `docs/{topic}/` with "CHECKLIST" in name

**Structure**:
```markdown
# Component Development Checklist

## Before You Start
- [ ] ...

## During Development
- [ ] ...

## Before Submitting
- [ ] ...
```

## 🔗 Linking Best Practices

### Internal Links

✅ **Use relative paths**:
```markdown
See the [Storybook Guide](./docs/storybook/STORYBOOK.md)
See the [Quick Reference](../QUICK_REFERENCE.md)
See the [Main README](../../README.md)
```

❌ **Don't use absolute URLs**:
```markdown
See the [Guide](https://github.com/user/repo/blob/main/docs/guide.md)
```

### Cross-References

Create a web of documentation with cross-links:
```markdown
For more details on component development, see:
- [Storybook Guide](../storybook/STORYBOOK.md)
- [Testing Guide](../guides/testing-guide.md)
- [TypeScript Guide](../guides/typescript-guide.md)
```

## 📐 Document Structure

### Every Document Should Have

1. **Title** (H1 - one per document)
2. **Brief introduction** (what this document covers)
3. **Table of contents** (for documents >200 lines)
4. **Clear headings** (logical hierarchy)
5. **Code examples** (where applicable)
6. **Links to related docs**
7. **Last updated date** (optional but helpful)

### Example Template

```markdown
# Document Title

Brief introduction explaining what this document covers and who it's for.

## Table of Contents (if needed)
- [Section 1](#section-1)
- [Section 2](#section-2)

## Section 1

Content...

## Section 2

Content...

## Related Documentation

- [Related Doc 1](../other/doc1.md)
- [Related Doc 2](../other/doc2.md)

---

**Last Updated**: January 14, 2026
```

## 🎯 Decision Guide: Where Does This Doc Go?

Use this flowchart to decide where to place documentation:

```
Is it essential for getting started?
├─ YES → Root README.md
└─ NO → Continue...

Is it a legal/governance document?
├─ YES → Root level (LICENSE.md, CODE_OF_CONDUCT.md)
└─ NO → Continue...

Is it about a specific major topic?
├─ YES → docs/{topic}/
│   ├─ Is it the main guide? → {TOPIC}.md or UPPERCASE
│   ├─ Is it a quick reference? → {topic}-quick-reference.md
│   ├─ Is it a checklist? → {topic}-checklist.md
│   └─ Is it a subtopic? → {subtopic}.md
└─ NO → Continue...

Is it a general guide or tutorial?
├─ YES → docs/guides/
└─ NO → docs/misc/ or reconsider if needed

```

## 🔄 Maintenance Guidelines

### Regular Reviews

- **Monthly**: Check for broken links
- **Quarterly**: Review for outdated information
- **Per release**: Update version-specific information

### Update Process

When code changes affect documentation:

1. **Identify** affected documentation
2. **Update** the content
3. **Test** all code examples
4. **Verify** all links still work
5. **Update** "Last Updated" date
6. **Commit** with descriptive message

### Deprecation

When documentation becomes outdated:

1. Add deprecation notice at the top
2. Link to the replacement documentation
3. After 2 versions, move to `docs/archive/`
4. Update all links pointing to it

## ✅ Documentation Checklist

Before submitting new documentation:

- [ ] File is in the correct directory
- [ ] File name follows conventions
- [ ] Document has a clear title
- [ ] Introduction explains purpose and audience
- [ ] Headings create logical hierarchy
- [ ] Code examples are tested and working
- [ ] Links use relative paths
- [ ] Related documentation is cross-referenced
- [ ] Spelling and grammar are correct
- [ ] `docs/README.md` index is updated

## 🌟 Examples from This Project

### Good Examples

✅ **Root README.md**: Brief, essential information with links to detailed docs
✅ **docs/README.md**: Complete index with clear organization
✅ **docs/storybook/**: Related docs grouped together
✅ **Relative links**: All documentation uses relative paths

### Growing the Documentation

As you add more documentation:

1. **Add to existing categories first**
   - Example: `docs/guides/new-guide.md`

2. **Create new category when you have 3+ related docs**
   - Example: Create `docs/deployment/` when you have deployment docs

3. **Update indexes**
   - Update `docs/README.md`
   - Update root `README.md` if it's a major addition

4. **Cross-reference**
   - Add links in related documentation
   - Create "See Also" sections

## 📚 Recommended Reading

- [Write the Docs](https://www.writethedocs.org/)
- [Documentation Guide](https://www.writethedocs.org/guide/)
- [Divio Documentation System](https://documentation.divio.com/)

---

**Last Updated**: January 14, 2026

For the documentation index, see [docs/README.md](./README.md)

