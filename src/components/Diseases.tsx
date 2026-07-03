import React, { useState } from "react";
import { Disease } from "../types";
import { diseasesData } from "../data";
import { X, Search, ShieldAlert, HeartPulse, Activity, Sparkles, CheckCircle } from "lucide-react";

interface DiseasesProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type ModalType = "symptoms" | "whenToSeeDoctor" | "riskFactors" | "prevention" | "more" | null;

export default function Diseases({ searchQuery, setSearchQuery }: DiseasesProps) {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  // Filter diseases based on search
  const filteredDiseases = diseasesData.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (disease: Disease, type: ModalType) => {
    setSelectedDisease(disease);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedDisease(null);
    setModalType(null);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="diseases-section">
      {/* Decorative element left (Matches HTML precisely) */}
      <img
        alt="Decorative baby"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-48 hidden lg:block opacity-60 hover:opacity-90 transition-opacity pointer-events-none"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJnAK8oVh_68_omVEu5Se-qnM-OoaSZt_dV4dGGaNlG6DnwjepyihtcQi8X_7Nms3zV41N0rQNwkcQ-sSdWUeEAJKWSxpi8QHH82qE0cQQTKTKnre1Tygh4w-VDnWi0fW1U_1B1Npcv98W7cGTQdj8YLr5excsEXn_0vTmNuaO2691yEFM_MTq6FfuyPriMpOMDmJasCOqjIAyX8gyBf1WwrCWU6E6e3HLXnHaDl9xOIlZxloNc203pXQuaZLNphgxpVcej0R9Z6gA"
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a4f9c] mb-3">Pediatric diseases</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Explore our clinically-reviewed pediatric database to understand common childhood symptoms, preventive strategies, and home care.
          </p>

          {/* Search bar specifically for disease page */}
          <div className="mt-6 max-w-md mx-auto block sm:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pediatric conditions..."
                className="w-full px-4 py-2.5 pl-10 rounded-full border border-gray-300 focus:outline-none focus:border-[#1a4f9c]"
              />
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {filteredDiseases.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-lg">No pediatric conditions found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-[#1a4f9c] font-semibold hover:underline"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDiseases.map((disease) => (
              <div
                key={disease.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                id={`disease-card-${disease.id}`}
              >
                {/* Header image block with title */}
                <div className="h-40 bg-gray-200 relative">
                  <img
                    alt={disease.name}
                    className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 hover:scale-105"
                    src={disease.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a4f9c] to-transparent opacity-80"></div>
                  <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg leading-tight">
                    {disease.name}
                  </h3>
                </div>

                {/* Card Content list */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  <ul className="space-y-3.5 mb-5 text-sm font-semibold text-[#1a4f9c] flex-grow">
                    <li>
                      <button
                        onClick={() => openModal(disease, "symptoms")}
                        className="flex items-center hover:underline cursor-pointer group text-left w-full justify-between"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">Symptoms</span>
                        <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => openModal(disease, "whenToSeeDoctor")}
                        className="flex items-center hover:underline cursor-pointer group text-left w-full justify-between"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">When to see doctor</span>
                        <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => openModal(disease, "riskFactors")}
                        className="flex items-center hover:underline cursor-pointer group text-left w-full justify-between"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">Risk factors</span>
                        <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => openModal(disease, "prevention")}
                        className="flex items-center hover:underline cursor-pointer group text-left w-full justify-between"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">Prevention</span>
                        <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </li>
                  </ul>

                  <button
                    onClick={() => openModal(disease, "more")}
                    className="text-[#1a4f9c] font-bold text-sm hover:underline mt-auto flex items-center justify-start cursor-pointer group"
                  >
                    More...
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* More diseases link */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setSearchQuery("");
              alert("You are viewing our core pediatric conditions list! Use the search bar to find specifics or try our AI Symptom Checker for intelligent diagnostic help.");
            }}
            className="text-[#1a4f9c] font-bold text-lg inline-flex items-center hover:underline cursor-pointer"
          >
            More Diseases{" "}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interactive Modal/Drawer for Disease Details */}
      {selectedDisease && modalType && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="disease-modal">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col transform transition-all animate-scale-up border border-gray-100">
            {/* Header banner */}
            <div className="relative h-44 flex-shrink-0">
              <img
                alt={selectedDisease.name}
                className="w-full h-full object-cover"
                src={selectedDisease.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-black/30"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-1.5 rounded-full text-white cursor-pointer transition-all"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 pr-6">
                <span className="text-red-300 text-xs uppercase font-extrabold tracking-widest bg-red-950/40 px-2.5 py-1 rounded-full border border-red-500/20">
                  Pediatric Guide
                </span>
                <h3 className="text-2xl font-black text-white mt-1.5">{selectedDisease.name}</h3>
              </div>
            </div>

            {/* Scrollable contents */}
            <div className="p-6 overflow-y-auto space-y-4 text-left flex-grow">
              {modalType === "symptoms" && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-emerald-600 font-extrabold text-lg">
                    <Activity className="w-5 h-5" />
                    <h4>Recognizing Symptoms</h4>
                  </div>
                  <ul className="space-y-3">
                    {selectedDisease.symptoms.map((s, idx) => (
                      <li key={idx} className="flex gap-2.5 text-gray-700 text-sm leading-relaxed font-medium">
                        <span className="text-emerald-500 mt-1 flex-shrink-0">●</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalType === "whenToSeeDoctor" && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-red-600 font-extrabold text-lg">
                    <ShieldAlert className="w-5 h-5" />
                    <h4>Warning Signs & Pediatrician Advice</h4>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3 border border-red-100 text-red-800 text-xs font-semibold mb-4">
                    If your child presents any of the warning signs listed below, please seek clinical attention promptly.
                  </div>
                  <ul className="space-y-3">
                    {selectedDisease.whenToSeeDoctor.map((s, idx) => (
                      <li key={idx} className="flex gap-2.5 text-gray-700 text-sm leading-relaxed font-medium">
                        <span className="text-red-500 mt-1 flex-shrink-0">⚠️</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalType === "riskFactors" && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-amber-600 font-extrabold text-lg">
                    <ShieldAlert className="w-5 h-5" />
                    <h4>Predisposing Risk Factors</h4>
                  </div>
                  <ul className="space-y-3">
                    {selectedDisease.riskFactors.map((s, idx) => (
                      <li key={idx} className="flex gap-2.5 text-gray-700 text-sm leading-relaxed font-medium">
                        <span className="text-amber-500 mt-1 flex-shrink-0">✦</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalType === "prevention" && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-blue-600 font-extrabold text-lg">
                    <CheckCircle className="w-5 h-5" />
                    <h4>Proactive Prevention</h4>
                  </div>
                  <ul className="space-y-3">
                    {selectedDisease.prevention.map((s, idx) => (
                      <li key={idx} className="flex gap-2.5 text-gray-700 text-sm leading-relaxed font-medium">
                        <span className="text-blue-500 mt-1 flex-shrink-0">✔</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalType === "more" && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base mb-1">Clinical Overview</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">{selectedDisease.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-blue-950 text-base mb-2">Recommended Safe Home Care</h4>
                    <ul className="space-y-2.5">
                      {selectedDisease.homeCare.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-gray-700 text-sm leading-relaxed font-medium">
                          <span className="text-[#1a4f9c] font-black">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#dbe4f9]/40 rounded-2xl border border-[#dbe4f9] text-xs text-[#1a4f9c] font-semibold leading-relaxed">
                    Always seek the advice of your pediatrician or other qualified healthcare providers with any questions you have regarding your child's medical condition.
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50 flex-shrink-0">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold px-5 py-2 rounded-xl text-sm transition-all cursor-pointer"
              >
                Close Guide
              </button>
              {modalType !== "more" && (
                <button
                  onClick={() => setModalType("more")}
                  className="bg-[#1a4f9c] hover:bg-[#133a75] text-white font-bold px-5 py-2 rounded-xl text-sm transition-all cursor-pointer"
                >
                  View Full Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
