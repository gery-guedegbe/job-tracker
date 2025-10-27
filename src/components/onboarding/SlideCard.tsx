import { motion } from "motion/react";

interface SlideCardProps {
  title: string;
  description: string;
  gradient: string;
  Icon: React.ElementType;
  DemoComponent: React.ElementType;
}

const SlideCard = ({
  title,
  description,
  gradient,
  Icon,
  DemoComponent,
}: SlideCardProps) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <div className={`mb-8 rounded-full bg-gradient-to-br p-8 ${gradient}`}>
        <Icon className="h-16 w-16 text-white" />
      </div>

      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

      <p className="text-custom-grey mb-8 max-w-2xl text-lg">{description}</p>

      <DemoComponent />
    </motion.div>
  );
};

export default SlideCard;
