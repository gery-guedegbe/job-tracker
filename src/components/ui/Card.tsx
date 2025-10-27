import { forwardRef, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className}`}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
