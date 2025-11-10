# GitHub Actions & Vercel Deployment Guide

> Guide complet pour configurer CI/CD automatique et déploiements sur Vercel

---

## 📋 Vue d'Ensemble

Ce guide explique comment mettre en place une **pipeline CI/CD automatique** qui :

1. ✅ Valide le code (ESLint)
2. ✅ Lance les tests (Vitest)
3. ✅ Vérifie les types (TypeScript)
4. ✅ Build production (Vite)
5. ✅ Déploie sur Vercel (automatique)

---

## 🚀 Prérequis

- ✅ Repo GitHub public ou privé
- ✅ Compte Vercel (gratuit)
- ✅ Accès aux Settings du repo GitHub
- ✅ Workflows déjà créés (`.github/workflows/ci.yml`)

---

## 📊 Architecture CI/CD

```
GitHub Push
    ↓
├─ Job: Lint (ESLint)
│  └─ ✓ or ✗ → Notify
│
├─ Job: Test (Vitest - 30 tests)
│  └─ ✓ or ✗ → Notify
│
└─ (if both pass)
   ├─ Job: Build (Vite)
   │  └─ ✓ or ✗ → Notify
   │
   └─ (if main branch only)
      └─ Job: Deploy (Vercel)
         └─ ✓ → Production URL
```

---

## 🔧 ÉTAPE 1 : Créer un Compte Vercel

### 1.1 Inscription

1. Aller sur https://vercel.com/signup
2. Choisir "Continue with GitHub"
3. Autoriser l'accès à vos repositories
4. Créer un compte

### 1.2 Créer un Projet Vercel

1. Aller à https://vercel.com/dashboard
2. Cliquer "Add New..." → "Project"
3. Sélectionner le repo `job-tracker`
4. Configuration :
   - **Framework Preset** : Vite ✓ (auto-détecté)
   - **Build Command** : `npm run build` ✓
   - **Output Directory** : `dist` ✓
   - **Install Command** : `npm ci` ✓
5. Cliquer "Deploy"

✅ Votre app est maintenant déployée sur Vercel !

---

## 🔑 ÉTAPE 2 : Récupérer les Secrets Vercel

Vous avez besoin de 3 informations pour GitHub Actions.

### 2.1 Récupérer le VERCEL_TOKEN

1. Aller à https://vercel.com/account/tokens
2. Cliquer "Create" → "Manage CI/CD Deployments"
3. Donner un nom : `job-tracker-ci`
4. **Copier le token** (vous ne le verrez plus)

### 2.2 Récupérer ORG_ID et PROJECT_ID

Deux approches :

**Option A - Depuis Dashboard Vercel** :

1. Aller à https://vercel.com/dashboard
2. Sélectionner le projet `job-tracker`
3. Aller à "Settings"
4. Copier `Project ID`
5. Aller à "Team Settings" → Copier `Team ID` (= ORG_ID)

**Option B - Depuis le terminal** (si Vercel CLI installée) :

```bash
vercel project inspect --meta
# Affiche les IDs
```

### 2.3 Résumé des 3 secrets

```
VERCEL_TOKEN       = "1234abcd5678efgh..." (token 50+ caractères)
VERCEL_ORG_ID      = "team_abc123def456..."
VERCEL_PROJECT_ID  = "prj_xyz789..."
```

---

## 🔐 ÉTAPE 3 : Configurer GitHub Secrets

### 3.1 Naviguer aux Settings

1. Aller à https://github.com/gery-guedegbe/job-tracker
2. Cliquer "Settings" (onglet repo)
3. Sidebar → "Secrets and variables" → "Actions"

### 3.2 Ajouter les 3 Secrets

1. Cliquer "New repository secret"
2. Ajouter 3 fois :

```
Name: VERCEL_TOKEN
Value: [Coller le token]
Add secret

Name: VERCEL_ORG_ID
Value: [Coller ORG_ID]
Add secret

Name: VERCEL_PROJECT_ID
Value: [Coller PROJECT_ID]
Add secret
```

### 3.3 Vérifier

```
✓ VERCEL_TOKEN         (50+ chars)
✓ VERCEL_ORG_ID        (team_...)
✓ VERCEL_PROJECT_ID    (prj_...)
```

---

## ▶️ ÉTAPE 4 : Activer GitHub Actions

### 4.1 Activer les Workflows

1. Aller à https://github.com/gery-guedegbe/job-tracker
2. Cliquer "Actions" (onglet)
3. Vous devriez voir les workflows disponibles :
   - ✅ CI/CD Pipeline
   - ✅ CI/CD Pipeline (Simple)

### 4.2 Trigger le Workflow

Les workflows se lancent **automatiquement** à chaque :

```
- push sur main
- pull request vers main
```

Pour tester manuellement :

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow"
git push origin main
```

Ensuite, vérifiez sur GitHub Actions.

---

## 📊 ÉTAPE 5 : Vérifier l'Exécution

### 5.1 Voir les Logs

1. Aller à https://github.com/gery-guedegbe/job-tracker/actions
2. Cliquer sur la dernière exécution du workflow
3. Voir les détails de chaque job

### 5.2 Interpréter les Résultats

```
✅ Lint                 → ESLint a validé le code
✅ Test                 → 30 tests passent
✅ Build                → Production build OK
✅ Deploy               → Déploiement réussi

❌ Si un job échoue → Cliquer pour voir l'erreur
```

### 5.3 Badges Status

Ajouter dans README.md :

```markdown
[![CI/CD Pipeline](https://github.com/gery-guedegbe/job-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/gery-guedegbe/job-tracker/actions)
```

---

## 🔄 ÉTAPE 6 : Configuration Continue

### 6.1 Branches Protection

Optionnel mais recommandé :

1. Settings → "Branches" → "Add rule"
2. Pattern : `main`
3. Options :
   - ☑ "Require status checks to pass"
   - ☑ "Require branches to be up to date"
4. Save

Cela force les PRs à passer les tests avant merge.

### 6.2 Notifications

Par défaut, GitHub notifie automatiquement :

- ✉️ Email si workflow échoue
- 🔔 Notifications GitHub

Configurable dans Settings → Notifications.

---

## 📝 Workflow Explanations

### Fichier : `.github/workflows/ci.yml`

**Contenu** :

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

→ S'exécute sur main push/PR

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: npm
      - run: npm ci
      - run: npm run lint
```

→ Lint le code (ESLint)

```yaml
test:
  needs: lint
  steps:
    - ...
    - run: npm run test:run
```

→ Lance les tests (dépend de lint)

```yaml
build:
  needs: [lint, test]
  steps:
    - ...
    - run: npm run build
```

→ Build (dépend de lint + test)

```yaml
deploy:
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  needs: build
  steps:
    - ...
    - uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: --prod
```

→ Déploie sur Vercel (seulement main, pas PR)

---

## 🚨 Troubleshooting

### Problème 1 : "Secrets not found"

**Cause** : Secrets mal nommés ou non créés

**Solution** :

```
✓ VERCEL_TOKEN       (exact)
✓ VERCEL_ORG_ID      (exact)
✓ VERCEL_PROJECT_ID  (exact)
```

Vérifier la casse exacte. GitHub les traite en uppercase.

---

### Problème 2 : "Build command failed"

**Cause** : Dépendances manquantes ou erreur de build

**Solution** :

```bash
# Tester localement
npm ci
npm run build

# Si erreur locale, la corriger d'abord
```

---

### Problème 3 : "Tests failed"

**Cause** : Tests qui échouent

**Solution** :

```bash
# Tester localement
npm run test:run

# Corriger les tests, puis push
git add .
git commit -m "fix: fix failing tests"
git push
```

---

### Problème 4 : "ESLint errors"

**Cause** : Code non conforme ESLint

**Solution** :

```bash
npm run lint
# Voir les erreurs
npm run lint -- --fix
# Auto-corriger ce qui peut l'être
```

---

### Problème 5 : "Vercel deployment failed"

**Cause** : Secrets incorrects ou configuration Vercel mauvaise

**Solution** :

1. Vérifier les 3 secrets (copié/collé correctement)
2. Vérifier que le projet Vercel existe
3. Dans Vercel, Settings → vérifier les variables d'environnement
4. Si besoin, redéployer manuellement depuis Vercel dashboard

---

## ✅ Checklist Post-Setup

- ☑ Compte Vercel créé
- ☑ Projet Vercel lié à GitHub
- ☑ 3 secrets récupérés (TOKEN, ORG_ID, PROJECT_ID)
- ☑ 3 secrets configurés dans GitHub
- ☑ Workflows présents dans `.github/workflows/`
- ☑ Premier push lancé le workflow
- ☑ Tous les jobs passent ✅
- ☑ Deploy en production réussi
- ☑ Badge ajouté au README

---

## 📚 Ressources

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vercel CLI](https://vercel.com/docs/cli)
- [amondnet/vercel-action](https://github.com/amondnet/vercel-action)

---

## 🎯 Résumé

```
Push code
    ↓
GitHub Actions s'exécute automatiquement :
  ✓ ESLint (code quality)
  ✓ Vitest (30 tests)
  ✓ TypeScript (type check)
  ✓ Vite build (production)
    ↓
Si main branch :
  ✓ Déploie sur Vercel (production URL)
    ↓
Équipe notifiée de l'état
```

**Temps total** : 5-10 minutes pour une CI/CD complète ! ⚡

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2025
