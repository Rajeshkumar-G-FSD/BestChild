import React from "react";
import { ArrowRight, Sparkles, HeartPulse, ShieldAlert } from "lucide-react";

interface HeroProps {
  onLearnMore: () => void;
  onCheckSymptoms: () => void;
}

export default function Hero({ onLearnMore, onCheckSymptoms }: HeroProps) {
  return (
    <section className="bg-[#f7aab7] relative pt-12 pb-16 md:py-20 overflow-hidden" id="hero-section">
      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        {/* Left Column: Content */}
        <div className="md:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-[#1a4f9c] mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Enhanced Care Advisory</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a4f9c] leading-tight mb-6">
            Child Disease and <br />
            Treatment
          </h1>

          <p className="text-[#1a4f9c] text-lg mb-8 max-w-lg font-medium leading-relaxed">
            Child Disease and treatment web is for childhood diseases, treatment and it's suitable for children's doctors. You can easy book doctors or children experts for solve your children disease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onCheckSymptoms}
              className="bg-[#1a4f9c] text-white hover:bg-[#133a75] px-8 py-3.5 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-symptom-btn"
            >
              AI Symptom Checker
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onLearnMore}
              className="bg-white/90 text-[#1a4f9c] hover:bg-white px-8 py-3.5 rounded-full font-bold shadow-md transition-all cursor-pointer flex items-center justify-center"
              id="hero-learn-more-btn"
            >
              Learn More
            </button>
          </div>

          {/* Mini benefits stats row */}
          <div className="grid grid-cols-3 gap-4 mt-10 border-t border-[#1a4f9c]/10 pt-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#1a4f9c]">100%</span>
              <span className="text-xs text-[#1a4f9c]/80 font-semibold uppercase tracking-wider">Secure Data</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#1a4f9c]">24/7</span>
              <span className="text-xs text-[#1a4f9c]/80 font-semibold uppercase tracking-wider">AI Support</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#1a4f9c]">Top</span>
              <span className="text-xs text-[#1a4f9c]/80 font-semibold uppercase tracking-wider">Pediatricians</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="md:w-1/2 relative h-96 md:h-[480px] w-full flex items-center justify-center">
          <div className="relative w-full h-full max-w-lg md:max-w-none">
            {/* Background elements */}
            <div className="absolute inset-4 rounded-[40px] bg-white/25 transform rotate-3 -z-10"></div>
            <div className="absolute inset-8 rounded-[40px] bg-white/10 transform -rotate-3 -z-10"></div>

            {/* Main Baby Image */}
            <img
              alt="Happy baby under towel"
              className="w-full h-full object-cover object-center rounded-[32px] shadow-2xl scale-100 md:scale-105 transform transition-transform hover:scale-110 duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxVwG2OSWJGpD4BDgNXoC2OU3u8tqEP8-YFL9KQfACine0AHSfmck2ILnwk6VlgJwynYwo4EdhC6p9S0hVV9VTMrQKw5OGsmf3m-ZKs3cQJFeIccgwpfKu6WTPOWnOCU_b8cg5lY0mnBlPQBykoIryYxezUoz3u2JPYmA73UEafsHTPuLbE8faoE7x0nLWZfeLNofqdgvppWgyXh2ABlXux1EOGiLiO_caR7JvhPFVVpV8hqJ1as9E96iKo4o2W_GYao9SMVCFfJ7X"
              id="hero-baby-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
