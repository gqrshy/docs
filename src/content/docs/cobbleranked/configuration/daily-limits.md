---
title: Daily Limits Configuration
description: Configure daily limits to prevent Elo farming and abuse.
---

Prevent Elo farming and reward abuse with daily limits. Players can continue battling after hitting limits, but won't gain additional benefits.

## Configuration

Configure in `battle.yaml`:

```yaml
# battle.yaml
dailyLimits:
  eloGainLimit: 200
  rewardLimit: -1
  resetTimezone: "UTC"
```

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `eloGainLimit` | `200` | Max Elo gained per day (0 = unlimited) |
| `rewardLimit` | `-1` | Max rewards per day (-1 = unlimited) |
| `resetTimezone` | `"UTC"` | Timezone for daily reset |

### Elo Gain Limit

Controls how much Elo a player can gain in a single day.

**How it works:**
- Tracks **net Elo gain** (wins - losses)
- Losses don't count toward the limit
- Only gains are limited
- Resets at midnight in configured timezone

**Example:**
- Player starts at 1500 ELO
- Plays 10 matches, wins 7 (+140 ELO), loses 3 (-30 ELO)
- Net gain: +110 ELO
- Remaining allowance: 200 - 110 = 90 ELO
- Player can continue battling, but won't gain more than 90 ELO

**When limit is reached:**
- Players can still battle
- Wins give 0 ELO gain
- Losses still decrease ELO
- Matchmaking continues normally

### Reward Limit

Controls how many rewards a player can earn per day.

**Values:**
- `-1` = Unlimited (default)
- `0` = Rewards disabled
- `1+` = Maximum rewards per day

**What counts as a reward:**
- Victory rewards (from `victoryCommands`)
- Milestone rewards
- Mission rewards

### Reset Timezone

Use IANA timezone identifiers:

| Region | Example Timezones |
|--------|-------------------|
| Asia | `Asia/Tokyo`, `Asia/Seoul`, `Asia/Shanghai` |
| Europe | `Europe/London`, `Europe/Paris`, `Europe/Berlin` |
| Americas | `America/New_York`, `America/Los_Angeles` |
| UTC | `UTC` |

**Example:**
```yaml
dailyLimits:
  resetTimezone: "Asia/Tokyo"  # Resets at midnight JST
```

## Usage Scenarios

### Competitive Server

Prevent Elo manipulation and smurfing:

```yaml
dailyLimits:
  eloGainLimit: 150    # Lower limit for competitive
  rewardLimit: -1      # Unlimited rewards
  resetTimezone: "UTC"
```

### Casual Server

Focus on fun over limits:

```yaml
dailyLimits:
  eloGainLimit: 300    # Higher limit
  rewardLimit: -1      # Unlimited rewards
  resetTimezone: "America/New_York"
```

### Tournament Preparation

Lock down before events:

```yaml
dailyLimits:
  eloGainLimit: 0      # No Elo gain during freeze
  rewardLimit: 0       # No rewards during freeze
  resetTimezone: "UTC"
```

### Anti-Smurf Measures

Detect and limit smurf accounts:

```yaml
dailyLimits:
  eloGainLimit: 100    # Low limit for new accounts
  rewardLimit: 5       # Limited rewards
  resetTimezone: "UTC"
```

## Player Communication

When players hit the daily limit, they see a message:

```
You have reached your daily Elo gain limit (200).
You can continue battling, but won't gain additional Elo until the reset.
```

This keeps players informed without blocking gameplay.

## Combining with Other Systems

Daily limits work alongside other anti-abuse measures:

| Feature | Purpose |
|---------|---------|
| Daily Limits | Prevents Elo farming in one day |
| Flee Penalties | Punishes disconnects |
| Matchmaking ELO Range | Prevents unbalanced matches |
| New Player K-Factor | Faster skill detection |

Together, these create a fair competitive environment.

---

## See Also

- [ELO Configuration](elo) - Rating system settings
- [Battle Configuration](battle) - Flee penalties and other settings
