---
title: Blacklist Configuration
description: Control which Pokemon, moves, abilities, and items are allowed.
---

Control which Pokemon, moves, abilities, and items are allowed in battles.

File: `config/cobbleranked/blacklist.yaml`

## Structure

```yaml
# Global blacklist (applies to all formats)
global:
  pokemon: []
  moves: []
  abilities: []
  items: []

# Format-specific blacklists
formats:
  SINGLES:
    pokemon: []
    moves: []
    abilities: []
    items: []
  DOUBLES:
    pokemon: []
    moves: []
    abilities: []
    items: []
  TRIPLES:
    pokemon: []
    moves: []
    abilities: []
    items: []
```

## Pokemon Blacklist

Ban specific Pokemon species:

```yaml
global:
  pokemon:
    - "mewtwo"
    - "mew"
    - "lugia"
    - "ho-oh"
    - "rayquaza"
    - "arceus"
```

### Pokemon Name Format

- Use lowercase species names
- Use hyphens for multi-word names
- Regional forms: `meowth-alolan`, `meowth-galarian`
- Mega forms: `charizard-mega-x`, `charizard-mega-y`

## Move Blacklist

Ban specific moves:

```yaml
global:
  moves:
    - "ohko_moves"      # Category: all OHKO moves
    - "fissure"         # Specific move
    - "horn_drill"
    - "sheer_cold"
    - "guillotine"
```

### Move Categories

| Category | Description |
|----------|-------------|
| `ohko_moves` | Fissure, Horn Drill, Sheer Cold, Guillotine |
| `evasion_moves` | Double Team, Minimize |
| `sleep_moves` | Sleep Powder, Spore, Hypnosis, etc. |

## Ability Blacklist

Ban specific abilities:

```yaml
global:
  abilities:
    - "moody"
    - "shadow_tag"
    - "arena_trap"
```

## Item Blacklist

Ban specific held items:

```yaml
global:
  items:
    - "kings_rock"
    - "razor_fang"
    - "bright_powder"
    - "lax_incense"
```

## Format-Specific Rules

Apply different rules per format:

```yaml
formats:
  SINGLES:
    pokemon:
      - "ditto"  # Ban Ditto in Singles only
    moves:
      - "baton_pass"

  DOUBLES:
    pokemon: []
    moves:
      - "dark_void"  # Ban Dark Void in Doubles

  TRIPLES:
    pokemon: []
    moves:
      - "dark_void"
      - "origin_pulse"  # Too powerful in 3v3
```

## Smogon-Style Tiers

Example OU-like banlist:

```yaml
global:
  pokemon:
    # Uber tier Pokemon
    - "mewtwo"
    - "lugia"
    - "ho-oh"
    - "kyogre"
    - "groudon"
    - "rayquaza"
    - "dialga"
    - "palkia"
    - "giratina"
    - "arceus"
    - "zacian"
    - "zamazenta"
    - "eternatus"
    - "calyrex"

  moves:
    - "ohko_moves"
    - "baton_pass"

  abilities:
    - "moody"
    - "shadow_tag"
    - "arena_trap"

  items:
    - "kings_rock"
    - "razor_fang"
```

## Hot Reload

Reload blacklist without restart:

```
/rankedadmin reload
```

## Complete Example

```yaml
global:
  pokemon:
    - "mewtwo"
    - "mew"
    - "lugia"
    - "ho-oh"
    - "celebi"
    - "kyogre"
    - "groudon"
    - "rayquaza"
    - "jirachi"
    - "deoxys"

  moves:
    - "fissure"
    - "horn_drill"
    - "sheer_cold"
    - "guillotine"
    - "double_team"
    - "minimize"

  abilities:
    - "moody"
    - "shadow_tag"
    - "arena_trap"

  items:
    - "kings_rock"
    - "razor_fang"
    - "bright_powder"

formats:
  SINGLES:
    pokemon: []
    moves:
      - "baton_pass"
    abilities: []
    items: []

  DOUBLES:
    pokemon: []
    moves:
      - "dark_void"
    abilities: []
    items: []

  TRIPLES:
    pokemon: []
    moves:
      - "dark_void"
      - "origin_pulse"
    abilities: []
    items: []
```
