# Itens Banidos de Inventário

---
**CobbleRanked** > **Recursos** > **Itens Banidos**
---

Prevenir jogadores com itens específicos de entrar em filas ranqueadas.

## Visão Geral

Jogadores não podem entrar na fila se tiverem itens banidos em seu inventário. Útil para bloquear itens de gimmick de batalha como Tera Orbs ou Dynamax Bands.

## Configuração

**Arquivo:** `config/cobbleranked/inventory.json5`

```json5
{
  "banned_items": [
    "mega_showdown:tera_orb",
    "mega_showdown:dynamax_band",
    "mega_showdown:mega_bracelet",
    "mega_showdown:z_ring"
  ]
}
```

## Encontrando IDs de Itens

1. Segure o item no jogo
2. Pressione F3+H (mostrar tooltips avançados)
3. Verifique tooltip para ID (ex: `mega_showdown:tera_orb`)

## Itens Banidos Comuns

**Gimmicks de Batalha:**
- `mega_showdown:tera_orb` - Terastalização
- `mega_showdown:dynamax_band` - Dynamax
- `mega_showdown:mega_bracelet` - Mega Evolução
- `mega_showdown:z_ring` - Movimentos Z
- `mega_showdown:omni_ring` - Todos os gimmicks

## Mensagens de Erro

Quando um jogador tenta entrar na fila com itens banidos:

> ⚠ Não pode entrar na fila - Itens banidos no inventário:
> • mega_showdown:tera_orb
> • mega_showdown:dynamax_band
>
> Por favor remova esses itens.

## Dicas

- Bana itens que fornecem vantagens injustas
- Mantenha a lista mínima - apenas itens verdadeiramente problemáticos
- Comunique itens banidos aos jogadores via regras do servidor

---

## Próximos Passos

### Para Configuração
1. **[Encontrando IDs de Itens](#finding-item-ids)** - Identificar itens para banir
2. **[Configuração de Blacklist](../configuration/blacklist.md)** - Restrições de Pokémon/movimentos
3. **[Formatos de Batalha](ranked-battles.md#pre-battle-validation)** - Como a validação funciona

### Para Integração de Mod
1. **[Itens Mega Showdown](#common-banned-items)** - Itens de gimmick comuns
2. **[Mods Personalizados](../support/faq.md#can-i-use-this-with-showdown-moves-mod)** - Compatibilidade
3. **[Testes](../getting-started/quick-start.md#step-4-test-the-system)** - Verificar banimentos funcionam

---

## Páginas Relacionadas
- [Configuração de Blacklist](../configuration/blacklist.md) - Restrições de Pokémon e movimentos
- [Validação de Batalha](ranked-battles.md#pre-battle-validation) - Como verificações funcionam
- [FAQ](../support/faq.md#format-specific-features) - Banimentos específicos de formato
