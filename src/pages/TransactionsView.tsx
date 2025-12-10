import { ArrowUpRight, ArrowDownLeft, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { mockTransactions, Transaction } from "@/lib/mockData";

interface TransactionsViewProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const filters = ["All", "Crypto", "Fiat", "Mobile Money", "Complete", "Pending"];

export const TransactionsView = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: TransactionsViewProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <BackgroundGlow position="top-right" />
    <Header
      currentView={currentView}
      setCurrentView={setCurrentView}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-6 relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-black text-foreground">Transaction History</h2>
        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary/20 text-primary rounded-lg sm:rounded-xl hover:bg-primary/30 transition-all font-semibold text-sm sm:text-base active:scale-95">
          Export PDF
        </button>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-card/60 backdrop-blur-xl text-muted-foreground rounded-lg sm:rounded-xl hover:bg-primary/20 hover:text-primary transition-all whitespace-nowrap border border-primary/20 text-xs sm:text-sm active:scale-95"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {mockTransactions.map((tx) => (
          <TransactionCard key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  </div>
);

const TransactionCard = ({ tx }: { tx: Transaction }) => (
  <GlassCard className="p-4 sm:p-6 cursor-pointer active:scale-[0.98]">
    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            tx.status === "complete" ? "bg-success/20" : "bg-warning/20"
          }`}
        >
          {tx.type.includes("to-fiat") ? (
            <ArrowDownLeft className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
          ) : (
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-foreground font-semibold text-base sm:text-lg">
            {tx.from} → {tx.to}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {tx.date} • {tx.id}
          </p>
        </div>
      </div>
      <div className="text-left sm:text-right ml-[52px] sm:ml-0">
        <p className="text-foreground font-bold text-base sm:text-lg">
          {tx.amount} {tx.from}
        </p>
        <div className="flex items-center gap-2 sm:justify-end">
          {tx.status === "complete" ? (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
          ) : (
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
          )}
          <p className={`text-sm capitalize ${tx.status === "complete" ? "text-success" : "text-warning"}`}>{tx.status}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-3 sm:pt-4 border-t border-primary/10">
      <p className="text-muted-foreground text-xs sm:text-sm truncate max-w-full">{tx.hash ? `Hash: ${tx.hash}` : `Ref: ${tx.ref}`}</p>
      <button className="text-primary text-xs sm:text-sm hover:underline flex items-center gap-1">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </GlassCard>
);
