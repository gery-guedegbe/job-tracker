import { motion, AnimatePresence } from "motion/react";
import { type ReactNode, useEffect, isValidElement } from "react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet Content */}
          {children}
        </>
      )}
    </AnimatePresence>
  );
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export function SheetTrigger({ children, asChild }: SheetTriggerProps) {
  // When using asChild, we just render the children as-is
  // The parent Sheet component manages the open state via the wrapping context
  if (asChild && isValidElement(children)) {
    return children;
  }

  return <>{children}</>;
}

interface SheetContentProps {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export function SheetContent({
  children,
  side = "right",
  className = "",
}: SheetContentProps) {
  const sideVariants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      className: "right-0 top-0 h-full w-full sm:max-w-sm border-l",
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      className: "left-0 top-0 h-full w-full sm:max-w-sm border-r",
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
      className: "top-0 left-0 right-0 border-b",
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
      className: "bottom-0 left-0 right-0 border-t",
    },
  };

  const variant = sideVariants[side];

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={`bg-card fixed z-[100] shadow-2xl ${variant.className} ${className}`}
    >
      <div className="h-full overflow-y-auto p-6">{children}</div>
    </motion.div>
  );
}

interface SheetHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SheetHeader({ children, className = "" }: SheetHeaderProps) {
  return (
    <div className={`mb-4 flex flex-col gap-2 ${className}`}>{children}</div>
  );
}

interface SheetTitleProps {
  children: ReactNode;
  className?: string;
}

export function SheetTitle({ children, className = "" }: SheetTitleProps) {
  return <h2 className={`text-lg ${className}`}>{children}</h2>;
}
