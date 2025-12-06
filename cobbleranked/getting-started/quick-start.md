# Quick Start Guide

Get your ranked battles up and running in under 5 minutes.

> **Prerequisites:** Make sure you've completed the [Installation](installation.md) guide before proceeding.

---

## Overview

This guide will help you:

1. Configure your first battle arena
2. Set up Pokemon restrictions
3. Start your first season
4. Test the ranked system

**Time required:** ~5 minutes

---

## Step 1: Create a Battle Arena

Arenas are locations where ranked battles take place.

### Set Player Spawn Points

1. **Build your arena** in-game (or use an existing location)

2. **Stand at Player 1's spawn point** and run:

   ```text
   /rankedadmin setArena main_arena pos1
   ```

3. **Move to Player 2's spawn point** (facing Player 1) and run:

   ```text
   /rankedadmin setArena main_arena pos2
   ```

4. **Verify creation:**

   ```text
   /rankedadmin arena status
   ```

<details>
<summary><strong>MULTI Format Setup (4-Player Battles)</strong></summary>

For MULTI format, set 4 spawn positions:

```bash
# Team 1 positions
/rankedadmin setArena multi_arena pos1  # Player 1
/rankedadmin setArena multi_arena pos3  # Player 2 (teammate)

# Team 2 positions
/rankedadmin setArena multi_arena pos2  # Player 3
/rankedadmin setArena multi_arena pos4  # Player 4 (teammate)
```

> 📝 **Note:** If pos3/pos4 are not set, players will be auto-positioned 2 blocks apart from pos1/pos2 (fallback mode).

</details>

### Set Battle Camera Center (Optional)

For the battle camera feature, set the camera focus point:

1. **Stand at the center of your arena**

2. **Run:**

   ```text
   /rankedadmin arena setcenter main_arena
   ```

See [Battle Camera](../features/battle-camera.md) for detailed configuration.

<details>
<summary><strong>Multiple Arenas (Optional)</strong></summary>

Create multiple arenas for variety:

```bash
# First arena
/rankedadmin setArena volcano_arena pos1
/rankedadmin setArena volcano_arena pos2

# Second arena
/rankedadmin setArena ice_arena pos1
/rankedadmin setArena ice_arena pos2

# Third arena
/rankedadmin setArena forest_arena pos1
/rankedadmin setArena forest_arena pos2
```

CobbleRanked randomly selects from available arenas.

</details>

---

## Step 2: Configure Pokemon Restrictions

By default, **all Pokemon are allowed**. Let's ban some overpowered Pokemon:

### Edit Blacklist Configuration

1. **Open the file:** `config/cobbleranked/blacklist.json5`

2. **Ban legendary Pokemon:**

   ```json5
   {
     "black_list_labels": [
       "legendary",   // Bans Mewtwo, Lugia, Ho-Oh, Rayquaza, etc.
       "mythical"     // Bans Mew, Celebi, Jirachi, etc.
     ]
   }
   ```

3. **Save and reload:**

   ```text
   /rankedadmin reload
   ```

### Quick Presets

Choose a competitive format:

<details>
<summary><strong>VGC-Style (Legendaries Allowed)</strong></summary>

```json5
{
  "black_list_labels": [
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Fissure",
    "Sheer Cold",
    "Guillotine",
    "Horn Drill"
  ]
}
```

</details>

<details>
<summary><strong>Smogon OU (No Ubers)</strong></summary>

```json5
{
  "black_list_labels": [
    "legendary",
    "mythical",
    "ultra_beast"
  ],
  "black_list_moves": [
    "Baton Pass"
  ],
  "black_list_ability": [
    "Shadow Tag",
    "Arena Trap",
    "Moody"
  ]
}
```

</details>

<details>
<summary><strong>Little Cup (First Stage Only)</strong></summary>

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```

</details>

---

## Step 3: Start the First Season

Seasons automatically rotate based on your configuration.

### Check Current Season

```text
/rankedadmin season info
```

### Customize Season Duration

Edit `config/cobbleranked/config.json5`:

```json5
"ranked_match": {
  "reset_days": 30  // Change to 7, 14, 30, 60, 90, etc.
}
```

Reload:

```text
/rankedadmin reload
```

---

## Step 4: Test the System

Let's run through a complete battle flow!

### Available Battle Formats

| Format | Players | Description |
|--------|---------|-------------|
| **Singles** | 1v1 | Traditional Pokemon battle |
| **Doubles** | 1v1 | Each player controls 2 Pokemon |
| **Triples** | 1v1 | Each player controls 3 Pokemon |
| **Multi** | 2v2 | Team battle (4 players total) |

### Join the Queue

1. **Open ranked GUI:**

   ```text
   /ranked
   ```

2. **Select battle format** (Singles, Doubles, Triples, or Multi)

3. **Join the queue** by clicking the queue button

### Start a Battle (2+ Players Needed)

1. **Second player** joins the same format queue
2. **Matchmaking triggers** when players are matched
3. **Both players teleport** to a random arena
4. **Battle begins automatically**

### After the Battle

- **Winner gains Elo** (based on rating difference)
- **Loser loses Elo** (based on rating difference)
- **Stats update** (wins, losses, win rate)
- **Check leaderboard:** `/ranked` → Leaderboard

---

## Step 5: Configure Battle Settings (Optional)

### Format-Specific Rules

Edit `config/cobbleranked/config.json5`:

```json5
"battle": {
  "format_rules": {
    "SINGLES": {
      "enabled": true,
      "team_size": 3,
      "turn_timeout_seconds": 90,
      "match_duration_minutes": 15
    },
    "DOUBLES": {
      "enabled": true,
      "team_size": 4,
      "turn_timeout_seconds": 120,
      "match_duration_minutes": 20
    }
  },
  // Force all Pokemon to this level (0 = use original levels)
  "levelMatch": 70
}
```

### Elo System

CobbleRanked uses **Pokemon Showdown-style Elo** by default (starting at 1000).

<details>
<summary><strong>Change Elo Mode</strong></summary>

```json5
"eloSystem": {
  // Options: "LEGACY", "POKEMON_SHOWDOWN", "GLICKO2"
  "mode": "POKEMON_SHOWDOWN",

  "pokemonShowdown": {
    "initialElo": 1000,
    "floorElo": 1000
  }
}
```

See [Elo Rating System](../features/elo-system.md) for detailed configuration.

</details>

---

## Step 6: Set Up Rewards (Optional)

Reward your top players with items or commands!

<details>
<summary><strong>Example Rewards Configuration</strong></summary>

Open `config/cobbleranked/rewards.json5`:

```json5
{
  "season_rewards": {
    "first_place": {
      "enabled": true,
      "commands": [
        "give {player} minecraft:diamond 64",
        "give {player} cobblemon:master_ball 5"
      ]
    },
    "second_place": {
      "enabled": true,
      "commands": [
        "give {player} minecraft:diamond 32",
        "give {player} cobblemon:master_ball 3"
      ]
    }
  },
  "milestone_rewards": {
    "10_wins": {
      "enabled": true,
      "commands": [
        "give {player} minecraft:emerald 10"
      ]
    }
  }
}
```

Reload:

```text
/rankedadmin reload
```

</details>

---

## Command Summary

| Task | Command |
|------|---------|
| Set arena position | `/rankedadmin setArena <name> pos1\|pos2` |
| Set camera center | `/rankedadmin arena setcenter <name>` |
| Check arena status | `/rankedadmin arena status` |
| Reload config | `/rankedadmin reload` |
| Season info | `/rankedadmin season info` |
| Open ranked GUI | `/ranked` |

---

## Next Steps

Now that you're up and running:

- **[Arena Setup](../configuration/arenas.md)** - Advanced arena configuration
- **[Blacklist System](../configuration/blacklist.md)** - Detailed Pokemon restrictions
- **[Battle Formats](../features/battle-formats.md)** - Format-specific settings
- **[Elo Rating System](../features/elo-system.md)** - Configure rating system
- **[Commands Reference](commands.md)** - All available commands

---

## See Also

- [Commands Reference](commands.md) - All available commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
