# Rollback Point - Portfolio Cyber Matrix Carousel

Date: 2026-06-03
Branch: apply-portfolio-full-fix
Pre-release commit: e562f6ef9e1d45a9703400cb7a91c99183cd40a3

## Previous Production Deployment

- Project: portfolio-felipe-prates
- Vercel project id: prj_Tp5dgBkxEITtYf5odxyRfxHTvO5A
- Vercel org id: team_NCKAvCjBvSE2djBZKqoMoNeB
- Deployment id: dpl_8Gmt7buUzWWNL3admT8zQBDfbKJJ
- Deployment URL: https://portfolio-felipe-prates-qxosxy2pk-felpas-projects.vercel.app
- Production alias: https://www.portfolio.felpamusic.com.br
- Status before release: Ready
- Created: 2026-05-16 21:07:45 -03:00

## Rollback Route

Use Vercel CLI:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
npx vercel rollback dpl_8Gmt7buUzWWNL3admT8zQBDfbKJJ --yes
```

Or use the Vercel dashboard for project `portfolio-felipe-prates` and promote deployment `dpl_8Gmt7buUzWWNL3admT8zQBDfbKJJ` back to production.

## Validation Before Release

- `npm run build`: passed
- `npm run lint`: passed with 6 existing `react-refresh/only-export-components` warnings in UI primitives
- Visual QA: desktop/mobile screenshots checked locally before cleanup

## Release Scope

- Add Cyber Matrix background layer behind the portfolio.
- Replace the broken 3D project carousel presentation with a stable horizontal project-card rail on desktop and existing vertical fallback on mobile.
- Preserve all existing project content and links.
