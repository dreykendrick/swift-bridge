import { Globe, Zap, Shield, DollarSign, Users, Building2, PiggyBank, ArrowRightLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { User, mockUser } from "@/lib/mockData";

interface WelcomeScreenProps {
  setCurrentView: (view: string) => void;
  setUser: (user: User) => void;
}

const features = [
  { icon: ArrowRightLeft, title: "Hybrid Bridge", desc: "DeFi speed meets CeFi trust — seamless routing" },
  { icon: Shield, title: "Fully Licensed", desc: "KYC/AML compliant across African markets" },
  { icon: DollarSign, title: "<1% Fees", desc: "80% cheaper than traditional remittance" },
  { icon: PiggyBank, title: "Microsavings", desc: "Earn 4-8% APY on idle funds via DeFi" },
];

const flows = [
  { icon: Users, label: "P2P", desc: "Person-to-Person" },
  { icon: Building2, label: "B2B", desc: "Business Payments" },
  { icon: DollarSign, label: "B2P", desc: "Salary Payouts" },
  { icon: Zap, label: "P2B", desc: "Bills & Commerce" },
];

export const WelcomeScreen = ({ setCurrentView, setUser }: WelcomeScreenProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden">
    <BackgroundGlow position="top-left" />
    <BackgroundGlow position="bottom-right" delay="1s" />

    <div className="max-w-5xl w-full relative z-10">
      <div className="text-center mb-8 sm:mb-10">
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
          <p className="text-base sm:text-xl text-primary font-semibold">Africa's Payment Infrastructure</p>
        </div>

        <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
          Move money anywhere, anyhow — in and out of Africa. Bridging DeFi and CeFi for instant, low-cost transactions.
        </p>
      </div>

      {/* Transaction Flow Types */}
      <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
        {flows.map((flow, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
              <flow.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <p className="text-foreground font-bold text-sm sm:text-base">{flow.label}</p>
            <p className="text-muted-foreground text-xs">{flow.desc}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {features.map((f, i) => (
          <GlassCard key={i} className="p-4 sm:p-6 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-foreground text-sm sm:text-base font-bold mb-1">{f.title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">{f.desc}</p>
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
