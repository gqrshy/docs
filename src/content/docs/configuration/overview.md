---
title: Configuration Overview
description: CobbleRanked configuration files and their purposes.
---

CobbleRanked v2 uses several configuration files located in `config/cobbleranked/`.

## Configuration Files

| File | Purpose |
|------|---------|
| `config.json5` | Main configuration (database, matchmaking, etc.) |
| `arenas.yaml` | Battle arena definitions |
| `blacklist.yaml` | Pokemon/move/ability restrictions |
| `rewards.yaml` | Season and ranking rewards |
| `gui/*.json5` | GUI layouts and customization |
| `language/*.json5` | Localization strings |

## File Formats

CobbleRanked uses JSON5 and YAML formats:

- **JSON5**: Supports comments (`//`), trailing commas
- **YAML**: Human-readable, good for lists and nested config

## Hot Reloading

Some configs can be reloaded without restart:

```
/rankedadmin reload
```

This reloads:
- Language files
- GUI configurations
- Blacklist

## Configuration Guides

- [Main Config](/configuration/config/) - Core settings
- [Arena Setup](/configuration/arenas/) - Creating battle arenas
- [Blacklist](/configuration/blacklist/) - Restricting Pokemon/moves
- [Rewards](/configuration/rewards/) - Season rewards
- [GUI Customization](/configuration/gui/) - Customizing menus
- [Languages](/configuration/languages/) - Localization
