import {
  type ReactNode,
  useState,
  createContext,
  useContext,
  cloneElement,
  isValidElement,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog";

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(
  undefined,
);

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function AlertDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
}: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled
    ? controlledOnOpenChange!
    : setUncontrolledOpen;

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function AlertDialogTrigger({
  children,
  asChild,
  className,
}: AlertDialogTriggerProps) {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialogTrigger must be used within AlertDialog");
  }

  const handleClick = () => {
    context.onOpenChange(true);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: handleClick,
    } as any);
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

interface AlertDialogContentProps {
  children: ReactNode;
  className?: string;
}

export function AlertDialogContent({
  children,
  className = "",
}: AlertDialogContentProps) {
  return (
    <DialogContent className={`max-w-md ${className}`}>
      {children}
    </DialogContent>
  );
}

interface AlertDialogHeaderProps {
  children: ReactNode;
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <DialogHeader>{children}</DialogHeader>;
}

interface AlertDialogTitleProps {
  children: ReactNode;
}

export function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return <DialogTitle>{children}</DialogTitle>;
}

interface AlertDialogDescriptionProps {
  children: ReactNode;
}

export function AlertDialogDescription({
  children,
}: AlertDialogDescriptionProps) {
  return <DialogDescription>{children}</DialogDescription>;
}

interface AlertDialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function AlertDialogFooter({
  children,
  className = "",
}: AlertDialogFooterProps) {
  return (
    <div
      className={`flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end sm:gap-2 ${className}`}
    >
      {children}
    </div>
  );
}

interface AlertDialogActionProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AlertDialogAction({
  children,
  onClick,
  className = "",
}: AlertDialogActionProps) {
  const context = useContext(AlertDialogContext);

  const handleClick = () => {
    onClick?.();
    context?.onOpenChange(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}

interface AlertDialogCancelProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AlertDialogCancel({
  children,
  onClick,
  className = "",
}: AlertDialogCancelProps) {
  const context = useContext(AlertDialogContext);

  const handleClick = () => {
    onClick?.();
    context?.onOpenChange(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`border-input bg-background hover:bg-muted focus:ring-primary inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}
