import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/AlertDialog";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";
import type { Translation } from "../../../lib/i18n";

/**
 * DeleteTaskDialog
 * Dialogue de confirmation pour supprimer une tâche.
 */
export const DeleteTaskDialog = ({
  t,
  taskId,
  onDelete,
}: {
  t: Translation;
  taskId: string;
  onDelete: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:text-destructive h-8 w-8 p-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </AlertDialogTrigger>

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
          onClick={onDelete}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {t.common.delete}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
