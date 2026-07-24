# Rollback Point - Projects Responsive Layout

Date: 2026-07-24
Branch: apply-portfolio-full-fix
Pre-release commit: a21a4e9dab166344fbd5169669f37f017787c97b

## Previous Production Deployment

- Project: portfolio-felipe-prates
- Vercel project id: prj_YpGbSQVSerplsWj6Z05pe3r4rUqF
- Vercel org id: team_1PsNMupIRcDYRxfdRevVe1zE
- Deployment URL: https://portfolio-felipe-prates-matpsjl30-felpamusic.vercel.app
- Production alias: https://www.portfolio.felpamusic.com.br
- Status before release: Ready

## Rollback Route

Promote the previous production deployment again:

```powershell
npx vercel promote portfolio-felipe-prates-matpsjl30-felpamusic.vercel.app --scope felpamusic
```

## Validation Before Release

- `npm run build`: passed
- `npm run lint`: passed with 6 existing `react-refresh/only-export-components` warnings
- Desktop QA at 1280 x 720: no page-level horizontal overflow
- Mobile QA at 390 x 844: no page-level horizontal overflow

## Release Scope

- Restore centered desktop gutters in the projects index.
- Keep the projects heading inside the viewport.
- Preserve the existing visual identity, content, gallery and interactions.
