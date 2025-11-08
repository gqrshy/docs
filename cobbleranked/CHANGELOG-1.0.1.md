# CobbleRanked v1.0.1 - Update Summary

**Release Date:** 2025-11-08
**Breaking Changes:** None

---

## Summary

This release brings **MongoDB database support**, critical bug fixes for SQLite leaderboards and Pokemon label blacklists, and improved item/ability blacklist functionality with enhanced documentation.

---

## What's New

### 🗄️ MongoDB Database Support

MongoDB is now available as an alternative to MySQL for cross-server deployments.

**Benefits:**
- ✅ Cloud-native with MongoDB Atlas free tier
- ✅ Horizontal scaling for large networks
- ✅ Flexible schema evolution
- ✅ High performance for write-heavy workloads

**Configuration:**
```json5
{
  "cross_server": {
    "enabled": true,
    "database_type": "mongodb",  // "mysql" or "mongodb"

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password",
      "use_srv": false  // true for MongoDB Atlas
    }
  }
}
```

**Migration Commands:**
```bash
/rankedadmin database migrate mysql mongodb
/rankedadmin database migrate sqlite mongodb
```

See [CHANGELOG-MONGODB.md](CHANGELOG-MONGODB.md) for detailed MongoDB documentation.

---

## Bug Fixes

### Issue 1.6.1: SQLite Leaderboard Not Working

**Problem:**
In single-server environments using SQLite, the leaderboard GUI showed no players.

**Root Cause:**
DatabaseFactory was initializing SQLite with a directory path instead of a file path:
```kotlin
// Before (BROKEN):
SQLiteDatabase(java.io.File("config/cobbleranked"))

// After (FIXED):
SQLiteDatabase(java.io.File("config/cobbleranked/ranked.db"))
```

**Impact:**
SQLite database wasn't being created, causing all player stats to disappear.

**Status:** ✅ Fixed

---

### Pokemon Label Blacklist Not Working for Forms

**Problem:**
When adding `legendary` or `paradox` to `black_list_labels`, some legendary Pokemon (Mega evolutions, regional forms, Paradox Pokemon) were not being blocked.

**Root Cause:**
BlacklistManager was checking `pokemon.species.labels` instead of `pokemon.form.labels`.

In Cobblemon 1.7+, forms (Mega, Alolan, regional variants) have their own labels that can override species labels:
- **Mewtwo base:** `species.labels = ["gen1", "legendary", "restricted"]`
- **Mewtwo-Mega-X:** `form.labels = ["gen6", "legendary", "restricted", "mega"]`

The code was only checking species labels, missing form-specific labels like "mega".

**Fix:**
Changed all label checks to use `pokemon.form.labels`:
```kotlin
// Before (BROKEN):
val species = pokemon.species
for (label in species.labels) {
    if (hasLabel(label)) return true
}

// After (FIXED):
val formLabels = pokemon.form.labels
for (label in formLabels) {
    if (hasLabel(label)) return true
}
```

**Files Modified:**
- `manager/BlacklistManager.kt`:
  - `hasPokemonWithBlacklistedLabel()`
  - `checkLabelLimits()`
  - `validateTeamDetailed()`

**Impact:**
All forms (Mega, Alolan, Galarian, Paradox) are now properly checked against label blacklists.

**Status:** ✅ Fixed

---

## Improvements

### Enhanced Item Blacklist Format Support

**Problem:**
Users had difficulty knowing how to specify held items in `black_list_items_pokemon`.

**Solution:**
Improved `hasItem()` method now supports multiple formats:

1. **Cobblemon internal name:** `"leftovers"`
2. **Minecraft item ID:** `"cobblemon:leftovers"`, `"minecraft:diamond"`
3. **Item.toString() format:** `"Block{minecraft:diamond}"`, `"Item{cobblemon:leftovers}"`

**Example Configuration:**
```json5
"black_list_items_pokemon": [
  "bright_powder",              // Works
  "cobblemon:bright_powder",    // Also works
  "cobblemon:lax_incense",      // Recommended format
  "minecraft:netherite_sword"   // Cross-mod support
]
```

**Files Modified:**
- `manager/BlacklistManager.kt` (`hasItem()` method)

---

### Enhanced Blacklist Documentation

**Added comprehensive "Finding Internal Names" section** to [blacklist.md](configuration/blacklist.md):

#### Item IDs
- In-game method using F3+H (already existed, improved)
- Supported formats (Cobblemon internal, full item ID, Minecraft items)

#### Ability Names (NEW!)
- In-game method using F3+H to view ability tooltips
- Common ability reference table (30+ abilities with internal names)
- Pattern explanation (spaces → underscores, lowercase)
- Data files location for advanced users
- Testing method with debug logging

**Common Ability Reference Added:**

| Display Name | Internal Name | Notes |
|--------------|---------------|-------|
| Intimidate | `intimidate` | Lowers opponent's Attack |
| Shadow Tag | `shadow_tag` | Banned in Smogon |
| Arena Trap | `arena_trap` | Banned in Smogon |
| Moody | `moody` | Banned in Smogon |
| Huge Power | `huge_power` | Doubles Attack stat |
| Wonder Guard | `wonder_guard` | Only super-effective moves hit |
| As One (Ice Rider) | `as_one_ice_rider` | Calyrex ability |

**Files Modified:**
- `docs/cobbleranked/configuration/blacklist.md`

---

## Technical Details

### MongoDB Implementation

**Files Added:**
- `src/main/kotlin/com/gashi/cobbleranked/database/MongoDBDatabase.kt` (new)

**Files Modified:**
- `src/main/kotlin/com/gashi/cobbleranked/database/DatabaseFactory.kt`
- `src/main/kotlin/com/gashi/cobbleranked/config/ConfigModels.kt`
- `build.gradle` (added MongoDB dependencies)

**Dependencies Added:**
```gradle
implementation "org.mongodb:mongodb-driver-kotlin-coroutine:5.3.0"
implementation "org.mongodb:bson-kotlinx:5.3.0"
```

**JAR Size Increase:** ~3 MB (total: 20 MB)

### Collections Created by MongoDB

1. **player_ranked_stats** - Overall player statistics
2. **format_stats** - Format-specific stats (Singles/Doubles)
3. **seasons** - Season history and metadata
4. **pending_season_rewards** - Pending season rewards
5. **claimed_season_rewards** - Claimed rewards tracking

**Automatic Indexes:**
- `format_stats`: `{player_uuid, format}` (unique lookups)
- `format_stats`: `{format, elo_points DESC}` (leaderboards)
- `seasons`: `{is_active, season_id DESC}` (current season)

---

## Database Comparison

| Feature | SQLite | MySQL | MongoDB |
|---------|--------|-------|---------|
| Setup | ✅ Zero config | ⚠️ Install required | ⚠️ Install required |
| Cross-server | ❌ No | ✅ Yes | ✅ Yes |
| Scaling | ❌ Limited | ⚠️ Vertical | ✅ Horizontal |
| Cloud | ❌ No | ⚠️ VPS required | ✅ Atlas free tier |
| Performance (large) | ❌ Degrades | ✅ Good | ✅ Excellent |

**Recommendations:**
- **Single-server (< 1,000 players):** SQLite (easiest)
- **2-5 servers:** MySQL or MongoDB
- **5+ servers:** MongoDB (best scaling)
- **Cloud deployments:** MongoDB Atlas (easiest setup)

---

## Migration Guide

### From SQLite to MongoDB

1. **Install MongoDB** (local or create Atlas cluster)
2. **Update config.json5:**
   ```json5
   {
     "cross_server": {
       "enabled": true,
       "database_type": "mongodb",
       "mongodb": { /* config here */ }
     }
   }
   ```
3. **Test connection:** `mongosh "mongodb://..."`
4. **Run migration:** `/rankedadmin database migrate sqlite mongodb`
5. **Verify data:** `db.format_stats.countDocuments()`

### From MySQL to MongoDB

```bash
/rankedadmin database migrate mysql mongodb
```

**Use case:** Migrating to MongoDB for better scaling or cloud deployment.

---

## Breaking Changes

**None.** This release is fully backward-compatible.

- Existing SQLite/MySQL deployments continue working
- No configuration changes required for existing setups
- MongoDB is opt-in via `database_type` config

---

## Documentation Updates

**New:**
- [CHANGELOG-MONGODB.md](CHANGELOG-MONGODB.md) - Detailed MongoDB documentation

**Updated:**
- [advanced/database.md](advanced/database.md) - MongoDB setup and comparison
- [advanced/cross-server.md](advanced/cross-server.md) - MongoDB configuration examples
- [configuration/blacklist.md](configuration/blacklist.md) - Ability name discovery section

---

## Testing Recommendations

1. **SQLite users (single-server):**
   - Open `/ranked` GUI
   - Verify leaderboard displays players correctly
   - Check player stats are saved after battles

2. **Label blacklist users:**
   - Test with Mega evolutions (e.g., Mewtwo-Mega-X)
   - Test with regional forms (e.g., Weezing-Galar)
   - Test with Paradox Pokemon (e.g., Iron Bundle, Flutter Mane)
   - Verify legendary/mythical Pokemon are blocked

3. **Item blacklist users:**
   - Try all three formats:
     - `"bright_powder"` (internal name)
     - `"cobblemon:bright_powder"` (full item ID)
     - Copy item ID from F3+H tooltip
   - Verify items are blocked correctly

4. **MongoDB users (cross-server):**
   - Test connection to MongoDB/Atlas
   - Run migration command
   - Verify stats persist across servers
   - Check leaderboard displays correctly

---

## Known Issues

None reported.

---

## Contributors

- **Gqrshy** (Project Owner)
- **Claude** (Sonnet 4.5)

---

## See Also

- [MongoDB Changelog](CHANGELOG-MONGODB.md) - Detailed MongoDB documentation
- [Database Setup](advanced/database.md) - Database comparison and setup
- [Blacklist Configuration](configuration/blacklist.md) - Item/ability name discovery
- [Cross-Server Setup](advanced/cross-server.md) - Multi-server deployment
