# Solução de Problemas

---
**CobbleRanked** > **Suporte** > **Solução de Problemas**
---

Problemas comuns e suas soluções para o CobbleRanked.

## Problemas de Instalação

### Mod não está carregando

**Sintomas:**
- Nenhuma mensagem do CobbleRanked no console
- Comando `/ranked` não funciona
- Mod não aparece na lista de mods

**Soluções:**

1. **Verifique se Fabric Loader está instalado:**
   ```bash
   # Verificar pasta mods
   ls mods/ | grep fabric
   ```
   Deve ver `fabric-loader-*.jar`

2. **Verificar dependências:**
   - Fabric API (`fabric-api-*.jar`)
   - Cobblemon (`cobblemon-*.jar`)
   - Fabric Language Kotlin (`fabric-language-kotlin-*.jar`)

3. **Verificar logs do servidor:**
   ```bash
   cat logs/latest.log | grep CobbleRanked
   ```
   Procure por erros durante carregamento do mod

4. **Verificar versão do Minecraft:**
   - CobbleRanked requer Minecraft 1.21.1
   - Verifique `server.properties` para versão correta

### Arquivos de configuração não estão sendo gerados

**Sintomas:**
- Sem pasta `config/cobbleranked/`
- Arquivos de configuração faltando

**Soluções:**

1. **Inicie o servidor pelo menos uma vez:**
   - Configurações são geradas no primeiro lançamento
   - Aguarde mensagem "Done!"

2. **Verificar permissões de arquivo:**
   ```bash
   ls -la config/
   ```
   Certifique-se que servidor pode escrever na pasta `config/`

3. **Criar pasta manualmente:**
   ```bash
   mkdir -p config/cobbleranked
   ```
   Então reinicie o servidor

4. **Verificar erros:**
   ```bash
   grep -i "error" logs/latest.log | grep -i "cobbleranked"
   ```

### Erros de música (Cobblemon 1.6.x)

**Sintomas:**
- Erros como `ClassNotFoundException: net.minecraft.core.registries.BuiltInRegistries`
- Erros como `ClassNotFoundException: net.minecraft.sounds.SoundEvent`
- Aviso: `[MusicUtil] Custom music DISABLED (not supported in 1.6.x)`

**Causa:**
Música de fundo personalizada está **intencionalmente desabilitada** no Cobblemon 1.6.x devido a problemas de compatibilidade com ofuscação de classe em tempo de execução do Fabric.

**Soluções:**

1. **Este é comportamento normal** - Nenhuma ação necessária
   - CobbleRanked detecta Cobblemon 1.6.x e automaticamente desabilita música
   - Todos os outros recursos funcionam perfeitamente
   - Música pula silenciosamente sem erros

2. **Mensagem de log esperada:**
   ```
   [MusicUtil] Detected Cobblemon V1_6_X - Custom music DISABLED (not supported in 1.6.x)
   ```

3. **Para habilitar música personalizada:**
   - Atualize para **Cobblemon 1.7.0+**
   - Todos os outros recursos funcionam identicamente entre versões

**O que ainda funciona em 1.6.x:**
- ✅ Batalhas ranqueadas
- ✅ Matchmaking e Elo
- ✅ Todas as GUIs e comandos
- ✅ Suporte multi-servidor
- ❌ Apenas música de fundo personalizada

---

## Problemas de Fila & Matchmaking

### Não consigo entrar na fila

**Sintomas:**
- Clicar no botão de fila, nada acontece
- Mensagem de erro ao entrar

**Soluções:**

1. **Verificar tamanho do time:**
   - Padrão requer 6 Pokémon
   - Erro: "You need to have 6 Pokémon"
   - Solução: Capture/crie mais Pokémon

2. **Verificar se Pokémon estão vivos:**
   - Todos os Pokémon devem ter HP > 0
   - Erro: "Your Pokémon need to be alive!"
   - Solução: Cure no Centro Pokémon

3. **Verificar violações de blacklist:**
   - Pokémon banidos no time
   - Movimentos/habilidades/itens banidos
   - Erro: "You are using a Pokémon that is on the blacklist"
   - Solução: Remova Pokémon banidos, veja [Blacklist](../configuration/blacklist.md)

4. **Verificar status ranqueado:**
   - Sistema pode estar fechado
   - Erro: "Ranked match is not open"
   - Solução: Contate admin para abrir: `/rankedadmin open`

### Fila demorando muito

**Sintomas:**
- Na fila por 5+ minutos
- Nenhuma partida encontrada

**Soluções:**

1. **Verificar jogadores ativos:**
   - Precisa de pelo menos 2 jogadores na fila
   - Pergunte no chat se outros estão na fila

2. **Verificar formato:**
   - Certifique-se que ambos jogadores na fila para mesmo formato (Singles vs Doubles)
   - Tente formato diferente se um estiver vazio

3. **Verificar alcance de Elo:**
   - Elo muito alto/baixo pode ter poucos oponentes
   - Alcance expande com o tempo (padrão: a cada 50 segundos)

4. **Verificar multi-servidor:**
   - Se multi-servidor habilitado, verifique conexão Redis
   - Verifique se outros servidores têm jogadores

### Partida encontrada mas batalha não começa

**Sintomas:**
- Mensagem "Match Found!"
- Sem teleporte para arena
- Travado na fila

**Soluções:**

1. **Verificar arenas configuradas:**
   ```bash
   /rankedadmin arena list
   ```
   Se sem arenas: `/rankedadmin arena set main_arena`

2. **Verificar se mundo da arena está carregado:**
   - Dimensão da arena deve estar carregada
   - Tente teleportar manualmente: `/rankedadmin arena tp nome_arena`

3. **Verificar erros no console:**
   ```bash
   tail -f logs/latest.log
   ```
   Procure por erros relacionados a arena

4. **Verificar se ambos jogadores são válidos:**
   - Outro jogador pode ter desconectado
   - Outro jogador pode ter violação de blacklist

---

## Problemas de Batalha

### Batalha não começa após teleporte

**Sintomas:**
- Teleportado para arena
- Nenhuma GUI de batalha aparece
- Parado na arena sem fazer nada

**Soluções:**

1. **Aguarde um momento:**
   - Batalha começa após contagem regressiva de 3 segundos
   - Seja paciente

2. **Verificar versão do Cobblemon:**
   - Requer Cobblemon 1.7.0+
   - Atualize se estiver usando versão mais antiga

3. **Verificar se ambos jogadores teleportaram:**
   - Se um jogador não teleportou, batalha não começará
   - Verifique console para erros de teleporte

4. **Tente comando de batalha manual:**
   - Não oficialmente suportado, mas pode ajudar a diagnosticar
   - Reporte bug no Discord #feedback se persistir

### Elo não atualiza após batalha

**Sintomas:**
- Batalha completada (vitória/derrota)
- Elo ficou igual

**Soluções:**

1. **Verificar se batalha terminou em empate:**
   - Limite de turnos alcançado (padrão: 100 turnos)
   - Empates não mudam Elo
   - Solução: Aumente limite de turnos na configuração

2. **Verificar se sistema Elo está habilitado:**
   ```json5
   {
     "eloSystem": {
       "mode": "POKEMON_SHOWDOWN"  // ou "LEGACY"
     }
   }
   ```

3. **Verificar conexão com banco de dados:**
   - SQLite: Verifique se `config/cobbleranked/ranked.db` existe
   - MySQL: Teste conexão com `mysql -u user -p -h host database`

4. **Verificar console para erros:**
   ```bash
   grep -i "elo" logs/latest.log | grep -i "error"
   ```

### Desconexão durante batalha

**Sintomas:**
- Jogador desconectou no meio da batalha
- O que acontece?

**Comportamento:**
- Jogador desconectado **conta como derrota**
- Oponente **conta como vitória**
- Contador de fuga incrementado para jogador desconectado
- Penalidade completa de Elo aplicada

**Soluções:**
- Intencional: Nenhuma (este é o comportamento pretendido)
- Não intencional (crash/internet): Admin pode resetar contador de fuga
  ```bash
  /rankedadmin flee reset NomeDoJogador
  ```

---

## Problemas de Configuração

### Configuração não está recarregando

**Sintomas:**
- Alterou `config.json5`
- Executou `/rankedadmin reload`
- Alterações não foram aplicadas

**Soluções:**

1. **Verificar sintaxe JSON5:**
   - Use validador: https://json5.org
   - Erro comum: Vírgulas faltando
   - Erro comum: Vírgula final no último item (permitido em JSON5!)

2. **Verificar se arquivo foi salvo:**
   - Certifique-se que salvou o arquivo após edição
   - Verifique hora de modificação do arquivo

3. **Reiniciar servidor:**
   - Algumas configurações requerem reinicialização completa
   - Pare servidor, reinicie, teste novamente

4. **Verificar console para erros:**
   ```bash
   grep -i "error" logs/latest.log | tail -20
   ```

### Blacklist não está funcionando

**Sintomas:**
- Adicionou Pokémon à blacklist
- Jogadores ainda podem usá-los

**Soluções:**

1. **Verificar ortografia:**
   ```json5
   {
     "black_list_pokemon": [
       "Mewtwo"  // Capitalização correta
     ]
   }
   ```

2. **Verificar se recarregou:**
   ```bash
   /rankedadmin reload
   ```

3. **Verificar mensagem de validação:**
   - Jogador deve ver: "You are using a Pokémon that is on the blacklist"
   - Se não, blacklist não está carregando

4. **Verificar quebras de linha:**
   - Use LF não CRLF
   ```bash
   dos2unix config/cobbleranked/blacklist.json5
   ```

5. **Verificar sintaxe JSON5:**
   - Certifique-se sem erros de sintaxe
   - Use validador online

### Idioma não está mudando

**Sintomas:**
- Alterou idioma na configuração
- Ainda mostra Inglês

**Soluções:**

1. **Verificar código de idioma:**
   ```json5
   {
     "language": "pt-Br"  // Deve corresponder exatamente ao nome do arquivo
   }
   ```
   Disponíveis: `en-Us`, `ja-Jp`, `pt-Br`, `ru-Ru`

2. **Verificar se arquivo existe:**
   ```bash
   ls config/cobbleranked/language/
   ```
   Deve ver `pt-Br.json5`

3. **Recarregar configuração:**
   ```bash
   /rankedadmin reload
   ```

4. **Verificar console:**
   ```bash
   grep -i "language" logs/latest.log
   ```
   Deve ver: "Message configurations for language pt-Br loaded successfully!"

---

## Problemas de Recompensas

### Recompensas não aparecem na GUI

**Sintomas:**
- Alcançou marco (ex: 10 vitórias)
- Nenhum item de recompensa na GUI

**Soluções:**

1. **Verificar se recompensa está configurada:**
   - Abra `rewards.json5`
   - Verifique se marco existe para seu formato (Singles/Doubles)

2. **Verificar se já reivindicou:**
   - Recompensas são únicas por temporada
   - Verifique se já reivindicou nesta temporada

3. **Verificar formato:**
   - Marcos de Singles só aparecem para jogadores de Singles
   - Marcos de Doubles só para jogadores de Doubles

4. **Recarregar recompensas:**
   ```bash
   /rankedadmin reload
   ```

### Comandos de recompensa não estão executando

**Sintomas:**
- Reivindicou recompensa
- Itens não recebidos

**Soluções:**

1. **Verificar sintaxe do comando:**
   ```json5
   {
     "commands": [
       "give {player} minecraft:diamond 64"  // Correto
     ]
   }
   ```
   NÃO: `"give NomeDoJogador diamond 64"` (errado)

2. **Verificar placeholder:**
   - Deve usar `{player}` não `{username}` ou `%player%`

3. **Testar comando manualmente:**
   ```bash
   /give SeuNome minecraft:diamond 64
   ```
   Se manual funcionar, problema é com placeholder

4. **Verificar plugins necessários:**
   - Comandos de economia requerem plugin de economia (EssentialsX, etc.)
   - Comandos de permissão requerem LuckPerms/PermissionsEx

5. **Verificar erros no console:**
   ```bash
   grep -i "reward" logs/latest.log | grep -i "error"
   ```

---

## Problemas Multi-Servidor

### Jogadores não conseguem ver uns aos outros entre servidores

**Sintomas:**
- Configuração multi-servidor
- Jogadores no Servidor A não conseguem dar match com Servidor B

**Soluções:**

1. **Verificar conexão MySQL:**
   - Todos os servidores devem conectar ao mesmo banco de dados MySQL
   ```bash
   mysql -u username -p -h host database
   ```

2. **Verificar conexão Redis:**
   - Necessário para sincronização de fila em tempo real
   ```bash
   redis-cli -h host -p port PING
   ```
   Deve responder: `PONG`

3. **Verificar configuração battle_server:**
   - Apenas UM servidor deve ter `battle_server: ""`
   - Todos os outros devem apontar para servidor de batalha

4. **Verificar se cross_server está habilitado:**
   ```json5
   {
     "cross_server": {
       "enabled": true
     }
   }
   ```

Veja [Configuração Multi-Servidor](../advanced/cross-server.md) para guia detalhado.

### Múltiplos servidores de batalha detectados

**Sintomas:**
- Erro no console: "CRITICAL ERROR: Multiple Battle Servers Detected!"

**Problema:**
- Múltiplos servidores têm `battle_server: ""` (string vazia)
- Causa gestão duplicada de temporada, recompensas duplicadas

**Solução:**
1. Verifique configurações de todos os servidores
2. Apenas UM servidor deve ter `battle_server: ""`
3. Todos os outros: `battle_server: "nome_real_servidor_batalha"`
4. Reinicie todos os servidores

---

## Problemas de Performance

### Lag no servidor durante batalhas

**Sintomas:**
- TPS cai durante batalhas
- Jogadores experimentam lag

**Soluções:**

1. **Verificar recursos do servidor:**
   ```bash
   top
   ```
   Uso de CPU e RAM

2. **Reduzir limite de turnos:**
   ```json5
   {
     "battle": {
       "maxTurns": 50  // Reduzir de 100
     }
   }
   ```

3. **Limitar batalhas concorrentes:**
   - Não configurável atualmente
   - Atualize hardware do servidor se necessário

4. **Verificar outros plugins:**
   - Desabilite outros plugins temporariamente para diagnosticar
   - CobbleRanked sozinho tem impacto mínimo de performance

### Banco de dados crescendo muito

**Sintomas:**
- Arquivo `ranked.db` muito grande (> 100MB)

**Soluções:**

1. **Crescimento normal:**
   - ~1 KB por jogador
   - 10.000 jogadores = ~10 MB
   - 100 MB indica ~100.000 jogadores (improvável)

2. **Verificar duplicatas:**
   - Não deveria acontecer, mas verifique banco de dados
   ```bash
   sqlite3 config/cobbleranked/ranked.db "SELECT COUNT(*) FROM player_ranked_stats;"
   ```

3. **Migrar para MySQL:**
   - Melhor para bases grandes de jogadores (1000+ jogadores)
   - Veja [Guia de Banco de Dados](../advanced/database.md)

---

## Problemas de GUI

### GUI não está abrindo

**Sintomas:**
- Comando `/ranked` executa
- Nenhuma GUI aparece

**Soluções:**

1. **Verificar permissão:**
   ```bash
   /lp user SeuNome permission check cobbleranked.gui
   ```
   Deve retornar: `true`

2. **Verificar se arquivos de GUI existem:**
   ```bash
   ls config/cobbleranked/gui/
   ```
   Deve ver arquivos `gui-*.json5`

3. **Verificar configuração de idioma:**
   - Arquivo de GUI deve corresponder ao idioma
   - Português: `gui-ptBr.json5`
   - Inglês: `gui-enUs.json5`

4. **Verificar erros no console:**
   ```bash
   grep -i "gui" logs/latest.log | grep -i "error"
   ```

### Itens da GUI não estão renderizando

**Sintomas:**
- GUI abre mas itens errados/faltando

**Soluções:**

1. **Verificar IDs de itens:**
   ```json5
   {
     "item": "minecraft:diamond"  // Deve ser ID de item válido
   }
   ```

2. **Verificar custom_model_data:**
   - Se usando resource pack, verifique se modelo personalizado existe
   - Defina como `0` se não estiver usando modelos personalizados

3. **Recarregar GUI:**
   ```bash
   /rankedadmin reload
   ```

---

## Problemas de Banco de Dados

### Falha na conexão com banco de dados (MySQL)

**Sintomas:**
- Erro no console: "Failed to connect to MySQL database"

**Soluções:**

1. **Verificar se MySQL está em execução:**
   ```bash
   systemctl status mysql
   ```

2. **Verificar credenciais:**
   ```json5
   {
     "cross_server": {
       "database": {
         "host": "localhost",  // IP correto?
         "port": 3306,         // Porta correta?
         "username": "user",   // Username correto?
         "password": "pass"    // Senha correta?
       }
     }
   }
   ```

3. **Testar conexão manualmente:**
   ```bash
   mysql -u username -p -h host database
   ```

4. **Verificar firewall:**
   - Porta MySQL (3306) deve estar aberta
   - Permitir conexões do IP do servidor

Veja [Guia de Banco de Dados](../advanced/database.md) para configuração.

### Banco de dados corrompido (SQLite)

**Sintomas:**
- Erro no console: "database disk image is malformed"

**Soluções:**

1. **Fazer backup do banco de dados:**
   ```bash
   cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup
   ```

2. **Tentar reparar:**
   ```bash
   sqlite3 config/cobbleranked/ranked.db "PRAGMA integrity_check;"
   ```

3. **Se reparo falhar, restaurar de backup:**
   ```bash
   cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db
   ```

4. **Se sem backup, resetar banco de dados:**
   ```bash
   rm config/cobbleranked/ranked.db
   ```
   **Aviso:** Todos os dados de jogadores serão perdidos!

---

## Obtendo Ajuda

### Informações para Fornecer

Ao pedir ajuda, inclua:

1. **Versão do CobbleRanked:**
   - Verifique nome do arquivo JAR do mod

2. **Versão do Cobblemon:**
   ```bash
   ls mods/ | grep cobblemon
   ```

3. **Versão do Minecraft:**
   - Verifique `server.properties`

4. **Mensagens de erro:**
   ```bash
   tail -100 logs/latest.log
   ```

5. **Arquivos de configuração:**
   - `config.json5`
   - `blacklist.json5` (se relevante)

6. **Passos para reproduzir:**
   - O que você estava fazendo quando o problema ocorreu?

### Onde Obter Ajuda

- **Servidor Discord:** [Entre para Suporte](https://discord.gg/VVVvBTqqyP) (canal #feedback)
- **Documentação:** [FAQ](faq.md)
- **E-mail:** garshy.gaming@gmail.com
- **Discord DM:** @gashicha

---

## Próximos Passos

### Para Problemas de Instalação
1. **[Guia de Instalação](../getting-started/installation.md)** - Instruções completas de configuração
2. **[Verificação de Dependências](#problemas-de-instalação)** - Verifique todos os mods instalados
3. **[Arquivos de Configuração](#arquivos-de-configuração-não-estão-sendo-gerados)** - Gere configurações

### Para Problemas de Batalha
1. **[Guia de Início Rápido](../getting-started/quick-start.md)** - Teste fluxo básico de batalha
2. **[Configuração de Arena](../configuration/arenas.md)** - Configure locais de batalha
3. **[Referência de Comandos](../getting-started/commands.md)** - Comandos administrativos de solução de problemas

### Para Problemas Multi-Servidor
1. **[Guia de Configuração Multi-Servidor](../advanced/cross-server.md)** - Instruções completas de configuração
2. **[Configuração de Banco de Dados](../advanced/database.md)** - MySQL/MongoDB/Redis
3. **[FAQ Multi-Servidor](faq.md#multi-servidor)** - Perguntas comuns sobre multi-servidor

---

## Páginas Relacionadas
- [FAQ](faq.md) - Perguntas frequentes
- [Referência de Comandos](../getting-started/commands.md) - Comandos de depuração
- [Documentação Principal](../README.md) - Visão geral de recursos
