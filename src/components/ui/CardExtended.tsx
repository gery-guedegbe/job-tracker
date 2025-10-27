import { forwardRef, type HTMLAttributes } from "react";

// Card components with sub-components

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => {
    return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />;
  },
);

CardContent.displayName = "CardContent";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-1.5 p-6 ${className}`}
        {...props}
      />
    );
  },
);

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", ...props }, ref) => {
    return <h3 ref={ref} className={`text-lg ${className}`} {...props} />;
  },
);

CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className = "", ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-muted-foreground text-sm ${className}`}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";
