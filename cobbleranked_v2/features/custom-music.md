# Custom Background Music

Play custom music during ranked battles with phase-based and Elo-based selection.

---

## Overview

Uses Cobblemon's `BattleMusicPacket` API to send music to players. No client-side mods required (only music resource pack).

**Features:**

- Phase-based music (queue, team selection, battle)
- Elo-based battle music (different tracks for skill tiers)
- Multiple tracks per phase with random selection
- Compatible with Cobblemon 1.6.x and 1.7.x

---

## Music Phases

| Phase | Description | Selection |
|-------|-------------|-----------|
| **Queue** | While waiting for match | Random from list |
| **Team Selection** | During Pokemon selection | Random from list |
| **Battle** | During active battle | Random from Elo-tier list |

---

## Configuration

Edit `config/cobbleranked/config.yaml`:

### Basic Settings

```yaml
music:
  enabled: true
```

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | `true` | Enable custom music system |

---

## Queue Music

Music plays while players wait in the matchmaking queue.

```yaml
music:
  queueMusic:
    - sound: "cobbleranked:queue_music_1"
      volume: 1.0
      pitch: 1.0
    - sound: "cobbleranked:queue_music_2"
      volume: 1.0
      pitch: 1.0
```

| Field | Default | Description |
|-------|---------|-------------|
| `sound` | - | Sound resource location |
| `volume` | `1.0` | Playback volume (0.0-1.0) |
| `pitch` | `1.0` | Playback pitch (0.5-2.0) |

> 📝 **Note:** One track is randomly selected from the list each time.

---

## Team Selection Music

Music plays during Pokemon team selection phase.

```yaml
music:
  teamSelectionMusic:
    - sound: "cobbleranked:team_selection"
      volume: 1.0
      pitch: 1.0
```

---

## Battle Music (Elo-Based)

Different music plays based on players' Elo ratings. The system uses the **higher** Elo between the two players.

```yaml
music:
  battleMusic:
    - minElo: 0
      maxElo: 1499
      musicList:
        - sound: "cobbleranked:battle_normal_1"
          volume: 1.0
          pitch: 1.0
        - sound: "cobbleranked:battle_normal_2"
          volume: 1.0
          pitch: 1.0
    - minElo: 1500
      maxElo: 99999
      musicList:
        - sound: "cobbleranked:battle_elite_1"
          volume: 1.0
          pitch: 1.0
        - sound: "cobbleranked:battle_elite_2"
          volume: 1.0
          pitch: 1.0
```

| Field | Description |
|-------|-------------|
| `minElo` | Minimum Elo for this tier (inclusive) |
| `maxElo` | Maximum Elo for this tier (inclusive) |
| `musicList` | List of tracks (one selected randomly) |

### Default Elo Tiers

| Tier | Elo Range | Description |
|------|-----------|-------------|
| Normal | 0-1499 | Standard ranked matches |
| Elite | 1500+ | High-level competitive matches |

---

## Configuration Examples

<details>
<summary><strong>Single Track per Phase</strong></summary>

Simple setup with one track per phase:

```yaml
music:
  enabled: true

  queueMusic:
    - sound: "cobbleranked:queue"
      volume: 1.0
      pitch: 1.0

  teamSelectionMusic:
    - sound: "cobbleranked:team_select"
      volume: 1.0
      pitch: 1.0

  battleMusic:
    - minElo: 0
      maxElo: 99999
      musicList:
        - sound: "cobbleranked:battle"
          volume: 1.0
          pitch: 1.0
```

</details>

<details>
<summary><strong>Multiple Elo Tiers</strong></summary>

Four-tier system for varied competitive experience:

```yaml
music:
  enabled: true

  battleMusic:
    - minElo: 0
      maxElo: 999
      musicList:
        - sound: "cobbleranked:battle_bronze"
          volume: 1.0
          pitch: 1.0
    - minElo: 1000
      maxElo: 1299
      musicList:
        - sound: "cobbleranked:battle_silver"
          volume: 1.0
          pitch: 1.0
    - minElo: 1300
      maxElo: 1599
      musicList:
        - sound: "cobbleranked:battle_gold"
          volume: 1.0
          pitch: 1.0
    - minElo: 1600
      maxElo: 99999
      musicList:
        - sound: "cobbleranked:battle_master"
          volume: 1.0
          pitch: 1.0
```

</details>

<details>
<summary><strong>Using Minecraft Sounds</strong></summary>

Use vanilla Minecraft music discs:

```yaml
music:
  enabled: true

  queueMusic:
    - sound: "minecraft:music_disc.cat"
      volume: 0.8
      pitch: 1.0

  battleMusic:
    - minElo: 0
      maxElo: 99999
      musicList:
        - sound: "minecraft:music_disc.pigstep"
          volume: 0.8
          pitch: 1.0
```

</details>

---

## Creating Music Resource Pack

### 1. Create Pack Structure

```
cobbleranked_music/
├── pack.mcmeta
├── assets/
│   └── cobbleranked/
│       ├── sounds.json
│       └── sounds/
│           ├── queue_music_1.ogg
│           ├── queue_music_2.ogg
│           ├── team_selection.ogg
│           ├── battle_normal_1.ogg
│           ├── battle_normal_2.ogg
│           ├── battle_elite_1.ogg
│           └── battle_elite_2.ogg
```

### 2. pack.mcmeta

```json
{
  "pack": {
    "pack_format": 34,
    "description": "CobbleRanked Custom Music"
  }
}
```

> 📝 **Note:** pack_format varies by Minecraft version. Use 34 for 1.21.x.

### 3. sounds.json

**File:** `assets/cobbleranked/sounds.json`

```json
{
  "queue_music_1": {
    "sounds": [{ "name": "cobbleranked:queue_music_1", "stream": true }]
  },
  "queue_music_2": {
    "sounds": [{ "name": "cobbleranked:queue_music_2", "stream": true }]
  },
  "team_selection": {
    "sounds": [{ "name": "cobbleranked:team_selection", "stream": true }]
  },
  "battle_normal_1": {
    "sounds": [{ "name": "cobbleranked:battle_normal_1", "stream": true }]
  },
  "battle_normal_2": {
    "sounds": [{ "name": "cobbleranked:battle_normal_2", "stream": true }]
  },
  "battle_elite_1": {
    "sounds": [{ "name": "cobbleranked:battle_elite_1", "stream": true }]
  },
  "battle_elite_2": {
    "sounds": [{ "name": "cobbleranked:battle_elite_2", "stream": true }]
  }
}
```

> 📝 **Note:** Use `"stream": true` for long music files to prevent memory issues.

### 4. Convert Audio to OGG

Minecraft requires OGG Vorbis format:

```bash
ffmpeg -i input.mp3 -c:a libvorbis -q:a 4 output.ogg
```

### 5. Install Resource Pack

**Client-side:**
Place in `.minecraft/resourcepacks/`

**Server-side (forced):**
Configure in `server.properties`:

```properties
resource-pack=https://your-server.com/cobbleranked_music.zip
resource-pack-sha1=<sha1-hash>
require-resource-pack=true
```

---

## Testing

1. Enable music in config
2. Load resource pack
3. Join queue: `/ranked`
4. Music should play automatically during each phase

**Debug:**
- Check server console for sound loading errors
- Verify OGG files play correctly outside Minecraft
- Ensure resource pack is loaded (F3 menu shows active packs)

---

## See Also

- [Main Config](../configuration/config.md) - Full configuration
- [Ranked Battles](ranked-battles.md) - Battle system overview
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
