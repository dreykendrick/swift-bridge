import { Globe, Settings, Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navItems = ["dashboard", "wallet", "bridge", "transactions", "analytics", "settings"];

export const Header = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => (
  <header className="bg-background/95 backdrop-blur-2xl border-b border-primary/20 fixed top-0 left-0 right-0 z-50 shadow-glow-lg">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView("welcome")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-black text-foreground">NUMMO</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("settings")}
            className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur-xl border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-card/80 backdrop-blur-xl border border-primary/20 flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 space-y-2">
          {navItems.map((v) => (
            <button
              key={v}
              onClick={() => {
                setCurrentView(v);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-foreground bg-card/80 backdrop-blur-xl rounded-xl hover:bg-primary/10 transition-all capitalize border border-primary/20"
            >
              {v}
            </button>
          ))}
        </nav>
      )}
    </div>
  </header>
);
