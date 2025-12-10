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

    <div className="max-w-6xl mx-auto p-6 pt-28 relative z-10">
      <h2 className="text-4xl font-black text-foreground mb-8">Analytics & Insights</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="p-6">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className="text-foreground text-2xl font-bold mb-1">{stat.value}</p>
            <p className={`text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>{stat.change} this month</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { title: "Monthly Flow", icon: BarChart3 },
          { title: "Chain Distribution", icon: TrendingUp },
        ].map((chart, i) => (
          <GlassCard key={i} className="p-6">
            <h3 className="text-foreground font-semibold mb-4">{chart.title}</h3>
            <div className="h-64 flex items-center justify-center border border-dashed border-primary/30 rounded-xl">
              <chart.icon className="w-16 h-16 text-primary/50" />
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-foreground font-semibold text-lg">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <p key={i} className="text-muted-foreground">
              {insight}
            </p>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);
