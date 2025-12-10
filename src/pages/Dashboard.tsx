import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Download,
  RefreshCw,
  TrendingUp,
  Wallet,
  Globe,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User, Transaction, mockTransactions, exchangeRates, calculateCryptoBalance } from "@/lib/mockData";

interface DashboardProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Dashboard = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: DashboardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const actions = [
    { icon: Send, label: "Send", action: () => setCurrentView("bridge") },
    { icon: Download, label: "Receive", action: () => setCurrentView("wallet") },
    { icon: RefreshCw, label: "Bridge", action: () => setCurrentView("bridge") },
    { icon: TrendingUp, label: "Analytics", action: () => setCurrentView("analytics") },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundGlow position="top-right" />
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-7xl mx-auto p-6 pt-28 relative z-10">
        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: "Total Fiat Balance",
              amount: `KES ${user?.balances.fiat.KES.toLocaleString()}`,
              icon: Wallet,
              extras: [
                ["USD", user?.balances.fiat.USD],
                ["UGX", user?.balances.fiat.UGX.toLocaleString()],
              ],
            },
            {
              title: "Total Crypto Balance",
              amount: `$${calculateCryptoBalance(user?.balances.crypto || { USDT: 0, BTC: 0, ETH: 0 }).toFixed(2)}`,
              icon: Globe,
              extras: [
                ["USDT", user?.balances.crypto.USDT],
                ["BTC", user?.balances.crypto.BTC],
                ["ETH", user?.balances.crypto.ETH],
              ],
            },
          ].map((bal, i) => (
            <GlassCard key={i} className="p-8 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-3 font-medium">{bal.title}</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-black text-foreground">{showBalance ? bal.amount : "••••••"}</h2>
                    <button onClick={() => setShowBalance(!showBalance)} className="hover:scale-110 transition-transform">
                      {showBalance ? (
                        <EyeOff className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Eye className="w-6 h-6 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <bal.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="flex gap-6 pt-4 border-t border-primary/10">
                {bal.extras.map(([k, v], j) => (
                  <div key={j}>
                    <p className="text-muted-foreground text-sm mb-1">{k}</p>
                    <p className="text-foreground font-bold text-lg">{showBalance ? v : "••"}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.action}
              className="bg-card/60 backdrop-blur-2xl border border-primary/20 rounded-2xl p-6 hover:bg-primary/10 hover:border-primary/60 transition-all hover:-translate-y-1 shadow-glow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 border border-primary/20">
                <a.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-semibold">{a.label}</p>
            </button>
          ))}
        </div>

        {/* Exchange Rates */}
        <GlassCard className="p-8 mb-8">
          <h3 className="text-foreground text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Live Exchange Rates
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(exchangeRates).map(([pair, rate]) => (
              <div key={pair} className="bg-background backdrop-blur-xl rounded-xl p-4 border border-primary/20">
                <p className="text-muted-foreground text-sm mb-1">{pair}</p>
                <p className="text-foreground text-xl font-bold mb-1">{rate.toLocaleString()}</p>
                <p className="text-success text-sm">+2.3%</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Transactions */}
        <GlassCard className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-foreground text-xl font-bold">Recent Transactions</h3>
            <button onClick={() => setCurrentView("transactions")} className="text-primary hover:underline font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const TransactionRow = ({ tx }: { tx: Transaction }) => (
  <div className="bg-background backdrop-blur-xl rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            tx.status === "complete" ? "bg-success/20" : "bg-warning/20"
          }`}
        >
          {tx.type.includes("to-fiat") ? (
            <ArrowDownLeft className="w-5 h-5 text-success" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-primary" />
          )}
        </div>
        <div>
          <p className="text-foreground font-semibold">
            {tx.from} → {tx.to}
          </p>
          <p className="text-muted-foreground text-sm">{tx.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-foreground font-bold">
          {tx.amount} {tx.from}
        </p>
        <div className="flex items-center gap-1 justify-end">
          {tx.status === "complete" ? (
            <CheckCircle className="w-4 h-4 text-success" />
          ) : (
            <Clock className="w-4 h-4 text-warning" />
          )}
          <p className={`text-sm capitalize ${tx.status === "complete" ? "text-success" : "text-warning"}`}>{tx.status}</p>
        </div>
      </div>
    </div>
  </div>
);
