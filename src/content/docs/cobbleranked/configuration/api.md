---
title: Web API Configuration
description: Configure CobbleRanked to sync data with your external website or API.
---

## Overview

CobbleRanked can automatically sync Pokemon usage statistics and leaderboard data to your external website or API. This allows you to display live ranked data on your community website.

> **See it in action**: Check out our [Live Stats Demo](/demo/ranked-stats/) to see what's possible!

## Configuration File

Create or edit `config/cobbleranked/api.yaml`:

```yaml
# Enable/disable the Web API sync feature
enabled: false

# API endpoint configuration
endpoint:
  baseUrl: "https://api.yourserver.com/cobbleranked"
  paths:
    pushUsageStats: "/usage-stats"
    pullUsageStats: "/usage-stats"
    pushLeaderboard: "/leaderboard"
    pullLeaderboard: "/leaderboard"

# Authentication
auth:
  apiKey: "your-secret-api-key-here"
  headers: {}  # Additional custom headers

# Sync configuration
sync:
  intervalMinutes: 60  # How often to sync (in minutes)
  dataTypes:
    usageStats: true    # Sync Pokemon usage statistics
    leaderboard: true   # Sync leaderboard data
    # ELO tier ranges for usage stats
    eloTiers:
      - minElo: 1000
        maxElo: 1299
      - minElo: 1300
        maxElo: 1499
      - minElo: 1500
        maxElo: 2147483647  # No upper limit (Int.MAX_VALUE)
  push:
    enabled: true
    onlyIfChanged: true  # Skip sync if data hasn't changed
  pull:
    enabled: false
    applyToCache: true

# Cross-server mode settings
crossServer:
  battleServerOnly: true  # Only battle server syncs in cross-server mode

# HTTP client settings
http:
  timeoutSeconds: 30
  retryAttempts: 3
  retryDelaySeconds: 5

# Debug options
debug:
  logRequests: false
  logTiming: false
```

## Configuration Options

### Basic Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `false` | Enable or disable API sync |

### Endpoint Configuration

| Option | Type | Description |
|--------|------|-------------|
| `endpoint.baseUrl` | string | Base URL of your API server |
| `endpoint.paths.pushUsageStats` | string | Path for pushing usage stats |
| `endpoint.paths.pushLeaderboard` | string | Path for pushing leaderboard |

### Authentication

| Option | Type | Description |
|--------|------|-------------|
| `auth.apiKey` | string | API key sent in `X-API-Key` header |
| `auth.headers` | map | Additional custom headers to send |

### Sync Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sync.intervalMinutes` | int | `60` | Sync interval in minutes |
| `sync.dataTypes.usageStats` | boolean | `true` | Include usage statistics |
| `sync.dataTypes.leaderboard` | boolean | `true` | Include leaderboard data |
| `sync.dataTypes.eloTiers` | list | See below | ELO tier ranges for usage stats |
| `sync.push.enabled` | boolean | `true` | Enable pushing data to API |
| `sync.push.onlyIfChanged` | boolean | `true` | Skip if data unchanged |

### ELO Tiers Configuration

Configure custom ELO ranges for usage statistics. Each tier has a `minElo` and `maxElo`:

```yaml
eloTiers:
  - minElo: 1000
    maxElo: 1299
  - minElo: 1300
    maxElo: 1499
  - minElo: 1500
    maxElo: 2147483647  # No upper limit
```

The tier key in the API payload uses the format `"minElo-maxElo"` or `"minElo+"` for unlimited max.

### Cross-Server Mode

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `crossServer.battleServerOnly` | boolean | `true` | Only battle server performs sync |

When running multiple servers (lobby + battle), only the battle server needs to sync data to avoid duplicates.

## API Data Format

### Usage Stats Payload

```json
{
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "timestamp": "2026-01-02T12:00:00Z",
  "formats": {
    "SINGLES": {
      "format": "SINGLES",
      "tiers": {
        "1000-1299": {
          "minElo": 1000,
          "maxElo": 1299,
          "totalBattles": 850,
          "totalPokemon": 5100,
          "species": [...]
        },
        "1300-1499": {
          "minElo": 1300,
          "maxElo": 1499,
          "totalBattles": 520,
          "totalPokemon": 3120,
          "species": [...]
        },
        "1500+": {
          "minElo": 1500,
          "maxElo": null,
          "totalBattles": 1250,
          "totalPokemon": 7500,
          "species": [
            {
              "name": "Garchomp",
              "usagePercent": 45.2,
              "count": 565,
              "abilities": { "Rough Skin": 85.3 },
              "items": { "Choice Scarf": 42.1 },
              "moves": { "Earthquake": 98.2 },
              "natures": { "Jolly": 72.3 },
              "evSpreads": { "252 Atk / 4 Def / 252 Spe": 68.5 },
              "teammates": { "Rotom-Wash": 34.2 }
            }
          ]
        }
      }
    }
  }
}
```

### Leaderboard Payload

```json
{
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "timestamp": "2026-01-02T12:00:00Z",
  "formats": {
    "SINGLES": {
      "format": "SINGLES",
      "players": [
        {
          "rank": 1,
          "uuid": "550e8400-e29b-41d4-a716-446655440000",
          "playerName": "ChampionPlayer",
          "elo": 2150,
          "tier": "CHERISH",
          "wins": 245,
          "losses": 32,
          "matches": 277,
          "winRate": 88.45,
          "currentStreak": 12,
          "bestStreak": 18
        }
      ]
    }
  }
}
```

## Admin Commands

### Manual Sync

Force an immediate sync to your API:

```
/rankedadmin api sync
```

### Check Status

View current API sync status:

```
/rankedadmin api status
```

Shows:
- Whether sync is enabled
- Last sync time
- Next scheduled sync
- Whether this server is responsible for syncing

### Test Configuration

Validate your API configuration:

```
/rankedadmin api test
```

Checks:
- API key is configured
- Endpoint URL is valid
- Configuration looks correct

## Building Your API Receiver

Your API endpoint should:

1. **Accept POST requests** with JSON body
2. **Validate the `X-API-Key` header** for authentication
3. **Store or process** the received data
4. **Return 2xx status** on success

### Example (Node.js/Express)

```javascript
app.post('/cobbleranked/usage-stats', (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.COBBLERANKED_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { serverId, seasonName, formats } = req.body;

  // Store in database
  await db.usageStats.upsert({
    serverId,
    seasonName,
    data: formats,
    updatedAt: new Date()
  });

  res.json({ success: true });
});
```

## Troubleshooting

### Sync not working

1. Check `enabled: true` in config
2. Verify API key is set
3. Check server logs for errors
4. Run `/rankedadmin api test`

### Data not updating

1. Check `sync.push.onlyIfChanged` setting
2. Verify battles are being recorded
3. Check the sync interval

### Cross-server issues

1. Ensure `crossServer.battleServerOnly: true`
2. Verify battle server is correctly identified
3. Check that only one server is syncing

---

**Related**: [Main Configuration](config/) | [ELO System](../features/elo-system/) | [Leaderboards](../features/leaderboards/) | [FAQ](../support/faq/)
