import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  animate?: boolean;
  delay?: string;
}

export const BackgroundGlow = ({ position = "top-right", animate = true, delay }: BackgroundGlowProps) => {
  const positionClasses = {
    "top-left": "top-20 left-20",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-20 left-20",
    "bottom-right": "bottom-20 right-20",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
      <div
        className={cn(
          "absolute w-96 h-96 bg-primary/30 rounded-full blur-glow",
          positionClasses[position],
          animate && "animate-pulse-glow"
        )}
        style={delay ? { animationDelay: delay } : undefined}
      />
    </div>
  );
};
