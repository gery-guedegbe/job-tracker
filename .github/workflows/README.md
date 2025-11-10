# GitHub Actions Workflows

> Pipelines CI/CD automatisées

---

## 📁 Fichiers

| Fichier            | Purpose                                       | Trigger      |
| ------------------ | --------------------------------------------- | ------------ |
| **ci.yml**         | Pipeline complète (lint, test, build, deploy) | push/PR main |
| **ci-simple.yml**  | Pipeline simple (sans Vercel deploy)          | push/PR main |
| **pr-preview.yml** | Validation PR (build preview)                 | PR vers main |

---

## 🚀 Workflows Expliqués

### ci.yml (Complet)

**Étapes** :

```
1. Lint (ESLint)
2. Test (Vitest - 30 tests)
3. Build (Vite)
4. Deploy (Vercel) ← si main branch
```

**Prérequis** : Secrets Vercel configurés

**Commande** : `git push origin main` (déclenche tout)

---

### ci-simple.yml (Simple)

**Étapes** :

```
1. Lint (ESLint)
2. Test (Vitest)
3. TypeScript check
4. Build (Vite)
```

**Prérequis** : Aucun

**Commande** : `git push origin main` (teste et valide seulement)

---

### pr-preview.yml (PR Preview)

**Étapes** :

```
1. Lint
2. Test
3. TypeScript check
4. Build
5. Upload artifact du build
```

**Déclencheur** : Chaque pull request vers main

**Utilité** : Vérifier que la PR ne casse rien avant merge

---

## ⚙️ Configuration

### Activer/Désactiver

Pour **désactiver** un workflow :

1. Renommer le fichier (ex: `ci.yml` → `ci.yml.off`)
2. Ou le supprimer
3. GitHub les détecte automatiquement

Pour **ajouter/modifier** :

1. Éditer le fichier `.yml`
2. Pousser vers main
3. Les changements prennent effet immédiatement

---

## 🔑 Secrets Requis

Uniquement pour **ci.yml** (complet) :

```
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
```

Voir [`GITHUB_ACTIONS_GUIDE.md`](../GITHUB_ACTIONS_GUIDE.md) pour les obtenir.

---

## 📊 Voir les Exécutions

https://github.com/gery-guedegbe/job-tracker/actions

---

## 📝 Syntaxe YAML

Rappel de la syntaxe :

```yaml
name: Mon Workflow # Nom du workflow
on: # Déclencheur
  push:
    branches: [main] # Sur push main
  pull_request:
    branches: [main] # Sur PR vers main

env: # Variables globales
  NODE_VERSION: "20.x"

jobs: # Tâches parallèles
  my-job: # Nom du job
    name: Descriptif # Humain lisible
    runs-on: ubuntu-latest # OS
    timeout-minutes: 10 # Timeout
    needs: other-job # Dépendance

    steps: # Étapes séquentielles
      - name: Mon étape
        run: npm run lint # Commande
        continue-on-error: false # Fail si erreur
```

---

## 🔄 Dépendances entre Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest

  test:
    needs: lint # Attend lint
    runs-on: ubuntu-latest

  build:
    needs: [lint, test] # Attend lint ET test
    runs-on: ubuntu-latest

  deploy:
    needs: build # Attend build
    if: github.ref == 'refs/heads/main'
```

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2025
