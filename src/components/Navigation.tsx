import React from "react";
import { Search, User, Baby, Heart, Shield, Plus, List } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: NavigationProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (activeTab !== "disease") {
      setActiveTab("disease");
    }
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveTab("home");
            setSearchQuery("");
          }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90"
          id="nav-logo"
        >
          <img
            src="https://i.postimg.cc/vBj2zr2j/bestchildrenerode.png"
            alt="best Children Hospital Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded"
            referrerPolicy="no-referrer"
          />
          <span className="font-extrabold tracking-tight text-[#1a4f9c] text-lg sm:text-xl">
            best Children Hospital
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-medium text-[#1a4f9c]" id="main-nav-links">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "home"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("disease")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "disease"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            Pediatric Diseases
          </button>
          <button
            onClick={() => setActiveTab("symptom-checker")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "symptom-checker"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            AI Symptom Checker
          </button>
          <button
            onClick={() => setActiveTab("tour")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "tour"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            Interactive Tour
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "doctors"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            Book Doctor
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-1 py-1 transition-all cursor-pointer border-b-2 ${
              activeTab === "profile"
                ? "border-[#1a4f9c] text-[#1a4f9c]"
                : "border-transparent text-gray-500 hover:text-[#1a4f9c]"
            }`}
          >
            My Children & Appointments
          </button>
        </nav>

        {/* Search & Profile Icons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8 pr-4 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10 text-sm w-48 transition-all"
              placeholder="Search diseases..."
              id="nav-search-input"
            />
            <Search className="w-4 h-4 text-[#1a4f9c] absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => setActiveTab("profile")}
            className={`p-2 rounded-full border ${
              activeTab === "profile"
                ? "bg-[#1a4f9c] text-white border-[#1a4f9c]"
                : "text-[#1a4f9c] border-gray-200 hover:bg-gray-50"
            } cursor-pointer transition-all`}
            title="Children Profiles & Appointments"
            id="nav-profile-btn"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
