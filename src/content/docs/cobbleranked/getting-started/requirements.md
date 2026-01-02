---
title: Requirements
description: What you need to install CobbleRanked
---

## Required Mods

CobbleRanked v2 requires the following mods to be installed:

### Core Dependencies

| Mod | Min Version | Download |
|-----|-------------|----------|
| Minecraft | 1.21.1 | - |
| Fabric Loader | 0.17.2+ | [Fabric](https://fabricmc.net/) |
| Fabric API | 0.116.6+ | [Modrinth](https://modrinth.com/mod/fabric-api) |
| Fabric Language Kotlin | 1.13.6+ | [Modrinth](https://modrinth.com/mod/fabric-language-kotlin) |
| Cobblemon | 1.7.1+ | [Modrinth](https://modrinth.com/mod/cobblemon) |

### GashiStudios Dependencies

| Mod | Min Version | Purpose |
|-----|-------------|---------|
| **GashiLibs** | 1.0.3+ | Shared libraries (database drivers, Redis client, config libraries) |
| **MailLib** | 1.0.1+ | Mail/reward delivery system for season rewards |

## GashiLibs

GashiLibs is a shared library mod that provides common dependencies for GashiStudios mods.

## MailLib

MailLib provides a mailbox system for delivering items and rewards to players. CobbleRanked uses it for:

- Season end rewards
- Tournament prizes
- Offline reward delivery

Players can claim rewards using the `/mailbox` command.

## Optional Dependencies

| Mod | Purpose |
|-----|---------|
| LuckPerms | Permission management for admin commands |
| Text Placeholder API (mod) | Display stats in other mods |

---

## See Also

- [Installation](/docs/cobbleranked/getting-started/installation/) - Step-by-step installation
- [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) - Permission setup
- [Placeholders](/docs/cobbleranked/integration/placeholders/) - Placeholder integration
