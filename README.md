# Portfolio Felipe Prates

Portfolio estático e isolado para publicação futura em `www.portfolio.felpamusic.com.br`.

## Escopo

- Projeto novo em `C:\Users\feema\portfolio-felipe-prates`.
- Não altera FelpaMusic, Vitrinno, OLI, Helena Video, CRM Total Tour, DNS ou Vercel.
- Não inclui credenciais, IPs sensíveis, tokens, e-mails privados de operação ou prints crus com dados de leads.

## Comandos

```powershell
npm run build
npm run check
```

O build gera `dist/`.

## Deploy futuro

Não fazer deploy automático.

Checklist antes de publicar:

1. Criar ou confirmar um projeto Vercel separado apenas para este portfolio.
2. Garantir que o projeto usa este diretório como origem.
3. Adicionar somente o domínio `www.portfolio.felpamusic.com.br`.
4. Não alterar `www.felpamusic.com.br`, `www.vitrinno.felpamusic.com.br`, `www.helenavideo.felpamusic.com.br` ou `www.helena-video.felpamusic.com.br`.
5. Rodar `npm run build` e validar `dist/index.html`.
6. Só publicar depois de confirmação explícita.
