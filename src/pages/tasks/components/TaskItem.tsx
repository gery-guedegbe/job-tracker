import { Calendar, CheckCircle, Circle, Link } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import type { Task } from "../../../types";
import type { Translation } from "../../../lib/i18n";
import { DeleteTaskDialog } from "./DeleteTaskDialog";

/**
 * TaskItem
 * Composant représentant une tâche individuelle avec ses actions (terminer, supprimer…).
 */
export const TaskItem = ({
  task,
  t,
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

  /**
   * Formate la date de la tâche en gérant les cas invalides
   */
  const formatDueDate = (dateString: string, locale: string) => {
    if (!dateString) return t.tasks.dueDate ?? "—";

    // Normalise le format "YYYY-MM-DD" en ISO complet pour éviter "Invalid Date"
    const safeDateString = dateString.includes("T")
      ? dateString
      : `${dateString}T00:00:00`;

    const date = new Date(safeDateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

            <DeleteTaskDialog
              t={t}
              taskId={task.id}
              onDelete={() => onDeleteTask(task.id)}
            />
          </div>

          {task.description && (
            <p className="text-muted-foreground text-sm">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={isOverdue ? "destructive" : "outline"}
              className="gap-1"
            >
              <Calendar className="h-3 w-3" />
              {formatDueDate(task.dueDate, locale)}
            </Badge>

            {linkedApp && (
              <Badge variant="secondary" className="gap-1">
                <Link className="h-3 w-3" />
                {linkedApp.jobTitle} - {linkedApp.company}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
