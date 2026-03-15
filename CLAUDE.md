# CobbleRanked Documentation Style Guide

English documentation for server admins and players. Not developer-focused.

---

## Core Rules

1. **Target**: Server administrators and players (not developers)
2. **Language**: English only
3. **Tone**: Direct, concise, action-oriented
4. **Structure**: Use absolute paths, dropdowns for details, tables for comparisons
5. **Troubleshooting**: Centralized in `support/troubleshooting.md`, never per-page
6. **FAQ**: Centralized in `support/faq.md`, dropdown format

---

## Page Structure

**Template:**
```markdown
# Title (H1 only)

Engaging intro (1-2 sentences, exciting for users)

## Section (H2)

Content.

---

## See Also

- [Related Page](/docs/cobbleranked/path/to/page/) - Description
```

**Page Tail:**
- Features: `**Related**: [Page1](path) | [Page2](path)`
- Config/Guides: List format with descriptions
- Always link to FAQ and Troubleshooting

---

## Critical: Link Handling (Astro)

**ALWAYS use absolute paths. Relative paths fail in Astro.**

```markdown
# ❌ WRONG - Relative
[Page](../configuration/elo/)
[Config](config/)

# ✅ RIGHT - Absolute
[Page](/docs/cobbleranked/configuration/elo/)
[Config](/docs/cobbleranked/configuration/config/)
```

**Rules:**
- Site root: `/docs/cobbleranked/...`
- No `../` relative paths
- Trailing slash required
- **Always verify file exists** with Glob before linking

**When user reports broken link:**
1. Immediately verify user's claim
2. Check file exists and path is correct
3. Request confirmation after fixing

---

## Content Style

**Engaging Intros (Features):**
- ✅ "Prove your skills in competitive Pokemon battles. Climb the leaderboard, earn your rank."
- ❌ "Competitive Pokemon battles with ELO rating system."

**Tone:**
- Command form: "Edit the config" not "Please edit the config"
- Concise bullet points
- No excessive politeness

**Emphasis:**
- **Bold**: Keywords, recommended settings
- `Code`: Commands, config values, file paths
- *Italic*: Rarely used

**Emojis (Only these 4):**
- ✅ Success, supported, recommended
- ❌ Failure, not supported
- ⚠️ Warning, caution
- 📝 Note, tip

**No:** 🎉 🚀 💡 📁 🔧 ⚙️ or decorative emojis

---

## Formatting

**Tables for:**
- Comparisons (SQLite vs MySQL, Ranked vs Casual)
- Config options (Setting | Default | Description)
- Tier/rank mappings
- Multiple related items

**Avoid tables for:**
- Simple step lists
- 2-item comparisons
- Long descriptions

**Dropdowns (`<details>`) for:**
- FAQ items
- Troubleshooting issues
- Optional/detailed config
- Long code examples

**Dropdown template:**
```markdown
<details>
<summary><strong>Title (bold recommended)</strong></summary>

Content...

</details>
```

**Code blocks:**
- JSON5: ````markdown ```json5 ````
- Bash/commands: ```markdown ```bash ```
- Inline: backticks

**Separators:**
- `---` between major sections
- Before "See Also"

---

## Troubleshooting & FAQ

**Rules:**
- NEVER create per-page Troubleshooting sections
- ALL issues go to `support/troubleshooting.md`
- ALL FAQ go to `support/faq.md`
- Use dropdown format for all items
- Group by feature/category

**Issue template:**
```markdown
## [Feature] Issues

<details>
<summary><strong>Problem description</strong></summary>

**Symptoms:** symptom1, symptom2

**Solutions:**
1. **Solution name:** Description
2. **Solution name:** Description

</details>
```

**FAQ template:**
```markdown
## Category

<details>
<summary><strong>Question?</strong></summary>

Answer.

**Example:**
```json5
{ "setting": "value" }
```

</details>
```

---

## Length Guidelines

**Targets (not strict):**
- Section content: ~300 chars
- Bullet items: 1-2 lines
- Table cells: Short
- Dropdowns: No limit

**If too long:**
- Use tables
- Numbered lists for steps
- Dropdowns for details
- Comparison tables for variants

---

## Checklist

Before publishing new page:
- [ ] Single H1 title
- [ ] Intro paragraph below title
- [ ] Section separators `---`
- [ ] NO per-page Troubleshooting
- [ ] FAQ/Troubleshooting in centralized pages
- [ ] Dropdown format for FAQ/Troubleshooting
- [ ] "See Also" section at end
- [ ] Links to FAQ and Troubleshooting
- [ ] Correct code block language tags
- [ ] **Absolute paths for all links** (`/docs/cobbleranked/...`)
- [ ] Link targets verified with Glob

---

## File Structure

```
docs/cobbleranked/
├── getting-started/
├── configuration/
├── features/
├── advanced/
├── integration/
└── support/
    ├── troubleshooting.md  # ALL issues here
    └── faq.md              # ALL FAQ here
```

---

## Principles Summary

1. User-focused, not developer-focused
2. Centralized Troubleshooting (never per-page)
3. Centralized FAQ (dropdown format)
4. Dropdowns for detailed info
5. Tables for comparisons
6. Concise writing (300 chars target)
7. **Absolute paths only** (Astro requirement)
8. **Verify links before adding**
