# Tasks Module

## Structure du dossier

tasks/
├── TasksPage.tsx # Composant principal orchestrant la logique
├── components/
│ ├── TasksHeader.tsx # Titre + bouton “Ajouter une tâche”
│ ├── TasksEmptyState.tsx # État vide (aucune tâche)
│ ├── TaskSection.tsx # Regroupe les tâches par catégorie
│ ├── TaskItem.tsx # Carte individuelle de tâche
│ ├── TaskModal.tsx # Modal d’ajout/édition de tâche
│ └── DeleteTaskDialog.tsx # Confirmation de suppression
└── README.md

---

## Objectif du module

Ce dossier gère la fonctionnalité **"Tâches"** de JobTrackr, permettant à l’utilisateur de :

- Ajouter, modifier ou supprimer des tâches,
- Marquer une tâche comme complétée,
- Lier une tâche à une candidature spécifique,
- Visualiser ses tâches regroupées par période (aujourd’hui, semaine, plus tard, terminées).

---

## Composants principaux

| **TasksPage** | Contient la logique principale, les appels à la base de données et l’état global |
| **TasksHeader** | Affiche le titre de la page et le bouton d’ajout |
| **TasksEmptyState** | Affiché lorsqu’aucune tâche n’existe |
| **TaskSection** | Groupe logique pour les tâches selon la période |
| **TaskItem** | Composant visuel d’une tâche unique (avec statut, date, lien vers une application) |
| **TaskModal** | Gère la création et l’édition d’une tâche via un formulaire |
| **DeleteTaskDialog** | Confirme la suppression d’une tâche |

---

## Logique interne

- Les tâches sont stockées dans **IndexedDB** via `db.ts`.
- Le typage est assuré par **TypeScript** pour robustesse.
- Les messages de succès/erreur sont gérés par **react-hot-toast**.
- La traduction et le formatage des dates s’appuient sur le hook `useTranslation`.

---

## Principes d’architecture

- **Découpage modulaire** : chaque bloc UI a un rôle précis, isolé, testable.
- **Séparation logique / présentation** : la logique métier est concentrée dans `TasksPage`, la présentation dans `components/`.
- **Réutilisabilité** : chaque sous-composant est conçu pour être réutilisable dans d’autres pages (ex. `TaskItem` ou `TaskModal`).
- **Accessibilité et maintenabilité** : noms explicites, commentaires structurés et code typé.

---

## Bonnes pratiques

- Utiliser les **hooks React** (`useState`, `useEffect`) pour la gestion locale.
- Préférer des fonctions pures pour les traitements (`getTasksBySection`).
- Garder la **cohérence UI/UX** avec les autres modules (notes, settings, etc.).
- Ajouter des **commentaires clairs et concis** dans chaque composant pour faciliter la reprise par un autre dev.

---
