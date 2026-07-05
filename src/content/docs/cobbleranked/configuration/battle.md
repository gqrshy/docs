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

## Battle Start Delays

Fine-grained delays during battle start, useful for high-latency or cross-server (Arclight) setups where clients need extra time to receive battle packets:

```yaml
# battle.yaml
timers:
  startDelays:
    leadGuiCloseMs: 500              # wait for lead-selection GUI to close
    titleDisplayMs: 500              # hold the "battle start" title
    crossServerPacketSyncMs: 1000    # cross-server only: packet sync
    arclightInitMs: 500              # Arclight/Bukkit: wait for battle init
    battleMusicMs: 1000              # delay before battle music overrides Cobblemon's
```

Raise these if players see battle UI issues or get stuck at battle start; lower them for snappier starts on low-latency single-server setups.

## Random Battle (Randbats)

Showdown-style Random Battle, where the server generates a balanced team for each player. See [Random Battle](/docs/cobbleranked/features/random-battle/) for the full guide.

```yaml
# battle.yaml
randomBattle:
  enabled: true
  teamSize: 6
  setsFile: "gen9randombattle.json"
  # statsMode: OPTIMIZED (252/252/4 + boosting nature) | OFFICIAL (flat EV85 + neutral, Showdown-accurate) | FLAT (IV31/EV0/neutral)
  statsMode: "OFFICIAL"
  weighting:
    enabled: true                   # team-composition constraints (Showdown parity)
    multipliers: {}                 # speciesId -> weight multiplier
    exclusions: []                  # speciesId list to exclude
    speciesDuplication:
      enabled: true
      maxSameBaseSpecies: 1
    typeDiversity:
      enabled: true
      maxPerType: 2
    resistanceDiversity:
      enabled: true
      maxWeaknesses: 3
      maxDoubleWeaknesses: 1
  autoUpdate:
    enabled: false                  # periodically fetch latest randbats data
    intervalHours: 24
    sourceUrl: "https://data.pkmn.cc/randbats"
    battleServerOnly: true          # cross-server: only battle server fetches
```

| Setting | Description |
|---------|-------------|
| `statsMode` | How IVs/EVs/nature are assigned: `OPTIMIZED`, `OFFICIAL` (Showdown parity, default), or `FLAT` |
| `weighting.*` | Team-composition constraints (species duplication, type/resistance diversity). Default ON for balanced teams |
| `autoUpdate.*` | Periodically fetch the latest randbats data and hot-reload |

The legacy `optimizeStats` flag is still respected for backward compatibility: when `statsMode` is `OPTIMIZED` (the default), `optimizeStats: false` is treated as `FLAT`. Setting `statsMode` explicitly always takes precedence.

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

Commands executed after each ranked match. **Both lists default to empty (disabled).** Add commands to enable them. Only runs for ranked matches.

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

## Flee & Forfeit Penalties

Penalize players who rage-quit, disconnect mid-battle, or forfeit, including alt-account ELO farming via repeated early forfeits. See [Flee & Forfeit Penalties](/docs/cobbleranked/features/forfeit-system/) for the full feature overview.

```yaml
# battle.yaml
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - { minFlees: 1, maxFlees: 1, penaltyMinutes: 0 }       # 1st: warning
      - { minFlees: 2, maxFlees: 2, penaltyMinutes: 5 }       # 2nd: 5 min
      - { minFlees: 3, maxFlees: 3, penaltyMinutes: 30 }      # 3rd: 30 min
      - { minFlees: 4, maxFlees: 5, penaltyMinutes: 180 }     # 4-5th: 3 hours
      - { minFlees: 6, maxFlees: 9, penaltyMinutes: 360 }     # 6-9th: 6 hours
      - { minFlees: 10, maxFlees: 999, penaltyMinutes: 1440 } # 10+: 1 day

  earlyForfeit:
    enabled: true
    maxTurns: 3              # forfeits at turn < maxTurns are "early" (turn is 0-indexed)
    penaltyMultiplier: 3.0   # base fleePenalty minutes * this value

  forfeitBlock:
    enabled: false           # when true, forfeit is forbidden within the first maxTurns turns
    maxTurns: 3

  fleeDecay:
    enabled: true
    decayRate: 1
    decayIntervalHours: 24

  pendingMatchTimeoutMinutes: 5
```

| Offense | Queue Ban |
|---------|-----------|
| 1st | warning (0 min) |
| 2nd | 5 min |
| 3rd | 30 min |
| 4th–5th | 3 hours |
| 6th–9th | 6 hours |
| 10th+ | 1 day |

Flee count decreases by 1 every 24 hours (configurable via `fleeDecay`).

### Early-Forfeit Penalty

`earlyForfeit` applies a multiplier to the base penalty when a player forfeits within the first `maxTurns` turns. This shuts down alt-account ELO farming (repeated turn-1 forfeits to feed rating).

> Note: the base `fleePenalty` 1st tier is 0 min, so `0 × multiplier = 0` on the very first early forfeit. Raise the 1st tier above 0 if you want even the first early forfeit to hurt.

### Forfeit Block

`forfeitBlock` (off by default) forbids forfeiting entirely within the first `maxTurns` turns. The forfeit is cancelled, the player is re-prompted to choose an action, and shown a message. Once `maxTurns` has passed, forfeiting works normally.

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

```yaml
# battle.yaml
gui:
  leaderboardPageSize: 25
  blacklistPageSize: 45
  statsRefreshCooldownMs: 5000
```

| Setting | Default | Description |
|---------|---------|-------------|
| `leaderboardPageSize` | `25` | Players per leaderboard page |
| `blacklistPageSize` | `45` | Items per blacklist page |
| `statsRefreshCooldownMs` | `5000` | Cooldown between stat refreshes |

## Cooldowns

```yaml
# battle.yaml
cooldowns:
  matchCooldownSeconds: 10
  queueJoinCooldownSeconds: 3
```

| Setting | Default | Description |
|---------|---------|-------------|
| `matchCooldownSeconds` | `10` | Cooldown after a match ends |
| `queueJoinCooldownSeconds` | `3` | Cooldown between queue joins |

## Daily Elo Limits

The daily rating-gain cap lives in [`elo.yaml`](/docs/cobbleranked/configuration/elo/) as `dailyEloGainLimit`. Losses are never capped. The reset time of day follows `config.yaml -> timezone`.

See [ELO Configuration](/docs/cobbleranked/configuration/elo/#daily-elo-gain-limit) for details.

---

## See Also

- [Turn Timer Feature](/docs/cobbleranked/features/turn-timer/) - Timer system details
- [Announcements](/docs/cobbleranked/configuration/announcements/) - Match broadcasts
- [ELO Configuration](/docs/cobbleranked/configuration/elo/) - Rating system and daily limits
