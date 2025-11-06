# Quick Start Guide

Get your ranked battles up and running in under 5 minutes!

## Overview

This guide will help you:
1. Configure your first battle arena
2. Set up Pokemon restrictions
3. Start your first season
4. Test the ranked system

**Time required:** ~5 minutes

## Step 1: Create a Battle Arena

Arenas are locations where ranked battles take place.

### Create an Arena

1. **Build your arena** in-game (or use an existing location)
2. **Stand at the spawn point** where you want players to teleport
3. **Run the command:**
   ```
   /rankedadmin arena set <arena_name>
   ```
   Example:
   ```
   /rankedadmin arena set main_arena
   ```

4. **Verify creation:**
   ```
   /rankedadmin arena list
   ```

### Multiple Arenas (Optional)

Create multiple arenas for variety:

```bash
/rankedadmin arena set volcano_arena
/rankedadmin arena set ice_arena
/rankedadmin arena set forest_arena
```

CobbleRanked will randomly select from available arenas.

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
   ```
   /rankedadmin reload
   ```

### Quick Presets

Choose a competitive format:

<details>
<summary><b>VGC-Style (Legendaries Allowed)</b></summary>

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
<summary><b>Smogon OU (No Ubers)</b></summary>

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
<summary><b>Little Cup (First Stage Only)</b></summary>

```json5
{
  "special_format": {
    "enabled": true,
    "format_type": "little_cup"
  }
}
```
</details>

## Step 3: Start the First Season

Seasons automatically rotate based on your configuration.

### Check Current Season

```
/rankedadmin season info
```

You should see:
```
Current Season: Season 1
Started: 2025-10-26
Ends: 2025-11-25 (30 days)
```

### Customize Season Duration

Edit `config/cobbleranked/config.json5`:

```json5
"ranked_match": {
  "reset_days": 30  // Change to 7, 14, 30, 60, 90, etc.
}
```

Reload:
```
/rankedadmin reload
```

## Step 4: Test the System

Let's run through a complete battle flow!

### Join the Queue

1. **Open ranked GUI:**
   ```
   /ranked
   ```
   Or use the in-game GUI item (if configured)

2. **Select battle format:**
   - Singles (1v1)
   - Doubles (2v2)

3. **Join the queue** by clicking the queue button

### Start a Battle (2 Players Needed)

1. **Second player** joins the same format queue
2. **Matchmaking triggers** when two players are in queue
3. **Both players teleport** to a random arena
4. **Battle begins automatically**

### After the Battle

- **Winner gains Elo** (default: 10-30 points)
- **Loser loses Elo** (default: 10-30 points)
- **Stats update** (wins, losses, win rate)
- **Check leaderboard:** `/ranked` → Leaderboard

## Step 5: Set Up Rewards (Optional)

Reward your top players with items or commands!

### Edit Rewards Configuration

Open `config/cobbleranked/rewards.json5`:

```json5
{
  "season_rewards": {
    "first_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 64",
        "give %player% cobblemon:master_ball 5"
      ]
    },
    "second_place": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:diamond 32",
        "give %player% cobblemon:master_ball 3"
      ]
    }
  },
  "milestone_rewards": {
    "10_wins": {
      "enabled": true,
      "commands": [
        "give %player% minecraft:emerald 10"
      ]
    }
  }
}
```

Reload:
```
/rankedadmin reload
```

## Verification Checklist

Before going live, verify:

- [ ] At least one arena is configured
- [ ] Blacklist is configured (if desired)
- [ ] Season is active
- [ ] Rewards are configured (optional)
- [ ] Two players can queue and battle successfully
- [ ] Elo is updating correctly
- [ ] Leaderboard displays rankings

## Common Issues

### No arenas configured

**Symptom:** Players can't start battles

**Fix:**
```
/rankedadmin arena set main_arena
```

### Players can use banned Pokemon

**Symptom:** Mewtwo allowed despite being in blacklist

**Fix:**
1. Check `blacklist.json5` syntax (no trailing commas!)
2. Reload: `/rankedadmin reload`
3. Test with `/ranked` GUI validation

### Elo not updating

**Symptom:** Elo stays at 1000 after battles

**Fix:**
1. Check console for errors
2. Verify database connection
3. Check `config.json5` → `eloSystem.mode` (should be `LEGACY` or `POKEMON_SHOWDOWN`)

### Season already ended

**Symptom:** "Season has ended" message

**Fix:**
```
/rankedadmin season rotate
```
This will create a new season and clear reward flags.

## Next Steps

Now that you're up and running:

- **Customize language** - [Language Files](../configuration/languages.md)
- **Configure Elo system** - [Elo Rating System](../features/elo-system.md)
- **Set up cross-server** - [Cross-Server Setup](../advanced/cross-server.md)
- **Learn all commands** - [Commands Reference](commands.md)

## Testing Checklist

Use this checklist when setting up on a new server:

### Basic Functionality
- [ ] `/ranked` GUI opens
- [ ] Format selection works
- [ ] Queue system accepts players
- [ ] Matchmaking pairs players
- [ ] Battle starts correctly
- [ ] Players teleport to arena
- [ ] Battle ends normally
- [ ] Elo updates after battle

### Configuration
- [ ] Blacklist blocks banned Pokemon
- [ ] Banned moves are prevented
- [ ] Arena teleportation works
- [ ] Language files display correctly
- [ ] GUI items render properly

### Database
- [ ] Player stats persist after restart
- [ ] Leaderboard displays correctly
- [ ] Season data is saved
- [ ] Reward flags work

---

**Having issues?** Check the [Troubleshooting Guide](../support/troubleshooting.md) for solutions.
