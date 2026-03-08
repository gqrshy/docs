---
title: Cross-Server Troubleshooting Guide
description: Questions to ask users when players don't return to their original lobby server after cross-server battles
---

## Quick Diagnosis

Run these commands on the **battle server** and compare results:

```bash
# Check if players can return
redis-cli KEYS "player_origin:*"
redis-cli PING
```

## Questions to Ask the User

### 1. Configuration Verification
- Is `cross_server.yaml` present on all servers?
- What is the `serverId` for each server?
- For battle server: is the `battleServer` field empty?

### 2. Server Name Matching
- Do server names in `cross_server.yaml` match exactly with Velocity config?
- Example: `serverId: lobby1` in yaml = but Velocity server `lobby1`?

### 3. Transfer Logs (Critical)
After a battle ends, check logs for find these messages:
- On **battle server**:
  ```
  [Match ended: <player1> vs <player2>
  [Transfer] Transferring <player> to <lobby_server>
  ```
- On **lobby server**:
  ```
  [Transfer] <player> is already on target server, skipping transfer
  ```

### 4. Player Location After Battle
- Where do players end up after the battle?
  - Stay on battle server?
  - Disconnected?
  - Sent to wrong server?

### 5. Redis Connectivity
- Can all servers ping Redis?
- Any Redis connection errors in logs?

## Information to Provide (if possible)
- Screenshot of `cross_server.yaml` from each server
- Server logs from battle end (from all servers)
- Screenshot of Velocity config showing server names
