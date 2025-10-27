import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function Badge({
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-muted text-muted-foreground hover:bg-muted/80",
    outline: "border border-input bg-background hover:bg-muted",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
