import { Globe, Zap, Shield, DollarSign } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { User, mockUser } from "@/lib/mockData";

interface WelcomeScreenProps {
  setCurrentView: (view: string) => void;
  setUser: (user: User) => void;
}

const features = [
  { icon: Zap, title: "Instant Bridge", desc: "Convert crypto to mobile money in seconds" },
  { icon: Shield, title: "Fully Compliant", desc: "KYC/AML ready, regulated & secure" },
  { icon: DollarSign, title: "Low Fees", desc: "90% cheaper than traditional remittance" },
];

export const WelcomeScreen = ({ setCurrentView, setUser }: WelcomeScreenProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden">
    <BackgroundGlow position="top-left" />
    <BackgroundGlow position="bottom-right" delay="1s" />

    <div className="max-w-4xl w-full relative z-10">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-block mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-primary blur-xl opacity-60 animate-pulse-glow" />
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-background border-2 border-primary shadow-glow-xl flex items-center justify-center">
            <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          NUMMO
        </h1>

        <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-2 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/30">
          <p className="text-base sm:text-xl text-primary font-semibold">Africa's First DeFi ↔ CeFi Bridge</p>
        </div>

        <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
          Instant, secure transfers between traditional finance and decentralized wallets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {features.map((f, i) => (
          <GlassCard key={i} className="p-5 sm:p-8 group">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <h3 className="text-foreground text-lg sm:text-xl font-bold mb-2 sm:mb-3">{f.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{f.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
        <button
          onClick={() => setCurrentView("onboarding")}
          className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary to-accent rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-primary-foreground hover:shadow-glow-xl transition-all hover:-translate-y-1 active:scale-95"
        >
          Get Started
        </button>
        <button
          onClick={() => {
            setUser(mockUser);
            setCurrentView("dashboard");
          }}
          className="px-8 sm:px-10 py-4 sm:py-5 bg-card/80 backdrop-blur-2xl text-foreground rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border-2 border-primary/30 hover:bg-primary/10 hover:border-primary transition-all hover:-translate-y-1 active:scale-95"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
);
