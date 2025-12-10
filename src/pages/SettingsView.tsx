import { CheckCircle, ChevronRight, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Header } from "@/components/layout/Header";
import { User } from "@/lib/mockData";

interface SettingsViewProps {
  user: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const securityItems = ["Two-Factor Authentication", "Change Password", "Biometric Login"];
const legalItems = ["Terms of Service", "Privacy Policy", "Compliance Documents"];

export const SettingsView = ({ user, currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: SettingsViewProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <BackgroundGlow position="bottom-right" />
    <Header
      currentView={currentView}
      setCurrentView={setCurrentView}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />

    <div className="max-w-4xl mx-auto p-6 pt-28 relative z-10">
      <h2 className="text-4xl font-black text-foreground mb-8">Settings</h2>

      <div className="space-y-6">
        <GlassCard className="p-6">
          <h3 className="text-foreground font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-sm">Full Name</label>
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-xl px-4 py-3 text-foreground mt-1"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-sm">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-xl px-4 py-3 text-foreground mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-success/10 border border-success/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <div>
                  <p className="text-foreground font-medium">KYC Verified</p>
                  <p className="text-muted-foreground text-sm">Full access enabled</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-foreground font-semibold mb-4">Security</h3>
          <div className="space-y-3">
            {securityItems.map((item, i) => (
              <button
                key={i}
                className="w-full flex justify-between items-center p-4 bg-background backdrop-blur-xl rounded-xl hover:bg-primary/10 transition-all border border-primary/20"
              >
                <span className="text-foreground">{item}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-foreground font-semibold mb-4">Legal & Compliance</h3>
          <div className="space-y-3">
            {legalItems.map((item, i) => (
              <button
                key={i}
                className="w-full flex justify-between items-center p-4 bg-background backdrop-blur-xl rounded-xl hover:bg-primary/10 transition-all border border-primary/20"
              >
                <span className="text-foreground">{item}</span>
                <ExternalLink className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);
