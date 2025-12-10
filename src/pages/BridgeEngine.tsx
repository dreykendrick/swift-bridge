import { useState } from "react";
import { RefreshCw, Shield } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User } from "@/lib/mockData";

interface BridgeEngineProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const BridgeEngine = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: BridgeEngineProps) => {
  const [bridgeTx, setBridgeTx] = useState({ from: "USDT", to: "KES", amount: "" });

  const rate = 155.5;
  const fee = 0.002;
  const receiveAmount = bridgeTx.amount ? (parseFloat(bridgeTx.amount) * rate * (1 - fee)).toFixed(2) : "0.00";
  const grossAmount = bridgeTx.amount ? (parseFloat(bridgeTx.amount) * rate).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundGlow position="top-left" />
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-2xl mx-auto p-6 pt-28 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-foreground mb-2">DeFi ↔ CeFi Bridge</h2>
          <p className="text-muted-foreground text-lg">Convert between crypto and traditional finance instantly</p>
        </div>

        <GlassCard className="p-8" hover={false}>
          {/* From */}
          <div className="mb-6">
            <label className="text-muted-foreground text-sm mb-2 block font-medium">From</label>
            <div className="bg-background backdrop-blur-xl border border-primary/30 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <select
                  value={bridgeTx.from}
                  onChange={(e) => setBridgeTx({ ...bridgeTx, from: e.target.value })}
                  className="bg-transparent text-foreground text-xl font-bold focus:outline-none cursor-pointer"
                >
                  {["USDT", "BTC", "ETH", "KES", "USD"].map((c) => (
                    <option key={c} value={c} className="bg-background">
                      {c}
                    </option>
                  ))}
                </select>
                <span className="text-muted-foreground text-sm">
                  Balance:{" "}
                  {bridgeTx.from === "USDT"
                    ? user?.balances.crypto.USDT
                    : bridgeTx.from === "KES"
                    ? user?.balances.fiat.KES.toLocaleString()
                    : user?.balances.fiat.USD}
                </span>
              </div>
              <input
                type="number"
                value={bridgeTx.amount}
                onChange={(e) => setBridgeTx({ ...bridgeTx, amount: e.target.value })}
                placeholder="0.00"
                className="w-full bg-transparent text-foreground text-3xl font-black focus:outline-none"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <div className="bg-primary rounded-full p-3 cursor-pointer hover:scale-110 transition-transform shadow-glow">
              <RefreshCw className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* To */}
          <div className="mb-6">
            <label className="text-muted-foreground text-sm mb-2 block font-medium">To</label>
            <div className="bg-background backdrop-blur-xl border border-primary/30 rounded-xl p-5">
              <select
                value={bridgeTx.to}
                onChange={(e) => setBridgeTx({ ...bridgeTx, to: e.target.value })}
                className="bg-transparent text-foreground text-xl font-bold focus:outline-none mb-3 cursor-pointer"
              >
                {["KES (Bank Transfer)", "M-PESA", "Airtel Money", "USDT", "BTC"].map((o) => (
                  <option key={o} value={o} className="bg-background">
                    {o}
                  </option>
                ))}
              </select>
              <p className="text-foreground text-3xl font-black">{grossAmount}</p>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="bg-background backdrop-blur-xl rounded-xl p-5 mb-6 space-y-3 text-sm border border-primary/20">
            {[
              ["Exchange Rate", "1 USDT = 155.50 KES"],
              ["Network Fee", "0.5 USDT"],
              ["Bridge Fee", "0.2%"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground font-semibold">{v}</span>
              </div>
            ))}
            <div className="border-t border-primary/10 pt-3 flex justify-between font-bold">
              <span className="text-foreground">You'll Receive</span>
              <span className="text-primary">{receiveAmount} KES</span>
            </div>
          </div>

          <button className="w-full py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold text-lg hover:shadow-glow-xl transition-all">
            Complete Bridge Transfer
          </button>

          <div className="mt-5 bg-primary/10 backdrop-blur-xl border border-primary/30 rounded-xl p-4">
            <p className="text-primary text-sm flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Secured by smart contracts. Funds released only after verification.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
