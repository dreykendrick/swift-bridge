import { useState, useEffect } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { OnboardingFlow } from "./OnboardingFlow";
import { Dashboard } from "./Dashboard";
import { BridgeEngine } from "./BridgeEngine";
import { WalletView } from "./WalletView";
import { TransactionsView } from "./TransactionsView";
import { AnalyticsView } from "./AnalyticsView";
import { SettingsView } from "./SettingsView";
import { User, mockUser } from "@/lib/mockData";

const Index = () => {
  const [currentView, setCurrentView] = useState("welcome");
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentView === "dashboard" && !user) {
      setUser(mockUser);
    }
  }, [currentView, user]);

  const commonProps = {
    currentView,
    setCurrentView,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  return (
    <div className="font-sans antialiased">
      {currentView === "welcome" && <WelcomeScreen setCurrentView={setCurrentView} setUser={setUser} />}
      {currentView === "onboarding" && <OnboardingFlow setCurrentView={setCurrentView} setUser={setUser} />}
      {currentView === "dashboard" && <Dashboard user={user} {...commonProps} />}
      {currentView === "bridge" && <BridgeEngine user={user} {...commonProps} />}
      {currentView === "wallet" && <WalletView user={user} {...commonProps} />}
      {currentView === "transactions" && <TransactionsView {...commonProps} />}
      {currentView === "analytics" && <AnalyticsView {...commonProps} />}
      {currentView === "settings" && <SettingsView user={user} {...commonProps} />}
    </div>
  );
};

export default Index;
