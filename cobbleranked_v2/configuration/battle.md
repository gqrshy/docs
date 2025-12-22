# Battle Configuration

Complete reference for `config/cobbleranked/battle.yaml`.

---

## Overview

The battle configuration controls formats, timers, sounds, rewards, and announcements.

---

## Enabled Formats

Define which battle formats are available:

```yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"
  # - "TRIPLES"  # Uncomment to enable
```

| Format | Description |
|--------|-------------|
| `SINGLES` | 1v1 battle |
| `DOUBLES` | 2v2 battle |
| `TRIPLES` | 3v3 battle |

---

## Format Rules

Configure each format individually:

```yaml
formats:
  SINGLES:
    teamSize: 3           # Pokemon required in party
    selectCount: 3        # Pokemon selected for battle
    matchDurationMinutes: 15
    turnTimeoutSeconds: 90
    levelCap: 100         # Force all Pokemon to this level
    allowShiny: true

  DOUBLES:
    teamSize: 4
    selectCount: 4
    matchDurationMinutes: 20
    turnTimeoutSeconds: 120
    levelCap: 100
    allowShiny: true

  TRIPLES:
    teamSize: 6
    selectCount: 6
    matchDurationMinutes: 25
    turnTimeoutSeconds: 150
    levelCap: 100
    allowShiny: true
```

| Setting | Description |
|---------|-------------|
| `teamSize` | Minimum Pokemon required in party to queue |
| `selectCount` | Pokemon selected during team selection |
| `matchDurationMinutes` | Maximum match duration |
| `turnTimeoutSeconds` | Time limit per turn |
| `levelCap` | Force Pokemon level (100 = no cap) |
| `allowShiny` | Allow shiny Pokemon |

---

## Timers

Various timeout settings:

```yaml
timers:
  teamSelectionSeconds: 60    # Time to select team
  leadSelectionSeconds: 30    # Time to select lead
  matchReadySeconds: 17       # Time to click Ready
  countdownSeconds: 5         # Countdown before battle
  battleMinutes: 15           # Max battle duration
  battleTimeWarningSeconds:
    - 300    # 5 minute warning
    - 60     # 1 minute warning
    - 30     # 30 second warning
```

---

## Sounds

### Battle Sounds

```yaml
sounds:
  enabled: true

  battle:
    start:
      sound: "minecraft:entity.ender_dragon.growl"
      volume: 0.9
      pitch: 1.2
    win:
      sound: "minecraft:entity.player.levelup"
      volume: 1.0
      pitch: 1.0
    lose:
      sound: "minecraft:entity.wither.spawn"
      volume: 0.7
      pitch: 0.8
    timeout:
      sound: "minecraft:block.note_block.didgeridoo"
      volume: 0.8
      pitch: 0.6
    turnTimer30Percent:
      sound: "minecraft:block.note_block.harp"
      volume: 2.0
      pitch: 1.5
    turnTimer20Percent:
      sound: "minecraft:block.note_block.pling"
      volume: 3.0
      pitch: 2.0
```

<details>
<summary><strong>GUI Sounds</strong></summary>

```yaml
sounds:
  gui:
    buttonClick:
      sound: "minecraft:ui.button.click"
      volume: 0.5
      pitch: 1.0
    buttonBack:
      sound: "minecraft:block.wooden_door.close"
      volume: 0.6
      pitch: 1.1
    buttonConfirm:
      sound: "minecraft:block.note_block.pling"
      volume: 0.7
      pitch: 1.5
    buttonCancel:
      sound: "minecraft:block.note_block.bass"
      volume: 0.6
      pitch: 0.8
    pokemonSelect:
      sound: "minecraft:entity.experience_orb.pickup"
      volume: 0.6
      pitch: 1.3
    pokemonDeselect:
      sound: "minecraft:entity.item.pickup"
      volume: 0.5
      pitch: 0.9
    error:
      sound: "minecraft:entity.villager.no"
      volume: 0.8
      pitch: 1.0
    rewardClaim:
      sound: "minecraft:entity.player.levelup"
      volume: 1.0
      pitch: 1.3
```

</details>

<details>
<summary><strong>Queue Sounds</strong></summary>

```yaml
sounds:
  queue:
    join:
      sound: "minecraft:block.note_block.chime"
      volume: 0.8
      pitch: 1.4
    leave:
      sound: "minecraft:block.note_block.hat"
      volume: 0.6
      pitch: 1.0
    matchFound:
      sound: "minecraft:entity.ender_dragon.ambient"
      volume: 0.8
      pitch: 1.0
    matchAccept:
      sound: "minecraft:block.note_block.bell"
      volume: 0.9
      pitch: 1.3
    readyCountdown:
      sound: "minecraft:entity.experience_orb.pickup"
      volume: 0.7
      pitch: 0.7
```

</details>

---

## Cooldowns

Prevent spam and rate limit actions:

```yaml
cooldowns:
  matchCooldownSeconds: 10      # Between matches
  statsRefreshSeconds: 5        # GUI stats refresh
  queueJoinCooldownSeconds: 3   # Between queue joins
```

---

## Competitive Settings

### Flee Penalty

Progressive penalty for disconnecting during battle:

```yaml
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
    decayRate: 1           # Flee count reduction
    decayIntervalHours: 24 # Decay every 24 hours

  pendingMatchTimeoutMinutes: 5
```

| Flee Count | Ban Duration |
|------------|--------------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

---

## Daily Limits

Prevent excessive grinding:

```yaml
dailyLimits:
  eloGainLimit: 200      # Max Elo gain per day (-1 = unlimited)
  rewardLimit: -1        # Max reward claims per day (-1 = unlimited)
  resetTimezone: "UTC"   # Timezone for daily reset
```

---

## Victory/Defeat Rewards

Commands run on battle outcome:

```yaml
rewards:
  victoryCommands:
    - "give {player} minecraft:diamond 1"
  defeatCommands: []
```

Placeholder: `{player}` = player name

---

## GUI Settings

```yaml
gui:
  statsRefreshCooldownMs: 5000
  leaderboardPageSize: 25
  blacklistPageSize: 45
  animateButtons: true
```

---

## Announcements

```yaml
announcements:
  broadcastMatchStart: true     # Announce when match starts
  broadcastMatchResult: true    # Announce match results
  showActionbarWhileQueued: true

  queueJoin:
    enabled: false
    showPlayerName: true
    showFormat: true
    showQueueCount: true
    showTier: false    # Hide to prevent queue sniping
    showElo: false     # Hide to prevent queue sniping
```

---

## Full Example

<details>
<summary><strong>Complete battle.yaml</strong></summary>

```yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"

formats:
  SINGLES:
    teamSize: 3
    selectCount: 3
    matchDurationMinutes: 15
    turnTimeoutSeconds: 90
    levelCap: 100
    allowShiny: true

  DOUBLES:
    teamSize: 4
    selectCount: 4
    matchDurationMinutes: 20
    turnTimeoutSeconds: 120
    levelCap: 100
    allowShiny: true

timers:
  teamSelectionSeconds: 60
  leadSelectionSeconds: 30
  matchReadySeconds: 17
  countdownSeconds: 5
  battleMinutes: 15
  battleTimeWarningSeconds:
    - 300
    - 60
    - 30

sounds:
  enabled: true
  battle:
    start:
      sound: "minecraft:entity.ender_dragon.growl"
      volume: 0.9
      pitch: 1.2

cooldowns:
  matchCooldownSeconds: 10
  statsRefreshSeconds: 5
  queueJoinCooldownSeconds: 3

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

dailyLimits:
  eloGainLimit: 200
  rewardLimit: -1
  resetTimezone: "UTC"

rewards:
  victoryCommands: []
  defeatCommands: []

announcements:
  broadcastMatchStart: true
  broadcastMatchResult: true
```

</details>

---

## See Also

- [Main Config](config.md) - Language and database
- [Elo Config](elo.md) - Rating system
- [Rewards](rewards.md) - Season and milestone rewards
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
