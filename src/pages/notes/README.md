# Module Notes — Documentation technique

## Aperçu

Le module Notes gère les notes des utilisateurs dans l'application JobTrackr.
Il permet aux utilisateurs de créer, modifier, supprimer, rechercher et étiqueter des notes relatives à leurs candidatures ou projets.

Ce module a été conçu en mettant l'accent sur :

- Clarté et réactivité de l'interface utilisateur/expérience utilisateur (Tailwind + shadcn/ui)
- Modularité des composants et lisibilité du code
- Persistance localedb via la couche personnalisée
- Prise en charge de l'internationalisation (i18n) (français et anglais)

Structure des dossiers

/notes
├── NotesPage.tsx # Main container, orchestrates the module
├── NotesHeader.tsx # Page header (title, add button)
├── NotesSearchBar.tsx # Search bar with icon and input
├── NotesGrid.tsx # Displays the list of notes
├── NoteCard.tsx # Single note card UI (title, content, tags)
├── NoteModal.tsx # Add/Edit note modal component
├── DeleteNoteDialog.tsx # Confirmation dialog for deletion
├── README.md # Technical documentation (this file)

Responsabilités des composants

Composant Description

NotesPage.tsx Composant logique central gérant l'état, les opérations de base de données et le rendu des sous-composants. Gère les actions CRUD, la recherche, le filtrage et la visibilité des dialogues.
NotesHeader.tsx Affiche le titre de la page principale et le bouton « Ajouter une note ». Séparation claire des niveaux visuel et logique.
NotesSearchBar.tsx Saisie contrôlée avec icône de recherche. Filtre les notes en temps réel.
NotesGrid.tsx Grille réactive pour fiches. Gestion optimale des états vides.
NoteCard.tsx Encapsule le rendu des notes individuelles (titre, balises, actions de modification/suppression). Utilise les icônes Badge, Buttonet Lucide.
NoteModal.tsx Formulaire modal d'ajout/modification. Gestion dynamique des titres, du contenu et des balises.
DeleteNoteDialog.tsx Affiche une confirmation avant de supprimer une note. Boîte de dialogue d'alerte légère et réutilisable.
