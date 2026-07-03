import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Diseases from "./components/Diseases";
import SymptomChecker from "./components/SymptomChecker";
import Services from "./components/Services";
import Contact from "./components/Contact";
import ProfileManager from "./components/ProfileManager";
import Footer from "./components/Footer";
import { Child, Appointment, ContactMessage } from "./types";
import { defaultChildren } from "./data";
import { HeartPulse, CheckSquare, Shield, HelpCircle, Activity, Sparkles, UserCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Children Profile State
  const [childrenList, setChildrenList] = useState<Child[]>(() => {
    const saved = localStorage.getItem("babycare_children");
    return saved ? JSON.parse(saved) : defaultChildren;
  });

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("babycare_appointments");
    return saved ? JSON.parse(saved) : [];
  });

  // Contact Messages State
  const [messageList, setMessageList] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("babycare_messages");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem("babycare_children", JSON.stringify(childrenList));
  }, [childrenList]);

  useEffect(() => {
    localStorage.setItem("babycare_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("babycare_messages", JSON.stringify(messageList));
  }, [messageList]);

  // Children Handlers
  const handleAddChild = (newChild: Child) => {
    setChildrenList((prev) => [...prev, newChild]);
  };

  const handleDeleteChild = (id: string) => {
    setChildrenList((prev) => prev.filter((c) => c.id !== id));
    // Also cancel appointments for that child
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.childId === id ? { ...appt, status: "cancelled" as const } : appt
      )
    );
  };

  // Appointments Handlers
  const handleBookAppointment = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "cancelled" as const } : appt
      )
    );
  };

  // Contact Handler
  const handleSendMessage = (msg: ContactMessage) => {
    setMessageList((prev) => [msg, ...prev]);
  };

  // Smooth Scroll Helper for Learn More
  const handleLearnMoreScroll = () => {
    const element = document.getElementById("diseases-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      setActiveTab("disease");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Primary Header/Navbar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Screen Router */}
      <main className="flex-grow">
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* Hero Banner */}
            <Hero
              onLearnMore={handleLearnMoreScroll}
              onCheckSymptoms={() => {
                setActiveTab("symptom-checker");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Quick Informational Notice Banner */}
            <section className="bg-blue-50 py-6 border-y border-blue-100/50">
              <div className="container mx-auto px-4 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 rounded-full bg-blue-100 text-[#1a4f9c] flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">Need immediate pediatric symptom guidance?</h4>
                    <p className="text-xs text-gray-500 font-medium">Use our advanced AI tool to cross-reference common child conditions.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("symptom-checker");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-[#1a4f9c] hover:bg-[#133a75] text-white text-xs font-bold py-2.5 px-5 rounded-full shadow cursor-pointer transition-all shrink-0"
                >
                  Start Symptom Checklist
                </button>
              </div>
            </section>

            {/* Pediatric Diseases Grid (Fully Interactive) */}
            <Diseases searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Services Showcase (We Provides section, has the two exact promo cards & active Directory) */}
            <Services
              childrenList={childrenList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onBookAppointment={handleBookAppointment}
            />

            {/* Contact Section (Baby telephone image, matches exact mockup) */}
            <Contact onSendMessage={handleSendMessage} messageList={messageList} />
          </div>
        )}

        {activeTab === "disease" && (
          <div className="animate-fade-in">
            <Diseases searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        )}

        {activeTab === "symptom-checker" && (
          <div className="animate-fade-in">
            <SymptomChecker />
          </div>
        )}

        {activeTab === "doctors" && (
          <div className="animate-fade-in">
            <Services
              childrenList={childrenList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onBookAppointment={handleBookAppointment}
            />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="animate-fade-in">
            <ProfileManager
              childrenList={childrenList}
              onAddChild={handleAddChild}
              onDeleteChild={handleDeleteChild}
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
            />
          </div>
        )}
      </main>

      {/* Global Footer (matches mockup footer, pink, left/right baby decorations, copywrights) */}
      <Footer />
    </div>
  );
}
