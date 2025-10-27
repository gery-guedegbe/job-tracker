import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "../../lib/i18n";

const AnalyticsDemo = () => {
  const { t, language } = useTranslation();
  const stats = [
    {
      label: t.dashboard.metrics.totalApplications,
      value: "24",
      color: "text-blue-500",
    },
    {
      label: t.dashboard.metrics.interviews,
      value: "8",
      color: "text-green-500",
    },
    {
      label: t.dashboard.metrics.responseRate,
      value: "65%",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <div className="mb-6 grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            className="bg-card rounded-lg border p-4 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
              className={`mb-1 text-2xl ${stat.color}`}
            >
              {stat.value}
            </motion.div>

            <p className="text-muted-foreground text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-muted/30 relative h-32 overflow-hidden rounded-lg p-4">
        <div className="flex h-full items-end justify-between gap-2">
          {[40, 65, 45, 80, 60, 75].map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
              className="from-primary to-primary/50 flex-1 rounded-t bg-gradient-to-t"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute top-2 right-2 flex items-center gap-1 text-xs text-green-500"
        >
          <TrendingUp className="h-3 w-3" />
          {language === "fr" ? "+15% ce mois" : "+15% this month"}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDemo;
