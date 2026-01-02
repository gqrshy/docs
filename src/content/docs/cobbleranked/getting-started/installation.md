---
title: Installation Guide
description: Complete guide to install CobbleRanked on your Minecraft server.
---

## Required Mods

Place all of these in your `mods/` folder:

| Mod | Version | Download |
|-----|---------|----------|
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| Fabric API | Latest | [Modrinth](https://modrinth.com/mod/fabric-api) |
| Fabric Language Kotlin | 1.13.6+ | [Modrinth](https://modrinth.com/mod/fabric-language-kotlin) |
| Cobblemon | 1.7.1+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| GashiLibs | 1.0.3+ | [GashiStudios Discord](https://discord.gg/VVVvBTqqyP) |
| MailLib | 1.0.1+ | [GashiStudios Discord](https://discord.gg/VVVvBTqqyP) |
| **CobbleRanked** | 2.0.4+ | [GashiStudios Discord](https://discord.gg/VVVvBTqqyP) |

**Target:** Minecraft 1.21.1 (Fabric server)

## Optional Mods

These mods are **NOT required** but add extra features:

| Mod | Purpose | When to Install |
|-----|---------|-----------------|
| LuckPerms | Permissions | Only if you want granular permission control |
| Text Placeholder API | Placeholders | Only if using with other mods that need placeholders |

## Minimal Setup Example

For a basic server, you only need:

```
mods/
├── fabric-api-x.x.x+1.21.1.jar
├── fabric-language-kotlin-x.x.x+kotlin.x.x.x.jar
├── Cobblemon-fabric-x.x.x+1.21.1.jar
├── gashilibs-1.0.3.jar
├── maillib-1.0.1.jar
└── CobbleRanked-2.0.4.jar
```

## Installation Steps

### 1. Place Mods

Copy all JARs to `server/mods/` folder

### 2. Start Server

On first launch, config files auto-generate:

```
server/
├── config/
│   └── cobbleranked/
│       ├── config.yaml         ← Main config
│       ├── arenas.yaml         ← Battle coordinates
│       ├── blacklist.yaml      ← Pokemon/move restrictions
│       ├── rewards.yaml        ← Season rewards
│       ├── data.db             ← SQLite database
│       ├── gui/                ← GUI layouts
│       └── language/           ← Language files
```

### 3. Verify Installation

**Console output:**

```
[CobbleRanked] Mod initialized successfully
[CobbleRanked] Configuration loaded
[CobbleRanked] Database initialized (SQLite)
[CobbleRanked] Season manager initialized
```

**In-game test:**

```
/ranked
```

If GUI opens → Installation successful!

## Initial Setup (Optional)

<details>
<summary>Language Configuration</summary>

Default: English (`en-us`)

Edit `config/cobbleranked/config.yaml`:

```yaml
# config.yaml
language: "ja-jp"  # en-us or ja-jp
```

**Reload:** `/rankedadmin reload`

</details>

<details>
<summary>Arena Setup (Recommended)</summary>

Teleport players to battle coordinates when battles start.

**Step 1:** Stand at the position where you want Player 1 to teleport

**Step 2:** Run command:

```bash
/rankedadmin setArena main_arena pos1
```

**Step 3:** Move to Player 2's position and run:

```bash
/rankedadmin setArena main_arena pos2
```

**Saved:** Position (x, y, z), facing (yaw, pitch), dimension

**Details:** [Arena Configuration](/docs/cobbleranked/configuration/arenas/)

</details>

<details>
<summary>Basic Rules (Recommended)</summary>

Ban legendaries and OHKO moves.

See [Blacklist Configuration](/docs/cobbleranked/configuration/blacklist/) for full setup.

</details>

<details>
<summary>Cross-Server Setup (Advanced)</summary>

**Required for:** Multi-server networks sharing rankings

**Requirements:**

- MySQL 8.0+
- Redis 6.0+
- Velocity 3.4.0+

**Full Guide:** [Cross-Server Setup](/docs/cobbleranked/advanced/cross-server/)

</details>

## File Structure Reference

```
config/cobbleranked/
├── config.yaml            # Main settings (language, database, cross-server)
├── elo.yaml               # ELO/rating system settings
├── battle.yaml            # Battle formats, timers, sounds
├── matchmaking.yaml       # Queue matching rules
├── season.yaml            # Season schedule and reset behavior
├── arenas.yaml            # Battle coordinates
├── blacklist.yaml         # Restrictions (Pokemon/moves/abilities/items)
├── rewards.yaml           # Season-end rewards
├── data.db                # SQLite database (auto-created)
├── gui/
│   ├── ranked_gui.json5   # Ranked menu layout
│   ├── casual_gui.json5   # Casual menu layout
│   └── ...
└── language/
    ├── en-Us.json5        # English messages
    └── ja-Jp.json5        # Japanese messages
```

## Next Steps

### For Casual Servers

1. **[Set arenas](/docs/cobbleranked/configuration/arenas/)** - Battle locations
2. **[Configure rewards](/docs/cobbleranked/configuration/rewards/)** - Season prizes
3. **[Customize GUI](/docs/cobbleranked/configuration/gui/)** - Interface tweaks

### For Competitive Servers

1. **[Configure blacklist](/docs/cobbleranked/configuration/blacklist/)** - Smogon/VGC rules
2. **[Adjust ELO system](/docs/cobbleranked/configuration/config/)** - Fine-tune ratings
3. **[Set battle settings](/docs/cobbleranked/configuration/config/)** - Turn timers, team selection

### For Cross-Server Networks

1. **[Complete cross-server setup](/docs/cobbleranked/advanced/cross-server/)** - Full guide
2. **[Configure database](/docs/cobbleranked/advanced/database/)** - MySQL setup

## See Also

- [Getting Started](/docs/cobbleranked/getting-started/introduction/) - Requirements & setup
- [Quick Start](/docs/cobbleranked/getting-started/quick-start/) - First battle setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
