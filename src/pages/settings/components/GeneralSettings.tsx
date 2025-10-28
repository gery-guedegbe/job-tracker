import { Settings } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/CardExtended";
import { Switch } from "../../../components/ui/Switch";
import { Label } from "../../../components/ui/Label";
import { Card } from "../../../components/ui/Card";
import type { Translation } from "../../../lib/i18n";

/**
 * GeneralSettings
 * Gère les options générales comme l’auto-save.
 */
export const GeneralSettings = ({
  autoSave,
  onToggleAutoSave,
  t,
}: {
  autoSave: boolean;
  onToggleAutoSave: (checked: boolean) => void;
  t: Translation;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Settings className="h-5 w-5" />
        {t.settings.general.title}
      </CardTitle>
      <CardDescription>{t.settings.general.description}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t.settings.general.autoSave.label}</Label>
          <p className="text-muted-foreground text-sm">
            {t.settings.general.autoSave.description}
          </p>
        </div>
        <Switch
          id="auto-save"
          checked={autoSave}
          onCheckedChange={onToggleAutoSave}
        />
      </div>
    </CardContent>
  </Card>
);
