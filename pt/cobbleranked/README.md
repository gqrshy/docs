# CobbleRanked

Um sistema de batalhas ranqueadas competitivas para servidores Cobblemon com matchmaking baseado em Elo, rankings sazonais e personalização abrangente.

<img src="https://img.shields.io/badge/Minecraft-1.21.1-green" alt="Minecraft 1.21.1"> <img src="https://img.shields.io/badge/Cobblemon-1.7.0-blue" alt="Cobblemon 1.7.0"> <img src="https://img.shields.io/badge/Fabric-0.17.2-orange" alt="Fabric">

> **[📸 INSERIR: Captura de tela da GUI principal mostrando fila, tabela de classificação e opções de estatísticas]**

---

## Recursos

### Recursos Principais (Configuração Zero)
- **Matchmaking Ranqueado** - Baseado em Elo com expansão de faixa dinâmica (±200 inicial, até ±600)
- **Múltiplos Formatos** - Singles (1v1), Doubles (2v2) com rankings independentes
- **Sistema de Temporadas** - Rotação automática a cada 30 dias com recompensas para os 3 primeiros
- **Tabelas de Classificação** - Top 10 em tempo real por formato
- **Proteção contra Fuga** - Sistema de penalidades de 3 níveis (banimentos de 5/15/30 min)

### Recursos Opcionais
- **Multi-Servidor** - MySQL/MongoDB + Redis para redes multi-servidor
- **Lista Negra** - 10 categorias de rótulos + Pokémon/movimentos/habilidades/itens específicos
- **Recompensas Personalizadas** - Fim de temporada (baseado em ranking) + marcos (vitórias/Elo)
- **Arenas de Batalha** - Teleporte para coordenadas designadas com direção personalizada
- **4 Idiomas** - Inglês, Japonês, Português, Russo

> **[📸 INSERIR: Comparação lado a lado das tabelas de classificação Singles vs Doubles]**

---

## Início Rápido

```bash
# 1. Instalar dependências
# 2. Colocar CobbleRanked.jar em mods/
# 3. Iniciar servidor
# 4. Testar com comando /ranked
```

**Gera automaticamente:** `config/cobbleranked/` com todos os arquivos de configuração

**Primeira partida:** Jogadores começam com 1000 Elo (modo Pokemon Showdown)

---

## Sistema Elo (3 Modos)

| Modo | Caso de Uso | Cálculo | Valores Padrão |
|------|----------|-------------|----------------|
| **Pokemon Showdown** ✅ | Recomendado | Fator-K (32/64) | Início: 1000, Mínimo: 1000 |
| Glicko-2 | 100+ jogadores ativos | RD + volatilidade | Início: 1500, RD: 350 |
| Legacy | Casual | Aleatório (10-30) | N/A |

<details>
<summary><strong>Detalhes do Pokemon Showdown</strong></summary>

**Sistema de Fator-K:**
- Novos jogadores (< 10 partidas): K=64 (mudanças mais rápidas)
- Jogadores estabelecidos: K=32 (estável)

**Exemplo de Cálculo:**
```
Jogador A (1500 Elo) vs Jogador B (1500 Elo)
Esperado: 50% de chance de vitória
Vitória: +16 Elo
Derrota: -16 Elo
```

**Decaimento de Elo:**
- Ativado por padrão
- -2 Elo por dia após 14 dias de inatividade
- Executa diariamente às 9:00 UTC

</details>

> **[📸 INSERIR: Gráfico mostrando efeito do Fator-K nos ganhos/perdas de Elo]**

---

## Formatos de Batalha

| Formato | Tamanho do Time | Descrição | Ranking |
|--------|-----------|-------------|---------|
| **Singles** | 3-6 Pokémon | 1v1 clássico | Independente |
| **Doubles** | 4-6 Pokémon | 2v2 estilo VGC | Independente |
| **Multi** | 1-3 cada | Batalhas em time (2v2) | Compartilhado com o grupo |

**Cláusulas de Batalha (Padrão):**
- ✅ Cláusula de Espécie (sem duplicatas)
- ✅ Cláusula OHKO (sem Fissure/Sheer Cold)
- ✅ Cláusula de Sono (máx. 1 oponente dormindo)
- ✅ Cláusula de Evasão
- ✅ Cláusula Dynamax
- ❌ Cláusula de Item (duplicatas permitidas)
- ❌ Cláusula Terastal (permitida)

---

## Documentação

### 📖 Começando
- [Instalação](getting-started/installation.md) - Configuração de dependências
- [Início Rápido](getting-started/quick-start.md) - Primeira configuração
- [Comandos](getting-started/commands.md) - Referência completa de comandos

### ⚙️ Configuração
- [Configuração Principal](configuration/config.md) - Todas as opções explicadas
- [Lista Negra](configuration/blacklist.md) - Restrições de Pokémon/movimentos
- [Arenas](configuration/arenas.md) - Coordenadas de batalha
- [Recompensas](configuration/rewards.md) - Recompensas de temporada e marcos
- [Idiomas](configuration/languages.md) - Personalização de mensagens
- [GUI](configuration/gui.md) - Personalização de interface

### 🎮 Recursos
- [Batalhas Ranqueadas](features/ranked-battles.md) - Fluxo de batalha
- [Sistema Elo](features/elo-system.md) - Cálculos de classificação
- [Formatos de Batalha](features/battle-formats.md) - Detalhes de formatos
- [Temporadas](features/seasons.md) - Gerenciamento de temporadas
- [Tabelas de Classificação](features/leaderboards.md) - Rankings
- [Penalidades de Desconexão](features/disconnect-penalties.md) - Sistema de fuga
- [Matchmaking Dinâmico](features/dynamic-matchmaking.md) - Expansão de faixa de Elo

### 🔧 Avançado
- [Multi-Servidor](advanced/cross-server.md) - Configuração multi-servidor
- [Banco de Dados](advanced/database.md) - SQLite/MySQL/MongoDB
- [Redis](advanced/redis.md) - Sincronização em tempo real

### 🔌 Integração
- [Placeholder API](integration/placeholders.md) - Integração com Text Placeholder API (top 100 rankings)

### 💬 Suporte
- [FAQ](support/faq.md) - Perguntas comuns
- [Solução de Problemas](support/troubleshooting.md) - Resolução de problemas
- [Discord](https://discord.gg/VVVvBTqqyP) - Canal #feedback

---

## Configuração Padrão

<details>
<summary><strong>Valores Padrão Principais</strong></summary>

```json5
// Temporada e Batalhas
"reset_days": 30           // Temporadas mensais
"levelMatch": 0            // Sem forçar nível
"turn_limit": 100          // Máximo de turnos por batalha

// Matchmaking
"initial_range": 200       // ±200 Elo
"expansion_delay": 30      // 30s antes da expansão
"max_multiplier": 3.0      // Máx. ±600 Elo

// Penalidades de Fuga
1-5 fugas:  banimento de 5 min
6-10 fugas: banimento de 15 min
11+ fugas:  banimento de 30 min
Decaimento: -1 fuga a cada 24 horas

// Elo (Pokemon Showdown)
"initialElo": 1000
"kFactor": 32 (64 para novos jogadores)
"provisionalMatches": 10
```

</details>

---

## Requisitos

| Necessário | Versão | Opcional (Multi-Servidor) | Versão |
|----------|---------|-------------------------|---------|
| Minecraft | 1.21.1 | MySQL | 8.0+ |
| Fabric Loader | 0.17.2+ | MongoDB | 6.0+ |
| Cobblemon | 1.7.0+ | Redis | 6.0+ |
| Fabric API | 0.116.6+ | Velocity | 3.4.0+ |
| Fabric Language Kotlin | 1.13.6+ | | |

---

## Exemplos Rápidos

### Servidor Casual (Sem Restrições)
```json5
// blacklist.json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

### Servidor Competitivo (Smogon OU)
```json5
// blacklist.json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"]
}

// config.json5
{
  "ranked_match": {
    "levelMatch": 50  // Forçar Lv50
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

### Formato VGC
```json5
// blacklist.json5
{
  "restricted_label_limits": {
    "restricted": 2  // Máx. 2 Pokémon restritos
  },
  "black_list_labels": ["mythical"]
}

// config.json5
{
  "battle_clauses": {
    "item_clause": true  // Sem itens duplicados
  }
}
```

---

## Suporte

- **Perguntas:** [Discord](https://discord.gg/VVVvBTqqyP) #feedback
- **FAQ:** [Perguntas Frequentes](support/faq.md)
- **Problemas:** [Guia de Solução de Problemas](support/troubleshooting.md)

---

## Próximos Passos

### Para Novos Admins de Servidor
1. **[Instalar CobbleRanked](getting-started/installation.md)** - Comece a funcionar em 5 minutos
2. **[Guia de Início Rápido](getting-started/quick-start.md)** - Configure sua primeira arena e restrições
3. **[Referência de Comandos](getting-started/commands.md)** - Aprenda comandos admin essenciais

### Para Admins Experientes
1. **[Configuração Principal](configuration/config.md)** - Ajuste fino de Elo, temporadas e matchmaking
2. **[Configuração de Lista Negra](configuration/blacklist.md)** - Configure conjuntos de regras competitivos (Smogon, VGC)
3. **[Configuração Multi-Servidor](advanced/cross-server.md)** - Escale através de múltiplos servidores

### Para Servidores Competitivos
1. **[Sistema Elo](features/elo-system.md)** - Entenda cálculos e modos de classificação
2. **[Gerenciamento de Temporadas](features/seasons.md)** - Configure temporadas competitivas e recompensas
3. **[Sistema de Recompensas](configuration/rewards.md)** - Configure recompensas de fim de temporada e marcos

---

## Páginas Relacionadas
- [Glossário](GLOSSARY.md) - Termos e conceitos técnicos
- [FAQ](support/faq.md) - Perguntas e respostas comuns
- [Solução de Problemas](support/troubleshooting.md) - Guia de resolução de problemas
