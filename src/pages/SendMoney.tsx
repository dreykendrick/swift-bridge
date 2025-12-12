import { useState } from "react";
import { Send, Users, Building2, Smartphone, Globe, ArrowRight, Shield } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User } from "@/lib/mockData";

interface SendMoneyProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const sendTypes = [
  { id: "p2p", icon: Users, label: "Person to Person", desc: "Send to friends & family" },
  { id: "mobile", icon: Smartphone, label: "Mobile Money", desc: "M-PESA, Airtel Money" },
  { id: "bank", icon: Building2, label: "Bank Transfer", desc: "Direct to bank account" },
  { id: "international", icon: Globe, label: "International", desc: "Cross-border remittance" },
];

const recentRecipients = [
  { name: "Jane Wanjiku", phone: "+254 7** ***890", type: "M-PESA" },
  { name: "David Otieno", phone: "+254 7** ***456", type: "Bank" },
  { name: "Sarah Achieng", phone: "+256 7** ***123", type: "Airtel" },
];

export const SendMoney = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: SendMoneyProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sendData, setSendData] = useState({ recipient: "", amount: "", currency: "USDT" });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundGlow position="top-right" />
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-6 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-2">Send Money</h2>
          <p className="text-muted-foreground text-sm sm:text-lg">Instant transfers anywhere in Africa and beyond</p>
        </div>

        {/* Send Type Selection */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {sendTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left active:scale-[0.98] ${
                selectedType === type.id
                  ? "bg-primary/10 border-primary shadow-glow"
                  : "bg-card/60 border-primary/20 hover:border-primary/40"
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <type.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="text-foreground font-semibold text-sm sm:text-base">{type.label}</p>
              <p className="text-muted-foreground text-xs sm:text-sm">{type.desc}</p>
            </button>
          ))}
        </div>

        {/* Send Form */}
        <GlassCard className="p-4 sm:p-8 mb-6" hover={false}>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-2 block font-medium">Recipient</label>
              <input
                type="text"
                placeholder="Phone number or wallet address"
                value={sendData.recipient}
                onChange={(e) => setSendData({ ...sendData, recipient: e.target.value })}
                className="w-full bg-background border border-primary/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-muted-foreground text-xs sm:text-sm mb-2 block font-medium">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={sendData.amount}
                  onChange={(e) => setSendData({ ...sendData, amount: e.target.value })}
                  className="w-full bg-background border border-primary/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs sm:text-sm mb-2 block font-medium">Currency</label>
                <select
                  value={sendData.currency}
                  onChange={(e) => setSendData({ ...sendData, currency: e.target.value })}
                  className="w-full bg-background border border-primary/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-foreground focus:outline-none focus:border-primary text-sm sm:text-base"
                >
                  {["USDT", "KES", "USD", "UGX", "TZS"].map((c) => (
                    <option key={c} value={c} className="bg-background">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-background border border-primary/20 rounded-xl p-3 sm:p-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee (0.2%)</span>
                <span className="text-foreground font-semibold">{sendData.amount ? (parseFloat(sendData.amount) * 0.002).toFixed(2) : "0.00"} {sendData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-success font-semibold">Instant (&lt;10 sec)</span>
              </div>
            </div>

            <button className="w-full py-4 sm:py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold text-base sm:text-lg hover:shadow-glow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Money
            </button>
          </div>
        </GlassCard>

        {/* Recent Recipients */}
        <GlassCard className="p-4 sm:p-6">
          <h3 className="text-foreground font-semibold mb-4 text-sm sm:text-base">Recent Recipients</h3>
          <div className="space-y-2">
            {recentRecipients.map((r, i) => (
              <button
                key={i}
                onClick={() => setSendData({ ...sendData, recipient: r.phone })}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-background border border-primary/20 rounded-xl hover:border-primary/40 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-foreground font-medium text-sm">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{r.type}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="mt-4 bg-primary/10 border border-primary/30 rounded-xl p-3 sm:p-4">
          <p className="text-primary text-xs sm:text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 flex-shrink-0" />
            All transfers are encrypted and protected by smart contracts
          </p>
        </div>
      </div>
    </div>
  );
};
