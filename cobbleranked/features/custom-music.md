# Custom Background Music

CobbleRanked includes a sophisticated custom background music (BGM) system that plays different music tracks during various ranked battle phases. This feature enhances the competitive atmosphere and provides audio feedback for different game states.

## Overview

The custom music system uses **Cobblemon's built-in `BattleMusicPacket` API** to send music to players client-side, requiring no additional client-side mods or resource packs (beyond the music files themselves).

### Key Features

- ✅ **Automatic version detection** - Works with both Cobblemon 1.6.x and 1.7.x
- ✅ **Phase-based music** - Different tracks for queue, team selection, and battles
- ✅ **Elo-based battle music** - Higher-ranked players hear different music
- ✅ **Server-side only** - No client mod required
- ✅ **Configurable** - Full control over music, volume, and pitch

## Version Compatibility

| Cobblemon Version | Music Support | Notes |
|-------------------|---------------|-------|
| 1.6.0 - 1.6.1 | ✅ Enabled | Uses `SoundEvent` API |
| 1.7.0+ | ✅ Enabled | Uses `ResourceLocation` API |

The system automatically detects your Cobblemon version at server startup and uses the appropriate API.

## Music Phases

### 1. Queue Waiting Music

Plays while players are in the matchmaking queue.

**Configuration:**
```json5
"queueMusic": "cobbleranked:queue_music",
"queueMusicVolume": 1.0,
"queueMusicPitch": 1.0
```

**When it plays:**
- Player joins queue via `/ranked` GUI
- Loops until match is found or player leaves queue

### 2. Team Selection Music

Plays during the Pokemon team selection screen.

**Configuration:**
```json5
"teamSelectionMusic": "cobbleranked:team_selection_music",
"teamSelectionMusicVolume": 1.0,
"teamSelectionMusicPitch": 1.0
```

**When it plays:**
- Match found, players selecting their Pokemon team
- Stops when team selection is complete

### 3. Elo-Based Battle Music

Plays during actual battles, with different tracks based on player Elo rating.

**Configuration:**
```json5
"eloBattleMusic": [
  {
    "min_elo": 0.0,
    "max_elo": 1500.0,
    "music": "cobbleranked:normal_battle_music",
    "volume": 1.0,
    "pitch": 1.0
  },
  {
    "min_elo": 1500.0,
    "max_elo": 99999.0,
    "music": "cobbleranked:vgc_battle_music",
    "volume": 1.0,
    "pitch": 1.0
  }
]
```

**When it plays:**
- Battle starts after lead selection
- Music selection based on **average Elo** of both players
- Example: Player A (1400 Elo) + Player B (1600 Elo) = Avg 1500 → VGC music

## Adding Custom Music

### Step 1: Prepare Music Files

1. **Convert to OGG format** (Ogg Vorbis codec)
   - Use tools like Audacity or online converters
   - Recommended bitrate: 128-192 kbps
   - Keep file sizes reasonable (<5MB per track)

2. **Create directory structure**
   ```
   assets/
   └── cobbleranked/
       └── sounds/
           └── music/
               ├── queue_music.ogg
               ├── team_selection.ogg
               ├── battle_normal.ogg
               └── battle_vgc.ogg
   ```

### Step 2: Register Sounds

Create or edit `assets/cobbleranked/sounds.json`:

```json
{
  "queue_music": {
    "sounds": [
      {
        "name": "cobbleranked:music/queue_music",
        "stream": true
      }
    ]
  },
  "team_selection_music": {
    "sounds": [
      {
        "name": "cobbleranked:music/team_selection",
        "stream": true
      }
    ]
  },
  "normal_battle_music": {
    "sounds": [
      {
        "name": "cobbleranked:music/battle_normal",
        "stream": true
      }
    ]
  },
  "vgc_battle_music": {
    "sounds": [
      {
        "name": "cobbleranked:music/battle_vgc",
        "stream": true
      }
    ]
  }
}
```

**Important:** Set `"stream": true` for music files to reduce memory usage.

### Step 3: Configure CobbleRanked

Edit `config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    // Queue music
    "queueMusic": "cobbleranked:queue_music",
    "queueMusicVolume": 0.8,  // 80% volume
    "queueMusicPitch": 1.0,

    // Team selection music
    "teamSelectionMusic": "cobbleranked:team_selection_music",
    "teamSelectionMusicVolume": 0.9,
    "teamSelectionMusicPitch": 1.0,

    // Battle music (Elo-based)
    "eloBattleMusic": [
      {
        "min_elo": 0,
        "max_elo": 1000,
        "music": "cobbleranked:beginner_battle",
        "volume": 0.7,
        "pitch": 1.0
      },
      {
        "min_elo": 1000,
        "max_elo": 1500,
        "music": "cobbleranked:intermediate_battle",
        "volume": 0.8,
        "pitch": 1.05
      },
      {
        "min_elo": 1500,
        "max_elo": 99999,
        "music": "cobbleranked:master_battle",
        "volume": 1.0,
        "pitch": 1.1
      }
    ]
  }
}
```

### Step 4: Package Music Files

**Option A: Include in Server JAR** (Recommended)
1. Add music files to `src/main/resources/assets/cobbleranked/sounds/music/`
2. Rebuild CobbleRanked mod
3. Deploy to server

**Option B: Client-Side Resource Pack**
1. Create a resource pack with your music files
2. Host it on a file server or include in modpack
3. Players must download and enable the resource pack

### Step 5: Test

1. Start server and check logs:
   ```
   [MusicUtil] Detected Cobblemon V1_6_X - Custom music ENABLED
   ```

2. Join queue and verify music plays
3. Check for errors in server logs

## Configuration Examples

### Example 1: Themed Battle Music by Elo

Create an immersive experience with escalating intensity:

```json5
"eloBattleMusic": [
  {
    "min_elo": 0,
    "max_elo": 800,
    "music": "pokemon:battle_wild",
    "volume": 0.7,
    "pitch": 0.95
  },
  {
    "min_elo": 800,
    "max_elo": 1200,
    "music": "pokemon:battle_trainer",
    "volume": 0.8,
    "pitch": 1.0
  },
  {
    "min_elo": 1200,
    "max_elo": 1600,
    "music": "pokemon:battle_gym_leader",
    "volume": 0.9,
    "pitch": 1.05
  },
  {
    "min_elo": 1600,
    "max_elo": 2000,
    "music": "pokemon:battle_elite_four",
    "volume": 1.0,
    "pitch": 1.1
  },
  {
    "min_elo": 2000,
    "max_elo": 99999,
    "music": "pokemon:battle_champion",
    "volume": 1.0,
    "pitch": 1.15
  }
]
```

### Example 2: Disable Specific Phase Music

To disable music for a specific phase, set it to an empty string:

```json5
"queueMusic": "",  // No queue music
"teamSelectionMusic": "cobbleranked:team_selection",  // Keep team selection
"eloBattleMusic": []  // No battle music
```

### Example 3: Custom Mod Music

Reference music from other mods:

```json5
"queueMusic": "custommod:lobby_theme",
"teamSelectionMusic": "custommod:preparation_theme",
"eloBattleMusic": [
  {
    "min_elo": 0,
    "max_elo": 99999,
    "music": "custommod:epic_battle_theme",
    "volume": 1.0,
    "pitch": 1.0
  }
]
```

## Technical Details

### How It Works

1. **Version Detection** (at server startup)
   ```
   Cobblemon 1.7.x → Uses ResourceLocation API
   Cobblemon 1.6.x → Uses SoundEvent + BuiltInRegistries API
   ```

2. **Packet Creation** (when music should play)
   ```
   Cobblemon 1.7.x: BattleMusicPacket(ResourceLocation?, Float, Float, Boolean)
   Cobblemon 1.6.x: BattleMusicPacket(SoundEvent?, Float, Float)
   ```

3. **Client Playback**
   - Client receives packet
   - Looks up sound in registry
   - Plays via Minecraft's sound system

### API Differences

| Feature | Cobblemon 1.6.x | Cobblemon 1.7.x |
|---------|----------------|----------------|
| Constructor params | 3 (SoundEvent, volume, pitch) | 4 (ResourceLocation, volume, pitch, restart) |
| Sound lookup | BuiltInRegistries.SOUND_EVENT | Direct identifier |
| Restart existing | Not supported | Supported via `restartExisting` param |

### Performance Considerations

- **Memory:** Music files are streamed (`"stream": true`), not loaded into RAM
- **Network:** Only identifier sent to client (~50 bytes per packet)
- **CPU:** Minimal overhead, automatic packet handling by Cobblemon

## Troubleshooting

### Music Not Playing

**1. Check server logs for version detection:**
```
[MusicUtil] Detected Cobblemon V1_6_X - Custom music ENABLED
```

If you see:
```
[MusicUtil] Could not detect Cobblemon version - Custom music DISABLED
```
This indicates an incompatible Cobblemon version or corrupted installation.

**2. Verify music files exist:**
- Check `assets/cobbleranked/sounds/music/` directory
- Ensure files are `.ogg` format
- Verify `sounds.json` has correct entries

**3. Enable debug logging:**
```json5
"debug_music": true
```

This will log every music playback attempt:
```
[MusicUtil] Playing music: cobbleranked:queue_music for PlayerName (volume=1.0, pitch=1.0)
```

**4. Client-side checks:**
- Ensure players have resource pack enabled
- Check client logs for missing sound errors
- Test with vanilla Minecraft sounds first

### Music Plays But Sounds Wrong

**Pitch too high/low:**
```json5
"pitch": 1.0  // Reset to default
```

**Volume too loud/quiet:**
```json5
"volume": 1.0  // Reset to default (range: 0.0 to 2.0)
```

**Wrong music playing:**
- Check Elo ranges don't overlap
- Verify player's actual Elo rating
- Check logs for which music was selected

### Music Doesn't Stop

This can happen if a player disconnects during music playback. The music should automatically stop when:
- Battle ends
- Player leaves queue
- Player closes GUI

If it persists, it's a client-side caching issue. Player should reconnect.

## FAQ

**Q: Do players need a mod to hear custom music?**
A: No client mod required. Players need the resource pack with music files, which can be distributed as part of your modpack.

**Q: Can I use copyrighted music?**
A: Only if you have proper licensing. For public servers, use royalty-free or original music.

**Q: How large can music files be?**
A: Keep individual files under 5MB. Streaming is efficient, but very large files can cause initial loading delays.

**Q: Can I have different music per battle format?**
A: Currently, battle music is Elo-based only. Format-specific music would require custom development.

**Q: Does music work in cross-server mode?**
A: Yes, music packets are sent from whichever server the player is on (main/lobby or battle server).

**Q: Can I disable music entirely?**
A: Yes, set all music IDs to empty strings (`""`).

## See Also

- [Configuration Guide](../configuration/config.md) - Full config reference
- [FAQ](../support/faq.md) - Common issues
- [Troubleshooting](../support/troubleshooting.md) - Debug techniques
