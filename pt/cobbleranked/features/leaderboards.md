# Rankings

---
**CobbleRanked** > **Recursos** > **Rankings**
---

Visualize jogadores top ranqueados por rating Elo.

## Recursos

- Específico de formato (Singles, Doubles separados)
- Atualizações em tempo real após batalhas
- Top 10 jogadores exibidos
- Acesso via GUI ou comando

## Visualizando Rankings

### Via Comando

```bash
/leaderboard singles
/leaderboard doubles
```

### Via GUI

1. Abrir menu ranqueado: `/ranked`
2. Clicar no botão "Ranking"
3. Selecionar formato (Singles/Doubles)

## Exibição de Ranking

Mostra para cada jogador:
- Posição de rank (#1, #2, etc.)
- Nome do jogador
- Rating Elo atual
- Registro de Vitórias/Derrotas

Exemplo:
```
1. PlayerA - 1847 Elo (25V - 10D)
2. PlayerB - 1726 Elo (30V - 15D)
3. PlayerC - 1689 Elo (28V - 14D)
```

> **[📸 IMAGEM NECESSÁRIA: Tela de exibição de ranking (Top 10 jogadores no ranking, Elo, registro de vitórias/derrotas exibido em GUI)]**

## Critérios de Classificação

Jogadores são classificados por:
1. **Rating Elo** (primário)
2. **Contagem de vitórias** (desempate)
3. **Data de entrada** (desempate secundário)

## Configuração

**Arquivo:** `config/cobbleranked/config.json5`

```json5
{
  "leaderboard": {
    "display_size": 10,          // Top N jogadores mostrados
    "min_battles": 5,            // Batalhas mínimas para aparecer
    "update_interval": 60        // Frequência de atualização (segundos)
  }
}
```

## Rankings Cross-Server

No modo cross-server, rankings mostram todos os jogadores através da rede (banco de dados compartilhado).

## Resetando Rankings

Rankings resetam automaticamente quando uma nova temporada começa. Para resetar manualmente:

```bash
/rankedarena season create <days> <name>
```

## Solução de Problemas

**Ranking não atualizando:**
- Espere até 60 segundos para atualização de cache
- Verifique se jogador tem batalhas mínimas (padrão: 5)

**Jogador faltando no ranking:**
- Verifique jogador jogou pelo menos `min_battles` partidas
- Verifique Elo do jogador está acima de 0

---

## Próximos Passos

### Para Exibição
1. **[Integração PlaceholderAPI](../integration/placeholders.md)** - Mostrar rankings em hologramas
2. **[Personalização de GUI](../configuration/gui.md)** - Personalizar interface de ranking
3. **[Comandos de Visualização](../getting-started/commands.md#player-commands)** - Acessar rankings

### Para Entender Rankings
1. **[Sistema Elo](elo-system.md)** - Como ratings determinam ranks
2. **[Formatos de Batalha](ranked-battles.md#format-specific-rewards)** - Rankings específicos de formato
3. **[Sistema de Temporadas](seasons.md)** - Resets de ranking

### Para Servidores Competitivos
1. **[Configuração de Recompensas](../configuration/rewards.md)** - Premiar jogadores top ranqueados
2. **[Rankings Cross-Server](../advanced/cross-server.md)** - Rankings em toda a rede
3. **[Otimização de Banco de Dados](../advanced/database.md)** - Desempenho para grandes bases de jogadores

---

## Páginas Relacionadas
- [Sistema Elo](elo-system.md) - Cálculos de rating
- [Temporadas](seasons.md) - Períodos competitivos e resets
- [API Placeholder](../integration/placeholders.md) - Exibir rankings externamente
