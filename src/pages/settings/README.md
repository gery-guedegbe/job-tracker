# Settings Module — JobTrackr

Ce dossier contient tous les composants liés à la page **Paramètres** (`SettingsPage`).

## Objectif

Offrir une interface complète, modulaire et maintenable pour gérer :

- le thème (clair/sombre)
- la langue (fr/en)
- la sauvegarde automatique
- la gestion des données locales
- la réinitialisation complète de l’application

---

## Structure

src/pages/settings/
├── SettingsPage.tsx → Composant principal : logique + orchestration
└── components/
├── SettingsHeader.tsx → Titre & description
├── AppearanceSettings.tsx → Choix du thème
├── LanguageSettings.tsx → Choix de la langue
├── GeneralSettings.tsx → Options générales (auto-save)
├── DangerZone.tsx → Suppression / reset + dialogues
├── ClearDataDialog.tsx → Dialogue suppression des données
├── ResetAppDialog.tsx → Dialogue réinitialisation complète
├── SaveButton.tsx → Bouton de sauvegarde
└── AboutCard.tsx → Informations sur l’application

---

## Bonnes pratiques

- Chaque sous-composant est **purement déclaratif** (pas de logique métier).
- La logique est **centralisée dans `SettingsPage`**.
- Le typage est strict pour éviter les erreurs d’intégration.
- Les noms des fichiers suivent la **convention PascalCase**.
- Les composants UI proviennent des modules `@/components/ui/`.

---

## Cycle de mise à jour

1. `SettingsPage` reçoit `settings` depuis un parent (via props).
2. L’état local est synchronisé via `useEffect`.
3. L’utilisateur modifie les options.
4. Les changements sont sauvegardés dans IndexedDB via `db.updateSettings()`.
5. Un `toast` confirme la réussite.
