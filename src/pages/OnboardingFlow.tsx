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
    <div className="min-h-screen bg-background px-4 py-6 relative overflow-hidden">
      <BackgroundGlow position="top-left" />

      <div className="max-w-2xl mx-auto pt-6 sm:pt-12 relative z-10">
        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base backdrop-blur-xl transition-all ${
                    step >= s
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-background border border-primary/20 text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-0.5 sm:h-1 mx-1.5 sm:mx-3 rounded-full transition-all ${step > s ? "bg-primary" : "bg-primary/20"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-center text-sm sm:text-lg">{stepLabels[step - 1]}</p>
        </div>

        <GlassCard className="p-5 sm:p-10" hover={false}>
          {step === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8">Personal Information</h2>
              {["Full Legal Name", "ID/Passport Number", "Phone Number"].map((label, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={label}
                  className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:shadow-glow transition-all text-sm sm:text-base"
                  onChange={(e) => {
                    const keys = ["fullName", "idNumber", "phone"] as const;
                    setKycData({ ...kycData, [keys[i]]: e.target.value });
                  }}
                />
              ))}
              <select
                className="w-full bg-background backdrop-blur-xl border border-primary/30 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-foreground focus:outline-none focus:border-primary text-sm sm:text-base"
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
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Identity Verification</h2>
              <div className="border-2 border-dashed border-primary/40 rounded-xl sm:rounded-2xl p-8 sm:p-16 bg-background backdrop-blur-xl hover:border-primary transition-all cursor-pointer active:scale-[0.98]">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-base sm:text-lg mb-2">Upload ID Document</p>
                <p className="text-muted-foreground text-sm sm:text-base">Passport, National ID, or Driver's License</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Face Verification</h2>
              <div className="border-2 border-dashed border-primary/40 rounded-xl sm:rounded-2xl p-8 sm:p-16 bg-background backdrop-blur-xl hover:border-primary transition-all cursor-pointer active:scale-[0.98]">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/30">
                  <Eye className="w-10 h-10 sm:w-16 sm:h-16 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-base sm:text-lg mb-2">Take a Selfie</p>
                <p className="text-muted-foreground text-sm sm:text-base">We'll match this with your ID photo</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Review Your Information</h2>
              <div className="bg-background backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 border border-primary/20 mb-4 sm:mb-6">
                {[
                  ["Name", kycData.fullName || "Not provided"],
                  ["ID Number", kycData.idNumber || "Not provided"],
                  ["Phone", kycData.phone || "Not provided"],
                  ["Country", kycData.country],
                ].map(([k, v], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">{k}:</span>
                      <span className="text-foreground font-semibold">{v}</span>
                    </div>
                    {i < 3 && <div className="h-px bg-primary/10 mt-3 sm:mt-4" />}
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 backdrop-blur-xl border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <p className="text-primary text-xs sm:text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Encrypted & compliant with CBK and FinCEN regulations
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-background backdrop-blur-xl text-foreground rounded-lg sm:rounded-xl border border-primary/30 hover:bg-primary/10 font-semibold transition-all text-sm sm:text-base active:scale-95"
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
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg sm:rounded-xl font-bold hover:shadow-glow-xl transition-all text-sm sm:text-base active:scale-95"
            >
              {step < 4 ? "Continue" : "Complete Setup"}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
