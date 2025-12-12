import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true, ...props }: GlassCardProps) => (
  <div
    className={cn(
      "bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg",
      hover && "hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
