# Comandos

---
**CobbleRanked** > **Começando** > **Comandos**
---

Todos os comandos disponíveis no CobbleRanked.

## Comandos de Jogador

**Permissão:** Nenhuma necessária

### `/ranked`

Abre a GUI ranqueada para fila, estatísticas e tabelas de classificação.

> **[📸 IMAGEM NECESSÁRIA: Exemplo de exibição da GUI ao executar comando /ranked]**

### `/season`

Mostra informações da temporada atual (nome, status, tempo restante).

> **[📸 IMAGEM NECESSÁRIA: Resultado da execução do comando /season (nome da temporada, data de início, data de término, tempo restante)]**

## Comandos Admin

**Permissão:** Nível OP 2 necessário

### Sistema

**`/rankedadmin reload`** - Recarrega todas as configurações (exceto modo multi-servidor)

### Gerenciamento de Arena

**`/rankedadmin setArena <nome> <pos1|pos2>`** - Define posições de cantos da arena
- Fique no local e execute o comando
- Exemplo: `/rankedadmin setArena arena1 pos1`

**`/rankedadmin setexit`** - Define local de saída do jogador após batalhas
- Fique no local de saída desejado e execute o comando

**`/rankedadmin teleportArena <arena>`** - Teleporta para o centro da arena

**`/rankedadmin arena status`** - Mostra todas as arenas e seu status de uso

> **[📸 IMAGEM NECESSÁRIA: Resultado da execução do comando /rankedadmin arena status (lista de arenas e status de uso)]**

**`/rankedadmin arena enable <arena>`** - Ativa uma arena

**`/rankedadmin arena disable <arena>`** - Desativa uma arena

### Gerenciamento de Elo de Jogador

**`/rankedadmin setelo <quantidade> <jogador> <formato>`** - Define o Elo do jogador
- Formato: `SINGLES`, `DOUBLES`, `TRIPLES`, `MULTI`
- Exemplo: `/rankedadmin setelo 1500 Jogador123 SINGLES`

**`/rankedadmin addelo <quantidade> <jogador> <formato>`** - Adiciona pontos Elo

**`/rankedadmin removeelo <quantidade> <jogador> <formato>`** - Remove pontos Elo

**`/rankedadmin setflee <jogador> <quantidade>`** - Define contagem de fugas
- Use `0` para limpar penalidade de fuga

### Gerenciamento de Temporada

**Apenas servidor de batalha** - Estes comandos funcionam apenas no servidor configurado como servidor de batalha (`cross_server.battle_server: ""`).

**`/rankedadmin season info`** - Mostra detalhes da temporada atual

**`/rankedadmin season history [limite]`** - Mostra temporadas passadas (padrão: 5)

**`/rankedadmin season create <dias> <nome>`** - Cria nova temporada
- Termina automaticamente a temporada atual
- Exemplo: `/rankedadmin season create 30 "Temporada 2 - Copa de Verão"`

**`/rankedadmin season rotate`** - Força rotação de temporada (inicia próxima temporada)

**`/rankedadmin season end`** - Termina temporada atual imediatamente

**`/rankedadmin season setend <minutos>`** - Define hora de término da temporada a partir de agora

**`/rankedadmin season rename <nome>`** - Renomeia temporada atual

## Completação de Tab

Todos os comandos têm completação de tab inteligente:

- Nomes de arena auto-completam a partir de arenas configuradas
- Nomes de jogadores mostram jogadores online
- Formatos sugerem opções válidas (SINGLES, DOUBLES, etc.)
- Quantidades de Elo sugerem valores comuns (1000, 1200, 1500)
- Durações de temporada sugerem períodos comuns (7, 14, 30 dias)

## Nós de Permissão

Com LuckPerms instalado, você pode usar estes nós de permissão:

- `cobbleranked.command.ranked` - Comando /ranked
- `cobbleranked.command.season` - Comando /season
- `cobbleranked.command.admin.*` - Todos os comandos admin
- `cobbleranked.command.admin.reload` - Comando reload
- `cobbleranked.command.admin.arena` - Comandos de arena
- `cobbleranked.command.admin.elo` - Gerenciamento de Elo
- `cobbleranked.command.admin.season` - Gerenciamento de temporada

**Nota:** O sistema de permissões usa verificações de nível OP 2 por padrão se o LuckPerms não estiver instalado.

---

## Próximos Passos

### Para Novos Admins
1. **[Guia de Início Rápido](quick-start.md)** - Pratique comandos com sua primeira configuração
2. **[Configuração de Arena](../configuration/arenas.md)** - Use comandos de arena efetivamente
3. **[Gerenciamento de Temporadas](../features/seasons.md)** - Entenda comandos de rotação de temporada

### Para Gerenciamento de Jogador
1. **[Sistema Elo](../features/elo-system.md)** - Aprenda quando ajustar Elo de jogador
2. **[Penalidades de Desconexão](../features/disconnect-penalties.md)** - Gerencie contagens de fuga
3. **[Sistema de Recompensas](../configuration/rewards.md)** - Configure recompensas baseadas em comandos

---

## Páginas Relacionadas
- [Configuração Principal](../configuration/config.md) - Configurações com as quais os comandos interagem
- [Início Rápido](quick-start.md) - Exemplos práticos de uso de comandos
- [FAQ](../support/faq.md) - Perguntas comuns sobre comandos
