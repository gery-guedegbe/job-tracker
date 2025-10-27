import { forwardRef, type HTMLAttributes } from "react";

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`overflow-auto ${className}`} {...props}>
        {children}
      </div>
    );
  },
);

ScrollArea.displayName = "ScrollArea";
