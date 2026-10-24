# Lâmpada

Um site simples e minimalista para estudar a Bíblia, aprofundar os ensinamentos de Deus e conhecer os principais acontecimentos bíblicos. O objetivo é que qualquer pessoa possa abrir, ler com calma e compartilhar um estudo ou um versículo com amigos e familiares por meio de um link.

O nome vem de Salmos 119:105: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho."

## Propósito

- **Estudar:** temas com um versículo, uma explicação curta e perguntas para reflexão.
- **Ler:** o texto completo da Bíblia, com busca por palavra ou expressão.
- **Praticar:** um plano de leitura de oito semanas, com progresso salvo.
- **Estudar com o texto:** destaque e anotação de versículos no leitor.
- **Entender o contexto:** uma linha do tempo com os grandes acontecimentos, da criação à Igreja primitiva.
- **Compartilhar:** cada estudo e cada versículo tem um link próprio, fácil de enviar por mensagem.

O visual é minimalista de propósito, para que o texto seja o centro da página.

## O que o site tem

| Seção | Descrição |
|---|---|
| Abertura | Botão de alternar entre tema claro e escuro no topo, e uma frase de destaque com um efeito de luz que acompanha o mouse ou o dedo |
| Estudos | Vinte estudos em quatro grupos (Fundamentos, Parábolas de Jesus, Sermão do Monte e Salmos). O versículo é lido automaticamente da Bíblia Livre, com explicação, perguntas e campo de anotações |
| Plano de leitura | Oito semanas com sete leituras cada, marcação de progresso e botão para abrir o capítulo no leitor |
| Bíblia | Leitor com livro, capítulo, busca, link por versículo, destaque em três cores, anotações e lista de marcações |
| Linha do tempo | Oito acontecimentos bíblicos em ordem cronológica |
| Compartilhar | Botão para enviar o site para amigos e familiares |

As anotações dos estudos, os destaques e anotações dos versículos e o progresso do plano ficam salvos apenas no navegador de quem usa (`localStorage`). Nada é enviado para servidor nenhum, e as marcações não passam de um aparelho para outro.

## Como foi construído

Site estático feito só com **HTML, CSS e JavaScript puro**, sem frameworks e sem etapa de build. Isso facilita a hospedagem gratuita e a manutenção por quem está começando.

```
lampada/
├── index.html          estrutura da página
├── css/
│   └── style.css       visual: cores, fontes, espaçamentos, tema claro e escuro
├── js/
│   ├── dados.js        conteúdo: estudos, plano de leitura e linha do tempo
│   ├── app.js          estudos, compartilhamento, tema, efeito de luz
│   ├── biblia.js       leitor da Bíblia (navegação, busca, destaques e anotações)
│   ├── plano.js        plano de leitura e progresso
│   └── biblia/
│       └── blivre.json texto da Bíblia Livre
└── README.md
```

**Decisões de design**
- **Tipografia:** Cormorant Garamond (títulos e textos bíblicos) e Instrument Sans (interface), carregadas do Google Fonts, com fontes de reserva caso não carreguem.
- **Cores:** azul-noite com destaque âmbar no tema escuro, e branco azulado com âmbar mais fechado no tema claro. O tema segue a preferência do aparelho e pode ser trocado pelo botão.
- **Movimento:** um único efeito de destaque (a luz da abertura). O resto da interface só se move em resposta ao toque.
- **Acessibilidade:** navegação por teclado com foco visível, respeito à preferência de reduzir movimento e layout adaptado ao celular.

**Como o leitor funciona**
O arquivo `blivre.json` só é baixado quando a pessoa clica em "Abrir a Bíblia", para a página inicial continuar leve. O leitor agrupa os versículos por livro e capítulo, e a busca ignora acentos e maiúsculas. Os links de versículo usam o formato `#b-livro-capítulo-versículo` (por exemplo, `#b-1-1-3` abre Gênesis 1:3).

## Como rodar no computador

O leitor da Bíblia precisa de um servidor, porque o navegador bloqueia a leitura do JSON quando o site é aberto direto do arquivo.

1. Instale o [VS Code](https://code.visualstudio.com/) e a extensão **Live Server**.
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## Como publicar (GitHub Pages)

1. Envie os arquivos para um repositório público, com o `index.html` na raiz.
2. Em **Settings > Pages**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
3. Aguarde 1 a 2 minutos. O link será `https://seu-usuario.github.io/nome-do-repositorio/`.

Alternativas gratuitas: Netlify Drop (arrastar a pasta em app.netlify.com/drop), Cloudflare Pages e Vercel.

## Como editar o conteúdo

Todo o conteúdo fica em `js/dados.js`.

**Adicionar um estudo:** copie um bloco da lista `estudos` e troque os campos. O texto do versículo não é digitado, ele é lido do `blivre.json` pelos números em `p`.

```js
{
  g: "Parábolas de Jesus",   // grupo (estudos do mesmo grupo ficam juntos)
  id: "exemplo",             // sem espaços nem acentos; vira o link (#exemplo)
  t: "Título do estudo",
  r: "Lucas 15:11-32",       // referência exibida
  p: [42, 15, 11, 32],       // [livro, capítulo, versículo inicial, versículo final]
  x: "Explicação do texto.",
  q: ["Pergunta 1?", "Pergunta 2?"]
}
```

Os livros seguem a numeração padrão do `blivre.json`: 1 Gênesis, 19 Salmos, 20 Provérbios, 40 Mateus, 42 Lucas, 43 João, 44 Atos, 45 Romanos, e assim por diante até 66 Apocalipse. Se um texto não aparecer, confira esses números.

**Alterar o plano de leitura:** edite a lista `plano`. Cada semana tem um título `t` e uma lista `d` de leituras no formato `["João", 43, 1]` (nome exibido, número do livro, capítulo).

**Adicionar um acontecimento:** acrescente uma linha na lista `linha`, no formato `["Título", "Referência", "Descrição"]`.

## Texto bíblico e licença

O texto da Bíblia vem da **Bíblia Livre (BLIVRE)**, comissão de tradução Livre, baseada na edição de 1819 de João Ferreira de Almeida e distribuída sob a licença [Creative Commons Atribuição 3.0 Brasil (CC BY 3.0 BR)](https://creativecommons.org/licenses/by/3.0/br/). Essa licença permite copiar, redistribuir e adaptar, desde que se dê o crédito, e a atribuição já consta no rodapé do site.

Não inclua neste repositório traduções protegidas por direitos autorais (como NVI, NAA ou ARA) sem autorização das editoras.

## Ideias para o futuro

- Mais estudos (profecias, cartas de Paulo, vida de Davi)
- Planos de leitura em outros formatos (30 dias, Bíblia em um ano)
- Exportar e importar as marcações para levar de um aparelho a outro
- Domínio próprio (por exemplo, `.com.br`)
