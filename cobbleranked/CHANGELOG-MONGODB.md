# MongoDB Support - Changelog

**Version:** 1.0.1
**Release Date:** 2025-11-08
**Breaking Changes:** None

---

## Summary

CobbleRanked now supports MongoDB as a database backend for cross-server deployments, providing an alternative to MySQL with better cloud integration and horizontal scaling capabilities.

---

## New Features

### 🗄️ MongoDB Database Backend

Full MongoDB support has been added alongside existing MySQL and SQLite options.

**Key Benefits:**
- ✅ **Cloud-Native**: Native MongoDB Atlas support with free tier
- ✅ **Horizontal Scaling**: Easier sharding for large networks
- ✅ **Flexible Schema**: Automatic schema evolution without migrations
- ✅ **High Performance**: Optimized for high write throughput

### 📊 Database Comparison

| Feature | SQLite | MySQL | MongoDB |
|---------|--------|-------|---------|
| Setup Complexity | ✅ Easy | ⚠️ Medium | ⚠️ Medium |
| Cross-Server | ❌ No | ✅ Yes | ✅ Yes |
| Horizontal Scaling | ❌ No | ❌ No | ✅ Yes |
| Cloud Integration | ❌ No | ⚠️ Requires VPS | ✅ Atlas Free Tier |
| Performance (Large) | ❌ Degrades | ✅ Good | ✅ Excellent |
| Schema Changes | ⚠️ Manual | ⚠️ Manual | ✅ Automatic |

**Recommendations:**
- **Single-server (< 1,000 players)**: SQLite (easiest)
- **Cross-server (2-5 servers)**: MySQL or MongoDB
- **Large networks (5+ servers)**: MongoDB (best scaling)
- **Cloud deployments**: MongoDB Atlas (easiest setup)

---

## Implementation Details

### Database Selection

Configured via `config.json5`:

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
      "auth_database": "admin",
      "use_srv": false  // true for MongoDB Atlas
    }
  }
}
```

### Collections Created

MongoDB automatically creates and indexes these collections:

1. **player_ranked_stats** - Overall player statistics
2. **format_stats** - Format-specific stats (Singles/Doubles)
3. **seasons** - Season history and metadata
4. **pending_season_rewards** - Pending season end rewards
5. **claimed_season_rewards** - Claimed reward tracking

### Automatic Indexes

Performance-critical indexes are created on first startup:

- `format_stats`: `{player_uuid, format}` (unique lookups)
- `format_stats`: `{format, elo_points DESC}` (leaderboards)
- `seasons`: `{is_active, season_id DESC}` (current season)
- `pending_season_rewards`: `{player_uuid}` (reward queries)
- `claimed_season_rewards`: `{player_uuid, season_id, reward_id}` (duplicate prevention)

---

## Configuration Examples

### Local MongoDB

```json5
{
  "mongodb": {
    "connection_string": "mongodb://localhost:27017",
    "database": "cobbleranked",
    "username": "cobbleranked",
    "password": "secure_password",
    "auth_database": "admin",
    "use_srv": false,

    "connection_pool": {
      "max_pool_size": 10,
      "min_pool_size": 5,
      "max_idle_time_ms": 60000,
      "max_connection_lifetime_ms": 1800000,
      "connect_timeout_ms": 10000,
      "socket_timeout_ms": 5000
    }
  }
}
```

### MongoDB Atlas (Cloud)

```json5
{
  "mongodb": {
    "connection_string": "cluster0.xxxxx.mongodb.net",
    "database": "cobbleranked",
    "username": "your-username",
    "password": "your-password",
    "auth_database": "admin",
    "use_srv": true  // Important for Atlas!
  }
}
```

### Connection Pool Tuning

**Small networks (2-3 servers):**
```json5
"connection_pool": {
  "max_pool_size": 10,
  "min_pool_size": 5
}
```

**Medium networks (4-6 servers):**
```json5
"connection_pool": {
  "max_pool_size": 15,
  "min_pool_size": 8
}
```

**Large networks (7+ servers):**
```json5
"connection_pool": {
  "max_pool_size": 20,
  "min_pool_size": 10
}
```

---

## Migration

### From MySQL to MongoDB

```bash
/rankedadmin database migrate mysql mongodb
```

**What's migrated:**
- All player statistics
- Format-specific stats (Singles/Doubles)
- Elo ratings and rankings
- Season history
- Win/loss records

**Prerequisites:**
1. MongoDB configured in `config.json5`
2. MongoDB connection verified
3. Backup MySQL database first

### From MongoDB to MySQL

```bash
/rankedadmin database migrate mongodb mysql
```

**Use case:** Reverting to MySQL if needed.

---

## Technical Details

### Implementation

- **File:** `src/main/kotlin/com/gashi/cobbleranked/database/MongoDBDatabase.kt`
- **Driver:** MongoDB Kotlin Coroutine Driver 5.3.0
- **Interface:** Implements `RankedDatabase` interface (same as MySQL/SQLite)
- **Architecture:** Fully async using Kotlin coroutines

### Data Serialization

MongoDB uses dual storage strategy:

1. **Primary**: Native BSON documents with typed fields
2. **Fallback**: CSV-serialized strings (backward compatibility)

This ensures:
- Fast MongoDB-native queries
- Backward compatibility with existing data format
- Easy migration between database types

### Connection Management

- **Connection pooling**: HikariCP-style pool management
- **Automatic reconnection**: Built-in retry logic
- **Timeout handling**: Configurable connect/socket timeouts
- **SSL/TLS support**: For secure Atlas connections

---

## Testing

### Verify MongoDB Connection

```bash
# Local MongoDB
mongosh "mongodb://cobbleranked:password@localhost:27017/cobbleranked"

# MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cobbleranked"
```

### Check Collections Created

```javascript
show collections
// Should see: format_stats, seasons, player_ranked_stats, etc.
```

### Verify Indexes

```javascript
db.format_stats.getIndexes()
// Should show elo_points and player_uuid indexes
```

### Test Leaderboard Query

```javascript
db.format_stats.find({format: "SINGLES"})
  .sort({elo_points: -1})
  .limit(10)
```

---

## Performance Optimization

### Query Performance

All critical queries use indexes:
- Leaderboard queries: `{format, elo_points DESC}` index
- Player lookups: `{player_uuid}` index
- Season queries: `{is_active, season_id}` index

### Write Performance

- Batch writes every 4 seconds (same as MySQL)
- Connection pooling reduces overhead
- Automatic retry on transient failures

### MongoDB Atlas Optimization

Atlas provides:
- Automatic performance insights
- Query profiler
- Index recommendations
- Real-time performance metrics

---

## Troubleshooting

### Connection Failed

**Check authentication:**
```bash
mongosh "mongodb://username:password@host:27017/cobbleranked?authSource=admin"
```

**Verify MongoDB running:**
```bash
systemctl status mongodb
```

### Atlas Connection Issues

1. **Whitelist IP address** in Atlas dashboard
2. **Verify `use_srv: true`** in config
3. **Check connection string** does NOT include `mongodb://` prefix
4. **Test connection** using mongosh first

### Slow Queries

**Enable profiling:**
```javascript
db.setProfilingLevel(1, {slowms: 100})
db.system.profile.find().sort({ts: -1}).limit(5)
```

**Check indexes:**
```javascript
db.format_stats.getIndexes()
```

If indexes missing, restart server (auto-recreates).

---

## Backup & Restore

### Local MongoDB

**Backup:**
```bash
mongodump --db cobbleranked --out /backup/$(date +%Y%m%d)
```

**Restore:**
```bash
mongorestore --db cobbleranked /backup/20251108/cobbleranked
```

### MongoDB Atlas

- **Automatic backups** included in free tier
- Configure retention in Atlas dashboard
- Point-in-time recovery available (paid tiers)

---

## Future Enhancements

Potential MongoDB-specific features:

1. **Change Streams**: Real-time stats updates without Redis
2. **Aggregation Pipeline**: Advanced leaderboard queries
3. **Time-Series Collections**: Battle history tracking
4. **Sharding**: Horizontal scaling for massive networks
5. **Atlas Search**: Full-text player search

---

## Migration Guide

### Step-by-Step: MySQL to MongoDB

1. **Backup MySQL database:**
   ```bash
   mysqldump -u cobbleranked -p cobbleranked > backup.sql
   ```

2. **Install MongoDB** (or create Atlas cluster)

3. **Update config.json5:**
   ```json5
   {
     "cross_server": {
       "database_type": "mongodb",
       "mongodb": { /* config here */ }
     }
   }
   ```

4. **Test connection:**
   ```bash
   mongosh "mongodb://..."
   ```

5. **Run migration command:**
   ```bash
   /rankedadmin database migrate mysql mongodb
   ```

6. **Verify data:**
   ```javascript
   db.format_stats.countDocuments()
   ```

7. **Test in-game:**
   - Open `/ranked` GUI
   - Check leaderboards
   - Test battle (ensure stats save)

---

## Breaking Changes

**None.** This is a backward-compatible addition.

- Existing SQLite/MySQL deployments continue working
- No configuration changes required for existing setups
- MongoDB is opt-in via `database_type` config

---

## Dependencies Added

```gradle
// MongoDB Kotlin Driver
implementation "org.mongodb:mongodb-driver-kotlin-coroutine:5.3.0"
include "org.mongodb:mongodb-driver-kotlin-coroutine:5.3.0"

// BSON Kotlin Extensions
implementation "org.mongodb:bson-kotlinx:5.3.0"
include "org.mongodb:bson-kotlinx:5.3.0"
```

**Total JAR size increase:** ~3 MB (bundled in final JAR)

---

## Documentation

Updated documentation:
- [`docs/cobbleranked/advanced/database.md`](advanced/database.md)
- [`docs/cobbleranked/advanced/cross-server.md`](advanced/cross-server.md)

New sections:
- MongoDB setup guide
- MongoDB Atlas configuration
- Connection troubleshooting
- Performance tuning
- Backup strategies

---

**Related Issues:** #SQLite-Leaderboard-Fix, #MongoDB-Support
**Contributors:** @Gqrshy, Claude (Sonnet 4.5)
