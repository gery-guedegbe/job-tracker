# 🚀 Quick Start - GitHub Actions & Vercel

> Setup guide rapide (5 min) pour CI/CD automatique

---

## Vous avez 3 options :

### Option 1️⃣ : Setup Complet (Recommandé)

**Temps** : 10 min | **Inclut** : Tests + Lint + Build + Deploy Vercel

Voir → [`GITHUB_ACTIONS_GUIDE.md`](./GITHUB_ACTIONS_GUIDE.md)

---

### Option 2️⃣ : CI Seulement (Sans Vercel)

**Temps** : 2 min | **Inclut** : Tests + Lint + Build (pas deploy)

```bash
# Rien à faire ! Utilisez simplement ci-simple.yml
# Renommez dans .github/workflows/ :
mv ci.yml ci-full.yml      # Archiver le complet
mv ci-simple.yml ci.yml    # Utiliser le simple
git push
```

Les tests vont s'exécuter automatiquement ! ✅

---

### Option 3️⃣ : Aucune CI (Pour Plus Tard)

**Temps** : 0 | **Inclut** : Rien

```bash
# Simplement supprimer les workflows
rm -rf .github/workflows/
git push
```

Vous pouvez configurer plus tard.

---

## ⚡ Test Rapide (Localement d'abord)

Avant de pousser vers GitHub, testez localement :

```bash
# Lint
npm run lint

# Tests
npm run test:run

# Build
npm run build
```

Si tout passe ✅, alors pusher !

---

## 📊 Voir l'État de la CI

1. Aller à https://github.com/gery-guedegbe/job-tracker
2. Cliquer "Actions"
3. Voir l'exécution en direct !

---

## ✅ Après Setup

- Le code est automatiquement validé
- Les tests tournent automatiquement
- La production se déploie automatiquement (si Vercel configuré)
- Zéro intervention manuelle ! 🎉

---

**Besoin d'aide** ? Voir [`GITHUB_ACTIONS_GUIDE.md`](./GITHUB_ACTIONS_GUIDE.md)
