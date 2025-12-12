import { useState } from "react";
import { PiggyBank, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, Shield, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User } from "@/lib/mockData";

interface MicrosavingsViewProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const savingsPools = [
  { id: "stable", name: "Stable Yield", apy: "4.5%", risk: "Low", protocol: "Aave", minDeposit: 10, tvl: "$2.4M" },
  { id: "balanced", name: "Balanced Growth", apy: "6.2%", risk: "Medium", protocol: "Compound", minDeposit: 50, tvl: "$1.8M" },
  { id: "high", name: "High Yield", apy: "8.5%", risk: "Higher", protocol: "Yearn", minDeposit: 100, tvl: "$890K" },
];

const mockSavingsData = {
  totalDeposited: 450,
  totalEarned: 18.75,
  activeDeposits: 2,
  projectedMonthly: 2.25,
};

export const MicrosavingsView = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: MicrosavingsViewProps) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundGlow position="top-left" />
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-6 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-4">
            <Sparkles className="w-4 h-4 text-success" />
            <span className="text-success text-sm font-semibold">Earn while you save</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-2">Microsavings</h2>
          <p className="text-muted-foreground text-sm sm:text-lg">Deposit idle funds and earn 4-8% APY through DeFi protocols</p>
        </div>

        {/* Savings Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: "Total Deposited", value: `$${mockSavingsData.totalDeposited}`, icon: Wallet },
            { label: "Total Earned", value: `$${mockSavingsData.totalEarned}`, icon: TrendingUp },
            { label: "Active Pools", value: mockSavingsData.activeDeposits.toString(), icon: PiggyBank },
            { label: "Monthly Yield", value: `~$${mockSavingsData.projectedMonthly}`, icon: Sparkles },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-3 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-primary" />
                <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
              </div>
              <p className="text-foreground text-lg sm:text-2xl font-bold">{stat.value}</p>
            </GlassCard>
          ))}
        </div>

        {/* Yield Pools */}
        <h3 className="text-foreground text-lg sm:text-xl font-bold mb-4">Available Yield Pools</h3>
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {savingsPools.map((pool) => (
            <GlassCard
              key={pool.id}
              className={`p-4 sm:p-6 cursor-pointer transition-all ${
                selectedPool === pool.id ? "border-primary shadow-glow" : ""
              }`}
              onClick={() => setSelectedPool(pool.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PiggyBank className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-base sm:text-lg">{pool.name}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">via {pool.protocol} • TVL {pool.tvl}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-success text-xl sm:text-2xl font-bold">{pool.apy}</p>
                    <p className="text-muted-foreground text-xs">APY</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${
                      pool.risk === "Low" ? "text-success" : pool.risk === "Medium" ? "text-warning" : "text-destructive"
                    }`}>{pool.risk}</p>
                    <p className="text-muted-foreground text-xs">Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold text-sm sm:text-base">${pool.minDeposit}</p>
                    <p className="text-muted-foreground text-xs">Min</p>
                  </div>
                </div>
              </div>

              {selectedPool === pool.id && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      placeholder="Amount (USDT)"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="flex-1 bg-background border border-primary/30 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:shadow-glow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Deposit
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-3 bg-background border border-primary/30 text-foreground rounded-xl font-semibold hover:bg-primary/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ArrowDownLeft className="w-4 h-4" />
                      Withdraw
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Auto-Save Feature */}
        <GlassCard className="p-4 sm:p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h4 className="text-foreground font-semibold mb-1">Auto-Save on Transactions</h4>
              <p className="text-muted-foreground text-sm mb-3">
                Automatically allocate a percentage of incoming transfers to your savings pool
              </p>
              <div className="flex items-center gap-4">
                <select className="bg-background border border-primary/30 rounded-lg px-3 py-2 text-foreground text-sm">
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                </select>
                <span className="text-muted-foreground text-sm">of each transfer</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 sm:p-4">
          <p className="text-primary text-xs sm:text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 flex-shrink-0" />
            Funds are secured in audited DeFi protocols. Withdraw anytime with no lock-up period.
          </p>
        </div>
      </div>
    </div>
  );
};
