import { Users, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";

interface AdminPanelProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const adminStats = [
  { label: "Pending KYC", value: "23", icon: Users },
  { label: "Active Transactions", value: "156", icon: RefreshCw },
  { label: "Compliance Alerts", value: "3", icon: AlertCircle },
  { label: "System Health", value: "99.8%", icon: CheckCircle },
];

const kycQueue = [1, 2, 3];

const alerts = [
  { type: "High Volume", user: "USR-452", severity: "medium" as const },
  { type: "Multiple Fails", user: "USR-789", severity: "high" as const },
  { type: "Unusual Pattern", user: "USR-123", severity: "low" as const },
];

export const AdminPanel = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: AdminPanelProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <BackgroundGlow position="top-left" />
    <Header
      currentView={currentView}
      setCurrentView={setCurrentView}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />

    <div className="max-w-7xl mx-auto p-6 pt-28 relative z-10">
      <h2 className="text-4xl font-black text-foreground mb-8">Admin Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, idx) => (
          <GlassCard key={idx} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-foreground text-3xl font-bold">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            KYC Approvals Queue
          </h3>
          <div className="space-y-3">
            {kycQueue.map((i) => (
              <div
                key={i}
                className="bg-background backdrop-blur-xl rounded-xl p-4 flex justify-between items-center border border-primary/20"
              >
                <div>
                  <p className="text-foreground font-medium">User #{1000 + i}</p>
                  <p className="text-muted-foreground text-sm">Submitted 2h ago</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-success/20 text-success rounded-lg text-sm hover:bg-success/30 transition-all">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-destructive/20 text-destructive rounded-lg text-sm hover:bg-destructive/30 transition-all">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Compliance Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="bg-background backdrop-blur-xl rounded-xl p-4 flex justify-between items-center border border-primary/20"
              >
                <div>
                  <p className="text-foreground font-medium">{alert.type}</p>
                  <p className="text-muted-foreground text-sm">{alert.user}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    alert.severity === "high"
                      ? "bg-destructive/20 text-destructive"
                      : alert.severity === "medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);
