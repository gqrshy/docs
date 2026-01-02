---
title: Getting Started
description: Welcome to CobbleRanked! Get up and running quickly.
---

## Quick Navigation

| Guide | Description |
|-------|-------------|
| [Installation](/docs/cobbleranked/getting-started/installation/) | Step-by-step installation guide |
| [Quick Start](/docs/cobbleranked/getting-started/quick-start/) | Get your first battle going |
| [Commands](/docs/cobbleranked/getting-started/commands/) | All available commands |

## Requirements

### Core Dependencies

| Mod | Version | Download |
|-----|---------|----------|
| Minecraft | 1.21.1 | - |
| Fabric Loader | 0.17.2+ | [Fabric](https://fabricmc.net/) |
| Fabric API | 0.116.6+ | [Modrinth](https://modrinth.com/mod/fabric-api) |
| Fabric Language Kotlin | 1.13.6+ | [Modrinth](https://modrinth.com/mod/fabric-language-kotlin) |
| Cobblemon | 1.7.1+ | [Modrinth](https://modrinth.com/mod/cobblemon) |

### GashiStudios Dependencies

| Mod | Version | Purpose |
|-----|---------|---------|
| **GashiLibs** | 1.0.3+ | Shared libraries (database drivers, Redis, config) |
| **MailLib** | 1.0.1+ | Mail/reward delivery for season rewards |

<details>
<summary><strong>About GashiLibs & MailLib</strong></summary>

**GashiLibs** provides common dependencies for GashiStudios mods including database drivers (SQLite, MySQL, MongoDB), Redis client, and configuration libraries.

**MailLib** provides a mailbox system for delivering items and rewards to players. CobbleRanked uses it for:
- Season end rewards
- Tournament prizes
- Offline reward delivery

Players claim rewards using the `/mailbox` command.

</details>

### Optional Dependencies

| Mod | Purpose |
|-----|---------|
| LuckPerms | Permission management for admin commands |
| Text Placeholder API | Display stats in other mods |

## 5-Minute Setup

1. **Download** all required mods
2. **Place** them in your `mods/` folder
3. **Start** the server (configs auto-generate)
4. **Test** with `/ranked` command

That's it! CobbleRanked works out of the box with sensible defaults.

## Optional Setup

After basic installation, you may want to:

- **[Configure Arenas](/docs/cobbleranked/configuration/arenas/)** - Set battle locations
- **[Configure Blacklist](/docs/cobbleranked/configuration/blacklist/)** - Restrict Pokemon/moves
- **[Configure Rewards](/docs/cobbleranked/configuration/rewards/)** - Season end prizes
- **[Configure Languages](/docs/cobbleranked/configuration/languages/)** - Change to Japanese

## Need Help?

- **[FAQ](/docs/cobbleranked/support/faq/)** - Common questions answered
- **[Discord](https://discord.gg/VVVvBTqqyP)** - Community support
