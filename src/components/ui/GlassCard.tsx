import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => (
  <div
    className={cn(
      "bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg",
      hover && "hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);
