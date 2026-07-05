---
title: Sound Configuration
description: Customize all sound effects for battles, GUI, and queue events.
---

Make your server unique with custom sound effects. Every interaction can have its own sound. From battle start to button clicks.

File: `config/cobbleranked/sounds.yaml`

---

## Basic Configuration

```yaml
# sounds.yaml
enabled: true
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable all sound effects |

---

## Sound Format

Each sound uses this format:

```yaml
start: { sound: "minecraft:entity.ender_dragon.growl", volume: 0.9, pitch: 1.2 }
```

| Property | Range | Description |
|----------|-------|-------------|
| `sound` | Minecraft sound ID | The sound to play |
| `volume` | 0.0 - 4.0 | Loudness (higher = louder) |
| `pitch` | 0.5 - 2.0 | Speed/tone (higher = faster) |

> 📝 Use `/playsound` in-game to test sounds. Tab-complete to discover available sounds.

---

## Battle Sounds

Sounds played during battle events:

```yaml
# sounds.yaml
battle:
  start: { sound: "minecraft:entity.ender_dragon.growl", volume: 0.9, pitch: 1.2 }
  win: { sound: "minecraft:entity.player.levelup", volume: 1.0, pitch: 1.0 }
  lose: { sound: "minecraft:entity.wither.spawn", volume: 0.7, pitch: 0.8 }
  timeout: { sound: "minecraft:block.note_block.didgeridoo", volume: 0.8, pitch: 0.6 }
  turnTimer30Percent: { sound: "minecraft:block.note_block.harp", volume: 2.0, pitch: 1.5 }
  turnTimer20Percent: { sound: "minecraft:block.note_block.pling", volume: 3.0, pitch: 2.0 }
  battleTime60s: { sound: "minecraft:block.note_block.bell", volume: 2.0, pitch: 1.0 }
  battleTime30s: { sound: "minecraft:block.anvil.land", volume: 1.0, pitch: 1.2 }
  battleTime10s: { sound: "minecraft:block.note_block.pling", volume: 3.0, pitch: 2.0 }
```

| Sound | When Played |
|-------|-------------|
| `start` | Battle begins |
| `win` | You win the battle |
| `lose` | You lose the battle |
| `timeout` | Battle ends due to time limit |
| `turnTimer30Percent` | 30% of turn time remaining |
| `turnTimer20Percent` | 20% of turn time remaining |
| `battleTime60s` | 60 seconds left in battle |
| `battleTime30s` | 30 seconds left in battle |
| `battleTime10s` | 10 seconds left in battle |

---

## GUI Sounds

Sounds for interface interactions:

```yaml
# sounds.yaml
gui:
  buttonClick: { sound: "minecraft:ui.button.click", volume: 0.5, pitch: 1.0 }
  buttonBack: { sound: "minecraft:block.wooden_door.close", volume: 0.6, pitch: 1.1 }
  buttonConfirm: { sound: "minecraft:block.note_block.pling", volume: 0.7, pitch: 1.5 }
  buttonCancel: { sound: "minecraft:block.note_block.bass", volume: 0.6, pitch: 0.8 }
  pageTurn: { sound: "minecraft:item.book.page_turn", volume: 0.5, pitch: 1.0 }
  pokemonSelect: { sound: "minecraft:entity.experience_orb.pickup", volume: 0.6, pitch: 1.3 }
  pokemonDeselect: { sound: "minecraft:entity.item.pickup", volume: 0.5, pitch: 0.9 }
  teamConfirm: { sound: "minecraft:entity.player.levelup", volume: 0.7, pitch: 1.2 }
  error: { sound: "minecraft:entity.villager.no", volume: 0.8, pitch: 1.0 }
  warning: { sound: "minecraft:block.note_block.didgeridoo", volume: 0.6, pitch: 0.8 }
  rewardClaim: { sound: "minecraft:entity.player.levelup", volume: 1.0, pitch: 1.3 }
  leaderboardOpen: { sound: "minecraft:block.enchantment_table.use", volume: 0.7, pitch: 1.2 }
  blacklistView: { sound: "minecraft:item.book.page_turn", volume: 0.5, pitch: 1.1 }
```

| Sound | When Played |
|-------|-------------|
| `buttonClick` | Any GUI button click |
| `buttonBack` | Back/return button |
| `buttonConfirm` | Confirm action button |
| `buttonCancel` | Cancel action button |
| `pageTurn` | Leaderboard page change |
| `pokemonSelect` | Select a Pokemon for team |
| `pokemonDeselect` | Deselect a Pokemon |
| `teamConfirm` | Confirm team selection |
| `error` | Error message displayed |
| `warning` | Warning message displayed |
| `rewardClaim` | Claim a reward |
| `leaderboardOpen` | Open leaderboard GUI |
| `blacklistView` | Open blacklist GUI |

---

## Queue Sounds

Sounds for matchmaking queue events:

```yaml
# sounds.yaml
queue:
  join: { sound: "minecraft:block.note_block.chime", volume: 0.8, pitch: 1.4 }
  leave: { sound: "minecraft:block.note_block.hat", volume: 0.6, pitch: 1.0 }
  matchFound: { sound: "minecraft:entity.ender_dragon.ambient", volume: 0.8, pitch: 1.0 }
  matchAccept: { sound: "minecraft:block.note_block.bell", volume: 0.9, pitch: 1.3 }
  matchDecline: { sound: "minecraft:block.anvil.land", volume: 0.7, pitch: 0.7 }
  readyCountdown: { sound: "minecraft:entity.experience_orb.pickup", volume: 0.7, pitch: 0.7 }
  opponentReady: { sound: "minecraft:block.note_block.chime", volume: 0.8, pitch: 1.6 }
  restrictionCleared: { sound: "minecraft:entity.experience_orb.pickup", volume: 0.7, pitch: 1.2 }
  fleePenaltyExpired: { sound: "minecraft:entity.player.levelup", volume: 0.6, pitch: 1.4 }
```

| Sound | When Played |
|-------|-------------|
| `join` | Join matchmaking queue |
| `leave` | Leave queue |
| `matchFound` | Match found notification |
| `matchAccept` | Accept match |
| `matchDecline` | Decline match |
| `readyCountdown` | Countdown tick during ready phase |
| `opponentReady` | Opponent confirms ready |
| `restrictionCleared` | Restriction (flee penalty) expires |
| `fleePenaltyExpired` | Flee penalty timer ends |

---

## Background Music (BGM)

Background music config lives in the `music` section of `sounds.yaml`. It was **moved here from `config.yaml`** in v2.1.0. The old `music` block in `config.yaml` is no longer read, so if your music wasn't playing after upgrading, move it here.

```yaml
# sounds.yaml
music:
  enabled: true
  # Played during the team-selection screen
  teamSelectionMusic:
    - { music: "minecraft:music.overworld.cherry_grove", volume: 0.6, pitch: 1.0 }
  # Played during the battle itself (picked by average-Elo band)
  battleMusic:
    - minElo: 0
      maxElo: 1500
      musicList:
        - { music: "minecraft:music.overworld.forest", volume: 0.6, pitch: 1.0 }
    - minElo: 1500
      maxElo: 9999
      musicList:
        - { music: "minecraft:music.overworld.jungle", volume: 0.7, pitch: 1.0 }
```

| Setting | Description |
|---------|-------------|
| `enabled` | Master switch for background music |
| `teamSelectionMusic` | List of tracks; one is picked at random when the team-selection screen opens |
| `battleMusic` | Elo-banded lists; the band matching the match's average Elo is used, then a track is picked at random |

Music starts at the team-selection screen and continues through lead selection (so it doesn't cut out). In full-party formats where team selection is skipped (e.g. Random Battle), music starts at the lead-selection screen instead. Battle music overrides Cobblemon's default battle music once the battle begins.

---

## Disabling Sounds

To disable a specific sound, set `volume: 0`:

```yaml
battle:
  start: { sound: "minecraft:entity.ender_dragon.growl", volume: 0, pitch: 1.0 }
```

Or disable all sounds globally:

```yaml
enabled: false
```

---

## Finding Sounds

<details>
<summary><strong>In-Game: Tab-Complete Method</strong></summary>

1. Use `/playsound minecraft:` and press Tab
2. Browse categories like `entity.`, `block.`, `item.`
3. Test with: `/playsound minecraft:entity.player.levelup master @p`

**Common Categories:**

| Category | Examples |
|----------|----------|
| `entity.*` | Mob sounds, player sounds |
| `block.*` | Block interactions, note blocks |
| `item.*` | Item use sounds |
| `ui.*` | Interface sounds |

</details>

<details>
<summary><strong>Browser: Minecraft Sounds Library</strong></summary>

Browse and preview all Minecraft sounds online:

- **[minecraft-sounds.vercel.app](https://minecraft-sounds.vercel.app/)** - Search, filter, and play sounds directly in your browser

No Minecraft installation required. Copy the sound ID (e.g., `entity.player.levelup`) and paste it into your config.

</details>

<details>
<summary><strong>Software: Playsounder</strong></summary>

Standalone application to play all Minecraft sounds:

- **[Download Playsounder](https://github.com/midorikuma/Playsounder/releases)** - Download the latest `.exe` file

Browse and play sounds from Minecraft versions installed on your system. No need to launch the game.

**Usage:**
1. Launch the application
2. Select your Minecraft version (matches your launcher configurations)
3. Browse sound paths (same format as sound commands)
4. Click to play any sound

**Extension Tab Features:**
- Load/save command lists
- playsound parameter configuration
- Double-click commands in the list to preview
- Edit commands (replace, add, delete, move)
- Multi-select with Ctrl/Shift
- Simultaneous playback of multiple sounds

</details>

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [Battle Configuration](/docs/cobbleranked/configuration/battle/) - Battle timers and settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
