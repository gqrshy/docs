# Welcome to CobbleRanked

**CobbleRanked** is a comprehensive competitive Pokemon battle system for Minecraft servers running Cobblemon. Create a competitive ranked ladder with Elo ratings, seasonal rankings, and customizable battle restrictions.

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1">
<img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0">
<img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

## Features

### 🏆 Competitive Ranking System
- **Elo Rating System** - Two modes available:
  - Legacy random point system
  - Pokemon Showdown-style K-factor calculation
- **Multiple Battle Formats** - Singles and Doubles with independent rankings
- **Seasonal Leaderboards** - Automatic season rotation with customizable duration

### ⚔️ Battle Management
- **Automated Matchmaking** - Queue system with Elo-based pairing
- **Battle Arenas** - Teleport players to designated battle locations
- **Format Selection** - Players choose their preferred battle format
- **Disconnect Penalties** - Track flee count to discourage rage quits

### 🚫 Blacklist System
- **Pokemon Restrictions** - Ban by individual species or category (legendary, mythical, etc.)
- **Move Bans** - Block OHKO moves, evasion moves, or any problematic moves
- **Ability Blacklist** - Restrict abilities like Shadow Tag, Moody, Arena Trap
- **Item Restrictions** - Ban held items such as Bright Powder or Soul Dew
- **Special Formats** - Baby Cup, Little Cup, Monotype, Shiny Only, NFE, and Pokedex range limits

### 🎁 Rewards System
- **Season Rewards** - Configurable rewards for top 3 rankings
- **Milestone Rewards** - Rewards at 10, 25, 50, 100 wins
- **Command Execution** - Run any command as reward (items, currency, permissions)

### 🌍 Cross-Server Support
- **MySQL Integration** - Share rankings across multiple servers
- **Redis Sync** - Real-time queue and matchmaking across servers
- **Battle Server** - Dedicate specific servers for battles

### 🎨 Customization
- **Multilingual Support** - English, Japanese, Portuguese, Russian
- **GUI Customization** - JSON5-based GUI configuration
- **Language Files** - All messages configurable via JSON5

## Quick Links

<table>
<tr>
<td width="33%">

### 🚀 Getting Started
- [Installation Guide](getting-started/installation.md)
- [Quick Start](getting-started/quick-start.md)
- [Commands](getting-started/commands.md)

</td>
<td width="33%">

### ⚙️ Configuration
- [Main Config](configuration/config.md)
- [Blacklist Setup](configuration/blacklist.md)
- [Arena Config](configuration/arenas.md)

</td>
<td width="33%">

### 📚 Advanced
- [Cross-Server Setup](advanced/cross-server.md)
- [Database Config](advanced/database.md)
- [Troubleshooting](support/troubleshooting.md)

</td>
</tr>
</table>

## Requirements

- **Minecraft**: 1.21.1
- **Cobblemon**: 1.7.0+
- **Fabric Loader**: 0.17.2+
- **Fabric API**: 0.116.6+
- **Fabric Language Kotlin**: 1.13.6+

## Support

Need help? Check out these resources:

- **Troubleshooting**: [Common Issues](support/troubleshooting.md)
- **FAQ**: [Frequently Asked Questions](support/faq.md)
- **GitHub Issues**: [Report a Bug](https://github.com/your-repo/issues)

## Credits

**Author**: Gqrshy
**License**: All Rights Reserved

---

Ready to get started? Head to the [Installation Guide](getting-started/installation.md) to begin your competitive Pokemon journey!
