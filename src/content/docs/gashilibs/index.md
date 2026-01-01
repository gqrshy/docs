---
title: GashiLibs
description: Required shared library for CobbleRanked.
---

GashiLibs is a required dependency that provides shared libraries for GashiStudios mods.

## What It Provides

| Component | Description |
|-----------|-------------|
| Database Drivers | MySQL, SQLite, MongoDB support |
| Redis Client | Cross-server communication |
| Config Libraries | JSON5, YAML parsing |
| HikariCP | Database connection pooling |

## Installation

1. Download GashiLibs from [Discord](https://discord.gg/VVVvBTqqyP)
2. Place in `mods/` folder
3. Start server

No configuration needed - it just works.

## Version Requirements

| CobbleRanked | GashiLibs |
|--------------|-----------|
| 2.0.x | 1.0.3+ |

## Bundled Libraries

GashiLibs bundles these libraries so you don't need to install them separately:

- MySQL Connector/J 9.1.0
- SQLite JDBC 3.47.2.0
- HikariCP 6.2.1
- Jedis 5.2.0 (Redis)
- Commons Pool2 2.12.0
- Kaml 0.67.0
- kotlinx-serialization-json 1.8.0
- Jankson 1.2.3

## Troubleshooting

### "Missing dependency: GashiLibs"

- Verify `gashilibs-x.x.x.jar` is in `mods/` folder
- Check version compatibility
- Ensure no duplicate JAR files

### Database connection errors

- Check if GashiLibs loaded successfully in logs
- Verify database credentials in config
- For MySQL: ensure server is accessible
