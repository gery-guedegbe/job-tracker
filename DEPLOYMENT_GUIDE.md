# Guide Complet : CI/CD et Déploiement

Ce guide vous explique comment mettre en place une **pipeline CI/CD professionnelle** avec GitHub Actions et Vercel.

## Étape 1 : GitHub Actions CI/CD

### Créer le workflow

1. **Créer le dossier** `.github/workflows/` à la racine du projet
2. **Créer le fichier** `ci.yml`

```bash
mkdir -p .github/workflows
touch .github/workflows/ci.yml
```

### Contenu du fichier `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type checking
        run: npm run type-check

      - name: Linting
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Run tests
        run: npm run test -- --run

      - name: Build for production
        run: npm run build

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-report
          path: coverage/
          retention-days: 30

  deploy:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### Explication du workflow

| Étape             | Rôle                       |
| ----------------- | -------------------------- |
| **Checkout**      | Clone le repo              |
| **Setup Node**    | Installe Node.js 20.x      |
| **Install deps**  | `npm ci` (production-safe) |
| **Type checking** | `tsc --noEmit`             |
| **Linting**       | `eslint` sur tout le code  |
| **Format check**  | Prettier validation        |
| **Tests**         | Vitest run                 |
| **Build**         | Vite production build      |
| **Deploy**        | Vercel deployment          |

---

## Étape 2 : Configuration Vercel

### 2.1 Création du compte et connexion du repo

1. **Aller sur** [vercel.com](https://vercel.com)
2. **S'inscrire** avec GitHub (ou se connecter)
3. **Cliquer** "New Project"
4. **Sélectionner** le repo `job-tracker`
5. **Vercel détecte automatiquement Vite**

### 2.2 Configurer les secrets GitHub

Après avoir connecté Vercel, vous avez besoin de 3 secrets dans GitHub :

```
VERCEL_TOKEN         → Token d'authentification Vercel
VERCEL_ORG_ID        → ID de votre organisation Vercel
VERCEL_PROJECT_ID    → ID du projet Vercel
```

**Comment les trouver** :

1. **VERCEL_TOKEN** :
   - Aller sur [Vercel Settings](https://vercel.com/account/tokens)
   - Créer un token "CI/CD"
   - Copier le token

2. **VERCEL_ORG_ID** et **VERCEL_PROJECT_ID** :
   - Aller au projet Vercel
   - Settings → General
   - Copier les IDs

**Ajouter les secrets dans GitHub** :

1. Aller sur le repo GitHub
2. Settings → Secrets and variables → Actions
3. Ajouter 3 secrets :
   ```
   VERCEL_TOKEN=<token>
   VERCEL_ORG_ID=<org_id>
   VERCEL_PROJECT_ID=<project_id>
   ```

### 2.3 Fichier vercel.json (optionnel mais recommandé)

Créer `vercel.json` à la racine :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "framework": "vite",
  "env": ["VITE_API_URL"],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

---

## Étape 3 : Tests Locaux Avant de Push

### Reproduire le CI/CD localement

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format check
npm run format:check

# Tests
npm run test -- --run

# Production build
npm run build

# Preview production
npm run preview
```

Si tout passe ✅, vous pouvez push sans crainte.

---

## Étape 4 : Workflow Quotidien

### Développement

```bash
# 1. Créer une branche
git checkout -b feature/amazing-feature

# 2. Développer avec hot reload
npm run dev

# 3. Commit réguliers
git commit -m "feat: add kanban filtering"

# 4. Avant de push, tester localement
npm run type-check && npm run lint && npm run test -- --run

# 5. Push
git push origin feature/amazing-feature

# 6. GitHub Actions lance automatiquement
   → Type check
   → Linting
   → Tests
   → Build

# 7. Si tout passe, créer PR
# 8. Code review
# 9. Merge vers main
# 10. GitHub Actions déploie sur Vercel 🚀
```

---

## Étape 5 : Monitoring & Debugging

### GitHub Actions

Visualiser les runs :

- Aller sur repo → Actions
- Voir l'historique des workflows
- Cliquer sur un run pour voir les logs

### Vercel

Monitoring :

- Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
- Voir les deployments
- Cliquer pour voir les logs
- Vérifier l'URL de production

### Troubleshooting

**Build échoue ?**

```bash
# Reproduire localement
npm run build
# Vérifier les erreurs TypeScript
npm run type-check
```

**Tests échouent ?**

```bash
npm run test -- --run
# Vérifier les erreurs
```

**Linting échoue ?**

```bash
npm run lint:fix
# Prettier auto-corrige
npm run format
```

---

## Étape 6 : Optimisation pour Production

### Vérifier le bundle

```bash
# Voir la taille du build
npm run build

# Résultat
# dist/assets/app.[hash].js    150 KB
# dist/assets/app.[hash].css   50 KB
# dist/assets/vendor.[hash].js 80 KB
# ≈ 280 KB au total
```

### Lighthouse sur Vercel

1. Aller sur l'URL production
2. F12 → Lighthouse
3. Générer rapport
4. Vérifier scores :
   - Performance : 90+
   - Accessibility : 90+
   - Best Practices : 90+
   - SEO : 90+

---

## Étape 7 : Configuration Complète pour Recruiter

Votre portfolio doit montrer :

✅ **README.md professionnel** (1000+ lignes)
✅ **ARCHITECTURE.md rigoureux** (500+ lignes)
✅ **GitHub Actions CI/CD** automatisé
✅ **Deployments Vercel** automatiques
✅ **Tests unitaires** avec coverage
✅ **Linting + Formatting** configuré
✅ **TypeScript strict mode**
✅ **Bonnes pratiques** évidentes

### Badges pour le README

```markdown
[![CI/CD Pipeline](https://github.com/[user]/job-tracker/actions/workflows/ci.yml/badge.svg)](...)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](...)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](...)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000)](...)
```

---

## Checklist Finale

### Avant de pusher

- [ ] `npm run type-check` passe
- [ ] `npm run lint` passe
- [ ] `npm run format:check` passe
- [ ] `npm run test -- --run` passe
- [ ] `npm run build` réussit
- [ ] Code committé avec messages clairs
- [ ] Branch poussée

### Après le push

- [ ] GitHub Actions lance le workflow
- [ ] Tous les jobs passent ✅
- [ ] Production URL updated sur Vercel
- [ ] Vérifier l'app en production

### Recruiter Review

- [ ] README impressionnant
- [ ] ARCHITECTURE détaillé
- [ ] Code propre et typé
- [ ] Tests présents
- [ ] CI/CD visible
- [ ] Deployments automatiques

---

## Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Building for Production](https://vitejs.dev/guide/build.html)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)

---

**Last Updated** : Novembre 2025
