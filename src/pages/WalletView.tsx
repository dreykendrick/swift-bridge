import { Wallet, Copy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User } from "@/lib/mockData";

interface WalletViewProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const cryptoRates: Record<string, number> = { BTC: 42350, ETH: 2245, USDT: 1 };

export const WalletView = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: WalletViewProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <BackgroundGlow position="bottom-left" />
    <Header
      currentView={currentView}
      setCurrentView={setCurrentView}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />

    <div className="max-w-4xl mx-auto p-6 pt-28 relative z-10">
      <h2 className="text-4xl font-black text-foreground mb-8">Your Wallets</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">Crypto Wallets</h3>
        <div className="space-y-4">
          {(["USDT", "BTC", "ETH"] as const).map((crypto) => (
            <GlassCard key={crypto} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">{crypto} Wallet</p>
                    <p className="text-muted-foreground text-sm">Multi-chain support</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-foreground text-xl font-bold">{user?.balances.crypto[crypto]}</p>
                  <p className="text-muted-foreground text-sm">
                    ${((user?.balances.crypto[crypto] || 0) * cryptoRates[crypto]).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-all font-medium">
                  Send
                </button>
                <button className="flex-1 py-2 bg-background backdrop-blur-xl text-foreground rounded-lg text-sm hover:bg-primary/10 transition-all border border-primary/20 font-medium">
                  Receive
                </button>
                <button className="px-4 py-2 bg-background backdrop-blur-xl text-foreground rounded-lg hover:bg-primary/10 transition-all border border-primary/20">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">External Wallets</h3>
        <button className="w-full bg-card/60 backdrop-blur-2xl border-2 border-dashed border-primary/30 rounded-2xl p-8 hover:bg-primary/10 transition-all hover:border-primary">
          <Wallet className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-foreground font-semibold mb-1">Connect External Wallet</p>
          <p className="text-muted-foreground text-sm">MetaMask, Trust Wallet, Binance Chain</p>
        </button>
      </div>
    </div>
  </div>
);
