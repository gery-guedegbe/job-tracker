/**
 * EmptyState.tsx
 * ----------------
 * État affiché lorsque l'utilisateur n’a aucune donnée statistique.
 */

import { FileText } from "lucide-react";
import { CardContent } from "../../../components/ui/CardExtended";
import type { Translation } from "../../../lib/i18n";
import { Card } from "../../../components/ui/Card";

interface EmptyStateProps {
  t: Translation;
}

export const EmptyState = ({ t }: EmptyStateProps) => (
  <Card>
    <CardContent className="py-12 text-center">
      <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />

      <h3 className="mb-2 text-lg font-semibold">{t.dashboard.emptyState}</h3>

      <p className="text-muted-foreground">
        {t.dashboard.emptyStateDescription}
      </p>
    </CardContent>
  </Card>
);
