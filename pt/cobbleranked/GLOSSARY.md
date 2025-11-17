# Glossário

Termos técnicos e conceitos usados na documentação do CobbleRanked.

---

## Sistemas de Classificação

### Classificação Elo
Um sistema numérico de ranking de habilidade que calcula a força do jogador com base nos resultados das partidas. No CobbleRanked, os jogadores começam com 1000 Elo por padrão.

**Relacionado:** [Sistema Elo](features/elo-system.md)

### Fator-K
Um coeficiente que determina quanto o Elo muda por partida. Fator-K maior = mudanças de classificação mais rápidas.
- Novos jogadores (< 10 partidas): K = 64
- Jogadores estabelecidos: K = 32

**Relacionado:** [Configuração do Sistema Elo](configuration/config.md#elo-system)

### RD (Desvio de Classificação)
No sistema Glicko-2, representa a incerteza na classificação de um jogador. RD maior = classificação menos certa.
- Novos jogadores: RD = 350
- Jogadores experientes: RD ≈ 50-100
- Aumenta quando inativo

**Relacionado:** [Modo Glicko-2](features/elo-system.md#glicko-2-advanced)

### Partidas Provisórias
As primeiras 10 partidas para novos jogadores onde o Elo muda mais drasticamente (Fator-K duplicado).

**Relacionado:** [Guia de Fator-K](features/elo-system.md#k-factor-guide-pokemon-showdown-mode)

### Decaimento de Elo
Sistema que reduz o Elo de jogadores inativos ao longo do tempo para evitar estagnação da classificação.
- Padrão: -2 Elo por dia após inatividade
- Executa diariamente às 9:00 UTC

**Relacionado:** [Configuração de Decaimento de Elo](features/elo-system.md#elo-decay)

---

## Sistema de Batalha

### Cláusulas de Batalha
Regras aplicadas para garantir batalhas competitivas justas:

#### Cláusula de Espécie
Previne Pokémon duplicados no mesmo time (padrão: ativado).

#### Cláusula OHKO
Bane movimentos de nocaute em um golpe como Fissure, Sheer Cold (padrão: ativado).

#### Cláusula de Sono
Previne colocar 2+ Pokémon oponentes para dormir simultaneamente (padrão: ativado).

#### Cláusula de Evasão
Bane movimentos que aumentam evasão (Minimize, Double Team) (padrão: ativado).

#### Cláusula de Item
Previne itens segurados duplicados no mesmo time (padrão: desativado).

#### Cláusula Dynamax
Bane Dynamax/Gigantamax (padrão: ativado).

**Relacionado:** [Formatos de Batalha](features/ranked-battles.md#battle-clauses)

### Movimentos OHKO
Movimentos de Nocaute em Um Golpe que ignoram o cálculo normal de dano:
- Fissure
- Sheer Cold
- Horn Drill
- Guillotine

**Relacionado:** [Configuração de Lista Negra](configuration/blacklist.md)

### Formatos de Batalha

#### Singles (1v1)
- Time: 3-6 Pokémon
- Ativos: 1 vs 1
- Ranking Elo independente

#### Doubles (2v2)
- Time: 4-6 Pokémon
- Ativos: 2 vs 2
- Formato estilo VGC
- Ranking Elo independente

#### Batalha Multi (Times 2v2)
- Time: 1-3 Pokémon por jogador
- Ativos: 2 vs 2
- Compartilha Elo com membros do grupo

**Relacionado:** [Formatos de Batalha](features/ranked-battles.md)

---

## Sistemas de Servidor

### Arena
Um local de batalha designado com coordenadas salvas e direção de visão. Os jogadores são teleportados para arenas quando as partidas começam.

**Comando:** `/rankedadmin arena set <nome>`

**Relacionado:** [Configuração de Arena](configuration/arenas.md)

### Penalidade de Fuga
Banimento temporário de matchmaking por abandonar batalhas:
- 1-5 fugas: banimento de 5 min
- 6-10 fugas: banimento de 15 min
- 11+ fugas: banimento de 30 min
- Decaimento: -1 fuga a cada 24 horas

**Relacionado:** [Penalidades de Desconexão](features/disconnect-penalties.md)

### Multi-Servidor
Arquitetura multi-servidor compartilhando rankings pela rede:
- Requer: MySQL/MongoDB + Redis
- Separa servidores de lobby dos servidores de batalha
- Sincroniza Elo em tempo real

**Relacionado:** [Configuração Multi-Servidor](advanced/cross-server.md)

### Faixa de Matchmaking
A diferença de Elo permitida ao encontrar oponentes:
- Inicial: ±200 Elo
- Expande após 30 segundos
- Máximo: ±600 Elo (multiplicador 3.0x)

**Relacionado:** [Sistema Elo](features/elo-system.md)

---

## Configuração

### JSON5
Um formato JSON estendido que permite comentários (`//` e `/* */`). Todos os arquivos de configuração do CobbleRanked usam JSON5.

**Exemplo:**
```json5
{
  // Este é um comentário
  "initialElo": 1000,  // Vírgula final permitida
}
```

**Relacionado:** Todas as páginas de configuração

### Lista Negra
Sistema para restringir Pokémon, movimentos, habilidades e itens em batalhas ranqueadas.

**Categorias:**
- Rótulos de Pokémon (legendary, mythical, etc.)
- Pokémon específicos (Mewtwo, Rayquaza)
- Movimentos (Baton Pass, Last Respects)
- Habilidades (Moody, Shadow Tag)
- Itens (King's Rock, Berserk Gene)

**Relacionado:** [Configuração de Lista Negra](configuration/blacklist.md)

### Rótulo
Tags de categoria de Pokémon usadas para lista negra:
- `legendary` - Pokémon Lendários
- `mythical` - Pokémon Míticos
- `restricted` - Pokémon restritos VGC
- `ultra_beast` - Ultra Beasts
- `paradox` - Pokémon Paradoxo
- `sub_legendary` - Lendários menores

**Relacionado:** [Rótulos de Lista Negra](configuration/blacklist.md#label-categories)

### Limites de Rótulos Restritos
Restrições estilo VGC permitindo uso limitado em vez de banimento total.

**Exemplo:** Permitir máximo de 2 lendários restritos por time
```json5
{
  "restricted_label_limits": {
    "restricted": 2
  }
}
```

**Relacionado:** [Limites de Rótulos](configuration/blacklist.md#label-limits-vgc-style)

---

## Sistema de Temporadas

### Temporada
Período competitivo com tempo limitado (padrão: 30 dias) após o qual os rankings são resetados.

**Recursos:**
- Rotação automática
- Recompensas para os 3 melhores jogadores
- Reset de Elo para valor inicial
- Reset de estatísticas de vitórias/derrotas

**Relacionado:** [Temporadas](features/seasons.md)

### Recompensas de Temporada
Prêmios dados aos jogadores mais bem classificados ao final da temporada, configurados por formato (Singles/Doubles/Multi).

**Exemplo:**
```json5
{
  "rewards": {
    "1": ["give %player% diamond 64"],
    "2": ["give %player% emerald 48"],
    "3": ["give %player% gold_ingot 32"]
  }
}
```

**Relacionado:** [Configuração de Recompensas](configuration/rewards.md)

### Recompensas de Marco
Recompensas baseadas em conquistas por atingir marcos de contagem de vitórias ou Elo.

**Exemplo:**
```json5
{
  "win_milestones": {
    "10": ["give %player% rare_candy 5"],
    "50": ["give %player% master_ball 1"]
  }
}
```

**Relacionado:** [Recompensas de Marco](configuration/rewards.md#milestone-rewards)

---

## Termos Técnicos

### Redis
Armazenamento de dados em memória usado para comunicação multi-servidor em tempo real e sincronização de fila.

**Necessário para:** Configurações multi-servidor

**Relacionado:** [Configuração de Banco de Dados](advanced/database.md#redis-configuration)

### SQLite
Banco de dados incorporado padrão. Armazena estatísticas de jogadores, Elo e histórico de partidas localmente.

**Limitações:** Apenas servidor único (sem multi-servidor)

**Relacionado:** [Configuração de Banco de Dados](advanced/database.md)

### MySQL
Banco de dados relacional para configurações multi-servidor (recomendado para 2-5 servidores).

**Relacionado:** [Configuração de Banco de Dados](advanced/database.md#mysql)

### MongoDB
Banco de dados NoSQL para configurações multi-servidor (5+ servidores, amigável para nuvem).

**Relacionado:** [Configuração de Banco de Dados](advanced/database.md#mongodb)

### Velocity
Proxy moderno do Minecraft para conectar múltiplos servidores em uma rede.

**Necessário para:** Batalhas ranqueadas multi-servidor

**Relacionado:** [Configuração Multi-Servidor](advanced/cross-server.md)

---

## Sistemas de Jogador

### Fila
Sistema de busca de partidas que emparelha jogadores com base em Elo e preferência de formato.

**Comportamento:**
- Busca dentro da faixa de Elo
- Expande a faixa a cada 30 segundos
- Cancela automaticamente após atingir faixa máxima

**Relacionado:** [Batalhas Ranqueadas](features/ranked-battles.md)

### Tabela de Classificação
Rankings top 10 em tempo real por formato, atualizados após cada partida.

**Exibição:** GUI `/ranked` ou comandos no jogo

**Relacionado:** [Tabelas de Classificação](features/leaderboards.md)

### Temporizador de Turno
Limite de tempo opcional por turno para prevenir atrasos.

**Padrão:** Desativado (sem limite de tempo)

**Relacionado:** [Temporizador de Turno](features/turn-timer.md)

---

## Próximos Passos

### Para Aprender o Sistema
1. **[Sistema Elo](features/elo-system.md)** - Mergulho profundo em cálculos de classificação
2. **[Formatos de Batalha](features/ranked-battles.md)** - Entenda Singles, Doubles e Multi
3. **[Sistema de Temporadas](features/seasons.md)** - Aprenda como funcionam os períodos competitivos

### Para Configuração
1. **[Configuração Principal](configuration/config.md)** - Aplique termos do glossário às configurações reais
2. **[Configuração de Lista Negra](configuration/blacklist.md)** - Use rótulos e restrições
3. **[Configuração Multi-Servidor](advanced/cross-server.md)** - Implemente arquitetura distribuída

---

## Páginas Relacionadas
- [FAQ](support/faq.md) - Perguntas comuns respondidas
- [Solução de Problemas](support/troubleshooting.md) - Guia de resolução de problemas
- [README](README.md) - Visão geral do projeto e recursos
