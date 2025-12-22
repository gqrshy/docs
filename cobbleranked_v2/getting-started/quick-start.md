# Quick Start

Get your ranked battle system running in minutes.

---

## Overview

After installation, CobbleRanked works with zero configuration. This guide covers optional customization.

**Default settings:**
- Rating system: Pokemon Showdown
- Starting Elo: 1000
- Formats: Singles, Doubles
- Database: SQLite (local)

---

## Step 1: Set Up an Arena

Players need a battle arena. Set positions at your current location:

```bash
# Stand at player 1's position
/rankedadmin setArena main pos1

# Stand at player 2's position
/rankedadmin setArena main pos2

# Stand at the exit location
/rankedadmin setArena main exit
```

Verify arena setup:

```bash
/rankedadmin arena status
```

---

## Step 2: Configure Season (Optional)

Edit `config/cobbleranked/season.yaml`:

```yaml
# Server timezone (all dates use this timezone)
timezone: "UTC"

# Season schedule
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "default"

  - name: "Season 2"
    startDate: "2025-04-01"
    endDate: "2025-06-30"
    preset: "default"

# What happens when season ends
onSeasonEnd:
  resetElo: false
  softResetElo: true       # Partial reset toward starting Elo
  softResetFactor: 0.5     # 50% toward starting Elo
  resetWinLoss: true
  resetStreak: true
```

> 📝 **Note:** Leave `schedule` empty for endless mode (no season rotation).

---

## Step 3: Customize Formats (Optional)

Edit `config/cobbleranked/battle.yaml`:

```yaml
# Enable only the formats you want
enabledFormats:
  - "SINGLES"
  - "DOUBLES"
  # - "TRIPLES"  # Uncomment to enable

# Customize format rules
formats:
  SINGLES:
    teamSize: 3          # Pokemon in party
    selectCount: 3       # Pokemon selected for battle
    levelCap: 100        # Force this level (100 = no cap)
    turnTimeoutSeconds: 90
    matchDurationMinutes: 15
```

---

## Step 4: Apply Changes

Reload configuration:

```bash
/rankedadmin reload
```

---

## Test Your Setup

### As a Player

1. Open ranked menu: `/ranked`
2. Click a format (Singles/Doubles)
3. Click "Join Queue"
4. Wait for opponent (or use a second account to test)

### Battle Flow

1. **Match Found** → Both players see "Match Found!" title
2. **Ready Confirmation** → Click "Ready" button in GUI
3. **Arena Teleport** → Both players teleport to arena
4. **Team Selection** → Choose your battle team
5. **Lead Selection** → Choose your lead Pokemon
6. **Battle Start** → Cobblemon battle begins
7. **Battle End** → Results displayed, teleport back

---

## Optional: Enable Casual Mode

Casual battles allow practice without Elo changes:

```bash
/casual
```

Players can queue for casual matches using the same formats. No Elo gain/loss.

---

## Optional: Enable Missions

Edit `config/cobbleranked/missions.yaml`:

```yaml
enabled: true

dailyResetTime: "00:00"
dailyResetTimezone: "UTC"

dailyMissions:
  - id: "daily_win_1"
    type: "WIN_COUNT"
    targetValue: 1
    displayName: "Win 1 Ranked Match"
    description:
      - "Win 1 ranked match today"
    rewards:
      - "give {player} minecraft:diamond 1"
```

---

## Recommended Configuration

<details>
<summary><strong>Competitive Server Setup</strong></summary>

```yaml
# season.yaml
timezone: "UTC"
schedule:
  - name: "Competitive Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
    preset: "competitive"

onSeasonEnd:
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
```

```yaml
# battle.yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"

formats:
  SINGLES:
    teamSize: 6
    selectCount: 3
    levelCap: 50
    turnTimeoutSeconds: 90
```

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN
startingElo: 1000
floorElo: 1000
```

</details>

<details>
<summary><strong>Casual Server Setup</strong></summary>

```yaml
# season.yaml
schedule: []  # Endless mode

onSeasonEnd:
  resetElo: false
```

```yaml
# battle.yaml
enabledFormats:
  - "SINGLES"

formats:
  SINGLES:
    teamSize: 6
    selectCount: 6
    levelCap: 100
    turnTimeoutSeconds: 120
```

</details>

---

## Next Steps

1. **[Arena Setup](../configuration/arenas.md)** - Create multiple arenas
2. **[Rewards](../configuration/rewards.md)** - Configure season rewards
3. **[Missions](../configuration/missions.md)** - Set up daily/weekly missions
4. **[Blacklist](../configuration/blacklist.md)** - Restrict Pokemon/moves

---

## See Also

- [Installation](installation.md) - Initial setup
- [Commands](commands.md) - All commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
