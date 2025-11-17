# Perguntas Frequentes (FAQ)

---
**CobbleRanked** > **Suporte** > **FAQ**
---

Perguntas e respostas comuns sobre o CobbleRanked.

---

## Informações Básicas

<details>
<summary><strong>O que é o CobbleRanked?</strong></summary>

Um sistema de batalhas ranqueadas competitivas para servidores Cobblemon.

- Matchmaking baseado em Elo
- Batalhas Singles/Doubles
- Sistema de temporadas com recompensas
- Restrições de Pokémon/movimentos/habilidades/itens
- Suporte multi-servidor (opcional)

</details>

<details>
<summary><strong>Onde posso baixá-lo?</strong></summary>

**Oficial:** [Discord](https://discord.gg/VVVvBTqqyP) (atualmente o único canal de distribuição)

Modrinth/CurseForge em breve.

</details>

<details>
<summary><strong>Quais são os requisitos?</strong></summary>

- Minecraft 1.21.1
- Fabric Loader 0.17.2+
- Cobblemon 1.7.0+
- Fabric API 0.116.6+
- Fabric Language Kotlin 1.13.6+

</details>

<details>
<summary><strong>O multi-servidor é obrigatório?</strong></summary>

Não. O modo de servidor único funciona sem nenhuma configuração.

Multi-servidor só é necessário se você quiser compartilhar rankings entre múltiplos servidores.

</details>

---

## Instalação e Configuração

<details>
<summary><strong>Arquivos de configuração não estão sendo gerados</strong></summary>

1. Verifique se todas as dependências estão instaladas
2. Inicie o servidor completamente
3. Verifique `logs/latest.log` para erros

</details>

<details>
<summary><strong>Como altero o idioma?</strong></summary>

Edite `config/cobbleranked/config.json5`:

```json5
{
  "language": "pt-Br"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

Salve e execute `/rankedadmin reload`.

</details>

<details>
<summary><strong>Alterações de configuração não estão sendo aplicadas</strong></summary>

1. Confirme que o arquivo foi salvo
2. Execute `/rankedadmin reload`
3. Verifique a sintaxe JSON5 (vírgulas, colchetes)
4. Procure por `[CobbleRanked] Configuration loaded` nos logs do servidor

</details>

---

## Configuração de Blacklist

<details>
<summary><strong>Como encontro nomes de movimentos?</strong></summary>

Nomes de movimentos usam o formato **lowercase snake_case**.

| Nome de Exibição | Nome Interno |
|-----------------|--------------|
| Fissure | `fissure` |
| Sheer Cold | `sheer_cold` |
| Baton Pass | `baton_pass` |
| Last Respects | `last_respects` |
| Thunderbolt | `thunderbolt` |

**Padrão:** Substitua espaços por underscores, use minúsculas

</details>

<details>
<summary><strong>Como encontro nomes de habilidades?</strong></summary>

### Método In-Game

1. Pressione `F3 + H`
2. Abra a tela de resumo do Pokémon
3. Passe o mouse sobre o ícone da habilidade

### Habilidades Comuns

| Nome de Exibição | Nome Interno |
|-----------------|--------------|
| Intimidate | `intimidate` |
| Drought | `drought` |
| Moody | `moody` |
| Shadow Tag | `shadow_tag` |
| Arena Trap | `arena_trap` |
| Huge Power | `huge_power` |

</details>

<details>
<summary><strong>Como encontro IDs de itens?</strong></summary>

### Método Mais Fácil

1. Pressione `F3 + H`
2. Passe o mouse sobre o item no inventário
3. O ID aparece na parte inferior (ex: `cobblemon:bright_powder`)

### Usando Comandos

```
/give @s <TAB>
```

A tecla Tab mostra a lista de IDs de itens.

### Formato

Deve usar o formato `cobblemon:item_name`.

```
Correto: "cobblemon:bright_powder"
Errado: "Bright Powder", "brightpowder"
```

</details>

<details>
<summary><strong>Como banir formas específicas (Megas, etc.)?</strong></summary>

### Regras Básicas

- **Sem forma** (`mewtwo`): **Todas as formas** banidas
- **Com forma** (`mewtwo:mega_x`): **Apenas aquela forma** banida

### Exemplos

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // Normal + Mega X + Mega Y todos banidos
    "charizard:mega_x",  // Apenas Mega Charizard X banido (normal/Y permitidos)
    "weezing:galar",     // Apenas Weezing Galariano banido
    "muk:alola"          // Apenas Muk Alola banido
  ]
}
```

</details>

<details>
<summary><strong>Qual é a diferença entre limites de label e banimentos?</strong></summary>

### Limites de Label (Quantidade)

```json5
{
  "restricted_label_limits": {
    "legendary": 1  // Máximo de 1 lendário permitido
  }
}
```

### Banimento Completo

```json5
{
  "black_list_labels": ["legendary"]  // Nenhum lendário permitido
}
```

### Exemplo Combinado

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // Máximo de 1 lendário
  },
  "black_list_pokemon": [
    "mewtwo"             // Mas Mewtwo é completamente banido
  ]
}
```

</details>

<details>
<summary><strong>Exemplo de configuração para servidor casual</strong></summary>

Banir apenas movimentos OHKO, todo o resto permitido:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

</details>

<details>
<summary><strong>Exemplo de configuração para servidor competitivo</strong></summary>

Formato Smogon OU:

`config.json5`:
```json5
{
  "language": "pt-Br",
  "ranked_match": {
    "reset_days": 90,
    "levelMatch": 50,
    "turn_limit": 100
  },
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"
  }
}
```

`blacklist.json5`:
```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": ["baton_pass", "last_respects", "shed_tail"],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": ["cobblemon:bright_powder", "cobblemon:lax_incense"]
}
```

</details>

---

## Multi-Servidor

<details>
<summary><strong>Guia de configuração multi-servidor (MySQL)</strong></summary>

### 1. Criar Banco de Dados MySQL

```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 2. Configurar Todos os Servidores

**Servidor de Batalha:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Vazio = este é o servidor de batalha
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    }
  }
}
```

**Servidores Lobby/Principais:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",  // Altere por servidor
    "battle_server": "battle",
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    }
  }
}
```

**Detalhes:** [Guia Multi-Servidor](../advanced/cross-server.md)

</details>

<details>
<summary><strong>Instalação e configuração do Redis</strong></summary>

### Instalar (Ubuntu/Debian)

```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Permitir Acesso Remoto

`/etc/redis/redis.conf`:
```
bind 0.0.0.0
requirepass your_password
```

```bash
sudo systemctl restart redis-server
```

### Configurar Todos os Servidores

```json5
{
  "cross_server": {
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

### Testar Conexão

```bash
redis-cli -h localhost -p 6379 PING
# Resposta: PONG
```

</details>

<details>
<summary><strong>Matchmaking multi-servidor não está funcionando</strong></summary>

### Checklist

1. **Verificar conexão Redis:**
   ```bash
   redis-cli
   > KEYS cobbleranked:queue:*
   ```

2. **Verificar conexão MySQL:**
   ```sql
   SELECT * FROM player_ranked_stats;
   ```

3. **Verificar se server_id é único**

4. **Verificar configuração battle_server:**
   - Servidor de batalha: `battle_server: ""`
   - Outros: `battle_server: "battle"`

5. **Verificar se os nomes dos servidores Velocity correspondem**

</details>

<details>
<summary><strong>Jogadores não estão retornando após a batalha</strong></summary>

### Soluções

1. **Verificar nomes dos servidores Velocity**
   - `battle_server` deve corresponder exatamente ao nome em `velocity.toml`
   - Sensível a maiúsculas/minúsculas

2. **Verificar dados de origem no Redis:**
   ```bash
   redis-cli
   > GET player_origin:{UUID}
   ```

3. **Verificar logs:**
   - Procure por `[BATTLE-END] Transferring players back to: lobby1`

</details>

---

## Solução de Problemas

<details>
<summary><strong>Erros de permissão</strong></summary>

Comandos administrativos requerem OP:

```
/op SeuUsername
```

Ou conceda `cobbleranked.admin` via plugin de permissões

</details>

<details>
<summary><strong>Erro de conexão com banco de dados</strong></summary>

1. Verifique se MySQL está em execução:
   ```bash
   sudo systemctl status mysql
   ```

2. Verifique credenciais (usuário, senha)

3. Verifique se o banco de dados existe:
   ```bash
   mysql -u cobbleranked -p -e "SHOW DATABASES;"
   ```

4. Verifique se a porta 3306 está aberta

</details>

<details>
<summary><strong>Resetar Elo do jogador</strong></summary>

```
/rankedadmin setelo 1000 NomeDoJogador singles
/rankedadmin setelo 1000 NomeDoJogador doubles
```

</details>

<details>
<summary><strong>Encerrar temporada manualmente</strong></summary>

```
/rankedadmin season end
/rankedadmin season rotate
```

**Nota:** Para multi-servidor, execute apenas no servidor de batalha

</details>

---

## Solução de Problemas de Instalação

<details>
<summary><strong>Mod Não Está Carregando</strong></summary>

**Sintoma:** Nenhuma mensagem do CobbleRanked no console

**Solução:**
1. Verifique se todas as dependências estão em `mods/`:
   - Fabric API ✅
   - Cobblemon ✅
   - Fabric Language Kotlin ✅
2. Revise `logs/latest.log` para:
   - Erros de dependências faltando
   - Incompatibilidades de versão
   - Conflitos de mods

</details>

<details>
<summary><strong>Configuração Não Está Atualizando</strong></summary>

**Sintoma:** Alterações não se aplicam no jogo

**Solução:**
1. Salve o arquivo (Ctrl+S)
2. Execute `/rankedadmin reload`
3. Verifique erros de sintaxe JSON5:
   - Vírgulas faltando
   - Colchetes não fechados
   - Comentários inválidos

**Nota:** Configurações multi-servidor requerem reinicialização do servidor (não podem ser recarregadas)

</details>

<details>
<summary><strong>Falha na Conexão com Banco de Dados</strong></summary>

**Sintoma:** `Failed to connect to MySQL database`

**Solução:**
1. Verifique se MySQL está em execução:
   ```bash
   sudo systemctl status mysql
   ```
2. Teste credenciais:
   ```bash
   mysql -u cobbleranked -p -h localhost cobbleranked
   ```
3. Verifique firewall (porta 3306)

</details>

<details>
<summary><strong>Permissão Negada</strong></summary>

**Sintoma:** `You do not have permission to use this command`

**Solução:**
```
/op SeuUsername
```

Ou conceda `cobbleranked.admin` via LuckPerms/PermissionsEx

</details>

---

## Solução de Problemas de Configuração

<details>
<summary><strong>Configuração não está carregando?</strong></summary>

**Sintomas:**
- Alterações não têm efeito
- Valores padrão aparecem no jogo
- Opções de configuração faltando

**Soluções:**
- Verifique sintaxe JSON5 (vírgulas, colchetes)
- Procure por erros no console do servidor
- Verifique caminho do arquivo: `config/cobbleranked/config.json5`

</details>

<details>
<summary><strong>Alterações não estão sendo aplicadas?</strong></summary>

**Soluções:**
- Execute `/rankedadmin reload`
- Reinicie o servidor se reload falhar
- Verifique se o arquivo foi salvo após edição

</details>

<details>
<summary><strong>Multi-servidor não está funcionando?</strong></summary>

**Soluções:**
- Verifique conexão MySQL
- Teste Redis: `redis-cli PING`
- Verifique se todos os servidores usam o mesmo banco de dados

</details>

---

## Solução de Problemas de Arena

<details>
<summary><strong>Jogadores não estão sendo teleportados</strong></summary>

**Sintoma:** Partida encontrada mas jogadores ficam parados

**Solução:**
1. Verifique se arena existe: `/rankedadmin arena list`
2. Verifique se o mundo está carregado
3. Verifique console para erros
4. Teste arena: `/rankedadmin arena tp nome_arena`

</details>

<details>
<summary><strong>Erro de mundo inválido</strong></summary>

**Sintoma:** `World 'modname:dimension' does not exist`

**Solução:**
1. Verifique ortografia do ID da dimensão em `arenas.json5`
2. Certifique-se que o mod da dimensão está instalado
3. Use formato correto: `modname:dimension_name` (sem espaços)

</details>

<details>
<summary><strong>Jogadores aparecem em local errado</strong></summary>

**Sintoma:** Jogadores aparecem dentro de blocos ou caem

**Solução:**
1. Recrie arena: Fique no local correto, `/rankedadmin arena set nome_arena`
2. Verifique se coordenada Y está correta (nível do chão, não subterrâneo)
3. Verifique coordenadas em `arenas.json5` manualmente

</details>

<details>
<summary><strong>Arena não está na rotação</strong></summary>

**Sintoma:** Arena específica nunca é selecionada

**Solução:**
1. Verifique arena na lista: `/rankedadmin arena list`
2. Verifique se o mundo está carregado (arenas interdimensionais)
3. Recarregue configuração: `/rankedadmin reload`

</details>

<details>
<summary><strong>Coordenadas descentradas</strong></summary>

**Sintoma:** Jogadores aparecem na borda da arena

**Solução:**

Coordenadas salvam com decimais:
- Fique no centro exato
- Use coordenadas F3
- Edite manualmente `arenas.json5` para decimal `.5` (ex: `100.5` centraliza no bloco)

</details>

---

## Solução de Problemas Velocity & Multi-Servidor

<details>
<summary><strong>"If you wish to use IP forwarding, please enable it in your BungeeCord config as well!"</strong></summary>

**Problema:** Segredo do FabricProxy-Lite não corresponde ao segredo do Velocity

**Solução:**
1. Verifique `velocity.toml` → `[player-info-forwarding]` → `secret`
2. Verifique `config/fabricproxy-lite.toml` → `secret` em **todos os servidores**
3. Certifique-se que são **exatamente iguais** (sensível a maiúsculas/minúsculas)
4. Reinicie todos os servidores

</details>

<details>
<summary><strong>"Can't connect to server"</strong></summary>

**Problema:** Servidor backend não alcançável do Velocity

**Solução:**
1. Verifique IP/porta do servidor em `velocity.toml` → `[servers]`
2. Verifique se servidores backend estão em execução (`/list` no console)
3. Teste conexão: `telnet 127.0.0.1 25565`
4. Verifique regras de firewall

</details>

<details>
<summary><strong>"Disconnected: You are not authenticated with the proxy"</strong></summary>

**Problema:** Jogador conectando diretamente ao servidor backend em vez do proxy

**Solução:**
1. Certifique-se que jogadores conectam à porta do proxy (25577), não às portas backend
2. Defina `online-mode=false` em `server.properties` do backend
3. Configure firewall para bloquear conexões diretas (veja Passo 5)

</details>

<details>
<summary><strong>Jogadores travados após partida pronta</strong></summary>

**Problema:** CobbleRanked não consegue transferir jogadores para servidor de batalha

**Solução:**
1. Verifique se nome `battle_server` em `config/cobbleranked/config.json5` corresponde ao nome do servidor no Velocity
2. Verifique se plugin ProxyCommand está instalado no Velocity
3. Verifique se servidor de batalha está online e na configuração do Velocity
4. Revise logs do CobbleRanked para erros de transferência

</details>

<details>
<summary><strong>Jogadores não conseguem dar match</strong></summary>

**Verifique:**
- Todos os servidores usando mesmo banco de dados MySQL
- Todos os servidores usando mesmo número de banco de dados Redis
- Formato de fila corresponde (Singles vs Doubles)
- Verifique com: `redis-cli KEYS "*queue*"`

</details>

<details>
<summary><strong>Estatísticas não sincronizando</strong></summary>

**Verifique:**
- Todos os servidores usando mesmo host MySQL
- Verifique logs do servidor de batalha para erros de banco de dados
- Verifique conexão Redis em todos os servidores

</details>

<details>
<summary><strong>Transferência falha</strong></summary>

**Verifique:**
- Nome `battle_server` corresponde à configuração Velocity
- Velocity pode alcançar servidor de batalha
- Servidor de batalha está online

</details>

<details>
<summary><strong>Estatísticas não persistindo após 60s</strong></summary>

**Verifique:**
- Conexão de banco de dados do servidor de batalha
- Verifique logs para: `[Batch] Saved FormatStats`

</details>

---

## Solução de Problemas Placeholder API

<details>
<summary><strong>Placeholder Mostra Texto Bruto</strong></summary>

**Problema:**
```
Holograma exibe: %cobbleranked_top_1_name%
Em vez de: Notch
```

**Soluções para servidores Fabric:**

1. **Verifique se Text Placeholder API está instalado:**
   ```bash
   /mods list
   # Deve mostrar: text_placeholder_api ou placeholder-api
   ```

2. **Verifique se CobbleRanked está carregado:**
   ```bash
   /mods list
   # Deve mostrar: cobbleranked
   ```

3. **Teste placeholder manualmente:**
   ```bash
   /rankedplaceholder test %cobbleranked_top_1_name%
   ```

4. **Verifique se mod de holograma suporta Text Placeholder API:**
   - Verifique documentação do mod de holograma
   - A maioria dos mods de holograma Fabric suportam Text Placeholder API

**Soluções para servidores Híbridos (apenas Arclight):**

1. **Verifique se PlaceholderAPI está instalado:**
   ```bash
   /plugins
   # Deve mostrar: PlaceholderAPI (verde)
   ```

2. **Registre com PlaceholderAPI:**
   ```bash
   /papi reload
   /papi parse me %cobbleranked_top_1_name%
   ```

</details>

<details>
<summary><strong>Placeholder Retorna "N/A"</strong></summary>

**Problema:**
Todos os placeholders retornam "N/A" ou valores vazios.

**Causas possíveis:**

1. **Nenhum jogador jogou ranqueado ainda:**
   - Solução: Jogue pelo menos 1 partida ranqueada para popular leaderboard

2. **Banco de dados não inicializado:**
   ```bash
   # Verifique logs do servidor para:
   [CobbleRanked] Database initialized
   [CobbleRanked] Loaded X player stats
   ```

3. **Cache está desatualizado:**
   ```bash
   /rankedplaceholder clear
   ```

4. **Formato errado especificado:**
   ```bash
   # Se nenhum jogador jogou Singles:
   %cobbleranked_top_singles_1_name% → "N/A"

   # Mas combinado pode funcionar:
   %cobbleranked_top_1_name% → Mostra jogadores Doubles
   ```

</details>

<details>
<summary><strong>Placeholder Retorna Dados Antigos</strong></summary>

**Problema:**
Placeholder mostra estatísticas desatualizadas após uma partida.

**Soluções:**

1. **Aguarde expiração do cache (60 segundos):**
   - Atualização automática após 1 minuto

2. **Limpe cache manualmente:**
   ```bash
   /rankedplaceholder clear
   ```

3. **Verifique se resultados da partida foram salvos:**
   ```bash
   # Logs do servidor devem mostrar:
   [BattleResult] Saved stats for <jogador>
   ```

</details>

<details>
<summary><strong>Rank Alto Retorna "N/A" (ex: rank 50+)</strong></summary>

**Problema:**
```
%cobbleranked_top_50_name% → "N/A"
```

**Causa:**
Servidor tem menos de 50 jogadores com estatísticas ranqueadas.

**Solução:**
Este é o comportamento esperado. Use ranks mais baixos ou verifique total de jogadores:
```bash
/rankedplaceholder test %cobbleranked_top_10_name%
```

</details>

---

## Solução de Problemas do Sistema de Restrições

<details>
<summary><strong>Jogadores Ainda Podem Teleportar</strong></summary>

**Problema:** Jogadores podem usar /home ou /tp apesar das restrições

**Solução 1:** Verifique `blockedCommands` em `config.json5`:
```json5
{
  "blockedCommands": ["tp", "teleport", "home", "spawn", "warp"]
}
```

**Solução 2:** Defina `movement.teleport` como `true` em todos os três estados (queue, match_preparation, battle)

**Solução 3:** Defina `system.commands` como `true` para ativar a blacklist de comandos

</details>

<details>
<summary><strong>Jogadores Podem Trocar Times</strong></summary>

**Problema:** Jogadores trocam time de Pokémon durante preparação da partida

**Solução:** Defina estas flags como `true` nas seções `match_preparation` e `battle` de `restrictions.json5`:
```json5
{
  "system": { "pc_access": true },
  "inventory": {
    "ender_chest": true,
    "shulker_box": true
  }
}
```

</details>

<details>
<summary><strong>Jogadores Podem Escapar da Arena</strong></summary>

**Problema:** Jogadores arremessam pérolas do end ou comem frutas chorus para escapar da arena de batalha

**Solução:** Defina estas flags como `true` na seção `battle`:
```json5
{
  "item": {
    "use_ender_pearl": true,
    "use_chorus_fruit": true
  },
  "movement": {
    "ender_pearl": true,
    "chorus_fruit": true
  }
}
```

</details>

<details>
<summary><strong>Jogadores Podem Usar Comando /pc</strong></summary>

**Problema:** Jogadores podem abrir PC com comando `/pc`

**Solução:** Verifique se `/pc` está em `blockedCommands` em `config.json5`:
```json5
{
  "blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
}
```

E defina `system.commands` como `true` em `restrictions.json5`:
```json5
{
  "queue": {
    "system": { "commands": true }
  },
  "match_preparation": {
    "system": { "commands": true }
  },
  "battle": {
    "system": { "commands": true }
  }
}
```

**Nota:** `/pc` está incluído na configuração padrão desde a versão 1.0.0-hotfix12. Se estiver usando uma versão mais antiga:
1. Atualize para a versão mais recente do CobbleRanked
2. Delete `config/cobbleranked/config.json5`
3. Reinicie o servidor para regenerar com `/pc` incluído

Ou adicione manualmente `"pc"` à lista `blockedCommands`.

</details>

<details>
<summary><strong>Configuração de Restrição Não Está Carregando</strong></summary>

**Problema:** Alterações em `restrictions.json5` não têm efeito

**Solução:**
1. Verifique logs do servidor para erros de parsing JSON
2. Verifique sintaxe JSON5 (vírgulas finais são OK, mas verifique colchetes e aspas)
3. Execute `/rankedarena reload`
4. Reinicie servidor se reload não funcionar

**Erros de sintaxe comuns:**
```json5
// ❌ Errado: Vírgula faltando
{
  "teleport": true
  "respawn": false
}

// ✅ Correto:
{
  "teleport": true,
  "respawn": false
}
```

</details>

---

## Configuração de Arena

<details>
<summary><strong>Como configuro arenas?</strong></summary>

1. Fique no primeiro canto: `/rankedadmin setArena arena1 pos1`
2. Fique no canto oposto: `/rankedadmin setArena arena1 pos2`
3. Defina ponto de saída: `/rankedadmin setexit`
4. Teste: `/rankedadmin teleportArena arena1`

**Ambos pos1 e pos2 devem estar no mesmo mundo.**

</details>

<details>
<summary><strong>Arenas podem ser selecionadas aleatoriamente?</strong></summary>

Sim! Em `config/cobbleranked/arenas.json5`:

```json5
{
  "selection_mode": "random"  // ou "sequential"
}
```

- **random**: Escolhe arena aleatória em cada partida
- **sequential**: Sempre usa primeira arena disponível

</details>

<details>
<summary><strong>Arena aparece como "em uso" mas não há batalha</strong></summary>

Arena pode estar travada. Correção:

1. `/rankedadmin arena status` - Verificar todas as arenas
2. `/rankedadmin reload` - Resetar estados de arena
3. Se ainda travado, reinicie servidor

</details>

---

## Recursos Específicos de Formato

<details>
<summary><strong>Posso banir Tera Orb em singles mas permitir em doubles?</strong></summary>

Sim! Use banimentos de inventário específicos por formato.

**singles.json5:**
```json5
{
  "banned_inventory_items": ["mega_showdown:tera_orb"]
}
```

**doubles.json5:**
```json5
{
  "banned_inventory_items": []  // Permite Tera Orb
}
```

Jogadores com itens banidos não podem entrar na fila para aquele formato.

</details>

<details>
<summary><strong>Como encontro IDs de itens para banir?</strong></summary>

1. Segure item no jogo
2. Pressione F3+H (tooltips avançados)
3. Verifique tooltip para ID (ex: `mega_showdown:tera_orb`)
4. Adicione a `banned_inventory_items` na blacklist do formato

</details>

<details>
<summary><strong>Elo diferente para singles e doubles?</strong></summary>

Sim, formatos têm ratings Elo separados:
- Singles: Seu Elo de singles
- Doubles: Seu Elo de doubles
- Triples: Seu Elo de triples
- Multi: Seu Elo de multi

Todos rastreados independentemente no banco de dados.

</details>

---

## Música Personalizada

<details>
<summary><strong>Como adiciono música de batalha personalizada?</strong></summary>

1. Crie resource pack com arquivos `.ogg`
2. Adicione mapeamento `sounds.json`
3. Configure IDs de música em `config.json5`
4. Jogadores carregam resource pack

**Configuração mínima:**
```json5
{
  "music": {
    "enabled": true,
    "queueMusic": "cobbleranked:queue_music",
    "battleMusic": [{
      "minElo": 0,
      "maxElo": 9999,
      "music": "cobbleranked:battle_music"
    }]
  }
}
```

[Guia Completo](../features/custom-music.md)

</details>

<details>
<summary><strong>Música não está tocando para jogadores</strong></summary>

Verifique:
1. `music.enabled: true` na configuração
2. Jogadores têm resource pack carregado
3. IDs de som correspondem entre config e `sounds.json`
4. Arquivos OGG no caminho correto: `assets/cobbleranked/sounds/`

</details>

---

## Configuração Multi-Servidor

<details>
<summary><strong>Preciso do modo multi-servidor?</strong></summary>

**Não.** O modo de servidor único funciona perfeitamente para a maioria dos servidores.

Use multi-servidor apenas se:
- Você tem 2+ servidores Minecraft
- Quer rankings compartilhados entre servidores
- Tem servidor dedicado para batalhas

**Requisitos:** Proxy Velocity, MySQL/MongoDB, Redis

</details>

<details>
<summary><strong>Jogadores não estão sendo transferidos para servidor de batalha</strong></summary>

1. Verifique se `velocity.toml` tem nomes de servidores
2. Verifique se plugin ProxyCommand Reloaded está instalado
3. Teste transferência manual: `/server battle`
4. Verifique logs para erros de transferência

</details>

<details>
<summary><strong>Estatísticas não sincronizando entre servidores</strong></summary>

1. Verifique se todos os servidores usam mesmo banco de dados MySQL
2. Verifique se Redis está em execução: `redis-cli ping` → `PONG`
3. Confirme `cross_server.enabled: true` em todos os servidores
4. Verifique se credenciais de banco de dados correspondem

</details>

---

## GUI & Comandos

<details>
<summary><strong>Como personalizo itens da GUI?</strong></summary>

Edite `config/cobbleranked/gui/gui-<language>.json5`:

```json5
{
  "gui_ranked": {
    "items": {
      "queue_singles": {
        "item": "minecraft:diamond_sword",  // Alterar item
        "name": "&a&lQueue Singles",        // Alterar nome
        "slot": 11                           // Alterar posição
      }
    }
  }
}
```

Salve e execute `/rankedadmin reload`.

</details>

<details>
<summary><strong>Alterações da GUI não aparecem</strong></summary>

1. Verifique sintaxe JSON5 (vírgulas, colchetes)
2. Execute `/rankedadmin reload`
3. Feche e reabra GUI
4. Verifique logs para erros de configuração

</details>

<details>
<summary><strong>Quais comandos estão disponíveis?</strong></summary>

**Jogadores:**
- `/ranked` - Abrir menu ranqueado
- `/season` - Mostrar informações da temporada

**Admins:**
- `/rankedadmin setArena <nome> <pos1|pos2>` - Definir arena
- `/rankedadmin setelo <quantidade> <jogador> <formato>` - Definir Elo
- `/rankedadmin season create <dias> <nome>` - Nova temporada
- `/rankedadmin reload` - Recarregar configurações

[Lista Completa de Comandos](../getting-started/commands.md)

</details>

---

## Timer de Turno & Matchmaking

<details>
<summary><strong>Como ativo o timer de turno?</strong></summary>

Em `config.json5`:

```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 60
  }
}
```

Ou específico por formato:
```json5
{
  "format_timers": {
    "SINGLES": {
      "turn_timeout_seconds": 90
    }
  }
}
```

</details>

<details>
<summary><strong>Matchmaking demora muito</strong></summary>

**Soluções:**
1. Aumentar alcance de Elo (acontece automaticamente após 30s)
2. Ativar modo multi-servidor (pool maior de jogadores)
3. Verificar se arenas estão disponíveis: `/rankedadmin arena status`
4. Verificar se Redis está funcionando (apenas multi-servidor)

**Tempo de espera aumenta alcance:**
- 0-30s: ±200 Elo
- Após 30s: Expande gradualmente até ±600 Elo

</details>

<details>
<summary><strong>Jogadores com Elo errado fazem match</strong></summary>

Isto é normal para esperas longas. Sistema expande alcance para encontrar partidas.

Para limitar alcance, reduza `matchmaking.max_elo_range_multiplier` na configuração.

</details>

---

## Leaderboards & Estatísticas

<details>
<summary><strong>Leaderboard não está atualizando</strong></summary>

Leaderboards ficam em cache por 60 segundos. Aguarde e verifique novamente.

Forçar atualização:
1. Feche e reabra GUI
2. Execute `/rankedadmin reload`
3. Aguarde 60 segundos para expiração do cache

</details>

<details>
<summary><strong>Jogador faltando no leaderboard</strong></summary>

Verifique:
1. Jogador tem batalhas mínimas (padrão: 5)
2. Elo do jogador > 0
3. Jogador não foi resetado nesta temporada

</details>

<details>
<summary><strong>Como reseto todas as estatísticas?</strong></summary>

Crie nova temporada:
```
/rankedadmin season create 30 "Temporada 2"
```

Isto:
- Encerra temporada atual
- Arquiva estatísticas antigas
- Reseta Elo para padrão (1000)
- Limpa leaderboards

</details>

---

## Outros

<details>
<summary><strong>Integração Text Placeholder API</strong></summary>

Placeholders de rank disponíveis para top 100:

```
%cobbleranked_top_1_name%
%cobbleranked_top_1_elo%
%cobbleranked_top_singles_1_name%
%cobbleranked_top_doubles_1_winrate%
```

**Detalhes:** [Integração Text Placeholder API](../integration/placeholders.md)

</details>

<details>
<summary><strong>Posso usar isso com mod de movimentos Showdown?</strong></summary>

Sim! CobbleRanked funciona com:
- Mega Showdown
- Mods de movimentos personalizados
- Addons de Pokémon personalizados

Apenas configure blacklists para quaisquer adições muito fortes.

</details>

<details>
<summary><strong>Precisa de suporte?</strong></summary>

1. Verifique [Guia de Solução de Problemas](troubleshooting.md)
2. Pergunte no [Discord](https://discord.gg/VVVvBTqqyP) canal #feedback
3. Para relatórios de bugs, inclua:
   - Logs do servidor (`logs/latest.log`)
   - Arquivo de configuração (`config/cobbleranked/config.json5`)
   - Passos para reproduzir

</details>

---

## Próximos Passos

### Para Novos Administradores
1. **[Guia de Instalação](../getting-started/installation.md)** - Instale o CobbleRanked
2. **[Início Rápido](../getting-started/quick-start.md)** - Configure sua primeira batalha
3. **[Referência de Comandos](../getting-started/commands.md)** - Aprenda comandos essenciais

### Para Solução de Problemas
1. **[Guia de Solução de Problemas](troubleshooting.md)** - Resolução detalhada de problemas
2. **[Problemas Comuns](#instalação-e-configuração)** - Respostas rápidas
3. **[Obtendo Ajuda](#precisa-de-suporte)** - Discord e canais de suporte

### Para Configuração Avançada
1. **[Configuração Principal](../configuration/config.md)** - Configurações detalhadas
2. **[Configuração de Blacklist](../configuration/blacklist.md)** - Restrições competitivas
3. **[Configuração Multi-Servidor](../advanced/cross-server.md)** - Guia multi-servidor

---

## Páginas Relacionadas
- [Guia de Solução de Problemas](troubleshooting.md) - Resolução detalhada de problemas
- [Guia de Instalação](../getting-started/installation.md) - Instruções de configuração
- [Documentação Principal](../README.md) - Visão geral completa de recursos
