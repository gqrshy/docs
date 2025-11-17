# Guia de Migração

---
**CobbleRanked** > **Começando** > **Migração**
---

Atualize o CobbleRanked para a versão mais recente.

## Antes de Migrar

### 1. Fazer Backup de Tudo

```bash
# Pasta de configuração
cp -r config/cobbleranked config/cobbleranked.backup

# Banco de dados SQLite
cp config/cobbleranked/ranked.db config/cobbleranked/ranked.db.backup

# Banco de dados MySQL
mysqldump -u ranked -p cobbleranked > cobbleranked_backup.sql
```

### 2. Parar Servidor

```bash
/stop
```

## Passos de Migração

### 1. Atualizar Arquivo do Mod

```bash
# Remover versão antiga
rm mods/CobbleRanked-*.jar

# Adicionar nova versão
cp CobbleRanked-1.0.0.jar mods/
```

### 2. Iniciar Servidor

O CobbleRanked automaticamente:
- Migra o esquema do banco de dados
- Converte configurações antigas para JSON5
- Cria arquivos de configuração faltantes

### 3. Verificar Migração

```bash
# Verificar logs para erros
tail -n 100 logs/latest.log | grep CobbleRanked

# Testar no jogo
/ranked
```

## Mudanças Específicas por Versão

### Migrando para 1.0.0+

**Banco de Dados:**
- Migração automática de Elo único para estatísticas específicas por formato
- Tabela antiga `player_ranked_stats` → tabela `format_stats`

**Configuração:**
- YAML removido, apenas JSON5
- Novos arquivos: `restrictions.json5`, `inventory.json5`

**O que fazer:**
1. Atualizar arquivo do mod
2. Iniciar servidor (migra automaticamente)
3. Verificar se a GUI `/ranked` funciona
4. Verificar se as estatísticas dos jogadores foram preservadas

### Configuração Multi-Servidor (Instalação Nova)

Se adicionando modo multi-servidor:

1. Instalar MySQL/MongoDB
2. Instalar Redis
3. Configurar todos os servidores:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // ou "battle", "lobby"
    "battle_server": "battle"  // ou "" para servidor de batalha
  }
}
```

Veja [Configuração Multi-Servidor](../advanced/cross-server.md)

## Solução de Problemas

**Migração falha:**
- Verificar logs: `logs/latest.log`
- Restaurar backup e tentar novamente
- Reportar problema no Discord com trecho do log

**Estatísticas de jogadores perdidas:**
- Verificar se banco de dados de backup existe
- Verificar tabela `format_stats` no banco de dados
- Usar backup para restaurar se necessário

**Configurações não convertendo:**
- Excluir `config/cobbleranked/` (após backup!)
- Reiniciar servidor para regenerar padrões
- Reaplicar configurações personalizadas

**Multi-servidor não funciona:**
- Verificar se MySQL/Redis estão rodando
- Verificar se todos os servidores têm a mesma configuração de banco de dados
- Testar conexão: `redis-cli ping`

## Reversão (Se Necessário)

```bash
# Parar servidor
/stop

# Restaurar mod antigo
rm mods/CobbleRanked-*.jar
cp backup/CobbleRanked-old.jar mods/

# Restaurar configurações
rm -rf config/cobbleranked
cp -r config/cobbleranked.backup config/cobbleranked

# Restaurar banco de dados (SQLite)
cp config/cobbleranked/ranked.db.backup config/cobbleranked/ranked.db

# Restaurar banco de dados (MySQL)
mysql -u ranked -p cobbleranked < cobbleranked_backup.sql

# Iniciar servidor
```

## Obtendo Ajuda

**Antes de perguntar:**
1. Verificar logs para mensagens de erro
2. Verificar se backup foi feito
3. Tentar instalação limpa em servidor de teste

**Onde perguntar:**
- [Discord](https://discord.gg/cobbleranked) - canal #support
- [GitHub Issues](https://github.com/gqrshy/cobbleranked/issues)

---

## Próximos Passos

### Após Migração Bem-Sucedida
1. **[Verificar configuração](../configuration/config.md)** - Verifique se todas as configurações migraram corretamente
2. **[Testar batalhas](quick-start.md#step-4-test-the-system)** - Execute uma partida de teste para garantir que tudo funciona
3. **[Revisar novos recursos](../README.md#features)** - Veja o que há de novo na versão mais recente

### Se a Migração Falhou
1. **[Verificar guia de solução de problemas](../support/troubleshooting.md)** - Problemas comuns de migração
2. **[Restaurar do backup](#rollback-if-needed)** - Use o procedimento de reversão acima
3. **[Obter suporte](../support/faq.md#getting-help)** - Peça ajuda com logs

---

## Páginas Relacionadas
- [Guia de Instalação](installation.md) - Referência de instalação nova
- [Guia de Banco de Dados](../advanced/database.md) - Detalhes de migração de banco de dados
- [Solução de Problemas](../support/troubleshooting.md) - Problemas comuns e soluções
