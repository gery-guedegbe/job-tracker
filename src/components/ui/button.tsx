import { forwardRef } from "react";
import { motion } from "motion/react";
import type { MotionProps } from "motion/react";

interface ButtonProps extends Omit<MotionProps, "children" | "ref"> {
  className?: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      ghost: "hover:bg-muted hover:text-foreground",
      outline: "border border-input bg-background hover:bg-muted",
      secondary: "bg-muted text-muted-foreground hover:bg-muted/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    };

    const sizes = {
      default: "h-10 px-2 lg:px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-8 lg:h-11 px-8",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? {} : { scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
