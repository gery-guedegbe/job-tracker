import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../../lib/i18n";

const KanbanDemo = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <div className="relative mx-auto mt-8 w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-3">
        {[t.statuses.to_apply, t.statuses.sent, t.statuses.interview].map(
          (status, idx) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-muted/50 rounded-lg p-3 backdrop-blur-sm"
            >
              <p className="text-muted-foreground mb-2 text-xs">{status}</p>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-card cursor-pointer rounded border p-2 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className="bg-primary/20 h-6 w-6 rounded" />
                  <div className="bg-muted h-2 flex-1 rounded" />
                </div>

                <div className="bg-muted h-1.5 w-3/4 rounded" />
              </motion.div>
            </motion.div>
          ),
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredCard !== null ? 1 : 0 }}
        className="text-primary absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 text-xs"
      >
        <ArrowRight className="h-3 w-3" />
        {t.kanban.dropHere}
      </motion.div>
    </div>
  );
};

export default KanbanDemo;
