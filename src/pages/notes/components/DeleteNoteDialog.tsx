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

interface DeleteNoteDialogProps {
  open: boolean;
  noteTitle: string;
  onClose: () => void;
  onConfirm: () => void;
  t: any;
}

export function DeleteNoteDialog({
  open,
  noteTitle,
  onClose,
  onConfirm,
  t,
}: DeleteNoteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.noteModal.deleteConfirm.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.noteModal.deleteConfirm.description} <strong>{noteTitle}</strong>
            {t.noteModal.deleteConfirm.descriptionSuffix}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {t.noteModal.deleteConfirm.cancel}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t.noteModal.deleteConfirm.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
