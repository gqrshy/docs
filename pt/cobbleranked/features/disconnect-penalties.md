# Penalidades de Desconexão

---
**CobbleRanked** > **Recursos** > **Penalidades de Desconexão**
---

Prevenir abuso penalizando jogadores que desconectam durante batalhas ranqueadas.

---

## Visão Geral

Quando um jogador desconecta durante uma batalha ranqueada:
- **Contagem de fuga** aumenta em 1
- **Rendição de batalha** - Oponente vence automaticamente
- **Penalidade de Elo** - Perde Elo como se tivesse perdido normalmente
- **Banimento de fila** - Banimento temporário baseado no tier de contagem de fuga

---

## Tiers de Penalidade

| Contagem de Fuga | Banimento de Fila | Tier |
|------------|-----------|------|
| 1-5 | 5 minutos | ⚠️ Aviso |
| 6-10 | 15 minutos | 🔶 Sério |
| 11+ | 30 minutos | 🔴 Severo |

---

## Configuração

`config/cobbleranked/config.json5`:

```json5
{
  "competitive": {
    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    }
  }
}
```

### Campos

| Campo | Tipo | Descrição |
|-------|------|-------------|
| `flee_min` | Number | Contagem mínima de fuga para tier |
| `flee_max` | Number | Contagem máxima de fuga para tier |
| `penalty_minutes` | Number | Duração de banimento de fila |

---

## Decaimento de Fuga

Reduz automaticamente contagem de fuga com o tempo para perdoar desconexões passadas.

```json5
{
  "flee_decay": {
    "enabled": true,
    "decay_rate": 1,              // Contagem de fuga reduzida por intervalo
    "decay_interval_hours": 24    // Horas entre reduções
  }
}
```

**Exemplo:** Jogador com 10 de contagem de fuga → 0 após 10 dias (1 por dia).

---

## Presets

### Leniente (Casual)
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 3, "penalty_minutes": 0 },
      { "flee_min": 4, "flee_max": 999, "penalty_minutes": 5 }
    ]
  },
  "flee_decay": {
    "decay_rate": 2,
    "decay_interval_hours": 12
  }
}
```

### Restrito (Competitivo)
```json5
{
  "flee_penalty": {
    "tiers": [
      { "flee_min": 1, "flee_max": 2, "penalty_minutes": 10 },
      { "flee_min": 3, "flee_max": 5, "penalty_minutes": 30 },
      { "flee_min": 6, "flee_max": 999, "penalty_minutes": 60 }
    ]
  },
  "flee_decay": {
    "decay_rate": 1,
    "decay_interval_hours": 168  // Semanal
  }
}
```

---

## Comandos de Admin

| Comando | Descrição |
|---------|-------------|
| `/rankedadmin getflee <player> <format>` | Verificar contagem de fuga do jogador |
| `/rankedadmin resetflee <player> <format>` | Resetar contagem de fuga para 0 |

---

## Solução de Problemas

**Penalidades não funcionando?**
- Verifique sintaxe de configuração de tier
- Verifique `preventDuplicatePenalty: true` em modo cross-server
- Reinicie servidor após mudanças de config

**Contagem de fuga não decaindo?**
- Garanta `enabled: true`
- Decaimento aplica quando jogador entra
- Verifique hora/data do servidor está correta

---

## Próximos Passos

### Para Configuração
1. **[Presets de Penalidade](#presets)** - Configurações lenientes ou restritas
2. **[Configuração de Decaimento de Fuga](#flee-decay)** - Perdoar desconexões antigas
3. **[Configuração Principal](../configuration/config.md#competitive)** - Referência completa de configurações

### Para Gerenciamento de Jogadores
1. **[Comandos de Admin](#admin-commands)** - Verificar e resetar contagens de fuga
2. **[Fluxo de Batalha](ranked-battles.md#disconnect-handling)** - Como desconexões são tratadas
3. **[Sistema Elo](elo-system.md)** - Penalidades de Elo por fuga

### Para Solução de Problemas
1. **[FAQ Penalidades](../support/faq.md#disconnect-penalties)** - Perguntas comuns
2. **[Guia de Solução de Problemas](../support/troubleshooting.md#disconnect-during-battle)** - Corrigir problemas
3. **[Comportamento Cross-Server](../configuration/config.md#competitive)** - Prevenir penalidades duplicadas

---

## Páginas Relacionadas
- [Batalhas Ranqueadas](ranked-battles.md) - Tratamento de desconexão em batalhas
- [Guia de Configuração](../configuration/config.md) - Configurações de penalidade
- [Referência de Comandos](../getting-started/commands.md#player-elo-management)** - Gerenciamento de fuga
