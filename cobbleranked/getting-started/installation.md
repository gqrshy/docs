# Installation Guide

Complete guide to install CobbleRanked on your Minecraft server.

---

## Required Mods

Place all of these in your `mods` folder:

| Mod | Version | Download |
|-----|---------|----------|
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| Fabric API | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| Cobblemon | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| Fabric Language Kotlin | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |
| **CobbleRanked** | Latest | [Discord](https://discord.gg/VVVvBTqqyP) |

**Target:** Minecraft 1.21.1 (Fabric server)

> **[📸 INSERT: Screenshot of mods folder with all dependencies]**

---

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
│       ├── blacklist.json5     ← Pokemon/move restrictions
│       ├── arenas.json5        ← Battle coordinates
│       ├── rewards.json5       ← Season/milestone rewards
│       ├── ranked.db           ← SQLite database
│       ├── gui/                ← 4 language GUIs
│       └── language/           ← 4 language files
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
If GUI opens → Installation successful! ✅

> **[📸 INSERT: Screenshot of /ranked GUI showing main menu]**

---

## Initial Setup (Optional)

### Language Configuration

Default: English (`en-Us`)

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "ja-Jp"  // en-Us | ja-Jp | pt-Br | ru-Ru
}
```

**Reload:** `/rankedadmin reload`

**Affects:** GUI text, messages, validation errors

### Arena Setup (Recommended)

Teleport players to battle coordinates instead of current location.

**Step 1:** Stand at desired battle spawn point
**Step 2:** Run command:

```
/rankedadmin arena set main_arena
```

**Saved:** Position (x, y, z), facing (yaw, pitch), dimension

> **[📸 INSERT: Screenshot showing arena setup with coordinates displayed]**

<details>
<summary><strong>Multiple Arenas (Optional)</strong></summary>

Create multiple battle locations for variety:

```
/rankedadmin arena set arena_volcano
/rankedadmin arena set arena_ocean
/rankedadmin arena set arena_forest
```

**Random selection:** Automatically rotates between arenas

**Manage arenas:**
```
/rankedadmin arena list          # View all
/rankedadmin arena tp <name>     # Teleport to arena
/rankedadmin arena remove <name> # Delete arena
```

</details>

### Basic Rules (Recommended)

Ban legendaries and OHKO moves:

Edit `config/cobbleranked/blacklist.json5`:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Reload:** `/rankedadmin reload`

**Details:** [Blacklist Configuration](../configuration/blacklist.md)

---

## Cross-Server Setup (Advanced)

**Required for:** Multi-server networks sharing rankings

**Architecture:**
```
[Lobby Servers] → [Velocity Proxy] → [Battle Server]
        ↓                                   ↓
     [MySQL/MongoDB + Redis] ← ← ← ← ← ← ←
```

### Requirements

- MySQL 8.0+ OR MongoDB 6.0+ (choose one)
- Redis 6.0+
- Velocity 3.4.0+

### Quick Setup

**1. Choose Database:**
- MySQL: Traditional, good for 2-5 servers
- MongoDB: Cloud-ready (Atlas), better for 5+ servers

**2. Install Redis:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

**3. Configure Servers:**

**Battle Server** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Empty = this IS battle server
    "database": {
      "type": "MYSQL",  // or MONGODB
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Lobby Servers** (`config.json5`):
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",     // Unique per server!
    "battle_server": "battle",  // Must match Velocity server name
    "database": { /* SAME as battle */ },
    "redis": { /* SAME as battle */ }
  }
}
```

> **[📸 INSERT: Diagram showing cross-server architecture with Velocity]**

**Full Guide:** [Cross-Server Setup](../advanced/cross-server.md)

---

## See Also

- [FAQ & Troubleshooting](../support/faq.md) - Common issues and solutions

---

## File Structure Reference

```
config/cobbleranked/
├── config.json5           # Main settings (seasons, Elo, clauses)
├── blacklist.json5        # Restrictions (Pokemon/moves/abilities/items)
├── arenas.json5           # Battle coordinates
├── rewards.json5          # Season-end & milestone rewards
├── ranked.db              # SQLite database (auto-created)
├── gui/
│   ├── gui-enUs.json5     # English interface
│   ├── gui-jaJp.json5     # Japanese interface
│   ├── gui-ptBr.json5     # Portuguese interface
│   └── gui-ruRu.json5     # Russian interface
└── language/
    ├── en-Us.json5        # English messages
    ├── ja-Jp.json5        # Japanese messages
    ├── pt-Br.json5        # Portuguese messages
    └── ru-Ru.json5        # Russian messages
```

**All files:** JSON5 format (allows comments `//`)

---

## Next Steps

### For Casual Servers
1. **[Set arenas](../configuration/arenas.md)** - Battle locations
2. **[Configure rewards](../configuration/rewards.md)** - Top 3 prizes
3. **[Customize GUI](../configuration/gui.md)** - Interface tweaks

### For Competitive Servers
1. **[Configure blacklist](../configuration/blacklist.md)** - Smogon/VGC rules
2. **[Adjust Elo system](../configuration/config.md#elo-system)** - Fine-tune ratings
3. **[Set level scaling](../configuration/config.md#ranked-match)** - Force Lv50

### For Cross-Server Networks
1. **[Complete cross-server setup](../advanced/cross-server.md)** - Full guide
2. **[Configure Velocity](../advanced/cross-server.md#velocity-configuration)** - Server routing
3. **[Set up Redis](../advanced/redis.md)** - Real-time sync

---

**Questions?** → [FAQ](../support/faq.md) | [Discord](https://discord.gg/VVVvBTqqyP)
