import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/AlertDialog";
import type { Translation } from "../../../lib/i18n";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  t: Translation;
}

/**
 * DeleteTaskDialog
 * Dialogue de confirmation pour supprimer une tâche.
 * Version simplifiée et contrôlée
 */
export const DeleteTaskDialog = ({
  open,
  onOpenChange,
  onConfirm,
  t,
}: DeleteTaskDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{t.taskModal.deleteConfirm.title}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.taskModal.deleteConfirm.description}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {t.common.delete}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
