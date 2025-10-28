import type { Translation } from "../../../lib/i18n";

/**
 * SettingsHeader
 * Affiche le titre principal et la description de la page des paramètres.
 */
export const SettingsHeader = ({ t }: { t: Translation }) => (
  <div>
    <h2 className="mb-2 text-2xl font-semibold">{t.settings.title}</h2>
    <p className="text-muted-foreground">{t.settings.subtitle}</p>
  </div>
);
