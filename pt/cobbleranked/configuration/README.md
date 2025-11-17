# Guia de Configuração

Bem-vindo à documentação de configuração do CobbleRanked. Este guia irá ajudá-lo a configurar e personalizar seu sistema de batalhas ranqueadas.

## Links Rápidos

- [Configuração Principal](config.md) - Configurações principais do servidor e sistema Elo
- [Configuração de Lista Negra](blacklist.md) - Banir Pokémon, movimentos, habilidades e itens
- [Configuração de Arena](arenas.md) - Configurar arenas de batalha
- [Sistema de Recompensas](rewards.md) - Configurar recompensas de temporada e marcos
- [Arquivos de Idioma](languages.md) - Personalizar mensagens e traduções
- [Personalização de GUI](gui.md) - Personalizar aparência do menu

## Formato de Configuração

O CobbleRanked usa **formato JSON5** para todos os arquivos de configuração. JSON5 é:
- ✅ Fácil de ler e editar
- ✅ Suporta comentários (`//` ou `/* */`)
- ✅ Permite vírgulas finais
- ✅ Mais flexível que JSON padrão

## Localização dos Arquivos de Configuração

Todos os arquivos de configuração estão localizados em: `config/cobbleranked/`

```
config/cobbleranked/
├── config.json5         # Configuração principal
├── blacklist.json5      # Banimentos de Pokémon/movimentos/habilidades
├── arenas.json5         # Locais de arena de batalha
├── rewards.json5        # Recompensas de temporada e marcos
├── gui/
│   ├── gui-enUs.json5   # GUI em Inglês
│   ├── gui-jaJp.json5   # GUI em Japonês
│   ├── gui-ptBr.json5   # GUI em Português
│   └── gui-ruRu.json5   # GUI em Russo
└── language/
    ├── en-Us.json5      # Mensagens em Inglês
    ├── ja-Jp.json5      # Mensagens em Japonês
    ├── pt-Br.json5      # Mensagens em Português
    └── ru-Ru.json5      # Mensagens em Russo
```

## Configuração Inicial

1. **Inicie seu servidor** - Os arquivos de configuração serão gerados automaticamente
2. **Pare o servidor**
3. **Edite os arquivos** usando qualquer editor de texto (VS Code, Notepad++, etc.)
4. **Reinicie o servidor** - As mudanças serão aplicadas

## Editando Arquivos JSON5

### Regras Básicas

1. **Aspas duplas para strings**: `"legendary"` (aspas simples também funcionam: `'legendary'`)
2. **Vírgulas finais permitidas**: `["A", "B",]` é válido
3. **Comentários permitidos**: Use `//` ou `/* */`
4. **Listas vazias**: `[]`
5. **Objetos vazios**: `{}`

### Exemplo: Banindo Pokémon

```json5
{
  // Banir Pokémon lendários
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",
    "Rayquaza",  // Vírgula final é OK em JSON5
  ]
}
```

### Recursos do JSON5

✅ **Comentários:**
```json5
{
  // Este é um comentário
  "black_list_pokemon": ["Mewtwo"], // Comentário de fim de linha

  /* Comentário
     multi-linha */
  "black_list_labels": ["legendary"]
}
```

✅ **Vírgulas finais:**
```json5
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",  // Vírgula final está ok
  ],  // Também ok aqui
}
```

## Recarregando Configuração

Use o comando `/rankedadmin reload` para recarregar a configuração sem reiniciar:

```
/rankedadmin reload
```

## Obtendo Ajuda

- **Documentação**: Leia os guias de configuração específicos linkados acima
- **Exemplos**: Cada arquivo JSON5 inclui comentários explicando as opções
- **Suporte**: Pergunte em nosso [Servidor Discord](https://discord.gg/VVVvBTqqyP) (canal #feedback)

## Próximos Passos

- [Configurar lista negra](blacklist.md) - Comece configurando banimentos de Pokémon
- [Configurar arenas](arenas.md) - Crie locais de batalha
- [Personalizar recompensas](rewards.md) - Configure rankings de temporada
