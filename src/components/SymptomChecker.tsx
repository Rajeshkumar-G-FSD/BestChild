import React, { useState } from "react";
import { Sparkles, Bot, AlertTriangle, ShieldCheck, Heart, RefreshCw, AlertOctagon, HelpCircle } from "lucide-react";

const SYSTEM_SYMPTOMS = [
  { id: "fever", label: "Fever / Elevated Temperature" },
  { id: "cough", label: "Persistent Coughing" },
  { id: "runny_nose", label: "Runny or Blocked Nose" },
  { id: "rash", label: "Skin Rash, Redness, or Spots" },
  { id: "vomiting", label: "Vomiting or Nausea" },
  { id: "diarrhea", label: "Loose or Frequent Stools" },
  { id: "lethargy", label: "Extreme Lethargy or Sleepiness" },
  { id: "ear_pain", label: "Ear Pain or Pulling at Ears" },
  { id: "breathing_effort", label: "Rapid or Labored Breathing" },
];

export default function SymptomChecker() {
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState("months");
  const [duration, setDuration] = useState("1-2 days");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseHtml, setResponseHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    setAgeValue("");
    setDuration("1-2 days");
    setSelectedSymptoms([]);
    setAdditionalNotes("");
    setResponseHtml(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageValue) {
      setError("Please specify the child's age for safety evaluations.");
      return;
    }
    if (selectedSymptoms.length === 0 && !additionalNotes.trim()) {
      setError("Please select at least one symptom or type details.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponseHtml(null);

    const symptomLabels = selectedSymptoms.map(
      (id) => SYSTEM_SYMPTOMS.find((s) => s.id === id)?.label || id
    );

    const promptText = `
      Please evaluate symptoms for a child:
      - Age: ${ageValue} ${ageUnit}
      - Symptom Duration: ${duration}
      - Checked Symptoms: ${symptomLabels.join(", ") || "None selected"}
      - Parent's Notes: ${additionalNotes.trim() || "No additional notes provided"}

      Provide a well-structured pediatric advice guide with:
      1. Triage Color Indicator (GREEN for mild home care, YELLOW for contact pediatrician, RED for immediate emergency ER care). Explain clearly why.
      2. Possible Explanations (What common pediatric conditions might correspond, e.g., common cold, roseola, viral croup, etc. Warn that this is not an official diagnosis).
      3. Practical Comfort Actions (How to safely manage fever, clean nasal pathways, hydration fluids, etc.).
      4. Crucial Red Flags (Clear list of warning signs that mandate immediate medical help, like breathing struggle or stiff neck).
      5. Warm comforting note for the parent.
    `;

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", text: promptText }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get analysis. Server returned error.");
      }

      const data = await response.json();
      setResponseHtml(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while reaching the AI Care Companion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen text-left" id="symptom-checker-section">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Title */}
        <div className="bg-gradient-to-r from-[#1a4f9c] to-blue-800 text-white p-8 rounded-3xl shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-12 translate-y-12">
            <Bot className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10">
            <span className="bg-blue-400/30 text-white font-extrabold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-blue-300/25 mb-4 inline-block">
              Intelligent Pediatric Co-Pilot
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300" />
              AI Baby Symptom Checker
            </h1>
            <p className="text-blue-100 mt-2.5 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
              Describe your baby's symptoms or select checklists to receive compassionate, medically sound guidance, triage levels, and home comfort suggestions in seconds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block: Symptom Input Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Bot className="w-5 h-5 text-[#1a4f9c]" />
              Symptom Profile
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Child Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child's Age *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    placeholder="Value"
                    className="w-1/2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] focus:ring-1 focus:ring-[#1a4f9c] text-sm"
                  />
                  <select
                    value={ageUnit}
                    onChange={(e) => setAgeUnit(e.target.value)}
                    className="w-1/2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] focus:ring-1 focus:ring-[#1a4f9c] text-sm"
                  >
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              {/* Symptom Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Symptom Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] focus:ring-1 focus:ring-[#1a4f9c] text-sm"
                >
                  <option value="Under 24 hours">Under 24 hours</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="Over a week">Over a week</option>
                </select>
              </div>

              {/* Symptoms checklist */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check All That Apply</label>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {SYSTEM_SYMPTOMS.map((sym) => {
                    const isChecked = selectedSymptoms.includes(sym.id);
                    return (
                      <button
                        type="button"
                        key={sym.id}
                        onClick={() => toggleSymptom(sym.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#1a4f9c]/10 text-[#1a4f9c] border-[#1a4f9c]"
                            : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
                        }`}
                      >
                        <span>{sym.label}</span>
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? "bg-[#1a4f9c] border-[#1a4f9c] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isChecked && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parent's Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Describe symptoms / behavior (Notes)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Cough sounds dry or like barking. Child is drinking formula but refusing solid baby foods..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] text-xs resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-100 flex gap-2">
                  <AlertOctagon className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-1/3 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer text-center"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 bg-[#1a4f9c] text-white hover:bg-[#133a75] font-bold rounded-xl text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Analyze with AI
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Block: AI Care Advice Results */}
          <div className="lg:col-span-7 h-full">
            {!isLoading && !responseHtml && (
              <div className="bg-white rounded-3xl border border-gray-200 border-dashed p-10 text-center h-full flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1a4f9c] flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8" />
                </div>
                <h4 className="text-gray-900 font-extrabold text-lg mb-1.5">Your AI Care Report Awaits</h4>
                <p className="text-gray-500 max-w-sm text-xs leading-relaxed font-medium">
                  Select your child's age, checks their current symptoms, and click "Analyze with AI" to generate a personalized triage overview.
                </p>
                <div className="mt-6 flex items-center gap-2.5 text-xs text-[#1a4f9c] font-bold bg-[#dbe4f9]/40 px-4 py-2 rounded-full border border-[#dbe4f9]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Clinically Contextual Guidelines</span>
                </div>
              </div>
            )}

            {/* Custom Loading State */}
            {isLoading && (
              <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 text-center space-y-6 min-h-[350px] flex flex-col justify-center items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-[#1a4f9c]/15 border-t-[#1a4f9c] animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-400 fill-red-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 max-w-xs">
                  <h4 className="text-gray-900 font-extrabold text-base">Generating Care Analysis</h4>
                  <p className="text-gray-500 text-xs leading-normal animate-pulse font-semibold">
                    Evaluating warning indicators, temperature benchmarks, and formulating safe relief tips...
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl text-left border border-gray-100 text-[11px] text-gray-500 space-y-1 max-w-sm">
                  <span className="font-extrabold text-[#1a4f9c] uppercase block tracking-wider">💡 Pediatric Hint:</span>
                  <span>Keep infants hydrated with frequent, small sips of milk or oral rehydration solution. Avoid sudden room temperature fluctuations.</span>
                </div>
              </div>
            )}

            {/* Success Report Block */}
            {responseHtml && !isLoading && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6 animate-scale-up">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#1a4f9c]/10 text-[#1a4f9c]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-black text-sm">AI Care Advisor Report</h4>
                      <span className="text-[10px] text-gray-400 font-bold block">Generated just now</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setResponseHtml(null);
                    }}
                    className="text-xs text-gray-400 font-semibold hover:text-gray-600 hover:underline cursor-pointer"
                  >
                    Clear Report
                  </button>
                </div>

                {/* Formatted Markdown/Text output from Gemini */}
                <div className="prose prose-sm max-w-none text-left text-gray-800 space-y-4 text-xs font-medium leading-relaxed">
                  <div className="whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-800 text-xs shadow-inner">
                    {responseHtml}
                  </div>
                </div>

                {/* Bottom Safe Triage Disclaimer Box */}
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl flex gap-3 text-left">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-extrabold text-yellow-800 text-xs block">AI Clinical Disclaimer:</span>
                    <p className="text-yellow-700 text-[11px] leading-relaxed font-semibold">
                      This analysis is for educational guidelines and informational purposes only. It is not a substitute for professional clinical medical advice, diagnostics, or actual treatments. Always call 911 or your local emergency services for acute emergencies.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
