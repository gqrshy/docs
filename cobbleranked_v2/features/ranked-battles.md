# Ranked Battles

Competitive Pokemon battles with Elo ratings, matchmaking, and rewards.

---

## Overview

Ranked battles are the core feature of CobbleRanked - competitive Pokemon battles where players queue up, get matched by skill, battle, and earn/lose Elo points.

---

## Battle Flow

### 1. Join Queue

Open the ranked menu and select a format:

```bash
/ranked
```

1. Click a format (Singles/Doubles/Triples)
2. Click "Join Queue"
3. Wait for opponent match

### 2. Match Found

When an opponent is found:

1. **Match Found Title** → "Match Found!" displayed for 5 seconds
2. **Ready Confirmation** → MatchReady GUI appears
3. Both players must click "Ready" within the timeout

> ⚠️ **Warning:** Failing to click Ready counts as a flee and incurs a penalty.

### 3. Arena Teleport

After both players confirm:

1. Both players teleport to a random arena
2. Previous location is saved for return
3. 5-second countdown begins

### 4. Team Selection

Select your battle team:

1. Choose Pokemon from your party
2. Number required depends on format (3 for Singles, 4 for Doubles, 6 for Triples)
3. Time limit: 60 seconds (configurable)
4. If timeout: random Pokemon selected automatically

### 5. Lead Selection (New in v2)

Choose your lead Pokemon:

1. Select which Pokemon to send out first
2. Time limit: 30 seconds (configurable)
3. If timeout: random lead selected automatically

### 6. Battle Start

Standard Cobblemon battle:

- Turn-based combat
- Move selection with timer
- Pokemon switching
- Mega Evolution, Terastallization (if enabled)

### 7. Battle End

When battle concludes:

1. Music stops
2. 3-second delay
3. Teleport back to original position
4. 2-second delay
5. Results displayed with sound effects
6. Elo updated

---

## Battle Formats

| Format | Team Size | Select | Active | Description |
|--------|-----------|--------|--------|-------------|
| **Singles** | 3 | 3 | 1 | Classic 1v1 |
| **Doubles** | 4 | 4 | 2 | VGC-style 2v2 |
| **Triples** | 6 | 6 | 3 | 3v3 battle |

Each format has:
- Independent Elo rating
- Separate leaderboard
- Unique matchmaking queue

---

## Battle Results

| Outcome | Elo Change | Notes |
|---------|------------|-------|
| **Victory** | +Elo | Gain based on opponent's rating |
| **Defeat** | -Elo | Loss based on opponent's rating |
| **Draw** | No change | Time limit reached |
| **Disconnect** | -Elo + flee penalty | Counts as loss |

---

## Competitive Features

### Level Scaling

All Pokemon scaled to same level:

```yaml
# battle.yaml
formats:
  SINGLES:
    levelCap: 50  # All Pokemon → Level 50
```

### Turn Timer

Time limit per turn:

```yaml
# battle.yaml
formats:
  SINGLES:
    turnTimeoutSeconds: 90
```

Warnings at:
- 30% time remaining
- 20% time remaining

### Match Time Limit

Maximum battle duration:

```yaml
# battle.yaml
formats:
  SINGLES:
    matchDurationMinutes: 15
```

Warnings at 5 minutes, 1 minute, 30 seconds remaining.

---

## Disconnect Penalties

Progressive penalty system for fleeing:

| Flee Count | Ban Duration |
|------------|--------------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

Flee count decays over time (configurable).

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

### Milestone Rewards

Achievement-based rewards for wins, Elo, streaks.

**See:** [Rewards Configuration](../configuration/rewards.md)

### Season Rewards

Leaderboard placement rewards at season end.

**See:** [Seasons Configuration](../configuration/seasons.md)

---

## Queue Behavior

### Elo Range Matching

Players matched within Elo range:
- Initial: ±200 Elo
- Expands over time
- Maximum: ±600 Elo (configurable)

**See:** [Matchmaking Configuration](../configuration/matchmaking.md)

### Recent Opponent Avoidance

Avoid rematches with same opponent:
- Tracks last 3 opponents
- 5-minute memory
- Relaxes after extended wait

---

## See Also

- [Casual Battles](casual-battles.md) - Practice without Elo
- [Elo System](elo-system.md) - Rating calculations
- [Leaderboards](leaderboards.md) - Rankings
- [Matchmaking](../configuration/matchmaking.md) - Queue settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
