# Ranked Battles

Competitive Pokemon battles with Elo ratings, matchmaking, and rewards.

---

## Overview

Ranked battles are the core feature of CobbleRanked - competitive Pokemon battles where players queue up, get matched by skill, battle, and earn/lose Elo points based on results.

**Quick Start:**
1. Build your competitive team
2. Open GUI: `/ranked`
3. Select battle format (Singles, Doubles, etc.)
4. Join queue and wait for opponent
5. Battle and earn rewards!

---

## Battle Flow

### 1. Queue & Matchmaking

**Join Queue:**
```bash
/ranked  # Opens GUI → Select format → Click "Join Queue"
```

**Matchmaking Process:**
- System pairs players with similar Elo ratings
- Initial range: ±200 Elo
- Range expands over time if no match found
- Maximum range: ±600 Elo after 2.5 minutes

**See Also:** [Dynamic Matchmaking](dynamic-matchmaking.md)

---

### 2. Team Validation

Before battle starts, your team is validated:

**✅ Validation Checks:**
- Team size (default: 3-6 Pokemon depending on format)
- No banned Pokemon ([Blacklist System](../configuration/blacklist.md))
- No banned moves
- No banned abilities
- No banned held items
- No banned inventory items ([Inventory Restrictions](../features/banned-items.md))

**If validation fails:** You're removed from queue with an error message explaining the issue.

---

### 3. Battle Start

**Teleportation:**
- Both players teleport to a random arena
- Previous location saved for return
- Works across dimensions

**Battle Settings:**
- Level scaling applied (if configured)
- Turn timer active ([Turn Timer](turn-timer.md))
- Battle format enforced (Singles/Doubles/etc.)
- Competitive clauses enabled

**See Also:** [Arena Setup](../configuration/arenas.md)

---

### 4. During Battle

Standard Cobblemon battle mechanics:
- Turn-based combat
- Move selection
- Pokemon switching
- Mega Evolution, Terastallization (if enabled)

**Special Features:**
- Turn limit (default: 100 turns)
- Disconnect detection
- Battle time tracking

---

### 5. Battle End & Results

**Possible Outcomes:**
| Outcome | Elo Change | Notes |
|---------|------------|-------|
| **Victory** | +Elo (varies) | Gain based on opponent's rating |
| **Defeat** | -Elo (varies) | Loss based on opponent's rating |
| **Draw** | No change | Turn limit reached |
| **Disconnect** | Flee penalty | Counts as loss, flee count +1 |

**Post-Battle:**
- Elo calculated and applied ([Elo System](elo-system.md))
- Stats updated (wins/losses/winrate)
- Rewards distributed (if milestone reached)
- Teleport back to previous location

---

## Battle Formats

CobbleRanked supports multiple battle formats with independent rankings:

| Format | Description | Team Size | Active Pokemon |
|--------|-------------|-----------|----------------|
| **Singles** | 1v1 battle | 3 | 1 per side |
| **Doubles** | 2v2 battle | 4 | 2 per side |
| **Triples** | 3v3 battle | 3 | 3 per side |
| **Multi** | 2v2 team battle (4 players total) | 2 per player | 1 per player |

**Random Battle Formats:**
- **Random Singles** - Auto-generated 6v6 teams
- **Random Doubles** - Auto-generated 6v6 doubles
- **Random 3v3** - Quick 3v3 with random teams

**Each format has:**
- Independent Elo rating
- Separate leaderboard
- Format-specific stats
- Unique matchmaking queue

**See Also:** [Battle Formats](battle-formats.md)

---

## Competitive Features

### Level Scaling

**Force all Pokemon to same level:**
```json5
{
  "battle": {
    "levelMatch": 70  // All Pokemon → Level 70
  }
}
```

**Benefits:**
- Fair competition
- No grinding advantage
- Skill-based battles

---

### Original Trainer Requirement

**Prevent traded teams:**
```json5
{
  "competitive": {
    "requireOriginalTrainer": true
  }
}
```

**Effect:**
- Players must be OT (Original Trainer) of all Pokemon
- Prevents buying/trading perfect teams
- Encourages catching/breeding

---

### Disconnect Penalties

**Rage quit detection:**
- Player disconnects during battle → Flee count +1
- Counts as loss with Elo penalty
- Opponent wins automatically

**Flee count visible in player stats**

**Admin can reset:**
```bash
/rankedarena setflee <player> 0
```

**See Also:** [Disconnect Penalties](disconnect-penalties.md)

---

## Reward System

### Milestone Rewards

Earn rewards at win milestones:
- 10 wins
- 25 wins
- 50 wins
- 100 wins

**Configuration:** `config/cobbleranked/rewards.json5`

### Season Rewards

Top players receive exclusive rewards at season end:
- Top 1
- Top 3
- Top 5
- Top 10
- Top 25

**See Also:** [Rewards System](../configuration/rewards.md) · [Season Management](seasons.md)

---

## Commands

### Player Commands

```bash
/ranked          # Open ranked GUI
/season          # View current season
```

### Admin Commands

```bash
/rankedarena setelo <amount> <player> <format>    # Set player Elo
/rankedarena addelo <amount> <player> <format>    # Add Elo
/rankedarena removeelo <amount> <player> <format> # Remove Elo
/rankedarena setflee <player> <amount>            # Set flee count
/rankedarena closeRanked                          # Toggle system on/off
```

**See Also:** [Commands & Permissions](../getting-started/commands.md)

---

## Leaderboards

**View Leaderboards:**
```bash
/ranked  # GUI → Click "Leaderboard" button
```

**Features:**
- Format-specific leaderboards (Singles, Doubles, etc.)
- Top 100 players displayed
- Pagination support
- Real-time updates

**See Also:** [Leaderboards](leaderboards.md)

---

## Cross-Server Battles

**Multi-server setup supported:**
- Main/lobby servers for queueing
- Dedicated battle server for fights
- MySQL for shared player data
- Redis for real-time matchmaking

**Configuration:** `config/cobbleranked/config.json5`
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle"
  }
}
```

**See Also:** [Cross-Server Setup](../advanced/cross-server.md)

---

## Related Documentation

**Core Systems:**
- [Elo Rating System](elo-system.md) - How ratings are calculated
- [Dynamic Matchmaking](dynamic-matchmaking.md) - Player pairing system
- [Battle Formats](battle-formats.md) - Available formats
- [Season Management](seasons.md) - Competitive seasons

**Configuration:**
- [Blacklist System](../configuration/blacklist.md) - Ban Pokemon/moves/abilities
- [Arena Setup](../configuration/arenas.md) - Configure battle arenas
- [Rewards System](../configuration/rewards.md) - Milestone & season rewards
- [Main Configuration](../configuration/config.md) - All settings

**Advanced:**
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Database Configuration](../advanced/database.md) - MySQL/SQLite setup
- [Redis Integration](../advanced/redis.md) - Real-time synchronization

---

## Troubleshooting

**Battle not starting?**
- Check team validation message
- Verify arena exists: `/rankedarena arena list`
- Check console for errors

**Elo not updating?**
- Check if battle ended in draw (turn limit)
- Verify database connection
- Check `logs/latest.log` for errors

**Can't find opponent?**
- Wait longer for Elo range to expand
- Check queue size: Look for other players in queue
- Try different battle format

**See Also:** [FAQ & Troubleshooting](../support/faq.md)
