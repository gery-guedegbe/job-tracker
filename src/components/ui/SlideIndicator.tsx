import { motion } from "motion/react";

interface SlideIndicatorProps {
  total: number;
  current: number;
  onClick: (index: number) => void;
}

export const SlideIndicator = ({
  total,
  current,
  onClick,
}: SlideIndicatorProps) => {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onClick(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`h-2 rounded-full transition-all ${
            i === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
