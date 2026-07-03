import React, { useState } from "react";
import { Child, Appointment, HealthLog } from "../types";
import { Plus, Trash2, Calendar, ShieldAlert, Heart, PlusCircle, Activity, ClipboardList, Info, Sparkles, CheckCircle2 } from "lucide-react";

interface ProfileManagerProps {
  childrenList: Child[];
  onAddChild: (child: Child) => void;
  onDeleteChild: (id: string) => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function ProfileManager({
  childrenList,
  onAddChild,
  onDeleteChild,
  appointments,
  onCancelAppointment,
}: ProfileManagerProps) {
  // Add Child State
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Female");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [bloodType, setBloodType] = useState("O Positive");
  const [notes, setNotes] = useState("");

  // Select Child for Logging or Inspecting
  const [selectedChildId, setSelectedChildId] = useState(
    childrenList.length > 0 ? childrenList[0].id : ""
  );

  // Health Log Form State
  const [temp, setTemp] = useState("37.0");
  const [sleep, setSleep] = useState("10");
  const [appetite, setAppetite] = useState<"Normal" | "Poor" | "Increased">("Normal");
  const [logNotes, setLogNotes] = useState("");
  const [logSymptoms, setLogSymptoms] = useState<string[]>([]);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>(() => {
    const saved = localStorage.getItem("babycare_health_logs");
    return saved ? JSON.parse(saved) : [];
  });
  const [showLogSuccess, setShowLogSuccess] = useState(false);

  const availableSymptoms = ["Fever", "Congestion", "Skin Rash", "Fussiness", "Vomiting", "Loose Stools", "Mild Cough", "Decreased Appetite"];

  const handleAddChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) {
      alert("Name and birthdate are required!");
      return;
    }

    const newChild: Child = {
      id: "child-" + Date.now(),
      name,
      birthDate,
      gender,
      weight: weight ? weight + " kg" : "N/A",
      allergies: allergies.trim() || "None",
      bloodType,
      notes: notes.trim()
    };

    onAddChild(newChild);
    setSelectedChildId(newChild.id);

    // Reset Form
    setName("");
    setBirthDate("");
    setWeight("");
    setAllergies("");
    setNotes("");
    setShowAddForm(false);
  };

  const handleSaveHealthLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChildId) {
      alert("Please select or add a child profile first!");
      return;
    }

    const newLog: HealthLog = {
      id: "log-" + Date.now(),
      childId: selectedChildId,
      date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: temp,
      symptoms: logSymptoms,
      sleepHours: Number(sleep),
      appetite,
      notes: logNotes
    };

    const updatedLogs = [newLog, ...healthLogs];
    setHealthLogs(updatedLogs);
    localStorage.setItem("babycare_health_logs", JSON.stringify(updatedLogs));

    // Reset Log Form
    setTemp("37.0");
    setSleep("10");
    setAppetite("Normal");
    setLogNotes("");
    setLogSymptoms([]);
    setShowLogSuccess(true);
    setTimeout(() => {
      setShowLogSuccess(false);
    }, 3000);
  };

  const toggleSymptom = (sym: string) => {
    setLogSymptoms(prev =>
      prev.includes(sym) ? prev.filter(item => item !== sym) : [...prev, sym]
    );
  };

  const getChildName = (id: string) => {
    return childrenList.find(c => c.id === id)?.name || "Unknown Child";
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen text-left" id="profile-manager-dashboard">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest block mb-1">Parent Dashboard</span>
            <h2 className="text-3xl font-black text-gray-900">My Children & Appointments</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#1a4f9c] hover:bg-[#133a75] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow transition-all cursor-pointer flex items-center gap-1.5"
            id="add-child-toggle"
          >
            <Plus className="w-4 h-4" />
            Add Child Profile
          </button>
        </div>

        {/* Add Child Form Block */}
        {showAddForm && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8 max-w-2xl animate-scale-up" id="add-child-form-block">
            <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#1a4f9c]" />
              New Child Registration
            </h3>

            <form onSubmit={handleAddChildSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Liam Watson"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Birth Date *</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 10.5"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Blood Type</label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                >
                  <option value="O Positive">O Positive</option>
                  <option value="O Negative">O Negative</option>
                  <option value="A Positive">A Positive</option>
                  <option value="A Negative">A Negative</option>
                  <option value="B Positive">B Positive</option>
                  <option value="B Negative">B Negative</option>
                  <option value="AB Positive">AB Positive</option>
                  <option value="AB Negative">AB Negative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Allergies (leave empty if none)</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Peanut, Penicillin, Soy"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Special Medical Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Suffers from chronic asthma. Vaccinations completed up to month 12..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c] resize-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1a4f9c] text-white hover:bg-[#133a75] rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Children Profiles Cards List */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 pb-2 border-b border-gray-100">
              <Heart className="w-5 h-5 text-red-400" />
              Registered Kids
            </h3>

            {childrenList.length === 0 ? (
              <div className="p-8 text-center bg-white border border-gray-200 border-dashed rounded-3xl">
                <p className="text-gray-500 text-xs font-semibold">No registered child profiles. Please click "Add Child Profile" above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {childrenList.map((child) => {
                  const isSelected = selectedChildId === child.id;
                  return (
                    <div
                      key={child.id}
                      onClick={() => setSelectedChildId(child.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? "bg-white border-[#1a4f9c] ring-2 ring-[#1a4f9c]/10 shadow-md"
                          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to remove the profile for ${child.name}?`)) {
                            onDeleteChild(child.id);
                            if (selectedChildId === child.id) {
                              setSelectedChildId(childrenList.find(c => c.id !== child.id)?.id || "");
                            }
                          }
                        }}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                            child.gender === "Female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {child.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-gray-900 text-sm">{child.name}</h4>
                            <span className="text-[10px] text-gray-400 font-bold block">{child.gender} | Birth: {child.birthDate}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-600 bg-slate-50 p-2 rounded-xl">
                          <div>
                            <span className="text-gray-400 block font-normal">Weight:</span>
                            {child.weight}
                          </div>
                          <div>
                            <span className="text-gray-400 block font-normal">Blood Type:</span>
                            {child.bloodType}
                          </div>
                          <div className="col-span-2 mt-1 pt-1 border-t border-gray-100">
                            <span className="text-gray-400 block font-normal">Allergies:</span>
                            <span className="text-red-500 font-extrabold">{child.allergies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Panel: Daily Health Logger & Booked Appointments */}
          <div className="lg:col-span-8 space-y-8">
            {/* Health Logger Form */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-left relative">
              {showLogSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-gray-900 font-extrabold text-base mb-1">Health Log Saved!</h4>
                  <p className="text-gray-500 text-xs font-semibold">Your child's daily health indicators have been logged securely.</p>
                </div>
              )}

              <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                <Activity className="w-5 h-5 text-emerald-500" />
                Daily Health Logger
              </h3>

              <form onSubmit={handleSaveHealthLog} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Selected Child */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Child Profile</label>
                    <select
                      value={selectedChildId}
                      onChange={(e) => setSelectedChildId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                    >
                      <option value="">-- Choose Child --</option>
                      {childrenList.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Temperature */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="35"
                      max="42"
                      value={temp}
                      onChange={(e) => setTemp(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                    />
                  </div>

                  {/* Sleep Hours */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Sleep Hours</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={sleep}
                      onChange={(e) => setSleep(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                    />
                  </div>
                </div>

                {/* Checked symptoms */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Symptoms Noticed Today</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSymptoms.map(sym => {
                      const isSelected = logSymptoms.includes(sym);
                      return (
                        <button
                          type="button"
                          key={sym}
                          onClick={() => toggleSymptom(sym)}
                          className={`py-1.5 px-3 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-slate-50 text-gray-500 border-gray-100 hover:bg-slate-100"
                          }`}
                        >
                          {sym} {isSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Appetite */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Appetite State</label>
                    <select
                      value={appetite}
                      onChange={(e) => setAppetite(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Poor">Poor</option>
                      <option value="Increased">Increased</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Daily Log Notes</label>
                    <input
                      type="text"
                      value={logNotes}
                      onChange={(e) => setLogNotes(e.target.value)}
                      placeholder="e.g. Diaper change was normal. Had oatmeal for breakfast..."
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1a4f9c]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <button
                    type="submit"
                    className="bg-[#1a4f9c] hover:bg-[#133a75] text-white text-xs font-bold px-5 py-2 rounded-xl shadow cursor-pointer"
                  >
                    Save Daily Log
                  </button>
                </div>
              </form>
            </div>

            {/* Booked Doctor Appointments List */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-left">
              <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                <Calendar className="w-5 h-5 text-blue-500" />
                Scheduled Appointments
              </h3>

              {appointments.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-xs font-semibold">No scheduled appointments. Visit the "Book Doctor" specialty tab to schedule consults.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 text-xs text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-gray-900 text-sm">{appt.doctorName}</span>
                          <span className="text-[10px] text-blue-700 font-extrabold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            {appt.doctorSpecialty}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-500 font-semibold">
                          <div>
                            <span className="text-gray-400 font-normal">Child:</span> {appt.childName}
                          </div>
                          <div>
                            <span className="text-gray-400 font-normal">Date:</span> {appt.date}
                          </div>
                          <div>
                            <span className="text-gray-400 font-normal">Time:</span> {appt.timeSlot}
                          </div>
                        </div>
                        {appt.notes && (
                          <p className="bg-white p-2 rounded-xl text-gray-600 border border-gray-100 font-medium">
                            <span className="font-bold text-gray-400">Reason:</span> "{appt.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-end gap-2">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase border ${
                          appt.status === "upcoming"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {appt.status}
                        </span>
                        {appt.status === "upcoming" && (
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to cancel this scheduled appointment?")) {
                                onCancelAppointment(appt.id);
                              }
                            }}
                            className="text-xs text-red-500 font-bold hover:text-red-700 hover:underline cursor-pointer"
                          >
                            Cancel Consult
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Health Logs History List */}
            {healthLogs.length > 0 && (
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-left">
                <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <ClipboardList className="w-5 h-5 text-emerald-500" />
                  Health Logs History (Local Database)
                </h3>
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {healthLogs.map((log) => (
                    <div key={log.id} className="p-4 border border-gray-100 rounded-2xl bg-slate-50 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-gray-900 text-sm">
                          {getChildName(log.childId)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {log.date}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-semibold text-gray-600">
                        <div>Temp: <span className={Number(log.temperature) >= 38 ? "text-red-500 font-black" : "text-emerald-600 font-black"}>{log.temperature} °C</span></div>
                        <div>Sleep: <span className="font-black text-gray-900">{log.sleepHours} Hrs</span></div>
                        <div>Appetite: <span className="font-black text-gray-900">{log.appetite}</span></div>
                      </div>
                      {log.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {log.symptoms.map(s => (
                            <span key={s} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      {log.notes && (
                        <p className="bg-white p-2 rounded-xl text-gray-600 border border-gray-100 font-medium">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
