# Sistema de Rating Elo

---
**CobbleRanked** > **Recursos** > **Sistema Elo**
---

Calcule níveis de habilidade de jogadores para matchmaking e rankings.

---

## Visão Geral

Rating Elo determina:
- **Matchmaking** - Contra quem você é pareado
- **Rank no ranking** - Sua posição
- **Progressão de habilidade** - Melhoria visível

**Elo Inicial:** 1000 (padrão)
**Específico de Formato:** Singles, Doubles e Multi rastreiam Elo separado

---

## Como Elo Funciona

- **Vitória** → Ganhar Elo
- **Derrota** → Perder Elo
- **Pontos trocados** dependem da diferença de rating

### Exemplos (modo Pokemon Showdown, K=32)

| Cenário | Seu Elo | Oponente | Probabilidade de Vitória | Vitória | Derrota |
|----------|----------|----------|-----------------|-----|------|
| Partida equilibrada | 1000 | 1000 | 50% | **+16** | -16 |
| Vitória surpresa | 900 | 1200 | 24% | **+24** | -8 |
| Vitória esperada | 1200 | 900 | 76% | **+8** | -24 |
| Grande surpresa | 800 | 1400 | 5% | **+30** | -2 |

**Principais insights:**
- Partida equilibrada (50/50): ±16 Elo
- Vencer classificado superior = grande ganho, pequeno risco de perda
- Perder para classificado inferior = grande perda, pequeno potencial de ganho
- Elo total no sistema permanece constante (soma zero)

> **[📸 IMAGEM NECESSÁRIA: Diagrama de exemplo de cálculo de variação de Elo (mudança de Elo antes/depois, probabilidade esperada e resultado real)]**

---

## Modos de Cálculo

### Pokemon Showdown (Recomendado)

Usa sistema de fator K (similar a Xadrez/Pokemon Showdown).

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,           // Elo mínimo
      "kFactor": 32,               // Fator K padrão
      "provisionalMatches": 10,    // Período de novo jogador
      "provisionalKFactor": 64     // Maior para novos jogadores
    }
  }
}
```

**Fator K:**
- Novos jogadores (< 10 partidas): K = 64 (rating muda mais rápido)
- Jogadores estabelecidos: K = 32 (estável)

> **[📸 IMAGEM NECESSÁRIA: Gráfico de mudança de Elo pela diferença de fator K (comparação de taxa de mudança com K=16, 32, 64)]**

### Legacy (Simples)

Mudança aleatória de Elo entre mín e máx.

```json5
{
  "eloSystem": {
    "mode": "LEGACY",
    "legacy": {
      "minPoints": 10,
      "maxPoints": 30
    }
  }
}
```

Vencedor ganha +10 a +30 Elo (aleatório).

### Glicko-2 (Avançado)

Sistema mais preciso usado por Chess.com e Lichess. Rastreia **incerteza de rating (RD)** além de rating.

```json5
{
  "eloSystem": {
    "mode": "GLICKO2",
    "glicko2": {
      "initialRating": 1500.0,        // Rating inicial (maior que Elo padrão)
      "initialRD": 350.0,              // Desvio de Rating (incerteza)
      "initialVolatility": 0.06,       // Quão erráticas são mudanças de rating
      "tau": 0.5,                      // Restrição de volatilidade do sistema
      "rdDecayDays": 30                // RD aumenta se inativo
    }
  }
}
```

**Como funciona:**
- **Rating (R):** Seu nível de habilidade (como Elo)
- **Desvio de Rating (RD):** Confiança em seu rating
  - Novo jogador: RD = 350 (incerto)
  - Após 20+ partidas: RD ≈ 50-100 (confiante)
  - Jogadores inativos: RD aumenta (incerteza cresce)
- **Volatilidade (σ):** Quão consistentemente você performa

**Mudanças de rating:**
- Novos jogadores (RD alto): **±100 pontos** por partida
- Jogadores estabelecidos (RD baixo): **±20-40 pontos** por partida
- Vencer jogadores incertos (RD alto): ganho menor
- Vencer jogadores confiantes (RD baixo): ganho maior

> **[📸 IMAGEM NECESSÁRIA: Visualização de mudança de RD (Rating Deviation) (gráfico de redução de RD de acordo com número de partidas, aumento quando inativo)]**

**Quando usar:**
- ✅ Servidor competitivo grande (100+ jogadores ativos)
- ✅ Quer ratings justos para jogadores que retornam
- ✅ Precisa considerar confiança de rating
- ❌ Servidor casual pequeno (use Pokemon Showdown ao invés)

---

## Configuração

### Guia de Fator K (Modo Pokemon Showdown)

Fator K controla quanto o Elo muda por partida. Maior = mudanças mais rápidas.

**Fórmula:** `Mudança de Elo = K × (resultado real - resultado esperado)`

| Fator K | Mudança de Rating | Caso de Uso | Exemplo |
|----------|---------------|----------|---------|
| 16 | ±4 a ±12 | Muito estável, apenas jogadores top | Grandes mestres de xadrez |
| 24 | ±6 a ±18 | Competitivo, progressão mais lenta | Competitivo ranqueado |
| **32** | **±8 a ±24** | **Padrão** | **Padrão Pokemon Showdown** |
| 40 | ±10 a ±30 | Progressão mais rápida, casual | Competitivo casual |
| 64 | ±16 a ±48 | Muito rápido (apenas novos jogadores) | Primeiras 10 partidas |

**Recomendação:**
- **Servidor competitivo:** K = 32 (padrão: 64), K provisório = 64
- **Servidor casual:** K = 40 (padrão: 64), K provisório = 80
- **Alta atividade:** Fator K menor (ratings estabilizam mais rápido)
- **Baixa atividade:** Fator K maior (ratings ajustam mais rápido)

### Decaimento de Elo

Jogadores inativos perdem Elo para prevenir estagnação da ladder.

```json5
{
  "pokemonShowdown": {
    "decay": {
      "enabled": true,
      "runAtUtcHour": 9,
      "slowDecayReduction": 2    // -2 Elo por dia
    }
  }
}
```

**Exemplo:** 10 dias inativo = -20 Elo

> **[📸 IMAGEM NECESSÁRIA: Exemplo de operação do sistema de decaimento de Elo (gráfico de relação entre dias de inatividade e redução de Elo)]**

**Nota:** Modo Glicko-2 usa decaimento de RD ao invés (rating permanece, incerteza aumenta).

---

## Solução de Problemas

**Elo não mudando?**
- Verifique batalha completada (não empate)
- Verifique modo Elo está definido
- Verifique conexão de banco de dados

**Mudanças muito rápidas/lentas?**
- Ajuste fator K (`kFactor: 32` → maior/menor)
- Verifique se ainda provisório (primeiras 10 partidas)

**Todo mundo preso em 1000?**
- Verifique batalhas completando
- Verifique banco de dados salvando
- Recarregar config

---

## Matchmaking Dinâmico

Expande automaticamente faixa de Elo conforme jogadores esperam na fila para partidas mais rápidas.

### Como Funciona

1. **Jogador entra na fila** → Começar com faixa estreita de Elo (±200)
2. **Nenhuma partida encontrada** → Faixa expande gradualmente com o tempo
3. **Partida encontrada** → Batalha começa

**Fórmula:** `faixa = faixa_inicial + (segundos_esperados / taxa_expansão)`

### Configuração

`config/cobbleranked/config.json5`:

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,           // Faixa de Elo inicial (±200)
    "expansion_delay": 30,          // Esperar 30s antes de expandir
    "expansion_rate": 5,            // +1 Elo a cada 5 segundos
    "max_multiplier": 3.0,          // Máx ±600 (200 × 3.0)
    "immediate_match_range": 100   // Partida instantânea se ±100
  }
}
```

#### Campos

| Campo | Padrão | Descrição |
|-------|---------|-------------|
| `enabled` | `true` | Habilitar expansão dinâmica |
| `initial_range` | `200` | Faixa de Elo inicial |
| `expansion_delay` | `30` | Segundos antes da expansão começar |
| `expansion_rate` | `5` | Segundos por +1 expansão de Elo |
| `max_multiplier` | `3.0` | Multiplicador máximo de faixa |
| `immediate_match_range` | `100` | Limite de partida instantânea |

### Linha do Tempo de Exemplo

**Jogador com 1500 Elo:**

| Tempo de Espera | Faixa de Elo | Mín | Máx |
|-----------|-----------|-----|-----|
| 0-30s | ±200 | 1300 | 1700 |
| 60s | ±206 | 1294 | 1706 |
| 120s | ±218 | 1282 | 1718 |
| 300s | ±254 | 1246 | 1754 |
| 600s | ±314 | 1186 | 1814 |
| 2000s+ | ±600 (máx) | 900 | 2100 |

### Presets

#### Rápido (Servidor Casual)
```json5
{
  "initial_range": 300,
  "expansion_delay": 15,
  "expansion_rate": 3,
  "max_multiplier": 4.0
}
```

#### Equilibrado (Recomendado)
```json5
{
  "initial_range": 200,
  "expansion_delay": 30,
  "expansion_rate": 5,
  "max_multiplier": 3.0
}
```

#### Restrito (Competitivo)
```json5
{
  "initial_range": 100,
  "expansion_delay": 60,
  "expansion_rate": 10,
  "max_multiplier": 2.0
}
```

### Solução de Problemas de Matchmaking

**Tempo de fila muito longo?**
- Diminuir `expansion_delay`
- Diminuir `expansion_rate`
- Aumentar `initial_range`

**Partidas muito desequilibradas?**
- Diminuir `initial_range`
- Aumentar `expansion_delay`
- Diminuir `max_multiplier`

**Expansão não funcionando?**
- Verificar `enabled: true`
- Recarregar config: `/rankedadmin reload`

---

## Próximos Passos

### Para Entender Elo
1. **[Guia de Fator K](#k-factor-guide-pokemon-showdown-mode)** - Ajustar velocidade de mudança de rating
2. **[Sistema Glicko-2](#glicko-2-advanced)** - Rating avançado com incerteza
3. **[Decaimento de Elo](#elo-decay)** - Prevenir estagnação da ladder

### Para Matchmaking
1. **[Expansão de Faixa Dinâmica](#dynamic-matchmaking)** - Otimizar tempos de fila
2. **[Presets de Matchmaking](#presets)** - Configs Rápido/Equilibrado/Restrito
3. **[Solução de Problemas de Matchmaking](#matchmaking-troubleshooting)** - Corrigir problemas de fila

### Para Configuração Competitiva
1. **[Configuração Principal](../configuration/config.md#elo-system)** - Aplicar configurações de Elo
2. **[Gerenciamento de Temporada](seasons.md)** - Resets de Elo e temporadas
3. **[Rankings](leaderboards.md)** - Rankings baseados em Elo

---

## Páginas Relacionadas
- [Formatos de Batalha](ranked-battles.md) - Elo específico de formato
- [Guia de Configuração](../configuration/config.md) - Configurações detalhadas de Elo
- [Solução de Problemas](../support/troubleshooting.md#elo-not-updating-after-battle) - Problemas de Elo
