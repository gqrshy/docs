# Batalhas Ranqueadas

---
**CobbleRanked** > **Recursos** > **Batalhas Ranqueadas**
---

Aprenda como funcionam as batalhas ranqueadas no CobbleRanked.

## Visão Geral

Batalhas ranqueadas são batalhas competitivas de Pokémon onde jogadores competem por rating Elo e posições no ranking. CobbleRanked gerencia todo o fluxo de batalha desde a fila até os resultados.

> **[📸 IMAGEM NECESSÁRIA: Fluxograma de batalha (entrada na fila→matchmaking→validação→teletransporte→batalha→processamento de resultados→recompensas)]**

## Fluxo de Batalha

### 1. Fase de Fila

**Jogador entra na fila:**
1. Abre GUI ranqueada (`/ranked`)
2. Seleciona formato de batalha (Singles ou Doubles)
3. Clica no botão de fila
4. Entra no pool de matchmaking

**Status da fila:**
- Na fila: Procurando oponente
- Tempo de espera exibido
- Pode sair da fila a qualquer momento

### 2. Matchmaking

**Emparelhamento automatizado:**
- Jogadores pareados por faixa de Elo
- Mesmo formato de batalha necessário
- Faixa expande com o tempo se nenhuma partida for encontrada

**Critérios de matchmaking:**
1. **Mesmo formato:** Ambos jogadores na fila para mesmo formato (Singles ou Doubles)
2. **Faixa de Elo:** Dentro da faixa configurada (padrão ±200, expande com o tempo)
3. **Grupo válido:** Ambos jogadores têm equipes Pokémon válidas

**Exemplo:**
```
Jogador A: 1000 Elo, fila Singles
Jogador B: 1050 Elo, fila Singles
Resultado: Partida encontrada! (dentro da faixa de 200 Elo)
```

### 3. Validação Pré-Batalha

Antes da batalha começar, ambas as equipes são validadas:

**Verificações de validação:**
- ✅ Tamanho de equipe corresponde aos requisitos (padrão: 6)
- ✅ Sem Pokémon banidos (blacklist)
- ✅ Sem movimentos banidos
- ✅ Sem habilidades banidas
- ✅ Sem itens banidos
- ✅ Requisitos especiais de formato (se habilitado)

**Se a validação falhar:**
- Jogador removido da fila
- Mensagem de erro exibida com razão
- Outro jogador retorna à fila

### 4. Teletransporte

**Seleção de arena:**
1. Arena aleatória selecionada da configuração
2. Ambos jogadores teletransportam simultaneamente
3. Localização anterior salva para retorno

**Recursos de teletransporte:**
- Funciona através de dimensões (Overworld, Nether, End, personalizada)
- Preserva inventário e efeitos
- Teletransporte instantâneo (sem tela de carregamento)

### 5. Início da Batalha

**Inicialização da batalha:**
1. Jogadores se encaram
2. GUI de batalha aparece
3. Equipes Pokémon carregadas
4. Batalha começa!

**Configurações de batalha:**
- Cap de nível forçado (se configurado)
- Limite de turnos ativo (padrão: 100 turnos)
- Formato de batalha aplicado
- Cláusulas habilitadas

### 6. Fase de Batalha

**Durante a batalha:**
- Mecânicas de batalha padrão Cobblemon
- Combate baseado em turnos
- Seleção de movimento
- Mecânicas de troca
- Uso de item (se permitido)

**Mecânicas especiais:**
- Terastalização (se habilitada)
- Mega Evolução (se habilitada)
- Movimentos Z (se habilitados)
- Dynamax (se habilitado)

**Rastreamento de batalha:**
- Contador de turnos
- Tempo de batalha
- Formato registrado
- Ações de jogadores registradas

### 7. Fim da Batalha

**Resultados possíveis:**

| Resultado | Descrição | Mudança de Elo |
|---------|-------------|------------|
| **Vitória** | Todos os Pokémon do oponente desmaiados | Vencedor ganha, perdedor perde |
| **Derrota** | Todos os seus Pokémon desmaiados | Perdedor perde, vencedor ganha |
| **Rendição** | Jogador rendeu manualmente | Conta como derrota |
| **Desconexão** | Jogador desconectou durante batalha | Contagem de fuga +1, conta como derrota |
| **Empate** | Limite de turnos alcançado | Sem mudança de Elo |

### 8. Processamento de Resultados

**Após fim da batalha:**

1. **Cálculo de Elo:**
   - Vencedor ganha Elo
   - Perdedor perde Elo
   - Quantidade baseada na configuração do sistema Elo

2. **Atualização de estatísticas:**
   - Vitórias/derrotas incrementadas
   - Taxa de vitória recalculada
   - Contagem de fuga atualizada (se desconexão)
   - Estatísticas específicas de formato atualizadas

3. **Salvamento em banco de dados:**
   - Estatísticas de jogador persistidas
   - Histórico de batalha registrado
   - Ranking atualizado

4. **Teletransporte de retorno:**
   - Jogadores retornam à localização anterior
   - Inventário restaurado
   - Efeitos preservados

### 9. Recompensas

**Recompensas pós-batalha:**

**Recompensas de marcos** (se configurado):
- 10 vitórias
- 25 vitórias
- 50 vitórias
- 100 vitórias

**Notificação:**
Jogadores recebem mensagens sobre:
- Mudança de Elo
- Nova posição de rank
- Recompensas de marcos (se desbloqueadas)

## Formatos de Batalha

CobbleRanked suporta múltiplos formatos de batalha com rankings independentes para formatos Singles, Doubles, Triples, Multi e Random Battle.

Cada formato de batalha tem:
- **Ratings Elo separados**
- **Rankings independentes**
- **Estatísticas específicas de formato** (vitórias, derrotas, partidas)
- **Filas separadas**

**Vencer em Singles não afeta seu Elo de Doubles.**

### Formatos Disponíveis

#### Formatos Competitivos

| Formato | Descrição | Tamanho de Equipe | Tamanho de Grupo | Ranqueado |
|--------|-------------|-----------|------------|--------|
| **SINGLES** | Batalhas 1v1 | 3-6 Pokémon | 1 jogador | ✅ |
| **DOUBLES** | Batalhas 2v2 | 4-6 Pokémon | 1 jogador | ✅ |
| **TRIPLES** | Batalhas 3v3 | 5-6 Pokémon | 1 jogador | ✅ |
| **MULTI** | Batalhas de equipe 2v2 | 1-3 Pokémon cada | 2 jogadores | ✅ |

#### Formatos de Batalha Aleatória

| Formato | Descrição | Tamanho de Equipe | Geração | Ranqueado |
|--------|-------------|-----------|------------|--------|
| **RANDOM_SINGLES** | 1v1 aleatório | 6 Pokémon (auto) | Baseado em pool | ✅ |
| **RANDOM_DOUBLES** | 2v2 aleatório | 6 Pokémon (auto) | Baseado em pool | ✅ |
| **RANDOM_3V3** | Aleatório rápido | 3 Pokémon (auto) | Baseado em pool | ✅ |

### Singles

Batalhas Pokémon tradicionais 1v1.

**Regras:**
- Traga 3-6 Pokémon
- Formato 1v1
- Selecione Pokémon líder antes da batalha

**Exemplo:** Jogador A vs Jogador B (solo)

### Doubles

1 jogador controla 2 Pokémon simultaneamente.

**Regras:**
- Traga 4-6 Pokémon
- Ambos Pokémon em campo ao mesmo tempo
- Selecione 2 líderes antes da batalha

**Exemplo:** Jogador A (2 Pokémon) vs Jogador B (2 Pokémon)

### Multi (2v2 Singles)

Batalhas de equipe - 2 jogadores vs 2 jogadores.

**Regras:**
- Cada jogador traz 1-3 Pokémon
- Parceiros devem estar no mesmo grupo
- Ambos jogadores selecionam líderes

**Exemplo:** Grupo (Jogador A + Jogador B) vs Grupo (Jogador C + Jogador D)

#### Como Entrar na Fila para Multi

1. Forme grupo com parceiro
2. Ambos jogadores abrem GUI `/ranked`
3. Selecione formato "Multi"
4. Ambos devem clicar em fila

**Matchmaking:** Sistema emparelha dois grupos com Elo combinado similar.

### Seleção de Formato

Jogadores escolhem formato antes de entrar na fila:

1. Abrir GUI `/ranked`
2. Clicar em seleção de formato (Singles/Doubles/Multi)
3. Clicar em "Entrar na Fila"

### Estatísticas Independentes

Cada formato rastreia separadamente:

| Estatística | Por Formato |
|------|-----------|
| Rating Elo | ✅ |
| Vitórias | ✅ |
| Derrotas | ✅ |
| Sequência de Vitórias | ✅ |
| Total de Partidas | ✅ |

**Exemplo:**
- Singles: 1500 Elo, 50 vitórias, 30 derrotas
- Doubles: 1000 Elo, 5 vitórias, 5 derrotas
- Multi: 1200 Elo, 20 vitórias, 15 derrotas

### Rankings de Formato

Cada formato tem um ranking separado.

**Acesso:**
1. GUI `/ranked`
2. Clicar em "Rankings"
3. Selecionar formato

**Exibição:**
- Melhores jogadores por Elo
- Rankings específicos de formato
- Filtrar por Singles/Doubles/Multi

### Recompensas Específicas de Formato

Recompensas de temporada e marcos podem ser específicas de formato.

**Exemplo:**
```json5
{
  "season_rewards": {
    "singles": { /* Recompensas de Singles */ },
    "doubles": { /* Recompensas de Doubles */ }
  }
}
```

Jogadores podem ganhar recompensas em **todos os formatos**.

Veja [Sistema de Recompensas](../configuration/rewards.md) para configuração.

### Configuração de Tamanho de Equipe

Configure limites de tamanho de equipe por formato em `config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,
      "max_team_size": 3
    }
  }
}
```

### Solução de Problemas de Formato

**Não consegue entrar na fila para Multi?**
- Verifique grupo formado (2 jogadores)
- Ambos jogadores devem ter Pokémon suficientes
- Verifique se ambos selecionaram mesmo formato

**Estatísticas não rastreando corretamente?**
- Verifique jogando formato correto
- Verifique formato no ranking
- Estatísticas são independentes de formato

**Matchmaking lento para formato específico?**
- Doubles/Multi têm pools de jogadores menores
- Veja [Matchmaking Dinâmico](dynamic-matchmaking.md)

## Tratamento de Desconexão

### Desconexão Intencional (Rage Quit)

**Detecção:**
- Jogador fecha jogo durante batalha
- Cliente desconecta do servidor
- Botão de rendição não usado

**Penalidade:**
- Contagem de fuga +1
- Conta como derrota
- Penalidade de Elo aplicada
- Oponente vence automaticamente

**Rastreamento de contagem de fuga:**
- Visível nas estatísticas do jogador
- Nunca diminui automaticamente
- Admin pode resetar: `/rankedadmin flee reset <player>`

### Desconexão Não Intencional (Crash/Internet)

**Mesma penalidade:**
- CobbleRanked não pode distinguir intencional vs não intencional
- Todas desconexões tratadas da mesma forma
- Previne abuso

**Proteção:**
- Admin pode resetar manualmente contagem de fuga para crashes legítimos
- Elo pode ser ajustado manualmente: `/rankedadmin elo add <player> <amount>`

### Problemas de Conexão

**Antes da batalha começar:**
- Jogador removido da fila
- Sem penalidade
- Pode reentrar na fila

**Durante batalha:**
- Tratado como desconexão
- Contagem de fuga incrementada
- Oponente vence

## Condições de Empate

### Limite de Turnos Alcançado

**Gatilho:** Batalha alcança turnos máximos (padrão: 100)

**Resultado:**
- Batalha termina em empate
- Sem mudança de Elo para nenhum jogador
- Não conta como vitória ou derrota
- Sem penalidade de contagem de fuga

**Configuração:**
```json5
"battle": {
  "maxTurns": 100  // Aumentar para batalhas mais longas
}
```

### Ambos Jogadores Desconectam

**Cenário raro:** Ambos jogadores desconectam simultaneamente

**Resultado:**
- Batalha cancelada
- Sem mudança de Elo
- Sem atualização de estatísticas
- Sem penalidade

## Casos Especiais

### Equipe Inválida Durante Batalha

**Cenário:** Equipe se torna inválida durante batalha (ex: Pokémon banido obtido via hack)

**Resultado:**
- Batalha termina imediatamente
- Jogador com equipe inválida perde
- Oponente vence
- Aviso severo emitido

### Problemas de Arena

**Cenário:** Mundo da arena descarrega ou se torna inválido durante batalha

**Resultado:**
- Batalha continua (instância de batalha é separada)
- Teletransporte de retorno usa localização de fallback (spawn)
- Erro registrado para revisão de admin

### Crash de Servidor

**Cenário:** Servidor crasha durante batalha

**Resultado:**
- Batalha cancelada na reinicialização
- Sem mudança de Elo
- Sem atualização de estatísticas
- Jogadores retornam à localização anterior

## Estatísticas de Batalha

### Rastreado Por Formato

- **Total de batalhas:** Vitórias + derrotas
- **Taxa de vitória:** Vitórias / (vitórias + derrotas) * 100%
- **Elo atual:** Rating em tempo real
- **Elo pico:** Elo mais alto alcançado (recurso futuro)
- **Contagem de fuga:** Penalidades de desconexão

### Estatísticas Globais

- **Total de batalhas:** Soma através de todos os formatos
- **Formato favorito:** Mais jogado
- **Melhor formato:** Elo mais alto
- **Taxa de vitória geral:** Taxa de vitória combinada

## Recursos Competitivos

### Escalonamento de Nível

**Forçar cap de nível:**
```json5
"battle": {
  "levelMatch": 70,        // Todos Pokémon se tornam nível 70
  "forceLevelCap": true    // Forçar escalonamento
}
```

**Benefícios:**
- Competição justa
- Sem vantagem de grinding
- Batalhas baseadas em habilidade

### Requisito de Treinador Original

**Prevenir equipes trocadas:**
```json5
"competitive": {
  "requireOriginalTrainer": true  // Deve ser TO
}
```

**Efeito:**
- Jogador deve ser treinador original de todos os Pokémon
- Previne comprar/trocar por equipes perfeitas
- Encoraja captura/reprodução legítima

### Aplicação de Tamanho de Equipe

**Tamanho fixo de grupo:**
```json5
"competitive": {
  "teamSize": 6  // Deve ter exatamente 6 Pokémon
}
```

**Justificativa:**
- Formato competitivo padrão
- Previne vantagens injustas
- Consistente com torneios oficiais

## Comandos de Batalha

### Durante Batalha

Nenhum comando especial necessário - use UI de batalha padrão Cobblemon:
- Clicar movimentos para atacar
- Clicar Pokémon para trocar
- Usar itens (se permitido)
- Botão de rendição para render

### Pré-Batalha

Comandos antes da batalha começar:

```bash
/ranked              # Abrir GUI
/queue join singles  # Entrar na fila
/queue leave         # Sair da fila
```

### Pós-Batalha

Comandos após batalha:

```bash
/stats               # Ver suas estatísticas
/leaderboard        # Verificar ranking
/elo                # Verificar seu Elo
```

## Solução de Problemas

### Batalha não começando

**Sintoma:** Pareado mas batalha não começa

**Causas:**
- Equipe Pokémon inválida
- Violação de blacklist
- Erro de configuração de arena

**Solução:**
1. Verificar mensagem de validação de blacklist
2. Verificar arena existe: `/rankedadmin arena list`
3. Verificar console para erros

### Elo não atualizando

**Sintoma:** Batalha termina mas Elo inalterado

**Causas:**
- Empate (limite de turnos)
- Erro de conexão de banco de dados
- Erro de configuração do sistema Elo

**Solução:**
1. Verificar se batalha terminou em empate
2. Verificar conexão de banco de dados
3. Verificar console para erros

### Teletransporte de retorno falhou

**Sintoma:** Jogador preso na arena após batalha

**Causas:**
- Mundo anterior descarregado
- Coordenadas inválidas
- Erro de dimensão

**Solução:**
1. Teletransportar jogador manualmente: `/tp <player> <x> <y> <z>`
2. Verificar `logs/latest.log` para erros de teletransporte
3. Verificar configuração de arena

---

## Próximos Passos

### Para Entender Fluxo de Batalha
1. **[Sistema de Rating Elo](elo-system.md)** - Aprenda como ratings são calculados
2. **[Matchmaking Dinâmico](elo-system.md#dynamic-matchmaking)** - Entender expansão de fila
3. **[Penalidades de Desconexão](disconnect-penalties.md)** - Sistema de contagem de fuga explicado

### Para Configuração
1. **[Configuração de Blacklist](../configuration/blacklist.md)** - Configurar restrições de Pokémon
2. **[Cláusulas de Batalha](../configuration/config.md#battle-clauses)** - Habilitar regras competitivas
3. **[Requisitos de Tamanho de Equipe](../configuration/config.md#ranked-match)** - Personalizar tamanhos de equipe

### Para Jogo Competitivo
1. **[Sistema de Temporadas](seasons.md)** - Períodos competitivos e rotação
2. **[Rankings](leaderboards.md)** - Rankings e melhores jogadores
3. **[Recompensas](../configuration/rewards.md)** - Configuração de prêmios

---

## Páginas Relacionadas
- [Guia de Início Rápido](../getting-started/quick-start.md) - Sua primeira batalha ranqueada
- [Referência de Comandos](../getting-started/commands.md) - Comandos de gerenciamento de batalha
- [Solução de Problemas](../support/troubleshooting.md#battle-issues) - Problemas comuns de batalha
