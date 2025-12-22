# Ranked Battles

Competitive Pokemon battles with Elo ratings, matchmaking, and rewards.

---

## Overview

Ranked battles are the core feature of CobbleRanked - competitive Pokemon battles where players queue up, get matched by skill, battle, and earn/lose Elo points based on results.

**Quick Start:**

1. Build your competitive team
2. Open GUI: `/ranked`
3. Select battle format (Singles, Doubles, Triples)
4. Join queue and wait for opponent
5. Battle and earn rewards!

---

## Battle Flow

### 1. Join Queue

Open the ranked menu and select a format:

```bash
/ranked
```

1. Click a format button (Singles/Doubles/Triples)
2. Click "Join Queue"
3. Wait for opponent match (actionbar shows queue status)

**Queue Status Display:**

```
Searching... (45s) | Queue: 3 | Range: ±250
```

### 2. Match Found

When an opponent is found:

| Step | Duration | Action |
|------|----------|--------|
| 1. Match Title | 5s | "Match Found!" displayed |
| 2. Ready Check | 17s | MatchReady GUI appears |
| 3. Ready Confirm | - | Both players must click "Ready" |

> ⚠️ **Warning:** Failing to click Ready counts as a flee and incurs a penalty.

### 3. Arena Teleport

After both players confirm:

1. Both players teleport to a random arena
2. Previous location is saved for return
3. 5-second countdown begins
4. Battle restrictions activate

### 4. Team Selection

Select your battle team:

| Format | Required Pokemon |
|--------|------------------|
| Singles | 3 |
| Doubles | 4 |
| Triples | 6 |

**Selection Rules:**

- Time limit: 60 seconds (configurable)
- If timeout: random Pokemon selected automatically
- Selected Pokemon are locked for this battle

### 5. Lead Selection

Choose your lead Pokemon:

1. Select which Pokemon to send out first
2. Time limit: 30 seconds (configurable)
3. If timeout: random lead selected automatically

### 6. Battle Start

Standard Cobblemon battle with competitive features:

- Turn-based combat with timer
- Move selection with turn timeout
- Pokemon switching
- Battle format rules enforced
- Background music (if enabled)

### 7. Battle End

When battle concludes:

| Step | Delay | Action |
|------|-------|--------|
| 1 | - | Music stops |
| 2 | 3s | Transition delay |
| 3 | - | Teleport back to original position |
| 4 | 2s | Settlement delay |
| 5 | - | Results displayed with sound |
| 6 | - | Elo updated |

---

## Battle Formats

| Format | Team Size | Select | Active | Description |
|--------|-----------|--------|--------|-------------|
| **Singles** | 3 | 3 | 1 | Classic 1v1 battle |
| **Doubles** | 4 | 4 | 2 | VGC-style 2v2 |
| **Triples** | 6 | 6 | 3 | 3v3 battle |

Each format has:

- ✅ Independent Elo rating
- ✅ Separate leaderboard
- ✅ Format-specific stats
- ✅ Unique matchmaking queue
- ✅ Custom timer settings

**See:** [Battle Formats](battle-formats.md)

---

## Battle Results

| Outcome | Elo Change | Notes |
|---------|------------|-------|
| **Victory** | +Elo | Gain based on opponent's rating |
| **Defeat** | -Elo | Loss based on opponent's rating |
| **Draw** | No change | Time/turn limit reached |
| **Disconnect** | -Elo + flee | Counts as loss, flee count +1 |

### Victory Screen

```
┌─────────────────────────────┐
│       ✦ VICTORY! ✦          │
│                             │
│   Elo: 1200 → 1224 (+24)    │
│   Record: 43W / 15L         │
│   Streak: 5 wins            │
└─────────────────────────────┘
```

### Defeat Screen

```
┌─────────────────────────────┐
│        DEFEAT...            │
│                             │
│   Elo: 1200 → 1182 (-18)    │
│   Record: 42W / 16L         │
│   Streak reset              │
└─────────────────────────────┘
```

---

## Competitive Features

### Level Scaling

All Pokemon scaled to same level for fair competition:

```yaml
# battle.yaml
formats:
  SINGLES:
    levelCap: 100  # All Pokemon → Level 100
```

| Level Cap | Use Case |
|-----------|----------|
| `50` | VGC-style, quick battles |
| `100` | Standard competitive |

### Turn Timer

Time limit per turn with visual/audio warnings:

```yaml
# battle.yaml
formats:
  SINGLES:
    turnTimeoutSeconds: 90
```

**Warning Thresholds:**

- 30% time remaining (27s at 90s timer)
- 20% time remaining (18s at 90s timer)

**See:** [Turn Timer](turn-timer.md)

### Match Time Limit

Maximum battle duration:

```yaml
# battle.yaml
formats:
  SINGLES:
    matchDurationMinutes: 15
```

**Warning Times:**

- 5 minutes remaining
- 1 minute remaining
- 30 seconds remaining

### Team Validation

Before entering queue, teams are validated:

| Check | Description |
|-------|-------------|
| Team size | Minimum Pokemon for format |
| Pokemon bans | No blacklisted species |
| Move bans | No blacklisted moves |
| Ability bans | No blacklisted abilities |
| Item bans | No blacklisted held items |
| Inventory | No banned items in player inventory |

**See:** [Blacklist Configuration](../configuration/blacklist.md)

---

## Queue Behavior

### Elo Range Matching

Players matched within Elo range:

| Time | Range |
|------|-------|
| 0-30s | ±200 Elo (initial) |
| 30-60s | ±250 Elo |
| 60-90s | ±300 Elo |
| 90s+ | ±400+ Elo (max) |

**Configuration:**

```yaml
# matchmaking.yaml
formatRules:
  SINGLES:
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
```

### Recent Opponent Avoidance

Prevent immediate rematches:

- Tracks last 3 opponents
- 5-minute memory
- Relaxes after extended wait (2 minutes)
- Only applies if queue has 4+ players

**See:** [Dynamic Matchmaking](dynamic-matchmaking.md)

### Queue Restrictions

While in queue, certain actions are blocked:

- ❌ PC access
- ❌ Move reordering
- ❌ Teleport commands
- ❌ Portal use

**See:** [Player Restrictions](restrictions.md)

---

## Disconnect Penalties

Progressive penalty system for fleeing:

| Flee Count | Ban Duration |
|------------|--------------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

**Flee Decay:**

- 1 flee removed every 24 hours
- Configurable decay rate

**See:** [Disconnect Penalties](disconnect-penalties.md)

---

## Rewards

### Victory Rewards

Immediate rewards on win:

```yaml
# battle.yaml
rewards:
  victoryCommands:
    - "give {player} minecraft:diamond 1"
```

### Defeat Rewards

Optional consolation rewards:

```yaml
# battle.yaml
rewards:
  defeatCommands:
    - "give {player} minecraft:coal 1"
```

### Milestone Rewards

Achievement-based rewards:

| Milestone | Example Reward |
|-----------|----------------|
| 10 wins | Iron Block |
| 25 wins | Gold Block |
| 50 wins | Diamond Block |
| 100 wins | Netherite Ingot |

### Season Rewards

Top players receive rewards at season end:

| Rank | Reward Tier |
|------|-------------|
| #1 | Champion |
| #2-3 | Elite |
| #4-10 | Veteran |
| #11-25 | Competitor |

**See:** [Rewards Configuration](../configuration/rewards.md)

---

## Daily Limits

Optional limits to prevent grinding abuse:

```yaml
# battle.yaml
dailyLimits:
  eloGainLimit: 200    # Max Elo gain per day (-1 = unlimited)
  rewardLimit: -1      # Max reward claims per day (-1 = unlimited)
  resetTimezone: "UTC" # Daily reset timezone
```

---

## Announcements

Battle announcements configurable:

```yaml
# battle.yaml
announcements:
  broadcastMatchStart: true    # Announce match start
  broadcastMatchResult: true   # Announce match results
  showActionbarWhileQueued: true  # Show queue status
```

### Queue Join Announcement

```yaml
# battle.yaml
announcements:
  queueJoin:
    enabled: false
    showPlayerName: true
    showFormat: true
    showQueueCount: true
    showTier: false
    showElo: false
```

---

## Commands

### Player Commands

| Command | Description |
|---------|-------------|
| `/ranked` | Open ranked menu GUI |
| `/season` | View current season info |
| `/rewards` | View available rewards |

### Admin Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload configuration |
| `/rankedadmin setelo <amount> <player> <format>` | Set player Elo |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo |
| `/rankedadmin setflee <player> <amount>` | Set flee count |
| `/rankedadmin closeRanked` | Toggle system on/off |

**See:** [Commands Reference](../getting-started/commands.md)

---

## Cross-Server Battles

For multi-server networks:

```yaml
# config.yaml
crossServer:
  enabled: true
  serverId: "lobby1"
  battleServer: "battle"
```

**Architecture:**

- Lobby servers: Players queue here
- Battle server: Battles happen here
- MySQL: Shared player data
- Redis: Real-time matchmaking

**See:** [Cross-Server Setup](../advanced/cross-server.md)

---

## See Also

**Core Systems:**

- [Elo System](elo-system.md) - Rating calculations
- [Dynamic Matchmaking](dynamic-matchmaking.md) - Player pairing
- [Battle Formats](battle-formats.md) - Format configurations
- [Seasons](seasons.md) - Competitive seasons

**Configuration:**

- [Blacklist](../configuration/blacklist.md) - Ban Pokemon/moves/abilities
- [Arenas](../configuration/arenas.md) - Battle location setup
- [Rewards](../configuration/rewards.md) - Reward configuration

**Support:**

- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
