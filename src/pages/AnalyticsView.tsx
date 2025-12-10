import { BarChart3, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";

interface AnalyticsViewProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const stats = [
  { label: "Total Volume", value: "$45,230", change: "+12.5%", positive: true },
  { label: "Transactions", value: "127", change: "+8.2%", positive: true },
  { label: "Avg Fee", value: "0.18%", change: "-0.05%", positive: true },
  { label: "Success Rate", value: "99.2%", change: "+0.3%", positive: true },
];

const insights = [
  "💡 Your crypto-to-fiat conversions peak on weekends. Consider timing large transactions during lower fee periods.",
  "📊 USDT transfers account for 68% of your volume. You're saving an average of $12 per transaction vs traditional remittance.",
  "🎯 You're in the top 5% of users for transaction success rate. Keep up the great practices!",
];

export const AnalyticsView = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: AnalyticsViewProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <BackgroundGlow position="bottom-right" />
    <Header
      currentView={currentView}
      setCurrentView={setCurrentView}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-6 relative z-10">
      <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-6 sm:mb-8">Analytics & Insights</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="p-3 sm:p-6">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">{stat.label}</p>
            <p className="text-foreground text-lg sm:text-2xl font-bold mb-1">{stat.value}</p>
            <p className={`text-xs sm:text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>{stat.change} this month</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
          { title: "Monthly Flow", icon: BarChart3 },
          { title: "Chain Distribution", icon: TrendingUp },
        ].map((chart, i) => (
          <GlassCard key={i} className="p-4 sm:p-6">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{chart.title}</h3>
            <div className="h-48 sm:h-64 flex items-center justify-center border border-dashed border-primary/30 rounded-lg sm:rounded-xl">
              <chart.icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary/50" />
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-4 sm:p-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
          </div>
          <h3 className="text-foreground font-semibold text-base sm:text-lg">AI Insights</h3>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {insights.map((insight, i) => (
            <p key={i} className="text-muted-foreground text-sm sm:text-base">
              {insight}
            </p>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);
