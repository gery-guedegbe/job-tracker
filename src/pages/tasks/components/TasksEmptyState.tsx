import { CheckCircle, Plus } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import type { Translation } from "../../../lib/i18n";
import { Button } from "../../../components/ui/button";
import { CardContent } from "../../../components/ui/CardExtended";

/**
 * TasksEmptyState
 * État affiché lorsqu’aucune tâche n’existe ou que la recherche ne donne rien.
 */
export const TasksEmptyState = ({
  t,
  onAddTask,
}: {
  t: Translation;
  onAddTask: () => void;
}) => (
  <Card>
    <CardContent className="py-12 text-center">
      <CheckCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />

      <h3 className="mb-2 text-lg font-semibold">{t.tasks.emptyState}</h3>

      <p className="text-muted-foreground mb-4">
        {t.tasks.emptyStateDescription}
      </p>

      <Button onClick={onAddTask} className="gap-2">
        <Plus className="h-4 w-4" />
        {t.tasks.addTask}
      </Button>
    </CardContent>
  </Card>
);
