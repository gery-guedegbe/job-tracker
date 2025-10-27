import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", checked, onCheckedChange, id, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer sr-only"
          {...props}
        />
        <label
          htmlFor={id}
          className={`border-primary peer-focus:ring-primary flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 transition-all peer-focus:ring-2 peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
            checked ? "bg-primary border-primary" : "bg-background"
          } ${className}`}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="text-primary-foreground h-3.5 w-3.5" />
            </motion.div>
          )}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
