import { Globe } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/CardExtended";
import { Label } from "../../../components/ui/Label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/Select";
import { Card } from "../../../components/ui/Card";
import type { Translation } from "../../../lib/i18n";

/**
 * LanguageSettings
 * Sélection de la langue de l’application.
 */
export const LanguageSettings = ({
  language,
  onLanguageChange,
  t,
}: {
  language: "fr" | "en";
  onLanguageChange: (value: string) => void;
  t: Translation;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Globe className="h-5 w-5" />
        {t.settings.language.title}
      </CardTitle>

      <CardDescription>{t.settings.language.description}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t.settings.language.label}</Label>

          <p className="text-muted-foreground text-sm">
            {t.settings.language.labelDescription}
          </p>
        </div>

        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="fr">{t.settings.language.french}</SelectItem>
            <SelectItem value="en">{t.settings.language.english}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);
