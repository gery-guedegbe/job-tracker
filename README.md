# JobTrackr

> Un système moderne et intuitif de gestion des candidatures construits avec React, TypeScript et les meilleures pratiques de développement.

[![CI/CD Pipeline](https://github.com/gery-guedegbe/job-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/gery-guedegbe/job-tracker/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-5165FF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Aperçu

**JobTrackr** est une application web progressive conçue pour aider les professionnels à gérer efficacement leur recherche d'emploi. Complètement **offline-first**, elle stocke toutes les données localement dans IndexedDB, sans serveur backend ni synchronisation cloud.

### 🎯 Caractéristiques Principales

- **📊 Vue Kanban intuitive** : Organisez vos candidatures par statut
- **📋 Vue Liste complète** : Tous les détails en un coup d'œil
- **📈 Tableaux analytiques** : Statistiques en temps réel et tendances
- **✅ Gestion des tâches** : Préparez vos entretiens avec des tâches liées
- **📝 Système de notes** : Annotez vos candidatures
- **🌍 Multilingue** : Support natif du français et anglais
- **🎨 Thème clair/sombre** : Sélection persistante
- **💾 Stockage local** : IndexedDB pour la persistance
- **📤 Import/Export** : Sauvegardez et transférez vos données
- **♿ Accessible** : Navigation au clavier, contraste optimal
- **⚡ Ultra-performante** : Lighthouse 90+, < 2s load time
- **📱 Responsive** : Fonctionne sur tous les appareils

---

## 🏗️ Stack Technologique

### Frontend

| Catégorie            | Technologies                             |
| -------------------- | ---------------------------------------- |
| **Langage**          | TypeScript 5.9 (mode strict)             |
| **Framework**        | React 19.1 (Hooks & Composition)         |
| **Builder**          | Vite 7.1 (bundling ultra-rapide)         |
| **UI Components**    | React + TypeScript **custom components** |
| **Styling**          | TailwindCSS 4.1 (utility-first CSS)      |
| **Forms**            | Zod 4.1 (validation runtime)             |
| **State Management** | React Context API                        |
| **Database**         | Dexie.js 4.2 (IndexedDB wrapper)         |
| **Routing**          | React Router DOM 7.9                     |
| **Charting**         | Recharts 3.3 (data visualization)        |
| **Notifications**    | React Hot Toast 2.6                      |
| **Animations**       | Motion 12.23 (smooth transitions)        |
| **Icons**            | Lucide React 0.546 (SVG icons)           |
| **Scrollbars**       | Tailwind Scrollbar Hide 4.0              |

### Development Tools

| Outil                           | Version | Rôle                         |
| ------------------------------- | ------- | ---------------------------- |
| **ESLint**                      | 9.38    | Linting et qualité           |
| **Prettier**                    | 3.6     | Code formatting              |
| **TypeScript**                  | 5.9     | Type checking strict         |
| **Vitest**                      | 3.2     | Unit testing framework       |
| **React Testing Library**       | 16.3    | Component & behavior testing |
| **@testing-library/user-event** | latest  | User interaction simulation  |
| **Tailwind Prettier Plugin**    | 0.7     | Prettier integration         |
| **jsdom**                       | latest  | DOM simulation (tests)       |

### Deployment

- **Build** : Vite (production-optimized)
- **Hosting** : Vercel (CDN global, deployments automatiques)
- **CI/CD** : GitHub Actions (tests & validations)

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** : 20.x ou supérieur
- **npm** : 10.x ou supérieur
- **Git** : Pour cloner le repository

### Installation

```bash
# Cloner le repository
git clone https://github.com/gery-guedegbe/job-tracker.git
cd job-tracker

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible à : **`http://localhost:5173`**

### Variables d'Environnement (Optionnel)

Créez `.env.local` à la racine (non nécessaire pour le développement) :

```env
VITE_API_URL=http://localhost:5173
VITE_DEBUG=false
```

**Note** : Variables exposées au client (pas de secrets)

---

## 📦 Scripts Disponibles

### Développement

```bash
# Serveur dev avec hot reload
npm run dev

# Builder pour production
npm run build

# Prévisualiser le build production en local
npm run preview
```

### Qualité du Code

```bash
# Linting ESLint
npm run lint

# Formatage Prettier
npm run format
```

### Tests

```bash
# Mode watch - Re-lancer tests auto à chaque modification
npm run test

# Une fois - Lancer tous les tests et s'arrêter
npm run test:run

# Interface visuelle - Dashboard Vitest graphique
npm run test:ui

# Rapport de couverture - % du code couvert par tests
npm run test:coverage
```

---

## 🏛️ Architecture & Structure

### Vue d'Ensemble

```
React Components (Présentation)
        ↓
State Management (React Context)
        ↓
Business Logic (Database, Validation)
        ↓
IndexedDB Storage (Données persistantes)
```

### Arborescence du Projet

```
src/
├── pages/                    # Composants au niveau des routes
│   ├── kanban-view/         # Vue Kanban (principale)
│   ├── list-view/           # Vue Liste avec tableau
│   ├── statistics/          # Tableaux analytiques et graphiques
│   ├── tasks/               # Gestion des tâches
│   ├── notes/               # Système de notes
│   ├── settings/            # Paramètres utilisateur
│   ├── import_export/       # Import/Export de données
│   ├── dashboard/           # Redirection vers kanban
│   └── onboarding/          # Flow d'onboarding
│
├── components/              # Composants réutilisables
│   ├── ui/                  # 17 composants atomiques custom-built
│   │   ├── button.tsx      # Boutons avec variants/sizes
│   │   ├── button.test.tsx  # Tests du composant (7 tests)
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Dialog.tsx
│   │   └── ... (voir dossier)
│   ├── navbar/              # Navigation principale
│   ├── footer/              # Pied de page
│   ├── onboarding/          # Composants d'onboarding
│   ├── ApplicationCard.tsx  # Affichage candidature
│   └── ApplicationModal.tsx # Formulaire ajout/édition
│
├── lib/
│   ├── db.ts               # Abstraction IndexedDB (CRUD operations)
│   ├── db.test.ts          # Tests database (11 tests CRUD)
│   ├── sample-data.ts      # Données d'exemple
│   └── i18n/               # Internationalisation
│       ├── context.tsx     # Context Provider
│       ├── index.ts        # Exports
│       ├── utils.ts        # Utilitaires de traduction
│       ├── toast-messages.ts # Messages des notifications
│       └── locales/        # Traductions
│           ├── en.ts       # Anglais
│           └── fr.ts       # Français
│
├── types/
│   └── index.ts            # Définitions TypeScript (6 interfaces)
│
├── utils/
│   ├── cn.ts               # Merger de classnames TailwindCSS
│   └── cn.test.ts          # Tests utility (12 tests)
│
├── styles/
│   └── index.css           # Styles globaux TailwindCSS
│
├── layouts/
│   └── DashboardLayout.tsx # Layout principal avec navbar/footer
│
├── assets/
│   └── logos/              # Images et assets
│
├── test/                   # Configuration Vitest
│   ├── setup.ts            # Setup global (cleanup, matchers)
│   └── utils.tsx           # Custom render function
│
├── App.tsx                 # Composant racine avec routage
└── main.tsx                # Point d'entrée React
```

### Alias d'Imports

Raccourcis pour éviter les chemins relatifs profonds :

```typescript
// ✅ Clair et concis
import { Button } from "@components/ui/button";
import { Application } from "@types";
import { cn } from "@utils";
import Dashboard from "@pages/dashboard";

// ❌ Avant (sans alias)
import { Button } from "../../../../components/ui/button";
```

Configurés dans `vite.config.ts` et `tsconfig.json`.

---

## 📊 Modèle de Données

Toutes les données sont typées avec TypeScript et validées avec Zod.

### Application (Candidature)

```typescript
interface Application {
  id: string; // UUID unique
  jobTitle: string; // Titre du poste
  company: string; // Entreprise
  status:
    | "to_apply"
    | "sent"
    | "followed_up"
    | "interview"
    | "offer"
    | "rejected"; // Statut workflow
  applicationDate: string; // YYYY-MM-DD
  notes: string; // Notes libres
  tags: string[]; // Catégorisation
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### Task (Tâche)

```typescript
interface Task {
  id: string; // UUID
  title: string; // Titre
  description: string; // Description
  dueDate: string; // YYYY-MM-DD
  completed: boolean; // État complétion
  applicationId?: string; // Lien optionnel à Application
  createdAt: string; // ISO 8601
}
```

### Note

```typescript
interface Note {
  id: string; // UUID
  title: string; // Titre
  content: string; // Contenu
  tags: string[]; // Catégorisation
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### AppSettings

```typescript
interface AppSettings {
  theme: "light" | "dark"; // Thème visuel
  language: "fr" | "en"; // Langue interface
  autoSave: boolean; // Auto-save enabled
  onboardingCompleted: boolean; // Onboarding vu
}
```

---

## 💾 Base de Données

**Local-first** : Aucun serveur nécessaire, toutes les données sont stockées localement.

### IndexedDB

Utilise IndexedDB (native browser API) via `Dexie.js` pour une abstraction Promise-based.

**Stores créés** (4 object stores) :

- `applications` - Candidatures
- `tasks` - Tâches
- `notes` - Notes
- `settings` - Paramètres utilisateur

### API Database (`lib/db.ts`)

Interface Promise-based standardisée :

```typescript
// Initialisation (appelée dans App.tsx au démarrage)
await db.init();

// ========== APPLICATIONS ==========
const apps = await db.getApplications(); // Tous
await db.addApplication(app); // Créer
await db.updateApplication(app); // Mettre à jour
await db.deleteApplication(id); // Supprimer

// ========== TASKS ==========
const tasks = await db.getTasks(); // Tous
await db.addTask(task);
await db.updateTask(task);
await db.deleteTask(id);

// ========== NOTES ==========
const notes = await db.getNotes(); // Tous
await db.addNote(note);
await db.updateNote(note);
await db.deleteNote(id);

// ========== SETTINGS ==========
const settings = await db.getSettings();
await db.updateSettings(settings);

// ========== IMPORT/EXPORT ==========
const allData = await db.exportData(); // Exporter JSON
await db.importData(allData); // Importer JSON
await db.clearAllData(); // Effacer tout
```

### Import/Export

Fonctionnalité accessible dans Settings → Import/Export :

```typescript
// Exporter les données
const data = await db.exportData();
const json = JSON.stringify(data);
// Télécharge un fichier JSON

// Importer depuis fichier
const fileContent = await file.text();
const importedData = JSON.parse(fileContent);
await db.importData(importedData);
```

---

## 🌍 Internationalisation

### Langues Supportées

- **Français** (`fr`) - Par défaut
- **Anglais** (`en`)

### Utilisation

```typescript
import { useTranslation } from '@/lib/i18n'

export const MyComponent = () => {
  const t = useTranslation()
  return <h1>{t.common.loading}</h1>
}
```

### Ajouter une Langue

1. Créer `src/lib/i18n/locales/[lang].ts`
2. Copier structure de `fr.ts`
3. Traduire les clés
4. Ajouter option dans settings

---

## 🎨 Composants UI Personnalisés

Tous les **17 composants sont custom-built** avec React et TailwindCSS. Aucune dépendance externe (comme Radix UI).

### 17 Composants Disponibles

| Composant          | Usage                      | Fichier              |
| ------------------ | -------------------------- | -------------------- |
| **Button**         | Boutons avec variants/size | `button.tsx` (testé) |
| **Card**           | Conteneurs                 | `Card.tsx`           |
| **CardExtended**   | Card avancée               | `CardExtended.tsx`   |
| **Input**          | Champs texte               | `Input.tsx`          |
| **Textarea**       | Zone de texte              | `Textarea.tsx`       |
| **Dialog**         | Modales                    | `Dialog.tsx`         |
| **AlertDialog**    | Confirmations              | `AlertDialog.tsx`    |
| **Select**         | Dropdowns/Sélecteurs       | `Select.tsx`         |
| **Checkbox**       | Cases à cocher             | `Checkbox.tsx`       |
| **Switch**         | Toggles on/off             | `Switch.tsx`         |
| **Label**          | Étiquettes formulaire      | `Label.tsx`          |
| **Badge**          | Badges (statuts)           | `Badge.tsx`          |
| **ProgressBar**    | Barres de progression      | `ProgressBar.tsx`    |
| **Table**          | Tableaux HTML              | `Table.tsx`          |
| **ScrollArea**     | Zones scrollables custom   | `ScrollArea.tsx`     |
| **Sheet**          | Sidebars/Drawers           | `Sheet.tsx`          |
| **SlideIndicator** | Paginateurs visuels        | `SlideIndicator.tsx` |

### Exemple d'Utilisation

```typescript
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/Card'
import { Input } from '@components/ui/Input'

export const MyForm = () => {
  const [title, setTitle] = useState('')

  return (
    <Card className="p-4">
      <h2>Créer</h2>
      <Input
        placeholder="Titre..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={() => console.log(title)}>
        Enregistrer
      </Button>
    </Card>
  )
}
```

---

## ✅ Assurance Qualité

### GitHub Actions CI/CD

À chaque **push/PR** sur main, exécute automatiquement :

```yaml
✓ ESLint validation    (code quality)
✓ Unit tests (Vitest)  (30 tests)
✓ TypeScript check     (type safety)
✓ Production build     (no errors)
✓ Deploy Vercel        (main branch only)
```

Voir `.github/workflows/` pour les configurations.

---

## 🧪 Tests

**Strategy** : Tests orientés **comportement utilisateur**, axés sur le "what" pas le "how".

### Structure des Tests

```
src/
├── components/ui/button.test.tsx      # 7 tests (render, click, disabled, variants)
├── utils/cn.test.ts                  # 12 tests (merge, filter, edge cases)
└── lib/db.test.ts                    # 11 tests (CRUD, workflows, isolation)
```

### Types de Tests

| Type               | Dossier      | Fichier      | Tests | Description                       |
| ------------------ | ------------ | ------------ | ----- | --------------------------------- |
| **Composants**     | `components` | `*.test.tsx` | 7     | Render, interaction, props        |
| **Utilitaires**    | `utils`      | `*.test.ts`  | 12    | Pure functions, logic             |
| **Business Logic** | `lib`        | `*.test.ts`  | 11    | CRUD, async, workflows, isolation |

### Lancer les Tests

```bash
# Mode watch - Auto re-run lors de modifications
npm run test

# Une fois - Utile pour CI/CD
npm run test:run

# Interface Vitest UI - Visuel avec résultats détaillés
npm run test:ui

# Couverture - % du code couvert
npm run test:coverage
```

### Configuration

**Fichiers clés** :

- `vitest.config.ts` - Configuration du runner
- `src/test/setup.ts` - Setup global (cleanup, matchers)
- `src/test/utils.tsx` - Custom render wrapper

### Exemple de Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Button } from '@components/ui/button'

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click</Button>)
    expect(screen.getByText('Click')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    const user = userEvent.setup()
    await user.click(screen.getByText('Click'))

    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Coverage

```bash
npm run test:coverage
```

Génère un rapport HTML dans `coverage/` montrant :

- % de lignes couvertes
- % de branches couvertes
- % de fonctions couvertes
- Fichiers non testés

**Objectif** : > 80% coverage

---

## 🌐 Déploiement

### Vercel

```bash
# 1. Connecter repo GitHub à Vercel

# 2. Configuration automatique (Vite detected)

# 3. À chaque push main → Production
   À chaque PR → Preview URL
```

### Build Local

```bash
npm run build
npm run preview
```

---

## ♿ Accessibilité

Respecte **WCAG 2.1** :

- ✅ Navigation clavier
- ✅ Contraste 4.5:1
- ✅ Sémantique HTML
- ✅ Focus visible
- ✅ ARIA labels
- ✅ Responsive 200%

---

## 📈 Performance

- **Bundle** : ~250 KB (gzip)
- **Lighthouse** : 90+
- **TTI** : < 2s (4G)
- **Core Web Vitals** : Good

**Optimisations** :

- Code splitting (routes)
- Tree-shaking
- CSS purging
- IndexedDB caching
- React memoization

---

## 🔐 Sécurité

- ✅ Local-first (pas de données envoyées)
- ✅ XSS prevention (React built-in)
- ✅ Input validation (Zod)
- ✅ HTTPS enforced (Vercel)
- ❌ Pas de secrets en code

---

## 🛠️ Workflow Développement

### Branches

```
main (production)
  ↑
  ← feature/amazing-feature
```

### Commit Format

```bash
feat: add kanban filtering
fix: resolve sorting bug
docs: update README
refactor: simplify modal
test: add Button tests
```

### PR Process

1. `git checkout -b feature/my-feature`
2. Commits réguliers
3. `git push origin feature/my-feature`
4. Créer PR
5. CI/CD valide automatiquement
6. Merge après approval
7. Vercel déploie

---

## 📚 Pages & Fonctionnalités

**8 pages** construites sur React Router 7.

### 🎯 Vue Kanban (`/kanban-view`)

Visualisation Kanban par statuts :

- **À postuler** - Candidatures non envoyées
- **Envoyée** - Postulée, en attente
- **Relancée** - Suivi effectué
- **Entretien** - Entretien programmé
- **Offre reçue** - Offre d'emploi
- **Rejetée** - Candidature rejetée

Chaque colonne : drag & drop, édition inline, suppression

### 📋 Vue Liste (`/list-view`)

Tableau complet avec :

- Toutes les colonnes visibles
- Filtrage par statut/tags
- Tri par date/titre/entreprise
- Édition directe

### 📊 Statistiques (`/statistics`)

Trois sections :

1. **Résumé (StatsOverview)** - Compte par statut
2. **Tendances mensuelles (MonthlyTrendChart)** - Graphique ligne
3. **Distribution (StatusDistributionChart)** - Graphique pie

### ✅ Tâches (`/tasks`)

Gestion des tâches associées aux candidatures :

- Lister toutes les tâches
- Groupées par candidature (TaskSection)
- Cocher pour marquer complétées
- Filtrer par statut complétion

### 📝 Notes (`/notes`)

Système de notes :

- Créer/éditer/supprimer notes
- Recherche en temps réel (NotesSearchBar)
- Tags pour catégorisation
- Aperçu dans NoteCard

### ⚙️ Paramètres (`/settings`)

Options utilisateur :

- **Thème** : Clair/Sombre (AppearanceSettings)
- **Langue** : Français/Anglais (LanguageSettings)
- **Import/Export** : Données JSON
- **Réinitialiser** : Effacer tout
- **À propos** : Info app

### 📤 Import/Export (`/import-or-export`)

Sauvegarde/restauration :

- Exporter toutes les données en JSON
- Télécharger fichier
- Importer fichier JSON existant
- Confirmation avant import (dialogue)

### 🎓 Onboarding (`/onboarding`)

Guide visuel au premier lancement :

- Démonstration des 4 pages principales (SlideCard)
- SwipeCard pour navigation
- SlideIndicator pour progression
- Skip ou compléter le flow

## 💡 Concepts & Patterns

### React Patterns Utilisés

| Pattern                   | Usage                                               |
| ------------------------- | --------------------------------------------------- |
| **Hooks**                 | `useState`, `useEffect`, `useContext`, custom hooks |
| **Context API**           | Traduction (i18n) globale                           |
| **Lazy Routes**           | Code-splitting par page                             |
| **Controlled Components** | Formulaires (input, select, textarea)               |
| **Composition**           | Components composés (Card, Modal, etc.)             |

### State Management

```typescript
// Local State
const [isOpen, setIsOpen] = useState(false);
const [apps, setApps] = useState<Application[]>([]);

// Global State (Context)
const t = useTranslation();
const { updateSettings } = useSettings();
```

### Async/Await Pattern

```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      const applications = await db.getApplications();
      setApplications(applications);
    } catch (error) {
      console.error("Load failed:", error);
    }
  };

  loadData();
}, []);
```

---

## �‍💻 Bonnes Pratiques Implémentées

Ce projet démontre des standards professionnels modernes :

### ✅ Code Quality

- **TypeScript strict** - Pas de `any`, typage complet
- **ESLint** - Règles JavaScript/TypeScript standardisées
- **Prettier** - Formatage automatique et cohérent
- **30+ Tests** - Button (7), cn utility (12), Database (11)

### ✅ Architecture

- **Separation of Concerns** - Pages, Components, Utils, Lib
- **Custom Components** - 17 composants réutilisables
- **Type Safety** - 6 interfaces majeures (Application, Task, Note, etc.)
- **Clean Imports** - Alias (@components, @types, @utils)

### ✅ Performance

- **Vite** - Bundling ultra-rapide (~250 KB gzip)
- **Lazy Routes** - Code-splitting par page
- **Local Storage** - IndexedDB sans serveur
- **Motion Animations** - Transitions lisses

### ✅ User Experience

- **Responsive Design** - Mobile, tablet, desktop
- **Dark/Light Mode** - Persistance du choix
- **Multilingue** - Français/Anglais intégré
- **Offline-First** - Fonctionne sans connexion
- **Import/Export** - Portabilité des données

### ✅ Developer Experience

- **HMR Instantanée** - Refresh automatique
- **Clear Structure** - Organisation logique
- **Comprehensive Docs** - README, ARCHITECTURE, TESTING_GUIDE
- **Git-Friendly** - Commits atomiques, branches claires

### ✅ Testing

- **Unit Tests** - Components, utils, business logic
- **Vitest** - Fast et compatible Jest
- **React Testing Library** - Testing interactions réalistes
- **Custom Setup** - Global config, custom render

---

## 📚 Ressources & Documentation

### Documentation Interne

- **README.md** - Ce fichier
- **ARCHITECTURE.md** - Système design et data flow
- **TESTING_GUIDE.md** - Guide complet des tests
- **DEPLOYMENT_GUIDE.md** - CI/CD et déploiement Vercel

### Ressources Externes

| Ressource                                     | Rôle                |
| --------------------------------------------- | ------------------- |
| [React 19 Docs](https://react.dev/)           | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | Type system         |
| [Vite Guide](https://vitejs.dev/)             | Build tool          |
| [TailwindCSS Docs](https://tailwindcss.com/)  | Styling framework   |
| [React Router](https://reactrouter.com/)      | Client-side routing |
| [Dexie.js](https://dexie.org/)                | IndexedDB wrapper   |
| [Zod Docs](https://zod.dev/)                  | Schema validation   |
| [Vitest Docs](https://vitest.dev/)            | Testing framework   |

### Outils Recommandés

- **IDE** : [VS Code](https://code.visualstudio.com/)
- **Extensions VS Code** :
  - Prettier - Code Formatter
  - ESLint
  - Tailwind CSS IntelliSense
  - React DevTools (browser)

---

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connecter repo GitHub à [Vercel](https://vercel.com)
2. Configuration automatique (Vite détecté)
3. À chaque push `main` → déploiement production
4. PR → Preview URLs automatiques

### Build Local

```bash
npm run build     # Crée dist/
npm run preview   # Sert le build
```

Voir `DEPLOYMENT_GUIDE.md` pour GitHub Actions.

---

## 🔐 Sécurité

- ✅ **Local-first** - Aucune donnée envoyée au serveur
- ✅ **XSS Prevention** - React échappe par défaut
- ✅ **Input Validation** - Zod validation
- ✅ **HTTPS Only** - Vercel force HTTPS
- ❌ **Pas de secrets** - Aucune clé d'API dans le code

---

## 📝 License

MIT License - Libre d'utilisation et modification

Voir [LICENSE](LICENSE) pour détails.

---

## 🙏 À Propos

**JobTrackr** a été construit pour démontrer :

- ✅ Les bonnes pratiques modernes de développement React
- ✅ Comment structurer un projet professionnel
- ✅ L'importance des tests dans la qualité
- ✅ La documentation comme avantage compétitif
- ✅ Le déploiement CI/CD automatisé

**Auteur** : [Géry GUEDEGBE](https://github.com/gery-guedegbe)  
**Dernière mise à jour** : Novembre 2025  
**Version** : 1.0.0  
**Status** : ✅ Production Ready
