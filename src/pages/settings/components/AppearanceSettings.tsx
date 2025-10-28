import { Palette } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/CardExtended";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/Select";
import { Label } from "../../../components/ui/Label";
import type { Translation } from "../../../lib/i18n";
import { Card } from "../../../components/ui/Card";

/**
 * AppearanceSettings
 * Gère le thème clair/sombre.
 */
export const AppearanceSettings = ({
  theme,
  onThemeChange,
  t,
}: {
  theme: "light" | "dark";
  onThemeChange: (value: string) => void;
  t: Translation;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Palette className="h-5 w-5" />
        {t.settings.appearance.title}
      </CardTitle>
      <CardDescription>{t.settings.appearance.description}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t.settings.appearance.theme.label}</Label>
          <p className="text-muted-foreground text-sm">
            {t.settings.appearance.theme.description}
          </p>
        </div>

        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="light">
              {t.settings.appearance.theme.light}
            </SelectItem>
            <SelectItem value="dark">
              {t.settings.appearance.theme.dark}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);
