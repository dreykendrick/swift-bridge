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
  <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
    <BackgroundGlow position="top-left" />
    <BackgroundGlow position="bottom-right" delay="1s" />

    <div className="max-w-4xl w-full relative z-10">
      <div className="text-center mb-12">
        <div className="inline-block mb-8 relative">
          <div className="absolute inset-0 bg-primary blur-xl opacity-60 animate-pulse-glow" />
          <div className="relative w-24 h-24 rounded-3xl bg-background border-2 border-primary shadow-glow-xl flex items-center justify-center">
            <Globe className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          NUMMO
        </h1>

        <div className="inline-block mb-4 px-6 py-2 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/30">
          <p className="text-xl text-primary font-semibold">Africa's First DeFi ↔ CeFi Bridge</p>
        </div>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Instant, secure transfers between traditional finance and decentralized wallets
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((f, i) => (
          <GlassCard key={i} className="p-8 group">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <f.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-foreground text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentView("onboarding")}
          className="px-10 py-5 bg-gradient-to-r from-primary to-accent rounded-2xl font-bold text-lg text-primary-foreground hover:shadow-glow-xl transition-all hover:-translate-y-1"
        >
          Get Started
        </button>
        <button
          onClick={() => {
            setUser(mockUser);
            setCurrentView("dashboard");
          }}
          className="px-10 py-5 bg-card/80 backdrop-blur-2xl text-foreground rounded-2xl font-bold text-lg border-2 border-primary/30 hover:bg-primary/10 hover:border-primary transition-all hover:-translate-y-1"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
);
