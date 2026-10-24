# Lâmpada — site de estudo bíblico

Site estático (HTML, CSS e JavaScript). Não precisa instalar nada.

## Estrutura
- `index.html`: estrutura da página
- `css/style.css`: visual (cores, fontes, espaçamentos)
- `js/dados.js`: **os estudos e a linha do tempo** (edite aqui para mudar o conteúdo)
- `js/biblia.js`: leitor da Bíblia (livros, capítulos, busca, link por versículo)
- `js/biblia/blivre.json`: texto da Bíblia Livre (CC BY 3.0 Brasil). Mantenha só este arquivo na pasta
- `js/app.js`: comportamento (abrir estudos, anotações, compartilhar)

## Testar no seu computador
O leitor da Bíblia precisa de um servidor. No VS Code, instale a extensão **Live Server** e clique em "Go Live". Dar dois cliques em `index.html` abre o site, mas o leitor não carrega.

## Publicar e gerar um link (escolha um)
1. **Netlify Drop** (mais fácil): acesse app.netlify.com/drop e arraste a pasta `lampada`. O link sai na hora.
2. **GitHub Pages**: crie um repositório, envie os arquivos, vá em Settings > Pages e escolha a branch `main`.
3. **Cloudflare Pages** ou **Vercel**: crie um projeto novo e envie a pasta.

## Domínio próprio (opcional)
Compre um domínio (ex.: Registro.br) e aponte para o serviço escolhido nas configurações de "Custom domain".
