---
title: Daily Limits Configuration
description: Configure daily Elo gain limits to prevent farming.
---

Prevent Elo farming with daily gain caps. Players can still battle after hitting limits, but won't gain additional Elo.

## Configuration

Configure in `battle.yaml`:

```yaml
# battle.yaml
dailyLimits:
  eloGainLimit: 200
  resetTimezone: "UTC"
```

| Setting | Default | Description |
|---------|---------|-------------|
| `eloGainLimit` | `200` | Max positive Elo gain per day (0 = unlimited) |
| `resetTimezone` | `"UTC"` | Timezone for daily reset |

## How Elo Limit Works

- Tracks **cumulative positive gains** per day
- Losses still decrease Elo normally
- Resets at midnight in configured timezone

**When limit is reached:**
- Players can still battle
- Wins give 0 Elo gain
- Losses still decrease Elo

<details>
<summary><strong>Example</strong></summary>

- Player starts at 1500 ELO
- Plays 10 matches, wins 7 (+140 ELO), loses 3 (-30 ELO)
- Remaining allowance: 200 - 140 = 60 ELO
- After hitting 200 net gain: wins give 0, losses still count

</details>

---

## See Also

- [ELO Configuration](/docs/cobbleranked/configuration/elo/) - Rating system settings
- [Battle Configuration](/docs/cobbleranked/configuration/battle/) - Flee penalties and other settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
