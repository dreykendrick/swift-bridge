import { Globe, Settings, Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navItems = ["dashboard", "send", "wallet", "bridge", "savings", "transactions", "settings"];

export const Header = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => (
  <header className="bg-card/95 backdrop-blur-2xl border-b border-border fixed top-0 left-0 right-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setCurrentView("welcome")}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-foreground">NUMMO</span>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`text-sm font-semibold transition-colors capitalize ${
                currentView === v ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setCurrentView("settings")}
            className="hidden sm:flex w-10 h-10 rounded-xl bg-secondary border border-border items-center justify-center hover:bg-primary/10 transition-all"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary border border-border flex items-center justify-center active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden mt-3 pb-2 space-y-1.5">
          {navItems.map((v) => (
            <button
              key={v}
              onClick={() => {
                setCurrentView(v);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all capitalize text-sm font-medium active:scale-[0.98] ${
                currentView === v
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-foreground bg-secondary hover:bg-primary/5 border border-border"
              }`}
            >
              {v}
            </button>
          ))}
        </nav>
      )}
    </div>
  </header>
);
