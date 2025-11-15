# CobbleRanked

A competitive ranked battle system for Cobblemon servers with Elo-based matchmaking, seasonal rankings, and comprehensive customization.

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

> **[📸 INSERT: Main GUI screenshot showing queue, leaderboard, and stats options]**

---

## Features

### Core Features (Zero Configuration)
- **Ranked Matchmaking** - Elo-based with dynamic range expansion (±200 initial, up to ±600)
- **Multiple Formats** - Singles (1v1), Doubles (2v2) with independent rankings
- **Season System** - Auto-rotate every 30 days with top 3 rewards
- **Leaderboards** - Real-time top 10 per format
- **Flee Protection** - 3-tier penalty system (5/15/30 min bans)

### Optional Features
- **Cross-Server** - MySQL/MongoDB + Redis for multi-server networks
- **Blacklist** - 10 label categories + specific Pokemon/moves/abilities/items
- **Custom Rewards** - Season-end (rank-based) + milestones (wins/Elo)
- **Battle Arenas** - Teleport to designated coordinates with custom facing
- **4 Languages** - English, Japanese, Portuguese, Russian

> **[📸 INSERT: Side-by-side comparison of Singles vs Doubles leaderboard]**

---

## Quick Start

```bash
# 1. Install dependencies
# 2. Place CobbleRanked.jar in mods/
# 3. Start server
# 4. Test with /ranked command
```

**Auto-generates:** `config/cobbleranked/` with all config files

**First match:** Players start at 1000 Elo (Pokemon Showdown mode)

---

## Elo System (3 Modes)

| Mode | Use Case | Calculation | Default Values |
|------|----------|-------------|----------------|
| **Pokemon Showdown** ✅ | Recommended | K-factor (32/64) | Start: 1000, Floor: 1000 |
| Glicko-2 | 100+ active players | RD + volatility | Start: 1500, RD: 350 |
| Legacy | Casual | Random (10-30) | N/A |

<details>
<summary><strong>Pokemon Showdown Details</strong></summary>

**K-Factor System:**
- New players (< 10 matches): K=64 (faster changes)
- Established players: K=32 (stable)

**Example Calculation:**
```
Player A (1500 Elo) vs Player B (1500 Elo)
Expected: 50% win chance
Win: +16 Elo
Loss: -16 Elo
```

**Elo Decay:**
- Enabled by default
- -2 Elo per day after 14 days inactive
- Runs daily at UTC 9:00

</details>

> **[📸 INSERT: Chart showing K-factor effect on Elo gains/losses]**

---

## Battle Formats

| Format | Team Size | Description | Ranking |
|--------|-----------|-------------|---------|
| **Singles** | 3-6 Pokemon | Classic 1v1 | Independent |
| **Doubles** | 4-6 Pokemon | VGC-style 2v2 | Independent |
| **Multi** | 1-3 each | Team battles (2v2) | Shared with party |

**Battle Clauses (Default):**
- ✅ Species Clause (no duplicates)
- ✅ OHKO Clause (no Fissure/Sheer Cold)
- ✅ Sleep Clause (max 1 sleeping opponent)
- ✅ Evasion Clause
- ✅ Dynamax Clause
- ❌ Item Clause (duplicates allowed)
- ❌ Terastal Clause (allowed)

---

## Documentation

### 📖 Getting Started
- [Installation](getting-started/installation.md) - Dependency setup
- [Quick Start](getting-started/quick-start.md) - First configuration
- [Commands](getting-started/commands.md) - Full command reference

### ⚙️ Configuration
- [Main Config](configuration/config.md) - All options explained
- [Blacklist](configuration/blacklist.md) - Pokemon/move restrictions
- [Arenas](configuration/arenas.md) - Battle coordinates
- [Rewards](configuration/rewards.md) - Season & milestone rewards
- [Languages](configuration/languages.md) - Message customization
- [GUI](configuration/gui.md) - Interface customization

### 🎮 Features
- [Ranked Battles](features/ranked-battles.md) - Battle flow
- [Elo System](features/elo-system.md) - Rating calculations
- [Battle Formats](features/battle-formats.md) - Format details
- [Seasons](features/seasons.md) - Season management
- [Leaderboards](features/leaderboards.md) - Rankings
- [Disconnect Penalties](features/disconnect-penalties.md) - Flee system
- [Dynamic Matchmaking](features/dynamic-matchmaking.md) - Elo range expansion

### 🔧 Advanced
- [Cross-Server](advanced/cross-server.md) - Multi-server setup
- [Database](advanced/database.md) - SQLite/MySQL/MongoDB
- [Redis](advanced/redis.md) - Real-time sync

### 🔌 Integration
- [Placeholder API](integration/placeholders.md) - Text Placeholder API integration (top 100 ranks)

### 💬 Support
- [FAQ](support/faq.md) - Common questions
- [Troubleshooting](support/troubleshooting.md) - Problem solving
- [Discord](https://discord.gg/VVVvBTqqyP) - #feedback channel

---

## Default Configuration

<details>
<summary><strong>Key Default Values</strong></summary>

```json5
// Season & Battles
"reset_days": 30           // Monthly seasons
"levelMatch": 0            // No level forcing
"turn_limit": 100          // Max turns per battle

// Matchmaking
"initial_range": 200       // ±200 Elo
"expansion_delay": 30      // 30s before expansion
"max_multiplier": 3.0      // Max ±600 Elo

// Flee Penalties
1-5 flees:  5 min ban
6-10 flees: 15 min ban
11+ flees:  30 min ban
Decay: -1 flee per 24 hours

// Elo (Pokemon Showdown)
"initialElo": 1000
"kFactor": 32 (64 for new players)
"provisionalMatches": 10
```

</details>

---

## Requirements

| Required | Version | Optional (Cross-Server) | Version |
|----------|---------|-------------------------|---------|
| Minecraft | 1.21.1 | MySQL | 8.0+ |
| Fabric Loader | 0.17.2+ | MongoDB | 6.0+ |
| Cobblemon | 1.7.0+ | Redis | 6.0+ |
| Fabric API | 0.116.6+ | Velocity | 3.4.0+ |
| Fabric Language Kotlin | 1.13.6+ | | |

---

## Quick Examples

### Casual Server (No Restrictions)
```json5
// blacklist.json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

### Competitive Server (Smogon OU)
```json5
// blacklist.json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"]
}

// config.json5
{
  "ranked_match": {
    "levelMatch": 50  // Force Lv50
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

### VGC Format
```json5
// blacklist.json5
{
  "restricted_label_limits": {
    "restricted": 2  // Max 2 restricted Pokemon
  },
  "black_list_labels": ["mythical"]
}

// config.json5
{
  "battle_clauses": {
    "item_clause": true  // No duplicate items
  }
}
```

---

## Support

- **Questions:** [Discord](https://discord.gg/VVVvBTqqyP) #feedback
- **FAQ:** [Frequently Asked Questions](support/faq.md)
- **Issues:** [Troubleshooting Guide](support/troubleshooting.md)

---

**Ready to start?** → [Installation Guide](getting-started/installation.md)
