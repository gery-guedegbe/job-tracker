import { Plus } from "lucide-react";
import type { Translation } from "../../../lib/i18n";
import { Button } from "../../../components/ui/button";

/**
 * TasksHeader
 * Affiche le titre de la page et le bouton d’ajout d’une nouvelle tâche.
 */
export const TasksHeader = ({
  t,
  onAddTask,
}: {
  t: Translation;
  onAddTask: () => void;
}) => (
  <div className="flex flex-col justify-between gap-4 md:flex-row">
    <div className="flex flex-col items-start justify-between">
      <h2 className="mb-1 text-2xl font-semibold lg:mb-2">{t.tasks.title}</h2>
      <p className="text-muted-foreground">{t.tasks.subtitle}</p>
    </div>

    <Button onClick={onAddTask} className="gap-2">
      <Plus className="h-4 w-4" />
      {t.tasks.addTask}
    </Button>
  </div>
);
