import { useState } from "react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/button";
import { useTranslation } from "../lib/i18n";
import type { Application } from "../types/index";
import { Calendar, StickyNote, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  draggable?: boolean;
}

export function ApplicationCard({
  application,
  onEdit,
  onDelete,
  draggable = true,
}: ApplicationCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { t, language } = useTranslation();

  return (
    <Card
      className="bg-card group border-l-primary/20 mb-3 cursor-move border-l-4 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("applicationId", application.id);
      }}
    >
      <div className="space-y-3">
        <div>
          <h4 className="text-card-foreground mb-1 font-semibold">
            {application.jobTitle}
          </h4>
          <p className="text-muted-foreground text-sm">{application.company}</p>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          <span>
            {new Date(application.applicationDate).toLocaleDateString(
              language === "fr" ? "fr-FR" : "en-US",
            )}
          </span>
        </div>

        {application.notes && (
          <div className="text-muted-foreground flex items-start gap-2 text-xs">
            <StickyNote className="mt-0.5 h-3 w-3 flex-shrink-0" />
            <p className="line-clamp-2">{application.notes}</p>
          </div>
        )}

        {application.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {application.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 border-t pt-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(application)}
            className="h-8 text-xs"
          >
            <Edit className="mr-1 h-3 w-3" />
            {t.common.edit}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive hover:text-destructive h-8 text-xs"
          >
            <Trash2 className="mr-1 h-3 w-3" />
            {t.common.delete}
          </Button>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t.modal.deleteConfirm.title}
                </AlertDialogTitle>

                <AlertDialogDescription>
                  {t.modal.deleteConfirm.description}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(application.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t.modal.deleteConfirm.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
