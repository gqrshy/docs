# GUI & Language Customization

---
**CobbleRanked** > **Configuration** > **GUI & Languages**
---

Customize CobbleRanked interface appearance, layout, and messaging.

## GUI Files

**Location:** `config/cobbleranked/gui/`

CobbleRanked uses language-specific GUI files:

```
gui/
├── gui-enUs.json5    # English
├── gui-jaJp.json5    # Japanese
├── gui-ptBr.json5    # Portuguese
└── gui-ruRu.json5    # Russian
```

Each file contains **all** GUI definitions for that language.

## Available GUIs

- **gui_ranked** - Main menu (queue, stats, leaderboards)
- **gui_top_ranked** - Leaderboard display
- **gui_prepare_combat** - Pre-battle team preview
- **gui_rewards** - Season/milestone rewards
- **gui_ranked_blocked** - Blacklist viewer
- **closeGui** - Close button (shared)

## Basic Customization

### Change Item Display

```json5
{
  "gui_ranked": {
    "title": "Ranked Battles",
    "rows": 3,
    "items": {
      "queue_singles": {
        "item": "minecraft:iron_sword",  // Change item
        "name": "Queue Singles",           // Change name
        "slot": 11,                        // Change position
        "lore": [
          "Click to join singles queue"
        ]
      }
    }
  }
}
```

### Item Fields

| Field | Description | Required |
|-------|-------------|----------|
| `item` | Item ID (e.g., `minecraft:diamond`) | Yes |
| `name` | Display name (supports color codes) | Yes |
| `slot` | Inventory slot (0-53) | Yes |
| `lore` | Array of lore lines | No |
| `amount` | Item stack size (1-64) | No |
| `glow` | Add enchantment glow | No |

### Color Codes

Use `&` for colors:
- `&a` - Green
- `&c` - Red
- `&e` - Yellow
- `&b` - Aqua
- `&6` - Gold
- `&l` - Bold
- `&r` - Reset

Example:
```json5
"name": "&a&lQueue Singles"  // Bold green text
```

## GUI Layout

Slots are numbered 0-53 (6 rows × 9 columns):

```
 0  1  2  3  4  5  6  7  8
 9 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
```

> **[📸 IMAGE NEEDED: GUIスロット番号レイアウト図（0-53のマッピング表示、視覚的なグリッド）]**

## Placeholders

Use placeholders for dynamic content:

| Placeholder | Description |
|-------------|-------------|
| `{elo}` | Player's Elo rating |
| `{wins}` | Win count |
| `{losses}` | Loss count |
| `{rank}` | Player's rank position |
| `{tier}` | Player's tier (Pokeball, Greatball, etc.) |
| `{season}` | Current season name |
| `{queue_count}` | Players in queue |

Example:
```json5
"lore": [
  "Your Elo: &e{elo}",
  "Wins: &a{wins} &7| Losses: &c{losses}"
]
```

> **[📸 IMAGE NEEDED: プレースホルダーが適用されたGUIアイテムの例（実際のElo値や勝敗数が表示されているツールチップ）]**

## Common Customizations

### Change Queue Button Position

```json5
"queue_singles": {
  "slot": 20  // Move to different slot
}
```

### Add Custom Decoration Items

```json5
"decoration": {
  "item": "minecraft:black_stained_glass_pane",
  "name": " ",
  "slot": 0
}
```

### Modify Leaderboard Display

```json5
"gui_top_ranked": {
  "title": "&6&lTop Players",
  "rows": 6
}
```

## Applying Changes

1. Edit GUI file
2. Run `/rankedadmin reload`
3. Reopen GUI to see changes

> **[📸 IMAGE NEEDED: カスタマイズ前後のGUI比較画像（デフォルトとカスタムアイテム/配置の違い）]**

**Note:** Config reloads automatically detect language from `config.json5`.

## Troubleshooting

**GUI not updating:**
- Check JSON5 syntax (use [JSONLint](https://jsonlint.com/))
- Verify file encoding is UTF-8
- Run `/rankedadmin reload`

**Items not showing:**
- Check slot numbers (0-53 range)
- Verify item IDs are valid

**Colors not working:**
- Use `&` not `§` for color codes
- Ensure `&r` to reset formatting

---

## Language Customization

### Overview

CobbleRanked includes 4 built-in languages:
- **English** (`en-Us.json5`) - Default
- **Japanese** (`ja-Jp.json5`)
- **Portuguese** (`pt-Br.json5`)
- **Russian** (`ru-Ru.json5`)

**Files:** `config/cobbleranked/language/`

All messages, notifications, and text are fully customizable via JSON5 language files.

### Select Language

Edit `config/cobbleranked/config.json5`:

```json5
{
  "language": "en-Us"  // Change to: en-Us, ja-Jp, pt-Br, ru-Ru
}
```

Then reload:
```bash
/rankedadmin reload
```

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

## Message Placeholders

Many messages support placeholders that are dynamically replaced:

### Player & Match Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{player}` | Player name | "match-finished": "{player} has won!" |
| `{player1}` | First player name | "ranked-started": "{player1} vs {player2}" |
| `{player2}` | Second player name | "prepare-queue-subtitle": "{player1} vs {player2}" |
| `{winner}` | Winner name | "match-finished": "{winner} has won!" |
| `{loser}` | Loser name | "match-finished": "{winner} defeated {loser}!" |

### Elo & Stats Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{gain}` | Elo gained | "match-winner-subtitle": "You gained {gain} ELO" |
| `{lose}` | Elo lost | "match-loser-subtitle": "You lost {lose} ELO" |
| `{elo}` | Elo rating | "elo-up": "You ranked up to {elo}." |
| `{wins}` | Win count | "Your wins: {wins}" |
| `{losses}` | Loss count | "Your losses: {losses}" |

### Queue & System Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{remaining}` | Time remaining | "remaingFila": "Searching... ({remaining})" |
| `{posicao}` | Queue position | "remaingFila": "Position: {posicao}" |
| `{time}` | Time value | "match-started-subtitle": "Duration is {time}m" |
| `{limit}` | Team size limit | "limit-pokemon": "You need {limit} Pokémon" |
| `{arena}` | Arena name | "arena-not-found": "Arena {arena} not found" |

### Pokemon Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `{pokemon}` | Pokemon name | "pokemon_switched": "Selected {pokemon}" |
| `{level}` | Pokemon level | "Level: {level}" |
| `{current}` | Current HP | "HP: {current}/{max}" |
| `{max}` | Maximum HP | "HP: {current}/{max}" |
| `{label}` | Pokemon category | "team_selection_label_limit_item": "{label}: {current}/{limit}" |

### Example with Placeholders

```json5
{
  "match-finished": "&8* &f{winner} &chas just won a ranked match against &f{loser}.",
  "elo-up": "&aYou ranked up to &f{elo}.",
  "remaingFila": "&cSearching for a match... &7(&e{remaining}&7) &7(Position: &e{posicao}&7)"
}
```

**Result:**
- `{winner}` → "Steve"
- `{loser}` → "Alex"
- Output: "* Steve has just won a ranked match against Alex."

---

## Color Codes Reference

### Colors

| Code | Color | Example |
|------|-------|---------|
| `&0` | Black | `&0Black text` |
| `&1` | Dark Blue | `&1Dark Blue` |
| `&2` | Dark Green | `&2Dark Green` |
| `&3` | Dark Aqua | `&3Dark Aqua` |
| `&4` | Dark Red | `&4Dark Red` |
| `&5` | Dark Purple | `&5Dark Purple` |
| `&6` | Gold | `&6Gold` |
| `&7` | Gray | `&7Gray` |
| `&8` | Dark Gray | `&8Dark Gray` |
| `&9` | Blue | `&9Blue` |
| `&a` | Green | `&aGreen` |
| `&b` | Aqua | `&bAqua` |
| `&c` | Red | `&cRed` |
| `&d` | Light Purple | `&dLight Purple` |
| `&e` | Yellow | `&eYellow` |
| `&f` | White | `&fWhite` |

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

## Creating Custom Language

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

## Language Testing

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

## Language Troubleshooting

### Language not loading

**Symptoms:** Still shows English after changing language

**Solutions:**
1. Check `language` setting in `config.json5`
2. Verify file name matches exactly (case-sensitive)
3. Reload: `/rankedadmin reload`
4. Check console for errors

### Missing messages

**Symptoms:** Some messages show key instead of text

**Solutions:**
1. Ensure all keys from `en-Us.json5` exist in your file
2. Copy missing keys from English file
3. Reload configuration

### Placeholders not replacing

**Symptoms:** Message shows `{player}` instead of player name

**Solutions:**
1. Verify placeholder spelling (case-sensitive)
2. Check placeholder is used in correct message
3. Use correct placeholder for message type

---

## Best Practices

### Language Files

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

### Special Characters

#### Apostrophes

Use `''` (double apostrophe) to escape single quotes:

```json5
{
  "lead_selection_gui_opponent_pokemon": "&7Opponent''s Pokemon"
}
```

#### Backslashes

Use `\\` to escape backslashes:

```json5
{
  "permission-message": "&cYou don\\t have permission"
}
```

---

## Next Steps

### For GUI Customization
1. **[Color Codes Reference](#color-codes-reference)** - Full color and formatting guide
2. **[Placeholder Usage](#placeholders)** - Dynamic content in GUIs
3. **[Testing Changes](#applying-changes)** - Reload and verify modifications

### For Language Customization
1. **[Creating Custom Language](#creating-custom-language)** - Add your own language
2. **[Message Categories](#message-categories)** - Understand all message types
3. **[Special Characters](#special-characters)** - Handle apostrophes and escaping

### For Advanced Usage
1. **[GUI Layout Guide](#gui-layout)** - Slot positioning system
2. **[Testing Tools](#language-testing)** - Validate language files
3. **[Best Practices](#best-practices)** - Professional customization tips

---

## Related Pages
- [Quick Start](../getting-started/quick-start.md) - See GUI in action
- [Main Configuration](config.md) - Language settings
- [Troubleshooting](../support/troubleshooting.md#gui-issues) - GUI-related problems
