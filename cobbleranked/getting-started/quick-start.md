# Quick Start Guide

Get your ranked battles up and running in under 5 minutes!

> **Prerequisites:** Make sure you've completed the [Installation](installation.md) guide before proceeding.

## Overview

This guide will help you:
1. Configure your first battle arena
2. Set up Pokemon restrictions
3. Start your first season
4. Test the ranked system

**Time required:** ~5 minutes

## Step 1: Create a Battle Arena

> **Detailed guide:** [Arena Setup](../configuration/arenas.md)

Arenas are locations where ranked battles take place.

### Create an Arena

1. **Build your arena** in-game (or use an existing location)
2. **Stand at the first spawn point** where you want Player 1 to teleport when battle starts

> **[📸 IMAGE NEEDED: プレイヤーがアリーナ作成位置に立っている様子（座標とYaw/Pitch表示）]**

3. **Run the command:**
   ```bash
   /rankedadmin setArena main_arena pos1
   ```

4. **Move to second spawn point** and run:
   ```bash
   /rankedadmin setArena main_arena pos2
   ```

5. **Verify creation:**
   ```bash
   /rankedadmin arena status
   ```

**Note:** For MULTI mode (4-player battles), you need to set `pos3` and `pos4` as well.

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

> **[📸 IMAGE NEEDED: 複数のアリーナが配置されたマップ全体図（火山、氷、森など）]**

CobbleRanked will randomly select from available arenas.

</details>

## Step 2: Configure Pokemon Restrictions

> **Detailed guide:** [Blacklist System](../configuration/blacklist.md)

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

> **[📸 IMAGE NEEDED: リロードコマンド実行後の成功メッセージ画面]**

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

> **Detailed guide:** [Season Management](../features/seasons.md)

Seasons automatically rotate based on your configuration.

### Check Current Season

```bash
/rankedadmin season info
```

> **[📸 IMAGE NEEDED: /rankedadmin season infoコマンド実行結果の画面]**

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

> **Detailed guide:** [Battle Formats](../features/battle-formats.md)

Let's run through a complete battle flow!

### Join the Queue

1. **Open ranked GUI:**
   ```bash
   /ranked
   ```

> **[📸 IMAGE NEEDED: ランクメニューGUIのメイン画面（Singles/Doublesフォーマット選択）]**

2. **Select battle format** (Singles, Doubles, Triples, MULTI, etc.)

3. **Join the queue** by clicking the queue button

### Start a Battle (2 Players Needed)

1. **Second player** joins the same format queue
2. **Matchmaking triggers** when two players are in queue
3. **Both players teleport** to a random arena
4. **Battle begins automatically**

> **[📸 IMAGE NEEDED: バトル開始時の対戦シーン（両プレイヤーがアリーナに配置された状態）]**

### After the Battle

- **Winner gains Elo** (default: 10-30 points)
- **Loser loses Elo** (default: 10-30 points)
- **Stats update** (wins, losses, win rate)
- **Check leaderboard:** `/ranked` → Leaderboard

> **[📸 IMAGE NEEDED: リーダーボード表示画面（トッププレイヤーとEloランキング）]**

## Step 5: Set Up Rewards (Optional)

> **Detailed guide:** [Rewards System](../configuration/rewards.md)

Reward your top players with items or commands!

### Edit Rewards Configuration

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

**Reload:**
```bash
/rankedadmin reload
```

</details>

> **[📸 IMAGE NEEDED: リワード収集GUI（シーズン報酬とマイルストーン報酬の表示）]**

## Next Steps

Now that you're up and running:

- **Customize language** - [Language Files](../configuration/languages.md)
- **Configure Elo system** - [Elo Rating System](../features/elo-system.md)
- **Set up cross-server** - [Cross-Server Setup](../advanced/cross-server.md)
- **Learn all commands** - [Commands Reference](commands.md)

---

**Having issues?** Check the [Troubleshooting Guide](../support/troubleshooting.md) for solutions.
