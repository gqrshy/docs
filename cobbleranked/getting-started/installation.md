# Installation Guide

Step-by-step guide to install CobbleRanked on your server.

---

## Required Mods

Place all of these in your `mods` folder:

| Mod | Version | Link |
|-----|---------|------|
| Fabric Loader | 0.17.2+ | [Download](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [Download](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [Download](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [Download](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| CobbleRanked | Latest | [Discord](https://discord.gg/VVVvBTqqyP) |

**Target Version:** Minecraft 1.21.1

---

## Installation Steps

### 1. Place Mods
Put all required mods in your `mods` folder

### 2. Start Server
On first launch, `config/cobbleranked/` will be auto-generated

### 3. Verify Installation
Run `/ranked` in-game - if the GUI opens, you're done!

---

## Initial Setup (Optional)

### Change Language

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

### Set Arena

Set battle spawn coordinates:

```
/rankedadmin arena set main_arena
```

### Basic Rules

Edit `config/cobbleranked/blacklist.json5`:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Details:** [Blacklist Configuration](../configuration/blacklist.md)

---

## Cross-Server (Advanced)

For sharing rankings across multiple servers:

**Required:** MySQL/MongoDB, Redis, Velocity

**Details:** [Cross-Server Setup Guide](../advanced/cross-server.md)

---

## Troubleshooting

### Mod Not Loading
- Check all dependencies are installed
- Review `logs/latest.log` for errors

### Config Not Updating
- Save file, then run `/rankedadmin reload`
- Check JSON5 syntax errors

### Other Issues
- [FAQ](../support/faq.md)
- [Troubleshooting](../support/troubleshooting.md)
- [Discord](https://discord.gg/VVVvBTqqyP)

---

## Next Steps

- [Quick Start](quick-start.md) - Basic usage
- [Blacklist Config](../configuration/blacklist.md) - Customize rules
- [Arena Config](../configuration/arenas.md) - Multiple arenas
- [Rewards Config](../configuration/rewards.md) - Season rewards
