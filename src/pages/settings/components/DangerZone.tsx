import { AlertTriangle, Trash2 } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/CardExtended";
import { Button } from "../../../components/ui/button";
import type { Translation } from "../../../lib/i18n";
import { Card } from "../../../components/ui/Card";
import { ClearDataDialog } from "./ClearDataDialog";
import { ResetAppDialog } from "./ResetAppDialog";

/**
 * DangerZone
 * Section critique des paramètres (suppression / réinitialisation).
 * Contient les boutons d’action et les deux boîtes de dialogue modales.
 */
export const DangerZone = ({
  t,
  onClearData,
  onResetApp,
  clearDataDialogOpen,
  resetAppDialogOpen,
  setClearDataDialogOpen,
  setResetAppDialogOpen,
  handleClearData,
  handleReset,
}: {
  t: Translation;
  onClearData: () => void;
  onResetApp: () => void;
  clearDataDialogOpen: boolean;
  resetAppDialogOpen: boolean;
  setClearDataDialogOpen: (open: boolean) => void;
  setResetAppDialogOpen: (open: boolean) => void;
  handleClearData: () => void;
  handleReset: () => void;
}) => (
  <Card className="border-destructive">
    <CardHeader>
      <CardTitle className="text-destructive flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        {t.settings.dangerZone.title}
      </CardTitle>
      <CardDescription>{t.settings.dangerZone.description}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      {/* Effacer les données uniquement */}
      <div className="flex flex-col items-end justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-start">
        <div className="flex-1 space-y-1">
          <p className="font-medium">
            {t.settings.dangerZone.clearData.button}
          </p>

          <p className="text-muted-foreground text-sm">
            Supprime toutes vos candidatures, tâches et notes, mais conserve vos
            paramètres.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0 gap-2 text-sm lg:text-base"
          onClick={onClearData}
        >
          <Trash2 className="h-4 w-4" />

          {t.common.delete}
        </Button>
      </div>

      {/* Réinitialisation complète */}
      <div className="border-destructive bg-destructive/5 flex flex-col items-end justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-start">
        <div className="flex-1 space-y-1">
          <p className="text-destructive font-medium">
            {t.settings.dangerZone.reset.button}
          </p>

          <p className="text-muted-foreground text-sm">
            Supprime TOUT : candidatures, tâches, notes et paramètres. Retour à
            l'état initial.
          </p>
        </div>

        <Button
          variant="destructive"
          className="shrink-0 gap-2 text-sm lg:text-base"
          onClick={onResetApp}
        >
          <Trash2 className="h-4 w-4" />

          {t.common.reset}
        </Button>
      </div>
    </CardContent>

    {/* Dialogues */}
    <ClearDataDialog
      open={clearDataDialogOpen}
      onOpenChange={setClearDataDialogOpen}
      onConfirm={handleClearData}
      t={t}
    />

    <ResetAppDialog
      open={resetAppDialogOpen}
      onOpenChange={setResetAppDialogOpen}
      onConfirm={handleReset}
      t={t}
    />
  </Card>
);
