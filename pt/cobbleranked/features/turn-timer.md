# Temporizador de Turno

---
**CobbleRanked** > **Recursos** > **Temporizador de Turno**
---

Aplicar limites de tempo nos turnos de batalha para prevenir delonga.

## Visão Geral

Jogadores têm tempo limitado para selecionar um movimento cada turno. Se o tempo acabar, um movimento legal aleatório é escolhido automaticamente.

**Exibição:**
- Verde: > 20 segundos
- Amarelo: 11-20 segundos
- Vermelho: ≤ 10 segundos

## Configuração

**Arquivo:** `config/cobbleranked/config.json5`

### Configuração Básica

```json5
"turnTimer": {
  "enabled": true,
  "defaultTimeSeconds": 30
}
```

### Temporizadores Específicos de Formato

Limites de tempo diferentes por formato:

```json5
"format_timers": {
  "SINGLES": {
    "turn_timeout_seconds": 90
  },
  "DOUBLES": {
    "turn_timeout_seconds": 120
  }
}
```

## Opções

| Configuração | Descrição | Padrão |
|---------|-------------|---------|
| `enabled` | Habilitar temporizador de turno | `false` |
| `defaultTimeSeconds` | Limite de tempo padrão | `30` |
| `turn_timeout_seconds` | Sobrescrever por formato | Varia |

## Dicas

- **Singles:** 60-90 segundos é padrão
- **Doubles:** 90-120 segundos (decisões mais complexas)
- **Torneios:** 60 segundos para partidas mais rápidas
- **Casual:** 120+ segundos para novos jogadores

## Solução de Problemas

**Temporizador não aparecendo:** Verifique `turnTimer.enabled` está `true`.

**Limite de tempo errado:** Configurações específicas de formato sobrescrevem o padrão.

---

## Próximos Passos

### Para Configuração
1. **[Configuração Principal](../configuration/config.md#turn-timer)** - Referência completa de configurações de temporizador
2. **[Temporizadores Específicos de Formato](#format-specific-timers)** - Tempos diferentes por formato
3. **[Fluxo de Batalha](ranked-battles.md#battle-phase)** - Entender mecânicas de turno

### Para Jogo Competitivo
1. **[Configurações de Torneio](#tips)** - Valores de temporizador recomendados
2. **[Casual vs Competitivo](#tips)** - Ajustar para seu público
3. **[Testando Temporizador de Turno](../getting-started/quick-start.md#step-4-test-the-system)** - Verificar funcionamento

---

## Páginas Relacionadas
- [Configuração Principal](../configuration/config.md) - Todas as configurações de temporizador
- [Batalhas Ranqueadas](ranked-battles.md) - Mecânicas de batalha
- [FAQ](../support/faq.md#turn-timer--matchmaking) - Perguntas comuns
