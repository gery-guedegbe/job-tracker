import { useState } from "react";
import { Badge } from "../ui/Badge";
import { motion } from "motion/react";
import { useTranslation } from "../../lib/i18n";
import { CheckCircle, Plus } from "lucide-react";

const TasksDemo = () => {
  const { t, language } = useTranslation();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: false,
      label:
        language === "fr"
          ? "Préparer l'entretien Google"
          : "Prepare Google interview",
    },
    {
      id: 2,
      checked: true,
      label:
        language === "fr" ? "Relancer Microsoft" : "Follow up with Microsoft",
    },
    {
      id: 3,
      checked: false,
      label:
        language === "fr"
          ? "Envoyer portfolio à Apple"
          : "Send portfolio to Apple",
    },
  ]);

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-2">
      {tasks.map((task, idx) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-card hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors"
          onClick={() => {
            setTasks(
              tasks.map((t) =>
                t.id === task.id ? { ...t, checked: !t.checked } : t,
              ),
            );
          }}
        >
          <motion.div
            animate={{ scale: task.checked ? [1, 1.2, 1] : 1 }}
            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
              task.checked
                ? "border-green-500 bg-green-500"
                : "border-muted-foreground/30"
            }`}
          >
            {task.checked && <CheckCircle className="h-3 w-3 text-white" />}
          </motion.div>
          <span
            className={
              task.checked
                ? "text-muted-foreground text-sm line-through"
                : "text-sm"
            }
          >
            {task.label}
          </span>

          {!task.checked && (
            <Badge variant="outline" className="ml-auto text-xs">
              {t.tasks.sections.today}
            </Badge>
          )}
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-primary hover:bg-primary/5 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm transition-colors"
      >
        <Plus className="h-4 w-4" />
        {t.tasks.addTask}
      </motion.button>
    </div>
  );
};

export default TasksDemo;
