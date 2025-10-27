import { motion } from "motion/react";
import { useTranslation } from "../../lib/i18n";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const { t } = useTranslation();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mx-auto mb-8 w-full max-w-md">
      <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs">
        <span>
          {t.common.loading.replace("...", "")} {currentStep + 1} / {totalSteps}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
