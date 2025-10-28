import { Card } from "../../../components/ui/Card";
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/CardExtended";
import type { Translation } from "../../../lib/i18n";

/**
 * AboutCard
 * Affiche les informations sur l’application (version, description, stockage...).
 */
export const AboutCard = ({ t }: { t: Translation }) => (
  <Card>
    <CardHeader>
      <CardTitle>{t.settings.about.title}</CardTitle>
    </CardHeader>

    <CardContent className="text-muted-foreground space-y-2 text-sm">
      <p>
        <strong>{t.navbar.appName}</strong> {t.settings.about.version}
      </p>
      <p>{t.settings.about.description}</p>
      <p>{t.settings.about.storage}</p>
    </CardContent>
  </Card>
);
