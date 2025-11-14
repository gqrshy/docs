# Blacklist Configuration

Restrict Pokemon, moves, abilities, and items in ranked battles.

**Config File:** `config/cobbleranked/blacklist.json5`

---

## Basic Setup

### Simple Example

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

Save and run `/rankedadmin reload` to apply.

---

## Pokemon Restrictions

### Ban by Label

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**Available Labels:**

| Label | Description |
|-------|-------------|
| `legendary` | Legendary Pokemon |
| `mythical` | Mythical Pokemon |
| `restricted` | VGC restricted |
| `ultra_beast` | Ultra Beasts |
| `paradox` | Paradox Pokemon |
| `starter` | Starter Pokemon |
| `fossil` | Fossil Pokemon |
| `baby` | Baby Pokemon |
| `powerhouse` | Pseudo-legendaries (600 BST) |
| `gen1` ~ `gen9` | By generation |

### Quantity Limits

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // Max 1 legendary
    "restricted": 2      // Max 2 restricted
  }
}
```

### Ban Specific Pokemon

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // All forms banned
    "rayquaza:mega"      // Only Mega Rayquaza banned
  ]
}
```

---

## Move, Ability, Item Restrictions

### Ban Moves

```json5
{
  "black_list_moves": [
    "fissure",           // Fissure
    "sheer_cold",        // Sheer Cold
    "baton_pass",        // Baton Pass
    "last_respects"      // Last Respects
  ]
}
```

### Ban Abilities

```json5
{
  "black_list_ability": [
    "moody",             // Moody
    "shadow_tag",        // Shadow Tag
    "arena_trap"         // Arena Trap
  ]
}
```

### Ban Items

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // Bright Powder
    "cobblemon:lax_incense",      // Lax Incense
    "cobblemon:quick_claw"        // Quick Claw
  ]
}
```

> **Note:** Items must use `cobblemon:item_name` format (check with `F3 + H`)

---

## Common Configurations

### Smogon OU

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": ["cobblemon:bright_powder", "cobblemon:lax_incense"]
}
```

### VGC Series 1

```json5
{
  "restricted_label_limits": {
    "restricted": 2
  },
  "black_list_labels": ["mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## Troubleshooting

### Config Not Applying
- Run `/rankedadmin reload`
- Check JSON5 syntax errors

### Items Not Banned
- Verify item ID with `F3 + H`
- Use `cobblemon:item_name` format

### More Information
- Move/ability name lookup
- Form-specific bans
- Complex examples

**See [FAQ](../support/faq.md) for details**

---

## Related Guides

- [Main Config](config.md)
- [Battle Formats](../features/battle-formats.md)
- [FAQ](../support/faq.md)
