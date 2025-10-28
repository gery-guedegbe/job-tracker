import type { Translation } from "../../../lib/i18n";
import type { Task } from "../../../types";
import { TaskItem } from "./TaskItem";

/**
 * TaskSection
 * Affiche une catégorie de tâches (Aujourd’hui, Cette semaine, etc.)
 */
export const TaskSection = ({
  title,
  tasks,
  t,
  locale,
  onToggleComplete,
  onDeleteTask,
  getLinkedApplication,
}: {
  title: string;
  tasks: Task[];
  t: Translation;
  locale: string;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
  getLinkedApplication: (applicationId?: string) => any;
}) => {
  if (tasks.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 font-semibold">{title}</h3>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            t={t}
            locale={locale}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            getLinkedApplication={getLinkedApplication}
          />
        ))}
      </div>
    </div>
  );
};
