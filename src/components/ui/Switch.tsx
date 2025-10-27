import { forwardRef, type InputHTMLAttributes } from "react";
import { motion } from "motion/react";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { className = "", checked, onCheckedChange, id, disabled, ...props },
    ref,
  ) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        <label
          htmlFor={id}
          className={`peer-focus:ring-primary relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
            checked ? "bg-primary" : "bg-input"
          } ${className}`}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
              checked ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </label>
      </div>
    );
  },
);

Switch.displayName = "Switch";
