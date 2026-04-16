---
title: API & Integration
description: Build statistics websites and usage rankings with CobbleRanked data.
---

Create leaderboards, usage statistics, and player profiles using CobbleRanked's data.

## Placeholders

See [Placeholders](/docs/cobbleranked/integration/placeholders/) for the full placeholder reference.

---

## Database Queries

Connect to CobbleRanked's MySQL/MongoDB database for custom statistics. See [Database Configuration](/docs/cobbleranked/advanced/database/) for schema details.

### Common Queries

**Top 10 Players:**
```sql
SELECT uuid, elo, matches, wins, losses
FROM format_stats
WHERE format = 'singles' AND season_name = 'Season 1'
ORDER BY elo DESC
LIMIT 10;
```

**Pokemon Usage:**
```sql
SELECT
    json_extract(pokemon_json, '$.species') as species,
    COUNT(*) as usage_count
FROM battle_records
WHERE season_name = 'Season 1' AND format = 'singles'
GROUP BY species
ORDER BY usage_count DESC
LIMIT 20;
```

**Player Stats Across Seasons:**
```sql
SELECT season_name, format, elo, matches, wins,
       ROUND(wins * 100.0 / matches, 2) as win_rate
FROM format_stats
WHERE uuid = 'player-uuid-here'
ORDER BY season_name DESC, format;
```

---

## Web Application Example

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'cobbleranked'
});

const app = express();

app.get('/api/leaderboard/:format', async (req, res) => {
  const { format } = req.params;
  const season = req.query.season || 'Season 1';
  const [rows] = await pool.query(
    `SELECT uuid, elo, matches, wins FROM format_stats
     WHERE format = ? AND season_name = ?
     ORDER BY elo DESC LIMIT 10`,
    [format, season]
  );
  res.json(rows);
});

app.listen(3000);
```

---

## Security

⚠️ Use read-only database accounts for external applications:

```sql
CREATE USER 'cobbleranked_web'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT ON cobbleranked.* TO 'cobbleranked_web'@'%';
```

- Implement rate limiting on API endpoints
- Always sanitize user input
- Use HTTPS in production

---

## See Also

- [Database Configuration](/docs/cobbleranked/advanced/database/) - Database setup and full schema
- [Placeholders](/docs/cobbleranked/integration/placeholders/) - Placeholder API reference
- [Cross-Server Setup](/docs/cobbleranked/advanced/cross-server/) - Multi-server configuration
