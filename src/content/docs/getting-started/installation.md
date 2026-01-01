---
title: Installation Guide
description: Complete guide to install CobbleRanked on your Minecraft server.
---

Complete guide to install CobbleRanked on your Minecraft server.

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
│       ├── config.json5        ← Main config
│       ├── arenas.yaml         ← Battle coordinates
│       ├── blacklist.yaml      ← Pokemon/move restrictions
│       ├── rewards.yaml        ← Season rewards
│       ├── cobbleranked.db     ← SQLite database
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

### Language Configuration

Default: English (`en-Us`)

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us | ja-Jp
}
```

**Reload:** `/rankedadmin reload`

### Arena Setup (Recommended)

Teleport players to battle coordinates when battles start.

**Step 1:** Stand at the position where you want Player 1 to teleport

**Step 2:** Run command:

```
/rankedadmin setArena main_arena pos1
```

**Step 3:** Move to Player 2's position and run:

```
/rankedadmin setArena main_arena pos2
```

**Saved:** Position (x, y, z), facing (yaw, pitch), dimension

### Basic Rules (Recommended)

Ban legendaries and OHKO moves:

Edit `config/cobbleranked/blacklist.yaml`:

```yaml
black_list_labels:
  - legendary
  - mythical

black_list_moves:
  - fissure
  - sheer_cold
  - horn_drill
  - guillotine
```

**Reload:** `/rankedadmin reload`

**Details:** [Blacklist Configuration](/configuration/blacklist/)

## Cross-Server Setup (Advanced)

**Required for:** Multi-server networks sharing rankings

### Requirements

- MySQL 8.0+
- Redis 6.0+
- Velocity 3.4.0+

**Full Guide:** [Cross-Server Setup](/advanced/cross-server/)

## File Structure Reference

```
config/cobbleranked/
├── config.json5           # Main settings (seasons, ELO, clauses)
├── arenas.yaml            # Battle coordinates
├── blacklist.yaml         # Restrictions (Pokemon/moves/abilities/items)
├── rewards.yaml           # Season-end rewards
├── cobbleranked.db        # SQLite database (auto-created)
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

1. **[Set arenas](/configuration/arenas/)** - Battle locations
2. **[Configure rewards](/configuration/rewards/)** - Season prizes
3. **[Customize GUI](/configuration/gui/)** - Interface tweaks

### For Competitive Servers

1. **[Configure blacklist](/configuration/blacklist/)** - Smogon/VGC rules
2. **[Adjust ELO system](/configuration/config/)** - Fine-tune ratings
3. **[Set battle settings](/configuration/config/)** - Turn timers, team selection

### For Cross-Server Networks

1. **[Complete cross-server setup](/advanced/cross-server/)** - Full guide
2. **[Configure database](/advanced/database/)** - MySQL setup

## See Also

- [Requirements](/getting-started/requirements/) - System requirements
- [Quick Start](/getting-started/quick-start/) - First battle setup
- [FAQ](/support/faq/) - Common questions
- [Troubleshooting](/support/troubleshooting/) - Problem solving
