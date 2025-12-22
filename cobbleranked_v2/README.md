# CobbleRanked Reloaded

A competitive ranked battle system for Cobblemon servers with Elo-based matchmaking, seasonal rankings, missions, and comprehensive customization.

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0+-blue" alt="Cobblemon 1.7.0+"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

---

## What's New in v2

CobbleRanked Reloaded (v2) is a complete rewrite with significant improvements:

| Feature | v1 | v2 |
|---------|----|----|
| Config Format | JSON5 (single file) | YAML (modular files) |
| Starting Elo | 1000 | 1500 |
| Rank Tiers | Bronze → Master | Poke Ball → Cherish Ball |
| Lead Selection | ❌ | ✅ |
| Casual Mode | ❌ | ✅ |
| Daily/Weekly Missions | ❌ | ✅ |
| Season Scheduling | Days-based | Date-based with soft reset |
| Player Restrictions | Basic | Comprehensive (queue & arena) |

---

## Features

### Core Features (Zero Configuration)

- **Ranked Matchmaking** - Elo-based with dynamic range expansion
- **Multiple Formats** - Singles, Doubles, Triples with independent rankings
- **Season System** - Date-based scheduling with soft reset options
- **Leaderboards** - Real-time rankings per format
- **Flee Protection** - Progressive penalty system with decay

### New in v2

- **Casual Mode** - Practice battles without Elo changes
- **Daily/Weekly Missions** - Win matches, defeat Pokemon, use specific types
- **Lead Selection** - Choose your lead Pokemon before battle
- **Match Ready Confirmation** - Both players must confirm before teleporting
- **Soft Elo Reset** - Partial reset on season end (configurable factor)
- **Comprehensive Restrictions** - Block commands, items, interactions during battle

### Optional Features

- **Cross-Server** - MySQL/MongoDB + Redis for multi-server networks
- **Blacklist Presets** - Per-season Pokemon/move/ability restrictions
- **Custom Rewards** - Rank tier, season-end, and milestone rewards
- **Battle Arenas** - Teleport to designated coordinates
- **Battle Music** - Elo-based music selection with resource pack

---

## Quick Start

```bash
# 1. Install dependencies (Fabric API, Fabric Language Kotlin, Cobblemon)
# 2. Place CobbleRanked.jar in mods/
# 3. Start server
# 4. Test with /ranked command
```

**Auto-generates:** `config/cobbleranked/` with all YAML config files

**First match:** Players start at 1500 Elo (Pokemon Showdown mode)

---

## Configuration Files

CobbleRanked v2 uses modular YAML configuration:

| File | Purpose |
|------|---------|
| `config.yaml` | Language, database, cross-server, music |
| `battle.yaml` | Formats, timers, sounds, rewards, announcements |
| `elo.yaml` | Rating system, rank tiers |
| `matchmaking.yaml` | Elo range settings, opponent avoidance |
| `season.yaml` | Season schedule, reset behavior, archive |
| `rewards.yaml` | Rank rewards, season rewards, milestones |
| `missions.yaml` | Daily and weekly mission definitions |
| `restrictions.yaml` | Player restrictions during queue and battle |
| `arenas.yaml` | Arena positions |
| `luckperms.yaml` | Permission node mappings |

---

## Rank Tiers

| Tier | Elo Range | Icon |
|------|-----------|------|
| Poke Ball | 0 - 1299 | Standard |
| Great Ball | 1300 - 1499 | Intermediate |
| Ultra Ball | 1500 - 1699 | Advanced |
| Master Ball | 1700 - 1899 | Expert |
| Beast Ball | 1900 - 2099 | Elite |
| Cherish Ball | 2100+ | Champion |

---

## Battle Formats

| Format | Team Size | Select | Description |
|--------|-----------|--------|-------------|
| **Singles** | 3 | 3 | Classic 1v1 battle |
| **Doubles** | 4 | 4 | VGC-style 2v2 battle |
| **Triples** | 6 | 6 | 3v3 battle |

---

## Commands

### Player Commands

| Command | Description |
|---------|-------------|
| `/ranked` | Open ranked battle GUI |
| `/casual` | Open casual battle GUI (no Elo) |

### Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload all configuration files |
| `/rankedadmin setelo <player> <format> <elo>` | Set player's Elo |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo to player |
| `/rankedadmin setArena <name> <pos1\|pos2\|exit>` | Set arena position |
| `/rankedadmin arena status` | View arena status |
| `/rankedadmin arena enable <name>` | Enable arena |
| `/rankedadmin arena disable <name>` | Disable arena |

---

## Documentation

### Getting Started

- [Installation](getting-started/installation.md) - Dependency setup
- [Quick Start](getting-started/quick-start.md) - First configuration
- [Commands](getting-started/commands.md) - Full command reference
- [Migration from v1](getting-started/migration.md) - Upgrade guide

### Configuration

- [Main Config](configuration/config.md) - Language, database, music
- [Battle Config](configuration/battle.md) - Formats, sounds, rewards
- [Elo Config](configuration/elo.md) - Rating system, rank tiers
- [Matchmaking](configuration/matchmaking.md) - Queue settings
- [Seasons](configuration/seasons.md) - Season scheduling
- [Rewards](configuration/rewards.md) - All reward types
- [Missions](configuration/missions.md) - Daily/weekly missions
- [Restrictions](configuration/restrictions.md) - Player restrictions
- [Arenas](configuration/arenas.md) - Battle locations
- [Blacklist](configuration/blacklist.md) - Pokemon/move restrictions

### Features

- [Ranked Battles](features/ranked-battles.md) - Battle flow
- [Casual Battles](features/casual-battles.md) - Practice mode
- [Elo System](features/elo-system.md) - Rating calculations
- [Missions](features/missions.md) - Mission system
- [Leaderboards](features/leaderboards.md) - Rankings

### Advanced

- [Cross-Server Setup](advanced/cross-server.md) - Multi-server setup
- [Database Configuration](advanced/database.md) - SQLite/MySQL/MongoDB

### Integration

- [Placeholder API](integration/placeholders.md) - Text placeholders
- [LuckPerms](integration/luckperms.md) - Permission integration

### Support

- [FAQ](support/faq.md) - Common questions
- [Troubleshooting](support/troubleshooting.md) - Problem solving
- [Discord](https://discord.gg/VVVvBTqqyP) - Community support

---

## Requirements

| Required | Version |
|----------|---------|
| Minecraft | 1.21.1 |
| Fabric Loader | 0.17.2+ |
| Cobblemon | 1.7.0+ |
| Fabric API | 0.116.6+ |
| Fabric Language Kotlin | 1.13.6+ |

| Optional (Cross-Server) | Version |
|-------------------------|---------|
| MySQL | 8.0+ |
| MongoDB | 6.0+ |
| Redis | 6.0+ |

---

## Support

- **Questions:** [Discord](https://discord.gg/VVVvBTqqyP) #feedback
- **FAQ:** [Frequently Asked Questions](support/faq.md)
- **Issues:** [Troubleshooting Guide](support/troubleshooting.md)

---

**Ready to start?** → [Installation Guide](getting-started/installation.md)
