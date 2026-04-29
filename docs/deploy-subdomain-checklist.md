# Checklist de deploy do subdomínio

Data da checagem: 2026-04-29.

## Estado observado sem alterar nada

- `www.felpamusic.com.br` respondeu HTTP 200 em Vercel.
- `www.helenavideo.felpamusic.com.br` respondeu HTTP 200 em Vercel.
- `www.vitrinno.felpamusic.com.br` respondeu redirecionamento para `https://vitrinno.felpamusic.com.br/`.
- `www.portfolio.felpamusic.com.br` já resolve para IPs da Vercel, mas respondeu `DEPLOYMENT_NOT_FOUND`.
- `www.portfolio.felpamusic.com.br` também apresentou erro de certificado quando acessado com validação TLS normal, sinal de que o domínio ainda não está corretamente associado ao projeto Vercel final.

## Caminho seguro

1. Criar um projeto Vercel separado para `portfolio-felipe-prates`.
2. Configurar Build Command: `npm run build`.
3. Configurar Output Directory: `dist`.
4. Associar somente `www.portfolio.felpamusic.com.br` a esse projeto.
5. Não remover nem editar os domínios dos projetos existentes.
6. Aguardar emissão do certificado TLS para o subdomínio.
7. Validar:

```powershell
Resolve-DnsName www.portfolio.felpamusic.com.br
curl.exe -I https://www.portfolio.felpamusic.com.br
```

## Regra operacional

Não fazer deploy, alias, alteração DNS ou alteração de domínio sem confirmação explícita.
