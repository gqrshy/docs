# Custom Background Music

Play custom music during ranked battles.

## Overview

Uses Cobblemon's `BattleMusicPacket` API to send music to players. No client-side mods required (only music resource pack).

**Features:**
- Phase-based music (queue, team selection, battle)
- Elo-based battle music (higher ranks = different music)
- Compatible with Cobblemon 1.6.x and 1.7.x

## Music Phases

**Queue:** Playing while waiting for match
**Team Selection:** During Pokemon selection/countdown
**Battle:** During active ranked battle (Elo-based)

## Configuration

**File:** `config/cobbleranked/config.json5`

```json5
{
  "music": {
    "enabled": true,

    // Queue music
    "queueMusic": "cobbleranked:queue_music",
    "queueMusicVolume": 1.0,
    "queueMusicPitch": 1.0,

    // Team selection music
    "teamSelectionMusic": "cobbleranked:team_selection",
    "teamSelectionMusicVolume": 1.0,
    "teamSelectionMusicPitch": 1.0,

    // Battle music (Elo-based)
    "battleMusic": [
      {
        "minElo": 0,
        "maxElo": 1199,
        "music": "cobbleranked:battle_low",
        "volume": 1.0,
        "pitch": 1.0
      },
      {
        "minElo": 1200,
        "maxElo": 1499,
        "music": "cobbleranked:battle_mid",
        "volume": 1.0,
        "pitch": 1.0
      },
      {
        "minElo": 1500,
        "maxElo": 9999,
        "music": "cobbleranked:battle_high",
        "volume": 1.0,
        "pitch": 1.0
      }
    ]
  }
}
```

## Creating Music Resource Pack

### 1. Create Pack Structure

```
cobbleranked_music/
├── pack.mcmeta
└── assets/
    └── cobbleranked/
        └── sounds/
            ├── queue_music.ogg
            ├── team_selection.ogg
            ├── battle_low.ogg
            ├── battle_mid.ogg
            └── battle_high.ogg
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

### 3. sounds.json

**File:** `assets/cobbleranked/sounds.json`

```json
{
  "queue_music": {
    "sounds": ["cobbleranked:queue_music"]
  },
  "team_selection": {
    "sounds": ["cobbleranked:team_selection"]
  },
  "battle_low": {
    "sounds": ["cobbleranked:battle_low"]
  },
  "battle_mid": {
    "sounds": ["cobbleranked:battle_mid"]
  },
  "battle_high": {
    "sounds": ["cobbleranked:battle_high"]
  }
}
```

### 4. Convert Audio to OGG

```bash
ffmpeg -i input.mp3 -c:a libvorbis -q:a 4 output.ogg
```

### 5. Install Resource Pack

Place in `.minecraft/resourcepacks/` or use server resource pack.

## Testing

1. Enable music in config
2. Load resource pack
3. Join queue: `/ranked`
4. Music should play automatically

## Troubleshooting

**No music playing:**
- Check `music.enabled: true` in config
- Verify resource pack is loaded
- Check sound IDs match between config and sounds.json

**Music stuttering:**
- Lower file size (use lower bitrate OGG)
- Check network connection (for server resource packs)

**Wrong music playing:**
- Verify Elo ranges in config don't overlap
- Check player's current Elo matches expected range
