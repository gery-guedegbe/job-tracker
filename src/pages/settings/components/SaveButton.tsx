import { Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { Translation } from "../../../lib/i18n";

/**
 * SaveButton
 * Bouton de sauvegarde global pour les paramètres.
 */
export const SaveButton = ({
  onClick,
  t,
}: {
  onClick: () => void;
  t: Translation;
}) => (
  <div className="flex justify-end gap-3 pt-4">
    <Button onClick={onClick} className="gap-2">
      <Save className="h-4 w-4" />
      {t.settings.saveButton}
    </Button>
  </div>
);
