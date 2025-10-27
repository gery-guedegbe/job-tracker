import { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog Content */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({
  children,
  className = "",
}: DialogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", duration: 0.3 }}
      className={`bg-card pointer-events-auto relative w-full rounded-xl border shadow-2xl ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 pb-4 ${className}`}>
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return <h2 className={`text-lg ${className}`}>{children}</h2>;
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function DialogDescription({
  children,
  className = "",
}: DialogDescriptionProps) {
  return (
    <p className={`text-muted-foreground text-sm ${className}`}>{children}</p>
  );
}
