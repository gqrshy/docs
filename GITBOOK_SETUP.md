# GitBook Setup Guide for CobbleRanked Documentation

This guide explains how to publish the CobbleRanked documentation to GitBook for free.

## What is GitBook?

GitBook is a documentation platform that turns markdown files into beautiful, searchable documentation websites - similar to:
- https://docs.artillex-studios.com/welcome.html
- https://docs.briar.rocks/glamour/getting-started/introduction/

## Free Hosting

Yes! GitBook offers **free hosting** for public documentation:
- ✅ Unlimited public documentation
- ✅ Custom domain support
- ✅ Search functionality
- ✅ Beautiful themes
- ✅ Git integration

## Setup Instructions

### Option 1: GitBook Cloud (Recommended - Easiest)

1. **Create GitBook Account**
   - Go to https://www.gitbook.com
   - Sign up (free account)
   - Verify email

2. **Create New Space**
   - Click "Create new space"
   - Choose "Git Sync" option
   - Connect your GitHub repository

3. **Configure Git Sync**
   - Select the repository containing CobbleRanked
   - Set root folder to `docs/`
   - Branch: `main` (or your default branch)
   - Click "Import"

4. **Publish**
   - GitBook automatically imports your markdown files
   - Click "Publish" to make it public
   - Your docs are now live at: `https://<your-workspace>.gitbook.io/cobbleranked`

### Option 2: GitHub Pages + GitBook Theme

If you prefer self-hosting:

1. **Install GitBook CLI**
   ```bash
   npm install -g gitbook-cli
   ```

2. **Initialize GitBook** (already done - `SUMMARY.md` exists)
   ```bash
   cd /home/gqrshy/projects/CobbleRanked/docs
   gitbook init
   ```

3. **Build Documentation**
   ```bash
   gitbook build
   ```

4. **Serve Locally** (for testing)
   ```bash
   gitbook serve
   ```
   Visit: http://localhost:4000

5. **Deploy to GitHub Pages**
   - Push `_book/` folder to `gh-pages` branch
   - Enable GitHub Pages in repository settings
   - Docs available at: `https://<username>.github.io/CobbleRanked`

### Option 3: JetBrains Writerside

JetBrains Writerside is more complex but offers advanced features:

1. **Download Writerside**
   - Get from: https://www.jetbrains.com/writerside/
   - Free for open source projects

2. **Create New Project**
   - Import existing markdown files
   - Use `docs/` folder

3. **Convert to Writerside Format**
   - Writerside uses XML-based format
   - Migration tool available in IDE

4. **Build & Deploy**
   - Build documentation
   - Deploy to Writerside Cloud (free for public projects)

## Recommended: GitBook Cloud

**Why GitBook Cloud is best:**
- ✅ Zero setup complexity
- ✅ Automatic updates via Git sync
- ✅ Professional appearance
- ✅ Built-in search
- ✅ Mobile responsive
- ✅ Free for public docs

**Comparison to alternatives:**

| Feature | GitBook Cloud | GitHub Pages | Writerside |
|---------|---------------|--------------|------------|
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Appearance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Free Hosting** | ✅ Yes | ✅ Yes | ✅ Yes (OSS) |
| **Auto-sync** | ✅ Git sync | ❌ Manual | ✅ Git sync |
| **Search** | ✅ Built-in | ⚠️ Requires plugin | ✅ Built-in |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |

## File Structure

The documentation is already set up with GitBook structure:

```
docs/
├── .gitbook.yaml              # GitBook configuration
├── SUMMARY.md                 # Table of contents (navigation)
├── README.md                  # Homepage
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── commands.md
├── configuration/
│   ├── README.md
│   ├── config.md
│   ├── blacklist.md
│   ├── arenas.md
│   ├── rewards.md
│   ├── languages.md
│   └── gui.md
├── features/
│   ├── ranked-battles.md
│   ├── elo-system.md
│   ├── seasons.md
│   ├── battle-formats.md
│   ├── leaderboards.md
│   └── rewards.md
├── advanced/
│   ├── cross-server.md
│   ├── database.md
│   ├── redis.md
│   └── migration.md
└── support/
    ├── troubleshooting.md
    ├── faq.md
    └── api.md
```

**Note:** Some files are placeholders and need to be created. Current completed files:
- ✅ README.md
- ✅ SUMMARY.md
- ✅ getting-started/installation.md
- ✅ getting-started/quick-start.md
- ✅ getting-started/commands.md
- ✅ configuration/README.md
- ✅ configuration/blacklist.md
- ✅ configuration/config.md
- ✅ configuration/arenas.md
- ✅ features/ranked-battles.md
- ✅ support/faq.md
- ⏳ Others (placeholders in SUMMARY.md)

## Quick Start: GitBook Cloud

**5-Minute Setup:**

1. Go to https://www.gitbook.com/signup
2. Sign up with GitHub
3. Click "Import from GitHub"
4. Select `CobbleRanked` repository
5. Set folder: `docs`
6. Click "Import"
7. Done! Your docs are live

**Example URL:**
```
https://cobbleranked.gitbook.io/cobbleranked
```

## Custom Domain (Optional)

GitBook supports custom domains for free:

1. **Purchase domain** (e.g., `docs.cobbleranked.com`)
2. **Add CNAME record:**
   ```
   docs.cobbleranked.com → hosting.gitbook.io
   ```
3. **Configure in GitBook:**
   - Settings → Domain
   - Add custom domain
   - Verify DNS

## Updating Documentation

With Git sync enabled:

1. **Edit markdown files** in `docs/` folder
2. **Commit and push** to GitHub
3. **GitBook auto-updates** (within 1 minute)

No manual rebuild needed!

## Navigation Structure

The `SUMMARY.md` file controls navigation:

```markdown
# Table of contents

* [Welcome](README.md)

## Getting Started
* [Installation](getting-started/installation.md)
* [Quick Start](getting-started/quick-start.md)
```

**Tips:**
- Group related pages under headers (`## Getting Started`)
- Use relative paths (`getting-started/installation.md`)
- Nested pages create dropdown menus

## Theming

GitBook offers multiple themes:

- **Modern** (default - recommended)
- **Minimal**
- **Classic**

Change in GitBook dashboard: Settings → Appearance

## Search

GitBook includes built-in search:
- Searches all markdown content
- Fuzzy matching
- Instant results
- Keyboard shortcuts (`/` or `Ctrl+K`)

No configuration needed!

## Analytics (Optional)

Track documentation usage:

1. **GitBook Insights** (free)
   - Settings → Insights
   - View page views, search queries, user flow

2. **Google Analytics** (free)
   - Settings → Integrations
   - Add Google Analytics ID

## Conclusion

**Recommended Path:**
1. Create GitBook Cloud account (5 minutes)
2. Import from GitHub (2 minutes)
3. Publish (1 click)
4. Share URL with users

**Total time:** < 10 minutes
**Cost:** $0 (forever, for public docs)

---

**Questions?**
- GitBook Docs: https://docs.gitbook.com
- Support: support@gitbook.com

**Alternative to GitBook:**
If you prefer JetBrains Writerside, see their documentation: https://www.jetbrains.com/help/writerside/getting-started.html

However, for ease of use and professional appearance, **GitBook Cloud is highly recommended**.
