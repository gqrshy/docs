# API Placeholder

---
**CobbleRanked** > **Integração** > **Placeholders**
---

CobbleRanked integra-se com [Text Placeholder API](https://placeholders.pb4.eu/) para exibir estatísticas ranqueadas em hologramas, placas e outros mods Fabric que suportam placeholders.

---

## Visão Geral

Placeholders permitem que você exiba estatísticas ranqueadas em tempo real em qualquer lugar que suporte o formato Text Placeholder API (`%placeholder%`).

**Casos de uso comuns:**
- Hologramas de ranking (mods de holograma baseados em Fabric)
- Exibições de placar (mods de placar Fabric)
- Formatação de chat (mods de chat compatíveis com Fabric)
- Exibições personalizadas via Text Placeholder API

**Nota:** Isso usa **Text Placeholder API** (mod Fabric), não PlaceholderAPI (plugin Bukkit/Spigot). Para servidores híbridos (Arclight), ambas APIs são suportadas.

**Desempenho:**
- Todos os placeholders são em cache por 60 segundos
- Consultas ao banco de dados são minimizadas
- Seguro para servidores de alto tráfego

---

## Formatos de Placeholder

### Todos os Formatos Combinados

Exibir melhores jogadores através de **ambos** formatos Singles e Doubles combinados (classificados por Elo total).

**Sintaxe:**
```
%cobbleranked_top_<rank>_<field>%
```

**Exemplos:**
```
%cobbleranked_top_1_name%      → "Notch"
%cobbleranked_top_1_elo%       → "1650"
%cobbleranked_top_2_wins%      → "42"
%cobbleranked_top_3_winrate%   → "75.5"
%cobbleranked_top_5_games%     → "128"
```

---

### Apenas Formato Singles

Exibir melhores jogadores apenas em formato **Singles**.

**Sintaxe:**
```
%cobbleranked_top_singles_<rank>_<field>%
```

**Exemplos:**
```
%cobbleranked_top_singles_1_name%    → "Steve"
%cobbleranked_top_singles_1_elo%     → "1580"
%cobbleranked_top_singles_2_wins%    → "35"
%cobbleranked_top_singles_3_losses%  → "12"
%cobbleranked_top_singles_5_winrate% → "80.0"
```

---

### Apenas Formato Doubles

Exibir melhores jogadores apenas em formato **Doubles**.

**Sintaxe:**
```
%cobbleranked_top_doubles_<rank>_<field>%
```

**Exemplos:**
```
%cobbleranked_top_doubles_1_name%    → "Alex"
%cobbleranked_top_doubles_1_elo%     → "1720"
%cobbleranked_top_doubles_2_wins%    → "48"
%cobbleranked_top_doubles_3_losses%  → "8"
%cobbleranked_top_doubles_5_games%   → "100"
```

---

## Campos Disponíveis

| Campo | Descrição | Saída de Exemplo |
|-------|-------------|----------------|
| `name` | Nome de usuário do jogador | `"Notch"` |
| `elo` | Rating Elo atual | `"1650"` |
| `wins` | Total de vitórias no formato | `"42"` |
| `losses` | Total de derrotas no formato | `"15"` |
| `winrate` | Percentual de vitória (1 decimal) | `"73.7"` |
| `games` | Total de jogos jogados | `"57"` |

**Notas:**
- Todos os campos numéricos retornam números simples (sem formatação)
- `winrate` é calculado como: `(vitórias / jogos) * 100`
- Ranks vazios retornam `"N/A"` para todos os campos

---

## Ranks Suportados

**Faixa:** 1-100

Você pode consultar qualquer rank do 1º lugar ao 100º lugar.

**Exemplos:**
```
%cobbleranked_top_1_name%     → 1º lugar
%cobbleranked_top_10_name%    → 10º lugar
%cobbleranked_top_100_elo%    → 100º lugar
```

**Fora da faixa:**
- Rank < 1: Retorna `"N/A"`
- Rank > 100: Retorna `"N/A"`
- Sem jogador no rank: Retorna `"N/A"` (ou "-" para campos numéricos)

---

## Testando Placeholders

### Teste em Linha de Comando

Use os comandos `/rankedplaceholder` para testar placeholders antes de implantá-los.

#### Testar um Placeholder

```bash
/rankedplaceholder test %cobbleranked_top_1_name%
```

**Saída:**
```
[CobbleRanked Placeholder Test]
Input: %cobbleranked_top_1_name%
Result: Notch
```

#### Listar Todos os Placeholders

```bash
/rankedplaceholder list
```

**Saída mostra:**
- Todos os formatos disponíveis (Todos, Singles, Doubles)
- Todos os campos disponíveis (name, elo, wins, losses, winrate, games)
- Exemplos de sintaxe para cada formato
- Informações de faixa de rank
- Info de TTL de cache

#### Limpar Cache

```bash
/rankedplaceholder clear
```

Forçar atualização imediata de cache (normalmente atualiza a cada 60 segundos automaticamente).

---

## Exemplos de Integração

### Mods de Holograma Fabric

Placeholders CobbleRanked funcionam com qualquer mod de holograma Fabric que suporte Text Placeholder API.

**Exemplo de uso de placeholder:**

```
%cobbleranked_top_1_name% - Nome do melhor jogador
%cobbleranked_top_1_elo% - Elo do melhor jogador
%cobbleranked_top_singles_1_name% - Melhor jogador Singles
%cobbleranked_top_doubles_1_elo% - Melhor Elo Doubles
```

**Mods de holograma Fabric recomendados:**
- Verifique [wiki da Text Placeholder API](https://placeholders.pb4.eu/) para mods de holograma compatíveis
- A maioria dos mods de holograma Fabric com suporte a placeholder funcionarão

---

### Servidores Híbridos (Arclight)

Para servidores híbridos Fabric+Bukkit (como Arclight), CobbleRanked suporta **ambos**:
- **Text Placeholder API** (lado Fabric)
- **PlaceholderAPI** (lado Bukkit/Spigot)

**Exemplos de plugin Bukkit/Spigot (apenas Arclight):**

#### DecentHolograms (plugin Bukkit)

```yaml
# plugins/DecentHolograms/holograms/ranked_top.yml
ranked_top:
  enabled: true
  location:
    world: world
    x: 100.5
    y: 64.0
    z: 200.5
  lines:
    - "&6&l◆ Melhores Jogadores Ranqueados ◆"
    - ""
    - "&e1º: &f%cobbleranked_top_1_name%"
    - "&7Elo: &a%cobbleranked_top_1_elo% &7| WR: &6%cobbleranked_top_1_winrate%%"
    - ""
    - "&e2º: &f%cobbleranked_top_2_name%"
    - "&7Elo: &a%cobbleranked_top_2_elo% &7| WR: &6%cobbleranked_top_2_winrate%%"
```

#### LuckPerms Chat Prefix (plugin Bukkit)

```bash
# Definir prefixo de campeão para melhor jogador
/lp group champion meta addprefix "&6[#1] "
/lp user <top_player> parent set champion
```

**Nota:** Esses exemplos Bukkit/Spigot funcionam apenas em **servidores híbridos** (Arclight). Servidores Fabric puros devem usar apenas mods compatíveis com Fabric.

---

## Lógica de Resolução de Placeholder

### Como Rankings São Calculados

1. **Todos os Formatos (`%cobbleranked_top_<rank>_<field>%`):**
   - Combina estatísticas de Singles e Doubles
   - Classificado por **Elo total** (Elo Singles + Elo Doubles)
   - Exemplo: Jogador com 1500 Singles + 1600 Doubles = 3100 total

2. **Apenas Singles (`%cobbleranked_top_singles_<rank>_<field>%`):**
   - Considera apenas estatísticas de formato Singles
   - Classificado apenas por Elo Singles

3. **Apenas Doubles (`%cobbleranked_top_doubles_<rank>_<field>%`):**
   - Considera apenas estatísticas de formato Doubles
   - Classificado apenas por Elo Doubles

### Comportamento de Cache

**TTL de Cache:** 60 segundos

- Primeira consulta: Busca no banco de dados
- Consultas subsequentes (dentro de 60s): Acerto de cache
- Após 60s: Cache expira, próxima consulta atualiza do banco de dados

**Limpeza manual de cache:**
```bash
/rankedplaceholder clear
```

**Limpeza automática de cache:**
- Jogador vence/perde uma partida → Cache invalidado para esse jogador
- Rotação de temporada → Limpeza completa de cache

### Tratamento de Rank Vazio

Quando um rank não tem jogador (ex: apenas 5 jogadores no servidor mas consultando rank 10):

| Campo | Valor de Fallback |
|-------|----------------|
| `name` | `"N/A"` |
| `elo` | `"-"` |
| `wins` | `"0"` |
| `losses` | `"0"` |
| `winrate` | `"0.0"` |
| `games` | `"0"` |

**Exemplo:**
```
%cobbleranked_top_100_name%   → "N/A" (se < 100 jogadores)
%cobbleranked_top_100_elo%    → "-"
```

---

## Veja Também

- [FAQ & Solução de Problemas](../support/faq.md) - Problemas comuns e soluções
- [Referência de Comandos](../getting-started/commands.md) - Comandos de teste de placeholder
- [Guia de Configuração](../configuration/config.md) - Configurações de cache

---

## Considerações de Desempenho

### Impacto de Cache

**Consultas ao banco de dados economizadas:**
- Sem cache: ~1000 consultas/minuto (20 hologramas × 50 visualizadores)
- Com cache: ~17 consultas/minuto (TTL de 60 segundos)

**Impacto de CPU:** Insignificante (<0,1% uso de CPU)

**Uso de memória:** ~1KB por 100 placeholders em cache

### Melhores Práticas

1. **Use intervalos de atualização amigáveis ao cache:**
   - Defina atualização de holograma para 60+ segundos
   - Evite taxas de atualização sub-segundo

2. **Limite tamanho do ranking:**
   - Exiba top 10 ao invés de top 100
   - Reduz carga do banco de dados

3. **Use placeholders específicos de formato quando possível:**
   ```
   Servidor apenas Singles:
   ✅ %cobbleranked_top_singles_1_name%
   ❌ %cobbleranked_top_1_name%
   ```

4. **Evite consultar todos os 100 ranks:**
   - Consulte apenas ranks que você exibe
   - Cada consulta de rank = 1 entrada de cache

---

## API para Desenvolvedores

Se você está desenvolvendo um plugin que precisa acessar dados ranqueados:

### Exemplo Kotlin/Java

```kotlin
import com.gashi.cobbleranked.CobbleRankedMod
import com.gashi.cobbleranked.enums.BattleFormat

// Obter top 10 jogadores (todos os formatos)
val topPlayers = CobbleRankedMod.playerRankService.getTopPlayers(10)

// Obter top 10 jogadores (apenas Singles)
val topSingles = CobbleRankedMod.playerRankService.getTopPlayersByFormat(
    format = BattleFormat.SINGLES,
    limit = 10
)

// Obter estatísticas específicas de jogador
val stats = CobbleRankedMod.playerRankService.getFormatStats(
    playerUuid = player.uuid,
    format = BattleFormat.SINGLES
)

println("Player Elo: ${stats?.rankedInfo?.elo ?: 1000}")
println("Wins: ${stats?.rankedInfo?.wins ?: 0}")
```

### Resolução Direta de Placeholder

```kotlin
import com.gashi.cobbleranked.placeholder.PlaceholderService

// Resolver um placeholder
val playerName = PlaceholderService.resolve("%cobbleranked_top_1_name%")
println("Top player: $playerName")

// Limpar cache programaticamente
PlaceholderService.clearCache()
```

---

## Referência Completa de Placeholders

### Todos os Formatos Combinados

| Placeholder | Descrição |
|------------|-------------|
| `%cobbleranked_top_<rank>_name%` | Nome de usuário do jogador |
| `%cobbleranked_top_<rank>_elo%` | Elo Total (Singles + Doubles) |
| `%cobbleranked_top_<rank>_wins%` | Total de vitórias (Singles + Doubles) |
| `%cobbleranked_top_<rank>_losses%` | Total de derrotas (Singles + Doubles) |
| `%cobbleranked_top_<rank>_winrate%` | Percentual de vitória geral |
| `%cobbleranked_top_<rank>_games%` | Total de jogos jogados |

### Formato Singles

| Placeholder | Descrição |
|------------|-------------|
| `%cobbleranked_top_singles_<rank>_name%` | Nome de usuário do jogador |
| `%cobbleranked_top_singles_<rank>_elo%` | Elo Singles |
| `%cobbleranked_top_singles_<rank>_wins%` | Vitórias Singles |
| `%cobbleranked_top_singles_<rank>_losses%` | Derrotas Singles |
| `%cobbleranked_top_singles_<rank>_winrate%` | Percentual de vitória Singles |
| `%cobbleranked_top_singles_<rank>_games%` | Jogos Singles jogados |

### Formato Doubles

| Placeholder | Descrição |
|------------|-------------|
| `%cobbleranked_top_doubles_<rank>_name%` | Nome de usuário do jogador |
| `%cobbleranked_top_doubles_<rank>_elo%` | Elo Doubles |
| `%cobbleranked_top_doubles_<rank>_wins%` | Vitórias Doubles |
| `%cobbleranked_top_doubles_<rank>_losses%` | Derrotas Doubles |
| `%cobbleranked_top_doubles_<rank>_winrate%` | Percentual de vitória Doubles |
| `%cobbleranked_top_doubles_<rank>_games%` | Jogos Doubles jogados |

**Faixa de rank:** 1-100 para todos os placeholders

---

## Próximos Passos

### Para Configuração de Exibição
1. **[Testando Placeholders](#testing-placeholders)** - Verificar placeholders funcionam
2. **[Integração de Holograma](#fabric-hologram-mods)** - Exibir rankings
3. **[Gerenciamento de Cache](#cache-behavior)** - Entender cache

### Para Uso Avançado
1. **[API para Desenvolvedores](#api-for-developers)** - Acesso programático
2. **[Otimização de Desempenho](#performance-considerations)** - Melhores práticas
3. **[Configuração de Servidor Híbrido](#hybrid-servers-arclight)** - Suporte PlaceholderAPI

### Para Servidores Competitivos
1. **[Rankings](../features/leaderboards.md)** - Exibição de ranking in-game
2. **[Placeholders Específicos de Formato](#singles-format-only)** - Singles vs Doubles
3. **[Rankings Top 100](#supported-ranks)** - Suporte completo de ranking

---

## Páginas Relacionadas
- [Rankings](../features/leaderboards.md) - Exibição de ranking in-game
- [Referência de Comandos](../getting-started/commands.md) - Comandos de teste
- [Solução de Problemas](../support/faq.md#placeholder-api-troubleshooting) - Problemas comuns
