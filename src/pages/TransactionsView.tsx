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

    <div className="max-w-6xl mx-auto p-6 pt-28 relative z-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black text-foreground">Transaction History</h2>
        <button className="px-6 py-3 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-all font-semibold">
          Export PDF
        </button>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-5 py-2 bg-card/60 backdrop-blur-xl text-muted-foreground rounded-xl hover:bg-primary/20 hover:text-primary transition-all whitespace-nowrap border border-primary/20"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockTransactions.map((tx) => (
          <TransactionCard key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  </div>
);

const TransactionCard = ({ tx }: { tx: Transaction }) => (
  <GlassCard className="p-6 cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            tx.status === "complete" ? "bg-success/20" : "bg-warning/20"
          }`}
        >
          {tx.type.includes("to-fiat") ? (
            <ArrowDownLeft className="w-6 h-6 text-success" />
          ) : (
            <ArrowUpRight className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-foreground font-semibold text-lg">
            {tx.from} → {tx.to}
          </p>
          <p className="text-muted-foreground">
            {tx.date} • {tx.id}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-foreground font-bold text-lg">
          {tx.amount} {tx.from}
        </p>
        <div className="flex items-center gap-2 justify-end">
          {tx.status === "complete" ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <Clock className="w-5 h-5 text-warning" />
          )}
          <p className={`capitalize ${tx.status === "complete" ? "text-success" : "text-warning"}`}>{tx.status}</p>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-primary/10">
      <p className="text-muted-foreground text-sm">{tx.hash ? `Hash: ${tx.hash}` : `Ref: ${tx.ref}`}</p>
      <button className="text-primary text-sm hover:underline flex items-center gap-1">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </GlassCard>
);
