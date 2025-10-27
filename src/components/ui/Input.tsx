import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
