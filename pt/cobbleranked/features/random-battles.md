# Batalhas Aleatórias

---
**CobbleRanked** > **Recursos** > **Batalhas Aleatórias**
---

Equipes geradas automaticamente para jogadores que querem batalhar sem construir equipe.

## Visão Geral

Equipes são geradas de pools predefinidos com movesets fixos, EVs e itens - assim como Random Battles do Pokemon Showdown.

**Benefícios:**
- Não precisa construir equipe
- Perfeito para novos jogadores
- Foco na habilidade de batalha, não na preparação

## Formatos

**RANDOM_SINGLES** - 6v6 singles com equipes geradas
**RANDOM_DOUBLES** - 6v6 doubles com equipes geradas
**RANDOM_3V3** - Batalhas rápidas 3v3

## Configuração

**Arquivo:** `config/cobbleranked/config.json5`

```json5
"random_battles": {
  "enabled": true,
  "default_pool": "Random OU",  // Nome do pool da seção random_pools
  "format_pools": {
    "RANDOM_SINGLES": "Random OU",
    "RANDOM_DOUBLES": "Random Doubles OU",
    "RANDOM_3V3": "Random 3v3"
  }
}
```

## Criando Pools de Pokémon

**Arquivo:** `config/cobbleranked/random_pools/`

Crie arquivos JSON5 para cada tier (ex: `random_ou.json5`, `random_ubers.json5`).

### Pool de Exemplo

```json5
{
  "pool_name": "Random OU",
  "pokemon": [
    {
      "species": "Garchomp",
      "level": 70,
      "moves": ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"],
      "ability": "Rough Skin",
      "nature": "Jolly",
      "evs": {"hp": 0, "atk": 252, "def": 4, "spa": 0, "spd": 0, "spe": 252},
      "item": "cobblemon:choice_scarf"
    }
  ]
}
```

## Parâmetros de Pool

| Campo | Descrição | Obrigatório |
|-------|-------------|----------|
| `species` | Nome do Pokémon | Sim |
| `level` | Nível (1-100) | Sim |
| `moves` | 4 movimentos | Sim |
| `ability` | Nome da habilidade | Não |
| `nature` | Natureza | Não |
| `evs` | Distribuição de EV | Não |
| `item` | Item segurado | Não |

## Dicas

- Crie pools separados para diferentes tiers (OU, Ubers, LC)
- Use distribuições de EV baseadas em função (Physical Sweeper, Special Wall, etc.)
- Inclua movesets diversos para cada Pokémon
- Teste balanço do pool antes de implantar

## Solução de Problemas

**Equipes não gerando:** Verifique se `random_battles.enabled` está `true` e arquivos de pool existem.

**Pokémon faltando:** Verifique se nomes de espécies correspondem ao registro de Pokémon do Cobblemon.

**Batalhas falhando:** Garanta que todos os Pokémon têm 4 movimentos e habilidades válidas.

---

## Próximos Passos

### Para Configuração
1. **[Criando Pools de Pokémon](#creating-pokemon-pools)** - Construa seu primeiro pool
2. **[Parâmetros de Pool](#pool-parameters)** - Entenda todas as opções
3. **[Testando Pools](#troubleshooting)** - Verifique se equipes geram corretamente

### Para Pools Competitivos
1. **[Organização de Tier](#tips)** - Criar pools OU/Ubers/LC
2. **[Distribuições de EV](#tips)** - Distribuições baseadas em função
3. **[Teste de Balanço](#tips)** - Garantir confrontos justos

---

## Páginas Relacionadas
- [Configuração Principal](../configuration/config.md) - Configurações de batalhas aleatórias
- [Formatos de Batalha](ranked-battles.md) - Tipos de formato
- [Solução de Problemas](../support/troubleshooting.md) - Problemas comuns
