# Installation

Set up CobbleRanked Reloaded on your Cobblemon server.

---

## Requirements

### Required Dependencies

| Mod | Version | Download |
|-----|---------|----------|
| Minecraft | 1.21.1 | - |
| Fabric Loader | 0.17.2+ | [fabricmc.net](https://fabricmc.net/) |
| Fabric API | 0.116.6+ | [Modrinth](https://modrinth.com/mod/fabric-api) |
| Fabric Language Kotlin | 1.13.6+ | [Modrinth](https://modrinth.com/mod/fabric-language-kotlin) |
| Cobblemon | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |

### Optional Dependencies (Cross-Server)

| Software | Version | Purpose |
|----------|---------|---------|
| MySQL | 8.0+ | Shared player data |
| MongoDB | 6.0+ | Alternative to MySQL |
| Redis | 6.0+ | Real-time matchmaking |

---

## Installation Steps

### 1. Install Dependencies

Download and place the required mods in your `mods/` folder:

```
mods/
├── fabric-api-0.116.6+1.21.1.jar
├── fabric-language-kotlin-1.13.6+kotlin.2.1.0.jar
├── cobblemon-fabric-1.7.0+1.21.1.jar
└── CobbleRanked-2.0.0.jar
```

### 2. Start Server

Start your server to generate configuration files:

```bash
java -Xmx4G -jar fabric-server.jar nogui
```

### 3. Verify Installation

Check the server log for:

```
[CobbleRanked] CobbleRanked Reloaded v2.0.0 loaded!
[CobbleRanked] Configuration loaded successfully
```

### 4. Check Generated Files

Configuration files are created in `config/cobbleranked/`:

```
config/cobbleranked/
├── config.yaml        # Main settings
├── battle.yaml        # Battle formats and sounds
├── elo.yaml           # Rating system
├── matchmaking.yaml   # Queue settings
├── season.yaml        # Season configuration
├── rewards.yaml       # Reward definitions
├── missions.yaml      # Mission definitions
├── restrictions.yaml  # Player restrictions
├── arenas.yaml        # Arena positions
├── luckperms.yaml     # Permission mappings
├── lang/              # Language files
│   ├── en-us.json
│   └── ja-jp.json
└── data.db            # SQLite database (default)
```

---

## Verification

### Test Commands

Run these commands to verify installation:

```bash
/ranked              # Should open the ranked GUI
/casual              # Should open the casual GUI
/rankedadmin reload  # Should reload configs (op required)
```

### Check Permissions

Default permissions (op level 4):

| Command | Permission |
|---------|------------|
| `/ranked` | None (all players) |
| `/casual` | None (all players) |
| `/rankedadmin` | OP level 4 |

---

## Common Issues

### Mod Not Loading

**Symptoms:** CobbleRanked doesn't appear in mod list

**Solutions:**
1. Verify Fabric Loader version is 0.17.2+
2. Check that Fabric Language Kotlin is installed
3. Review `logs/latest.log` for errors

### Config Not Generating

**Symptoms:** No `config/cobbleranked/` folder after startup

**Solutions:**
1. Check server log for errors
2. Ensure you have write permissions to `config/` folder
3. Delete any corrupted config files and restart

---

## Next Steps

1. **[Quick Start](quick-start.md)** - Configure your first ranked season
2. **[Arena Setup](../configuration/arenas.md)** - Create battle arenas
3. **[Commands](commands.md)** - Learn all available commands

---

## See Also

- [Quick Start](quick-start.md) - First configuration
- [Migration from v1](migration.md) - Upgrade guide
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
