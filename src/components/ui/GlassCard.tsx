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
      "bg-card/60 backdrop-blur-2xl border border-primary/30 rounded-3xl shadow-glow-lg",
      hover && "hover:border-primary/60 hover:-translate-y-1 transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);
