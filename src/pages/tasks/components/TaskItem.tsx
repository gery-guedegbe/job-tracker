import {
  CalendarIcon,
  CheckCircle,
  Circle,
  LinkIcon,
  Trash2,
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import type { Task } from "../../../types";
import type { Translation } from "../../../lib/i18n";
import { Button } from "../../../components/ui/button";

/**
 * TaskItem
 * Composant représentant une tâche individuelle avec ses actions (terminer, supprimer…).
 */
export const TaskItem = ({
  task,
  locale,
  onToggleComplete,
  onDeleteTask,
  getLinkedApplication,
}: {
  task: Task;
  t: Translation;
  locale: string;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
  getLinkedApplication: (applicationId?: string) => any;
}) => {
  const linkedApp = getLinkedApplication(task.applicationId);
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={`p-4 ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id, task.completed)}
          className="mt-1 flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle className="text-secondary h-5 w-5" />
          ) : (
            <Circle className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
          )}
        </button>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`font-medium ${task.completed ? "line-through" : ""}`}
            >
              {task.title}
            </h4>

            {/* Bouton de suppression qui ouvre le dialog */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="text-destructive hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {task.description && (
            <p className="text-muted-foreground text-sm">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={isOverdue ? "destructive" : "outline"}
              className="gap-1"
            >
              <CalendarIcon className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString(locale)}
            </Badge>

            {linkedApp && (
              <Badge variant="secondary" className="gap-1">
                <LinkIcon className="h-3 w-3" />
                {linkedApp.jobTitle} - {linkedApp.company}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
