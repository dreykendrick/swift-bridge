import { useState } from "react";
import { Shield, Eye, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { User, mockUser } from "@/lib/mockData";

interface OnboardingFlowProps {
  setCurrentView: (view: string) => void;
  setUser: (user: User) => void;
}

export const OnboardingFlow = ({ setCurrentView, setUser }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [kycData, setKycData] = useState({ fullName: "", idNumber: "", phone: "", country: "Kenya" });

  const stepLabels = ["Personal Information", "Identity Verification", "Face Verification", "Review & Submit"];

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      <BackgroundGlow position="top-left" />

      <div className="max-w-2xl mx-auto pt-12 relative z-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold backdrop-blur-xl transition-all ${
                    step >= s
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-background border border-primary/20 text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-3 rounded-full transition-all ${step > s ? "bg-primary" : "bg-primary/20"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-center text-lg">{stepLabels[step - 1]}</p>
        </div>

        <GlassCard className="p-10" hover={false}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground mb-8">Personal Information</h2>
              {["Full Legal Name", "ID/Passport Number", "Phone Number"].map((label, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={label}
                  className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-xl px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all"
                  onChange={(e) => {
                    const keys = ["fullName", "idNumber", "phone"] as const;
                    setKycData({ ...kycData, [keys[i]]: e.target.value });
                  }}
                />
              ))}
              <select
                className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary"
                value={kycData.country}
                onChange={(e) => setKycData({ ...kycData, country: e.target.value })}
              >
                {["Kenya", "Uganda", "Tanzania", "USA"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Identity Verification</h2>
              <div className="border-2 border-dashed border-primary/40 rounded-2xl p-16 bg-background backdrop-blur-xl hover:border-primary transition-all cursor-pointer">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-lg mb-2">Upload ID Document</p>
                <p className="text-muted-foreground">Passport, National ID, or Driver's License</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Face Verification</h2>
              <div className="border-2 border-dashed border-primary/40 rounded-2xl p-16 bg-background backdrop-blur-xl hover:border-primary transition-all cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/30">
                  <Eye className="w-16 h-16 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-lg mb-2">Take a Selfie</p>
                <p className="text-muted-foreground">We'll match this with your ID photo</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Review Your Information</h2>
              <div className="bg-background backdrop-blur-xl rounded-2xl p-6 space-y-4 border border-primary/20 mb-6">
                {[
                  ["Name", kycData.fullName || "Not provided"],
                  ["ID Number", kycData.idNumber || "Not provided"],
                  ["Phone", kycData.phone || "Not provided"],
                  ["Country", kycData.country],
                ].map(([k, v], i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{k}:</span>
                      <span className="text-foreground font-semibold">{v}</span>
                    </div>
                    {i < 3 && <div className="h-px bg-primary/10 mt-4" />}
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 backdrop-blur-xl border border-primary/30 rounded-2xl p-5">
                <p className="text-primary text-sm flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Encrypted & compliant with CBK and FinCEN regulations
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-4 bg-background backdrop-blur-xl text-foreground rounded-xl border border-primary/30 hover:bg-primary/10 font-semibold transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < 4) {
                  setStep(step + 1);
                } else {
                  setUser(mockUser);
                  setCurrentView("dashboard");
                }
              }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold hover:shadow-glow-xl transition-all"
            >
              {step < 4 ? "Continue" : "Complete Setup"}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
