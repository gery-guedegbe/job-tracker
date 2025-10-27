# Système d'internationalisation (i18n)

## Vue d'ensemble

JobTrackr supporte maintenant plusieurs langues (français et anglais) grâce à un système i18n complet.

## Structure

```
/lib/i18n/
├── locales/
│   ├── fr.ts          # Traductions françaises (langue par défaut)
│   ├── en.ts          # Traductions anglaises
├── context.tsx        # Contexte React et Provider
├── utils.ts           # Utilitaires (labels de statuts, etc.)
├── toast-messages.ts  # Helper pour les messages toast
├── index.ts           # Exports centralisés
└── README.md          # Ce fichier
```

## Utilisation

### 1. Dans un composant React

```tsx
import { useTranslation } from "../lib/i18n";

function MonComposant() {
  const { t, language } = useTranslation();

  return (
    <div>
      <h1>{t.common.title}</h1>
      <p>{t.common.description}</p>
      <p>Langue actuelle: {language}</p>
    </div>
  );
}
```

### 2. Obtenir un label de statut traduit

```tsx
import { useTranslation, getStatusLabel } from "../lib/i18n";

function StatusDisplay({ status }: { status: ApplicationStatus }) {
  const { t } = useTranslation();

  return <span>{getStatusLabel(status, t)}</span>;
}
```

### 3. Format de date selon la langue

```tsx
const { language } = useTranslation();
const formattedDate = new Date().toLocaleDateString(
  language === "fr" ? "fr-FR" : "en-US",
);
```

## Structure des traductions

Les traductions sont organisées par sections logiques :

- `common` - Textes communs (boutons, actions génériques)
- `navbar` - Navigation
- `footer` - Pied de page
- `onboarding` - Introduction
- `statuses` - Statuts des candidatures
- `kanban` - Vue Kanban
- `list` - Vue Liste
- `dashboard` - Tableau de bord
- `tasks` - Tâches
- `notes` - Notes
- `importExport` - Import/Export
- `settings` - Paramètres
- `modal` - Modales (ajout/édition/suppression)
- `taskModal` - Modale des tâches
- `noteModal` - Modale des notes
- `toast` - Messages de notification

## Ajouter une nouvelle traduction

### 1. Ajouter la clé dans `/lib/i18n/locales/fr.ts`

```typescript
export const fr = {
  // ...
  maNouvelleSect ion: {
    monTexte: "Mon texte en français",
    autreTexte: "Autre texte",
  },
};
```

### 2. Ajouter la traduction dans `/lib/i18n/locales/en.ts`

```typescript
export const en: Translation = {
  // ...
  maNouvelleSection: {
    monTexte: "My text in English",
    autreTexte: "Other text",
  },
};
```

### 3. Utiliser dans un composant

```typescript
const { t } = useTranslation();
return <p>{t.maNouvelleSection.monTexte}</p>;
```

## Changer la langue

La langue est changée via la page des paramètres. Le changement est automatique et persiste dans IndexedDB.

```typescript
// Dans SettingsPage.tsx
<Select
  value={localSettings.language}
  onValueChange={(value: "fr" | "en") =>
    setLocalSettings({ ...localSettings, language: value })
  }
>
  <SelectItem value="fr">{t.settings.language.french}</SelectItem>
  <SelectItem value="en">{t.settings.language.english}</SelectItem>
</Select>
```

## TypeScript

Le système utilise TypeScript pour garantir la cohérence des traductions. Le type `Translation` est défini à partir des traductions françaises et réutilisé pour l'anglais, ce qui garantit que toutes les clés sont présentes dans les deux langues.

```typescript
// locales/fr.ts
export const fr = { ... };
export type Translation = typeof fr;

// locales/en.ts
import { Translation } from "./fr";
export const en: Translation = { ... }; // TypeScript vérifie la cohérence
```

## Notes importantes

- La langue par défaut est le français (`fr`)
- Les traductions sont chargées au démarrage de l'application
- Le changement de langue est immédiat (pas besoin de recharger la page)
- Les dates et formats numériques s'adaptent automatiquement à la langue
- Tous les composants doivent utiliser `useTranslation()` au lieu de texte en dur
