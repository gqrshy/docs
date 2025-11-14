# CobbleRanked

A competitive ranked battle system for Cobblemon servers.

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

---

## Features

### Core Features (Auto-enabled)
- **Ranked Battle System** - Elo-based matchmaking
- **Singles/Doubles Battles** - Independent rankings
- **Season System** - Auto-rotate every 30 days
- **Leaderboards** - Top 10 display
- **Disconnect Penalties** - Track and penalize rage quits

### Optional Features (Enable via config)
- **Cross-Server** - Share rankings across multiple servers
- **Blacklist** - Restrict Pokemon, moves, abilities, items
- **Reward System** - Season-end and milestone rewards
- **Arenas** - Teleport to battle coordinates
- **Multi-language** - English, Japanese, Portuguese, Russian

---

## Quick Start

1. Place mod in `mods` folder
2. Start server (auto-generates config files)
3. Test with `/ranked` command

**Details:** [Installation Guide](getting-started/installation.md)

---

## Documentation

### 📖 Getting Started
- [Installation](getting-started/installation.md)
- [Quick Start](getting-started/quick-start.md)
- [Commands](getting-started/commands.md)

### ⚙️ Configuration
- [Main Config](configuration/config.md)
- [Blacklist](configuration/blacklist.md)
- [Arenas](configuration/arenas.md)
- [Rewards](configuration/rewards.md)
- [Languages](configuration/languages.md)
- [GUI](configuration/gui.md)

### 🎮 Features
- [Ranked Battles](features/ranked-battles.md)
- [Elo System](features/elo-system.md)
- [Battle Formats](features/battle-formats.md)
- [Seasons](features/seasons.md)
- [Leaderboards](features/leaderboards.md)
- [Disconnect Penalties](features/disconnect-penalties.md)
- [Dynamic Matchmaking](features/dynamic-matchmaking.md)

### 🔧 Advanced
- [Cross-Server](advanced/cross-server.md)
- [Database](advanced/database.md)
- [Redis](advanced/redis.md)

### 💬 Support
- [FAQ](support/faq.md)
- [Troubleshooting](support/troubleshooting.md)
- [Discord](https://discord.gg/VVVvBTqqyP)

---

## Requirements

| Required | Version |
|----------|---------|
| Minecraft | 1.21.1 |
| Cobblemon | 1.7.0+ |
| Fabric Loader | 0.17.2+ |
| Fabric API | 0.116.6+ |
| Fabric Language Kotlin | 1.13.6+ |

**Optional (Cross-server):** MySQL/MongoDB 8.0+, Redis 6.0+, Velocity 3.4.0+

---

## Changelog

**v1.0.1** (2024-11-08)
- MongoDB support
- PlaceholderAPI expansion
- Bug fixes

[View Details](CHANGELOG-1.0.1.md)

---

## Support

- **Questions/Bugs:** [Discord](https://discord.gg/VVVvBTqqyP) #feedback channel
- **FAQ:** [Frequently Asked Questions](support/faq.md)
- **Troubleshooting:** [Common Issues](support/troubleshooting.md)
