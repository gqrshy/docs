---
title: Battle Configuration
description: Configure battle behavior, timers, penalties, and rewards.
---

Configure battle behavior in `battle.yaml`. Note that **format-specific settings** (team size, level cap, turn timer) are configured in **season_presets**.

## Timers (Global)

```yaml
# battle.yaml
timers:
  teamSelectionSeconds: 60
  leadSelectionSeconds: 30
  matchReadySeconds: 17
  countdownSeconds: 5
  battleTimeWarningSeconds:
    - 300
    - 60
    - 30
```

> **Note**: `matchDuration` (total match time) and `turnTimer` (time per turn) are configured per-format in season_presets.

| Setting | Default | Description |
|---------|---------|-------------|
| `teamSelectionSeconds` | `60` | Time to select Pokemon team |
| `leadSelectionSeconds` | `30` | Time to choose lead Pokemon |
| `matchReadySeconds` | `17` | Time to accept ready check |
| `countdownSeconds` | `5` | Battle start countdown |
| `battleTimeWarningSeconds` | `[300, 60, 30]` | Warning times (seconds) |

## Format Settings (Season Presets)

Format-specific settings are configured in season presets:

```yaml
# season_presets/default.yml
singles:
  enabled: true
  teamSize: 3
  selectCount: 3
  levelCap: 100
  turnTimer: 90           # seconds per turn
  matchDuration: 15       # minutes total
  megaEvolution: true
  zMoves: true
  dynamax: false
  terastallize: false
```

| Setting | Description |
|---------|-------------|
| `teamSize` | Pokemon to bring to team preview |
| `selectCount` | Pokemon to actually use in battle |
| `levelCap` | Pokemon scaled to this level |
| `turnTimer` | Time limit per turn (seconds) |
| `matchDuration` | Total match time limit (minutes) |

## Battle Gimmicks (Mega Evolution, Z-Moves, Dynamax, Terastallize)

Configure which gimmicks are allowed in ranked battles:

```yaml
# season_presets/default.yml
singles:
  megaEvolution: true
  zMoves: true
  dynamax: false
  terastallize: false
```

**Requirements:**

| Gimmick | Required Mod |
|---------|--------------|
| Mega Evolution | [Mega Showdown](https://modrinth.com/mod/megashowdown) |
| Z-Moves | [Mega Showdown](https://modrinth.com/mod/megashowdown) |
| Dynamax | [Mega Showdown](https://modrinth.com/mod/megashowdown) |
| Terastallize | [Mega Showdown](https://modrinth.com/mod/megashowdown) |

> ⚠️ **Important**: Gimmick settings only work when Mega Showdown is installed. Cobblemon does not natively support these mechanics.

**How Gimmick Restrictions Work:**

When set to `false`:
- CobbleRanked removes key items from player data before battle
- Mega Showdown's `GimmickTurnCheck` is prevented from re-adding them during battle
- Players cannot use the disabled gimmick during ranked matches

When set to `true`:
- Players with the required accessory items can use the gimmick
- Normal Mega Showdown behavior applies

**Notes:**
- Gimmick restrictions only apply during **ranked battles**
- Casual battles, wild battles, and PvP outside ranked are unaffected
- Players retain their accessory items; only key items are temporarily removed

## Victory/Defeat Rewards

Commands executed after each ranked match:

```yaml
# battle.yaml
rewards:
  victoryCommands:
    - "cobblemon give {player} exp_candy_m 1"
    - "cobblemon give {player} rare_candy 1"
  defeatCommands:
    - "cobblemon give {player} exp_candy_s 1"
```

> 📝 Placeholders: `{player}` = player name, `{uuid}` = player UUID

## Flee Penalties

Punish players who disconnect during battles:

```yaml
# battle.yaml
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - minFlees: 1
        maxFlees: 5
        penaltyMinutes: 5
      - minFlees: 6
        maxFlees: 10
        penaltyMinutes: 15
      - minFlees: 11
        maxFlees: 999
        penaltyMinutes: 30

  fleeDecay:
    enabled: true
    decayRate: 1
    decayIntervalHours: 24

  pendingMatchTimeoutMinutes: 5
```

| Setting | Default | Description |
|---------|---------|-------------|
| `pendingMatchTimeoutMinutes` | `5` | Minutes before a pending match expires |

| Flee Count | Queue Ban |
|------------|-----------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

Flee count decreases by 1 every 24 hours (configurable).

<details>
<summary><strong>Customizing Penalty Tiers</strong></summary>

You can add more tiers or change the values:

```yaml
fleePenalty:
  tiers:
    - minFlees: 1
      maxFlees: 3
      penaltyMinutes: 5      # First 3 flees: 5 min
    - minFlees: 4
      maxFlees: 7
      penaltyMinutes: 15     # Next 4 flees: 15 min
    - minFlees: 8
      maxFlees: 999
      penaltyMinutes: 60     # 8+ flees: 1 hour
```

</details>

## GUI Settings

Configure leaderboard and GUI behavior:

```yaml
# battle.yaml
gui:
  leaderboardPageSize: 25
  leaderboardCacheTtlSeconds: 30
  defaultQueueFormat: "singles"
  leaderboardDefaultFormat: "singles"
  queueCooldownSeconds: 10
```

| Setting | Default | Description |
|---------|---------|-------------|
| `leaderboardPageSize` | `25` | Players per leaderboard page |
| `leaderboardCacheTtlSeconds` | `30` | Cache refresh interval |
| `defaultQueueFormat` | `"singles"` | Default format when opening GUI |
| `leaderboardDefaultFormat` | `"singles"` | Default format for leaderboard |
| `queueCooldownSeconds` | `10` | Cooldown between queue joins |

---

## See Also

- [Turn Timer Feature](../features/turn-timer) - Timer system details
- [Announcements](announcements) - Match broadcasts
- [Daily Limits](daily-limits) - Elo gain limits
