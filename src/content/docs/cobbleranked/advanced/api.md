---
title: Web API Integration
description: Real-time leaderboards, battle replays, and usage statistics for your website.
---

Build competitive Pokemon dashboards with CobbleRanked's HTTP API. Push ranked battle data to your web server in real-time.

## Features

- ✅ **Live Leaderboards** - Top players sync every 30 seconds
- ✅ **Battle Replays** - Full Showdown protocol logs
- ✅ **Match Results** - Per-match history with team details
- ✅ **Usage Statistics** - Pokemon usage with win rates
- ✅ **Configurable Intervals** - Control sync frequency

---

## Endpoints

| Endpoint | Data | Default Interval |
|----------|------|------------------|
| `/api/leaderboard` | Top N players by ELO | 30 seconds |
| `/api/usage-stats` | Pokemon usage with win rates | 5 minutes |
| `/api/match-result` | Individual match results | Immediate |
| `/api/battle-replay` | Full battle logs (Showdown) | Immediate |

---

## Configuration

**File:** `config/cobbleranked/api.yaml`

```yaml
enabled: false

endpoint:
  baseUrl: "https://your-server.com"
  paths:
    pushUsageStats: "/api/usage-stats"
    pushLeaderboard: "/api/leaderboard"
    pushBattleReplay: "/api/battle-replay"
    pushMatchResult: "/api/match-result"

auth:
  apiKey: "your-secret-key"

sync:
  intervalMinutes: 60
  leaderboardLimit: 100
  dataTypes:
    usageStats: true
    leaderboard: true
    battleReplays: false
    matchResults: false
  push:
    enabled: true
    onlyIfChanged: true
    batchIntervalSeconds: 30

http:
  timeoutSeconds: 30
  retryAttempts: 3
  retryDelaySeconds: 5
```

<details>
<summary><strong>Server Authentication</strong></summary>

CobbleRanked sends `X-API-Key` header with your configured key. Verify this on your server:

```javascript
const VALID_KEY = process.env.API_KEY;

app.use((req, res, next) => {
  const receivedKey = req.headers['x-api-key'];
  if (receivedKey !== VALID_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

</details>

---

## Data Payloads

### Leaderboard

```json
{
  "serverId": "your-server-id",
  "season": "Season 1",
  "format": "singles",
  "timestamp": 1745123456789,
  "players": [
    {
      "uuid": "player-uuid",
      "name": "PlayerName",
      "elo": 1850,
      "wins": 45,
      "losses": 12,
      "winRate": 78.95
    }
  ]
}
```

### Match Result

```json
{
  "matchId": "uuid",
  "serverId": "your-server-id",
  "season": "Season 1",
  "format": "singles",
  "timestamp": 1745123456789,
  "endReason": "BATTLE_END",
  "turnCount": 24,
  "players": [
    {
      "uuid": "winner-uuid",
      "name": "Winner",
      "eloBefore": 1800,
      "eloAfter": 1825,
      "eloChange": 25,
      "winner": true,
      "team": [
        {
          "species": "Charizard",
          "level": 100,
          "ability": "Blaze",
          "item": "ChoiceSpecs",
          "moves": ["Flamethrower", "AirSlash", "DragonPulse", "Roost"],
          "nature": "Timid",
          "evSpread": "0/252/4/0/0/252"
        }
      ]
    }
  ]
}
```

### Battle Replay

```json
{
  "replayId": "uuid",
  "serverId": "your-server-id",
  "season": "Season 1",
  "format": "singles",
  "timestamp": 1745123456789,
  "turnCount": 24,
  "endReason": "BATTLE_END",
  "battleLog": [
    "|player|p1|Player1|tate|102",
    "|player|p2|Player2|rusty|102",
    "|poke|p1|Charizard, L100, M|
    ...
  ],
  "players": [
    {
      "uuid": "player-uuid",
      "name": "Player1",
      "winner": true,
      "team": ["Charizard", "Dragonite", "Garchomp"]
    }
  ]
}
```

### Usage Statistics

```json
{
  "serverId": "your-server-id",
  "season": "Season 1",
  "format": "singles",
  "timestamp": 1745123456789,
  "pokemon": [
    {
      "species": "Charizard",
      "usageCount": 156,
      "usagePercentage": 23.45,
      "winRate": 58.97
    }
  ]
}
```

---

## Server Implementation

**Express.js Example:**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Leaderboard endpoint
app.post('/api/leaderboard', (req, res) => {
  const { season, format, players } = req.body;
  // Store in database
  console.log(`Received ${players.length} players for ${season} ${format}`);
  res.json({ success: true });
});

// Match result endpoint
app.post('/api/match-result', (req, res) => {
  const { players } = req.body;
  // Store individual match
  console.log(`Match result: ${players[0].name} vs ${players[1].name}`);
  res.json({ success: true });
});

// Battle replay endpoint
app.post('/api/battle-replay', (req, res) => {
  const { battleLog, turnCount } = req.body;
  // Store replay log for playback
  console.log(`Replay: ${turnCount} turns`);
  res.json({ success: true });
});

// Usage stats endpoint
app.post('/api/usage-stats', (req, res) => {
  const { pokemon } = req.body;
  // Update usage statistics
  console.log(`Processed ${pokemon.length} species`);
  res.json({ success: true });
});

app.listen(3000);
```

<details>
<summary><strong>NestJS Example (TypeScript)</strong></summary>

```typescript
import { Controller, Post, Body } from '@nestjs/common';

class LeaderboardPayload {
  serverId: string;
  season: string;
  format: string;
  players: Array<{
    uuid: string;
    name: string;
    elo: number;
  }>;
}

@Controller('api')
export class ApiController {
  @Post('leaderboard')
  async leaderboard(@Body() payload: LeaderboardPayload) {
    // Process leaderboard data
    return { success: true };
  }
}
```

</details>

---

## Testing

**Curl Commands:**

```bash
# Test leaderboard
curl -X POST https://your-server.com/api/leaderboard \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-key" \
  -d '{"serverId":"test","season":"Season 1","format":"singles","players":[]}'

# Test match result
curl -X POST https://your-server.com/api/match-result \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-key" \
  -d '{"matchId":"test","players":[]}'
```

---

## Security

⚠️ **Production Requirements:**

- Use HTTPS only
- Validate `X-API-Key` header
- Rate limit requests (100 req/min recommended)
- Sanitize all input data
- Use read-only database accounts for queries

```sql
-- Create read-only database user
CREATE USER 'cobbleranked_web'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT ON cobbleranked.* TO 'cobbleranked_web'@'%';
```

---

## See Also

- [Database Configuration](/docs/cobbleranked/advanced/database/) - Direct database access
- [Placeholders](/docs/cobbleranked/integration/placeholders/) - In-game placeholders
- [Cross-Server Setup](/docs/cobbleranked/advanced/cross-server/) - Multi-server API sync
- [FAQ](/docs/cobbleranked/support/faq/) - Common API questions
- [Troubleshooting](/docs/cobbleranked/support/troubleshooting/) - Connection issues
