# Language Files

Customize all in-game messages and translate CobbleRanked to any language.

## File Location

`config/cobbleranked/language/`

## Overview

CobbleRanked includes 4 built-in languages:
- **English** (`en-Us.json5`) - Default
- **Japanese** (`ja-Jp.json5`)
- **Portuguese** (`pt-Br.json5`)
- **Russian** (`ru-Ru.json5`)

All messages, notifications, and GUI text are fully customizable via JSON5 language files.

## Quick Start

### 1. Select Language

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "en-Us"  // Change to: en-Us, ja-Jp, pt-Br, ru-Ru
}
```

### 2. Reload Configuration

```bash
/rankedadmin reload
```

That's it! All messages will now use your selected language.

---

## Language File Structure

### File Format

Language files use JSON5 format with key-value pairs:

```json5
{
  "message_key": "Message content with {placeholder}",
  "another_key": "Another message",
  "color_example": "&aGreen &cRed &eYellow text"
}
```

### Example: en-Us.json5

```json5
{
  // Queue messages
  "joined-queue": "&aYou have joined the ranked match queue.",
  "left-queue": "&cYou have left the ranked match queue.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)",

  // Battle messages
  "match-winner": "&aVictory!!",
  "match-winner-subtitle": "&aYou gained &f{gain} &aELO points.",
  "match-loser": "&cDefeat!!",
  "match-loser-subtitle": "&cYou lost &f{lose} &aELO points.",

  // Validation messages
  "pokemon-blacklist": "&cYou are using a Pokémon that is on the blacklist.",
  "no-pokemon-ability": "&cYour Pokémon has an ability that is not allowed in ranked."
}
```

---

## Message Categories

### Queue Messages

| Key | Description | Example |
|-----|-------------|---------|
| `joined-queue` | Joined queue notification | "You have joined the ranked match queue." |
| `left-queue` | Left queue notification | "You have left the ranked match queue." |
| `remaingFila` | Queue waiting status | "Searching for a match... (30s) (Position: 1)" |
| `match-found` | Match found title | "Match Found!" |
| `prepare-queue-cancel` | Match cancelled message | "Match was canceled. (A player disconnected)" |

### Battle Messages

| Key | Description | Example |
|-----|-------------|---------|
| `battle-start-title` | Battle starting title | "Battle Starting!" |
| `battle-countdown` | Countdown number | "3" |
| `match-started` | Match start notification | "Match Started" |
| `match-winner` | Victory title | "Victory!!" |
| `match-winner-subtitle` | Victory subtitle with Elo gain | "You gained 25 ELO points." |
| `match-loser` | Defeat title | "Defeat!!" |
| `match-loser-subtitle` | Defeat subtitle with Elo loss | "You lost 18 ELO points." |

### Validation Messages

| Key | Description | Example |
|-----|-------------|---------|
| `pokemon-blacklist` | Banned Pokemon error | "You are using a Pokémon that is on the blacklist." |
| `no-pokemon-ability` | Banned ability error | "Your Pokémon has an ability that is not allowed in ranked." |
| `blocked-item-move` | Banned move error | "You have a Pokémon with moves that are blocked in ranked." |
| `no-pokemon-item` | Banned item error | "Your Pokémon has an item equipped that is not allowed in ranked." |
| `limit-pokemon` | Team size error | "You need to have 6 Pokémon to join the ranked match." |

### Admin Messages

| Key | Description | Example |
|-----|-------------|---------|
| `ranked-reload-adm` | Config reload success | "Settings reloaded successfully!" |
| `set-elo-adm` | Elo set command | "Elo 1500 set successfully for player Steve" |
| `arena-not-found` | Arena not found error | "Arena volcano_arena not found" |
| `noPermCommand` | Permission denied | "You do not have permission to use this command." |

---

## Placeholders

Language files support dynamic placeholders that are replaced with actual values at runtime.

**Common placeholders include:**
- `{player}`, `{player1}`, `{player2}` - Player names
- `{gain}`, `{lose}`, `{elo}` - Elo ratings
- `{winner}`, `{loser}` - Battle results
- `{remaining}`, `{posicao}` - Queue information
- `{pokemon}`, `{level}`, `{format}` - Pokemon and battle info
- `{season}`, `{arena}`, `{time}` - System information

**Example Usage:**
```json5
{
  "match-finished": "&8* &f{winner} &chas just won a ranked match against &f{loser}.",
  "elo-up": "&aYou ranked up to &f{elo}.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)"
}
```

**For a complete list of all placeholders and their usage, see:**
- [Placeholder API Documentation](../integration/placeholders.md#message-placeholders)

**Important Rules:**
- Placeholders are **case-sensitive** (use `{player}`, not `{Player}`)
- Always preserve placeholders when translating messages
- Test placeholders in-game after editing

---

## Color Codes

Use Minecraft color codes for colored text:

### Colors

| Code | Color | Preview | Example |
|------|-------|---------|---------|
| `&0` | Black | <span style="color: #000000; background: #CCCCCC; padding: 2px 8px;">████</span> | `&0Black text` |
| `&1` | Dark Blue | <span style="color: #0000AA;">████</span> | `&1Dark Blue` |
| `&2` | Dark Green | <span style="color: #00AA00;">████</span> | `&2Dark Green` |
| `&3` | Dark Aqua | <span style="color: #00AAAA;">████</span> | `&3Dark Aqua` |
| `&4` | Dark Red | <span style="color: #AA0000;">████</span> | `&4Dark Red` |
| `&5` | Dark Purple | <span style="color: #AA00AA;">████</span> | `&5Dark Purple` |
| `&6` | Gold | <span style="color: #FFAA00;">████</span> | `&6Gold` |
| `&7` | Gray | <span style="color: #AAAAAA;">████</span> | `&7Gray` |
| `&8` | Dark Gray | <span style="color: #555555;">████</span> | `&8Dark Gray` |
| `&9` | Blue | <span style="color: #5555FF;">████</span> | `&9Blue` |
| `&a` | Green | <span style="color: #55FF55;">████</span> | `&aGreen` |
| `&b` | Aqua | <span style="color: #55FFFF;">████</span> | `&bAqua` |
| `&c` | Red | <span style="color: #FF5555;">████</span> | `&cRed` |
| `&d` | Light Purple | <span style="color: #FF55FF;">████</span> | `&dLight Purple` |
| `&e` | Yellow | <span style="color: #FFFF55;">████</span> | `&eYellow` |
| `&f` | White | <span style="color: #FFFFFF; background: #333333; padding: 2px 8px;">████</span> | `&fWhite` |

### Formatting

| Code | Format | Example |
|------|--------|---------|
| `&l` | Bold | `&l&aBOLD GREEN` |
| `&m` | Strikethrough | `&mStrikethrough` |
| `&n` | Underline | `&nUnderline` |
| `&o` | Italic | `&oItalic` |
| `&r` | Reset | `&aGreen&r Normal` |

### Examples

```json5
{
  "match-winner": "&a&lVictory!!",              // Bold green
  "match-loser": "&c&lDefeat!!",                // Bold red
  "elo-up": "&aYou ranked up to &f{elo}&a.",    // Green with white Elo
  "battle-start-title": "&e&lBattle Starting!"  // Bold yellow
}
```

---

## Creating a Custom Language

### Step 1: Copy Existing Language

```bash
cd config/cobbleranked/language/
cp en-Us.json5 es-Es.json5  # Spanish example
```

### Step 2: Translate Messages

Edit `es-Es.json5`:

```json5
{
  "joined-queue": "&aTe has unido a la cola de partidas clasificatorias.",
  "left-queue": "&cHas salido de la cola de partidas clasificatorias.",
  "match-winner": "&a¡¡Victoria!!",
  "match-loser": "&c¡¡Derrota!!",
  "pokemon-blacklist": "&cEstás usando un Pokémon que está en la lista negra.",
  // ... translate all keys
}
```

**Important:**
- Keep all keys the same (only translate values)
- Preserve placeholders (e.g., `{player}`, `{elo}`)
- Use same color codes or customize

### Step 3: Select Your Language

Edit `config.json5`:

```json5
{
  "language": "es-Es"
}
```

### Step 4: Reload

```bash
/rankedadmin reload
```

---

<details>
<summary><strong>Complete Message List (Click to expand)</strong></summary>

## Complete Message List

### Queue & Matchmaking

```json5
{
  "joined-queue": "Joined ranked match queue notification",
  "left-queue": "Left ranked match queue notification",
  "enterFila": "Entered queue notification (duplicate)",
  "remaingFila": "Queue waiting status with time and position",
  "queue_time_format": "Time format for queue (e.g., '30s')",
  "prepare-queue": "Match found title",
  "prepare-queue-subtitle": "Match found subtitle with player names",
  "prepare-queue-cancel": "Match cancelled notification",
  "match-found": "Match found announcement",
  "match-found-subtitle": "Transfer to battle server message"
}
```

### Battle Start

```json5
{
  "battle-start-title": "Battle starting title screen",
  "battle-start-subtitle": "Battle starting subtitle with player names",
  "battle-countdown": "Countdown number (3, 2, 1)",
  "battle-countdown-subtitle": "Countdown subtitle text",
  "match-starting-title": "Match starting title",
  "match-starting-subtitle": "Match starting subtitle",
  "match-started": "Match started title",
  "match-started-subtitle": "Match duration information",
  "ranked-started": "Server-wide match start announcement"
}
```

### Battle End

```json5
{
  "match-winner": "Victory title screen",
  "match-winner-subtitle": "Victory subtitle with Elo gain",
  "match-loser": "Defeat title screen",
  "match-loser-subtitle": "Defeat subtitle with Elo loss",
  "match-finished": "Server-wide match end announcement",
  "elo-up": "Ranked up notification",
  "elo-down": "Ranked down notification",
  "battle_demais": "Point reduction for fighting same player too much"
}
```

### Validation & Errors

```json5
{
  "limit-pokemon": "Not enough Pokemon error",
  "no-pokemon": "No Pokemon in party error",
  "no-pokemonLife": "Pokemon not alive error",
  "pokemon-blacklist": "Blacklisted Pokemon error",
  "pokemon-label-limit": "Pokemon label limit exceeded",
  "blocked-item-move": "Banned move error",
  "no-pokemon-move": "Banned move error (duplicate)",
  "no-pokemon-item": "Banned item error",
  "no-pokemon-ability": "Banned ability error",
  "isRanked": "Already in ranked match error",
  "ranked-closed": "Ranked system closed error",
  "not-in-match-player": "Player not in match error"
}
```

### Team/Lead Selection

```json5
{
  "pokemon_switched": "Pokemon selected as lead",
  "team_selection_ready": "Ready for team selection",
  "team_selection_already_ready": "Already ready error",
  "team_selection_limit_reached": "Pokemon selection limit reached",
  "lead_selection_ready": "Lead Pokemon selected",
  "team_selection_gui_ready_button": "Ready button text",
  "team_selection_gui_click_ready": "Click to ready button text",
  "team_selection_gui_selected_count": "Selected Pokemon count",
  "team_selection_gui_not_ready": "Not ready button text",
  "team_selection_gui_select_exactly": "Selection requirement text",
  "team_selection_gui_your_pokemon": "Your Pokemon section label",
  "team_selection_gui_opponent_pokemon": "Opponent Pokemon section label"
}
```

### Admin Commands

```json5
{
  "ranked-reload-adm": "Config reload success",
  "ranked-closed-adm": "Ranked system closed by admin",
  "ranked-open-adm": "Ranked system opened by admin",
  "set-elo-adm": "Elo set command success",
  "add-elo-adm": "Elo add command success",
  "reset-elo-adm": "Elo reset command success",
  "remove-elo-adm": "Elo remove command success",
  "arena-not-found": "Arena not found error",
  "teleport-arena-adm": "Teleport to arena success",
  "saida-setada-adm": "Exit location set success",
  "not-set-saida-adm": "Exit location not set error",
  "posicao-invalida": "Invalid position error",
  "need-player": "Must be in-game error",
  "noPermCommand": "No permission error",
  "permission-message": "No permission message"
}
```

### Rewards

```json5
{
  "collect_reward": "Reward collected success",
  "gui_reward_no_points": "Not enough points for reward error"
}
```

### Debug & Errors

```json5
{
  "error1": "Generic error occurred",
  "erroGui1": "GUI error with value",
  "debug-util-erro-pos": "Duplicate position error",
  "debug-util-erro2": "Elo config not found",
  "debug-util-erro3": "Elo file not found",
  "debug-util-erro4": "Arena exit not loaded",
  "debug-util-erro5": "Pokemon not found error",
  "debug-util-erro6": "Pokemon not found (short)",
  "debug-util-erro7": "No arena found",
  "debug-util-erro8": "Arena missing positions",
  "debug-util-erro9": "Invalid item number in reward",
  "debug-util-load": "Loaded amount message",
  "debug-util-language": "GUI language loaded",
  "debug-util-language1": "Selected language message",
  "debug-util-language2": "Message config loaded"
}
```

</details>

---

## Escaping Special Characters

### Apostrophes

Use `''` (double apostrophe) to escape single quotes in JSON5:

```json5
{
  "lead_selection_gui_opponent_pokemon": "&7Opponent''s Pokemon"
}
```

### Backslashes

Use `\\` to escape backslashes:

```json5
{
  "permission-message": "&cYou don\\t have permission"
}
```

---

## Testing Your Language

### 1. Reload Configuration

```bash
/rankedadmin reload
```

### 2. Test Common Messages

- Join queue: `/ranked` → Queue button
- Battle messages: Complete a battle
- Validation: Try banned Pokemon/moves
- Admin: `/rankedadmin reload`

### 3. Check Console

Look for errors in `logs/latest.log`:

```
[CobbleRanked] Message configurations for language es-Es loaded successfully!
```

If errors occur:
- Check JSON5 syntax
- Verify file name matches config setting
- Look for missing keys

---

## Language File Maintenance

### Adding New Messages

When CobbleRanked updates with new features:

1. **Check for new keys** in `en-Us.json5` (reference)
2. **Add missing keys** to your custom language file
3. **Translate new messages**
4. **Reload**: `/rankedadmin reload`

### Best Practices

**✅ DO:**
- Keep all language files in sync (same keys)
- Test messages in-game after changes
- Use consistent color scheme across messages
- Preserve placeholder formatting
- Use comments for organization

**❌ DON'T:**
- Remove or rename keys (will cause errors)
- Forget to escape special characters
- Use placeholder names that don't exist
- Mix different quote styles inconsistently

---

## Troubleshooting

Having issues with language files? See the [Troubleshooting Guide](../support/troubleshooting.md#language-not-loading) for solutions to:
- Language not loading
- Missing messages
- Placeholders not replacing
- Color codes not working

---

**Next:** Learn about [GUI Customization](gui.md) for visual elements.
