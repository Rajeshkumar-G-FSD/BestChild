import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  ShieldCheck, 
  Search, 
  UserCheck, 
  Activity, 
  Plus, 
  Layers, 
  Users, 
  ClipboardList, 
  Send,
  Sparkles,
  Lock,
  LogOut,
  Stethoscope,
  Heart,
  BriefcaseMedical
} from "lucide-react";
import { 
  saveAppointmentToFirebase, 
  getAppointmentsFromFirebase, 
  verifyAdminCredentials,
  FirebaseAppointment 
} from "../lib/firebase";

export default function AppointmentPortal() {
  // Navigation inside portal
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("bestchildren_admin_logged") === "true";
  });
  
  // Tab within portal: "book" or "admin" (which shows dashboard if logged in, or login form)
  const [portalTab, setPortalTab] = useState<"book" | "admin">("book");

  // Admin login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form states
  const [kidName, setKidName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [guardianType, setGuardianType] = useState<"father" | "mother" | "guardian">("father");
  const [guardianName, setGuardianName] = useState("");
  const [issueType, setIssueType] = useState<"disease" | "vaccine" | "other">("disease");
  const [issueDetail, setIssueDetail] = useState("");
  const [department, setDepartment] = useState("Pediatric General");
  const [doctor, setDoctor] = useState("Dr. Sarah Jenkins");
  const [date, setDate] = useState("");
  
  // Booking action states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Dashboard / Registered kids states (Admin only)
  const [appointments, setAppointments] = useState<FirebaseAppointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  // Doctors & Departments data
  const doctors = [
    { name: "Dr. Sarah Jenkins", specialty: "Pediatric General", dept: "Pediatric General" },
    { name: "Dr. Robert Chen", specialty: "Pediatric Allergist & Pulmonologist", dept: "Allergy & Pulmonology" },
    { name: "Dr. Amanda Ross", specialty: "Developmental Specialist", dept: "Developmental Pediatrics" },
    { name: "Dr. Michael Vance", specialty: "Pediatric Gastroenterologist", dept: "Gastroenterology" }
  ];

  const departments = [
    "Pediatric General",
    "Allergy & Pulmonology",
    "Developmental Pediatrics",
    "Gastroenterology",
    "Immunization & Vaccines"
  ];

  // Auto-set first doctor when department changes
  useEffect(() => {
    const matchedDoctor = doctors.find(d => d.dept === department);
    if (matchedDoctor) {
      setDoctor(matchedDoctor.name);
    }
  }, [department]);

  // Load appointments when admin is logged in
  const loadAppointments = async () => {
    setIsLoadingAppointments(true);
    const data = await getAppointmentsFromFirebase();
    setAppointments(data);
    setIsLoadingAppointments(false);
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadAppointments();
    }
  }, [isAdminLoggedIn]);

  // Handle Booking form submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kidName || !age || !contactNumber || !guardianName || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setBookingSuccess(null);

    const apptData: Omit<FirebaseAppointment, "id" | "createdAt"> = {
      kidName,
      age,
      contactNumber,
      guardianType,
      guardianName,
      issueType,
      issueDetail,
      department,
      doctor,
      date
    };

    try {
      // 1. Save to Firebase DB
      const apptId = await saveAppointmentToFirebase(apptData);

      // 2. Prepare WhatsApp payload and redirect/open tab
      const guardianLabel = guardianType.charAt(0).toUpperCase() + guardianType.slice(1);
      const messageText = `*Best Children Hospital Appointment Confirmation*\n\n` +
        `Dear ${guardianName} (${guardianLabel}),\n` +
        `Your child's pediatric appointment has been successfully scheduled!\n\n` +
        `*Kid's Name:* ${kidName}\n` +
        `*Age:* ${age}\n` +
        `*Contact Number:* ${contactNumber}\n` +
        `*Department:* ${department}\n` +
        `*Assigned Specialist:* ${doctor}\n` +
        `*Issue/Consultation Type:* ${issueType.toUpperCase()} (${issueDetail || "Routine Care"})\n` +
        `*Scheduled Date:* ${date}\n` +
        `*Appointment ID:* ${apptId}\n\n` +
        `Thank you for choosing Best Children Hospital. Please arrive 15 minutes before your slot.`;

      // Format WhatsApp API Link
      // Clean phone number: remove any non-digits, and append prefix if necessary
      const cleanPhone = contactNumber.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
      
      setBookingSuccess(`Appointment saved successfully in Firebase! Initiating WhatsApp notification...`);
      
      // Delay slightly for visual feedback then open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        // Reset form
        setKidName("");
        setAge("");
        setContactNumber("");
        setGuardianName("");
        setIssueDetail("");
        setBookingSuccess(null);
      }, 2500);

    } catch (err) {
      console.error(err);
      alert("Failed to save appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const isValid = await verifyAdminCredentials(username, password);
      if (isValid) {
        setIsAdminLoggedIn(true);
        localStorage.setItem("bestchildren_admin_logged", "true");
        setUsername("");
        setPassword("");
        loadAppointments();
      } else {
        setLoginError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      setLoginError("Verification failed due to database connection error.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("bestchildren_admin_logged");
  };

  // Filter appointments for registered kids search area
  const filteredAppointments = appointments.filter((appt) => {
    const query = searchQuery.toLowerCase();
    return (
      appt.kidName.toLowerCase().includes(query) ||
      appt.guardianName.toLowerCase().includes(query) ||
      appt.contactNumber.includes(query) ||
      appt.department.toLowerCase().includes(query) ||
      appt.doctor.toLowerCase().includes(query) ||
      appt.issueDetail.toLowerCase().includes(query)
    );
  });

  // Basic stats calculators
  const totalAppointments = appointments.length;
  const vaccineAppointments = appointments.filter(a => a.issueType === "vaccine").length;
  const diseaseAppointments = appointments.filter(a => a.issueType === "disease").length;
  const otherAppointments = appointments.filter(a => a.issueType === "other").length;

  return (
    <section className="bg-slate-50 py-12 text-left min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Navigation / Header tabs for portal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a4f9c] tracking-tight">
              Scheduler & Registered Registry
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Seamless pediatric appointments synced in Firebase and notified via WhatsApp
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-full sm:w-auto">
            <button
              onClick={() => setPortalTab("book")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                portalTab === "book"
                  ? "bg-[#1a4f9c] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              Book Appointment
            </button>
            <button
              onClick={() => setPortalTab("admin")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                portalTab === "admin"
                  ? "bg-[#1a4f9c] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {isAdminLoggedIn ? "Admin Dashboard" : "Admin Login"}
            </button>
          </div>
        </div>

        {/* Tab 1: Appointment Booking Form */}
        {portalTab === "book" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Left Container */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-100 text-pink-500 rounded-2xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Child's Schedule Form</h3>
                  <p className="text-xs text-gray-400">All fields are secured and saved instantly to cloud</p>
                </div>
              </div>

              {bookingSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3 animate-pulse">
                  <Activity className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{bookingSuccess}</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                
                {/* Name & Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Kid's Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={kidName}
                        onChange={(e) => setKidName(e.target.value)}
                        placeholder="Enter full name of child"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 4 years, 8 months"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Contact phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Contact Number (WhatsApp enabled) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. +1234567890 or country code first"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Please enter prefix/country code if messaging internationally.</p>
                </div>

                {/* Guardian Relationship Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Guardian Relationship <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["father", "mother", "guardian"].map((relation) => (
                      <button
                        key={relation}
                        type="button"
                        onClick={() => setGuardianType(relation as any)}
                        className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                          guardianType === relation
                            ? "bg-[#1a4f9c]/10 text-[#1a4f9c] border-[#1a4f9c]"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {relation}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guardian Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Father, mother, or guardian full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                  />
                </div>

                {/* Issue Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Consultation Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: "disease", label: "Disease Care" },
                      { type: "vaccine", label: "Vaccination" },
                      { type: "other", label: "Routine Check" }
                    ].map((cat) => (
                      <button
                        key={cat.type}
                        type="button"
                        onClick={() => setIssueType(cat.type as any)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          issueType === cat.type
                            ? "bg-pink-50 text-pink-600 border-pink-300"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Issue Description detail */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Issue Details / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={issueDetail}
                    onChange={(e) => setIssueDetail(e.target.value)}
                    placeholder="Specify disease symptoms, requested vaccine brand name, or custom child care queries..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all resize-none"
                  />
                </div>

                {/* Department & Doctor Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Preferred Pediatric Doctor
                    </label>
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    >
                      {doctors.map((docItem) => (
                        <option key={docItem.name} value={docItem.name}>{docItem.name} ({docItem.specialty})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Scheduled Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a4f9c] text-white hover:bg-[#133a75] disabled:bg-gray-400 py-3.5 px-6 rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Activity className="w-5 h-5 animate-spin" />
                      Saving to Firebase &amp; Confirming...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Confirm &amp; Open WhatsApp Confirmation
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Visual sidebar card info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-gradient-to-tr from-[#1a4f9c] to-blue-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                <Sparkles className="w-10 h-10 text-pink-300 mb-4 animate-bounce" />
                <h4 className="text-xl font-extrabold tracking-tight">Best Pediatric Care</h4>
                <p className="text-blue-100 text-xs mt-2 leading-relaxed font-medium">
                  We match state-of-the-art diagnostic imaging workflows with warm, supportive, and completely personalized treatment protocols. Book your pediatric consult online.
                </p>
                
                <div className="mt-6 space-y-3.5 border-t border-white/10 pt-4 text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Real-time Firebase Storage integration</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Send className="w-4 h-4 text-pink-300" />
                    <span>Instant Patient WhatsApp Alert Redirects</span>
                  </div>
                </div>
              </div>

              {/* Informational checklist card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-left">
                <h4 className="font-extrabold text-gray-900 text-sm mb-3">Clinical Departments</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#1a4f9c] mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-800">Pediatric General Medicine:</strong> Complete child checkups, continuous diagnostic screening.
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-pink-400 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-800">Immunizations &amp; Vaccines:</strong> Mandatory national child vaccine calendar &amp; safe boosters.
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-gray-800">Specialty Clinics:</strong> Dedicated developmental therapy, allergy &amp; pulmonary clinics, digestive care.
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Admin Section */}
        {portalTab === "admin" && (
          <div>
            {!isAdminLoggedIn ? (
              /* Admin Login Form */
              <div className="max-w-md mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 mt-6">
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 bg-red-50 text-[#1a4f9c] rounded-2xl mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Admin Authentication</h3>
                  <p className="text-xs text-gray-500 mt-1">Please enter credentials to unlock database dashboard</p>
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username (default: bestchildren)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (default: bestchildren@123)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-[#1a4f9c] text-white hover:bg-[#133a75] py-3 px-6 rounded-xl text-sm font-extrabold shadow transition-all cursor-pointer flex justify-center items-center gap-2"
                  >
                    {isLoggingIn ? "Verifying with Firestore..." : "Authenticate"}
                  </button>
                </form>

                <div className="mt-6 border-t border-gray-100 pt-4 text-[11px] text-gray-400 text-center">
                  Credentials verified and stored securely in Firebase Firestore DB
                </div>
              </div>
            ) : (
              /* Admin Dashboard & Registered Kids Area */
              <div className="space-y-8 animate-fade-in">
                
                {/* Admin Header with stats */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Logged in as Administrator</h3>
                      <p className="text-xs text-emerald-600 font-semibold">Active Firebase Firestore Connection</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={loadAppointments}
                      className="flex-1 md:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Sync Database
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 md:flex-none bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                </div>

                {/* Dashboard Widgets Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-[#1a4f9c] rounded-xl">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Kids</span>
                      <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{totalAppointments}</h4>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-rose-500 rounded-xl">
                      <BriefcaseMedical className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Disease Care</span>
                      <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{diseaseAppointments}</h4>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Vaccines</span>
                      <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{vaccineAppointments}</h4>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Routine Check</span>
                      <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{otherAppointments}</h4>
                    </div>
                  </div>

                </div>

                {/* Registered Kids Area with Search filter */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  
                  {/* Table header and search bar */}
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-base">Registered Pediatric Patient Records</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Filter lists instantly by patient name, contact number, or guardian details</p>
                    </div>

                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search child, parent, doc..."
                        className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-[#1a4f9c]/10 focus:border-[#1a4f9c] outline-none transition-all"
                      />
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {/* Registered Records Content */}
                  {isLoadingAppointments ? (
                    <div className="py-12 text-center text-gray-500 text-xs">
                      <Activity className="w-6 h-6 animate-spin text-[#1a4f9c] mx-auto mb-2" />
                      Syncing real-time records from Firebase...
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 text-xs">
                      No matching records found. Verify query or submit new kid appointments above.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-400 uppercase text-[9px] font-bold tracking-widest bg-gray-50/30">
                            <th className="py-4 px-6">Kid's Profile</th>
                            <th className="py-4 px-6">Guardian Info</th>
                            <th className="py-4 px-6">Consultation Type</th>
                            <th className="py-4 px-6">Doctor / Department</th>
                            <th className="py-4 px-6 text-right">Schedule Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {filteredAppointments.map((appt) => (
                            <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors">
                              
                              {/* Kid Profile details */}
                              <td className="py-4 px-6">
                                <div className="font-bold text-gray-900">{appt.kidName}</div>
                                <div className="text-[10px] text-gray-400 font-semibold">Age: {appt.age}</div>
                              </td>

                              {/* Guardian info */}
                              <td className="py-4 px-6">
                                <div className="font-semibold text-gray-800">{appt.guardianName}</div>
                                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                  <span className="capitalize px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500">
                                    {appt.guardianType}
                                  </span>
                                  <span>{appt.contactNumber}</span>
                                </div>
                              </td>

                              {/* Consultation category */}
                              <td className="py-4 px-6">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wider uppercase ${
                                  appt.issueType === "vaccine"
                                    ? "bg-amber-50 text-amber-700 border border-amber-100"
                                    : appt.issueType === "disease"
                                    ? "bg-rose-50 text-rose-700 border border-rose-100"
                                    : "bg-blue-50 text-[#1a4f9c] border border-blue-100"
                                }`}>
                                  {appt.issueType}
                                </span>
                                {appt.issueDetail && (
                                  <div className="text-[10px] text-gray-500 mt-1 truncate max-w-xs" title={appt.issueDetail}>
                                    {appt.issueDetail}
                                  </div>
                                )}
                              </td>

                              {/* Specialist doctor details */}
                              <td className="py-4 px-6">
                                <div className="font-medium text-gray-800">{appt.doctor}</div>
                                <div className="text-[10px] text-gray-400">{appt.department}</div>
                              </td>

                              {/* Date schedule details */}
                              <td className="py-4 px-6 text-right font-mono font-bold text-[#1a4f9c]">
                                {appt.date}
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
