import React, { useState } from "react";
import { Doctor, Child, Appointment } from "../types";
import { doctorsData } from "../data";
import { Calendar, Clock, Heart, Star, Sparkles, CheckCircle2, User, HelpCircle, ShieldCheck } from "lucide-react";

interface ServicesProps {
  childrenList: Child[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookAppointment: (appointment: Appointment) => void;
}

export default function Services({
  childrenList,
  activeTab,
  setActiveTab,
  onBookAppointment,
}: ServicesProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingChildId, setBookingChildId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Specialties list
  const specialties = ["All", "General Pediatrician", "Pediatric Allergist & Pulmonologist", "Developmental Pediatric Specialist", "Pediatric Gastroenterology Expert"];

  const filteredDoctors = selectedSpecialty === "All"
    ? doctorsData
    : doctorsData.filter(d => d.specialty === selectedSpecialty);

  const startBooking = (doc: Doctor) => {
    setBookingDoctor(doc);
    setBookingSlot(doc.availableSlots[0]);
    if (childrenList.length > 0) {
      setBookingChildId(childrenList[0].id);
    }
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split("T")[0]);
    setSuccessMessage(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor) return;
    if (!bookingChildId) {
      alert("Please configure a child profile first in the 'My Children & Appointments' tab.");
      return;
    }

    const child = childrenList.find(c => c.id === bookingChildId);
    if (!child) return;

    const newAppointment: Appointment = {
      id: "appt-" + Date.now(),
      childId: bookingChildId,
      childName: child.name,
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      doctorSpecialty: bookingDoctor.specialty,
      date: bookingDate,
      timeSlot: bookingSlot,
      notes: bookingNotes,
      status: "upcoming"
    };

    onBookAppointment(newAppointment);
    setSuccessMessage(`Appointment successfully scheduled with ${bookingDoctor.name} for ${child.name}!`);
    setTimeout(() => {
      setBookingDoctor(null);
      setSuccessMessage(null);
      setBookingNotes("");
    }, 3000);
  };

  return (
    <section className="bg-[#dbe4f9] py-16 text-left" id="services-section">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-extrabold text-center text-[#1a4f9c] mb-12">We Provides</h2>

        {/* Mockup Dual Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Service 1: Doctor Booking */}
          <div className="rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white border border-slate-100 hover:shadow-xl transition-shadow">
            <img
              alt="Doctor examining child"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAroZzfCCLZobRSzE3XqqDjwq4x7nr-hNFQolNg9CkQs1u_Kxmi5PKUR1r5IImaoiY5Jme5GiwWviqBKDJnd3w1hjzdm8aZAd4Mrk7AfRfomT8TR66fhN5alJIhq4x_6ESJc1T602x0t8o6H1O6YZyeQil0EXDZY77Y7ukYHbS_sLMMA7kjlNUbpVcev4-dbvVaKKD6_Vs8veor2pPj14yuc7k8ucd0PnV-4Jcku12Uyq76kT3NeCH2O2adTESnDWyMMuvefuZGK7PO"
            />
            <div className="bg-[#f7aab7] p-8 flex flex-col items-center text-center flex-grow">
              <p className="text-[#1a4f9c] font-semibold mb-6 leading-relaxed text-sm max-w-md">
                We provide you to best doctor to treatment your child. Visit doctor profile &amp; book appointment with doctor.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("doctor-booking-anchor");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  } else {
                    setActiveTab("doctors");
                  }
                }}
                className="bg-white text-[#1a4f9c] font-extrabold py-3 px-8 rounded-full hover:bg-slate-50 transition shadow mt-auto cursor-pointer"
              >
                View Doctors & Book Now
              </button>
            </div>
          </div>

          {/* Service 2: Expert Consult / Symptom Checker */}
          <div className="rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white border border-slate-100 hover:shadow-xl transition-shadow">
            <img
              alt="Experts discussing"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjaFFiNSXBjePY204Hz4Bi30APdrCe9zQejgNDO30PhRbEhxrTA93_mYV9oaQGG6gTprEcUyoD442jy56nzGsz_1XEpvXCwx8CvWdHVhitWd4x90TTqHnsZHJDHtz_Z4_3sQQedxfJ1Ho2VvjSQS9Chn1qJwXaL-4syw1Q7SQ534ICTu04LAyzQziaTkLPkY_4N5SAf5a8zIGzkgF4awtrXGqQXmLhADlJF_wEuRvrAcuQfGc8BhWUvwZU5yd9f5P1U9DvE2bendXB"
            />
            <div className="bg-[#f7aab7] p-8 flex flex-col items-center text-center flex-grow">
              <p className="text-[#1a4f9c] font-semibold mb-6 leading-relaxed text-sm max-w-md">
                We provide you to best experts to discuss about your child. Visit experts profile &amp; discuss your child's problem.
              </p>
              <button
                onClick={() => {
                  setActiveTab("symptom-checker");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white text-[#1a4f9c] font-extrabold py-3 px-8 rounded-full hover:bg-slate-50 transition shadow mt-auto cursor-pointer"
              >
                Launch AI Consultant
              </button>
            </div>
          </div>
        </div>

        {/* Booking Interactive Interface */}
        <div id="doctor-booking-anchor" className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100 mb-8">
            <div>
              <span className="text-[#1a4f9c] font-bold text-xs uppercase tracking-widest block mb-1">Clinical Consultations</span>
              <h3 className="text-2xl font-black text-gray-900">Pediatric Expert Directory</h3>
            </div>

            {/* Specialties Filter */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSpecialty === spec
                      ? "bg-[#1a4f9c] text-white"
                      : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                  }`}
                >
                  {spec === "All" ? "All Specialties" : spec.replace("Pediatric ", "")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col hover:border-[#1a4f9c]/30 hover:shadow-md transition-all"
              >
                <div className="relative mb-4">
                  <img
                    alt={doc.name}
                    className="w-full h-44 object-cover rounded-xl"
                    src={doc.image}
                  />
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg flex items-center gap-1 shadow text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{doc.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-grow">
                  <span className="text-xs text-blue-700 font-extrabold uppercase tracking-wide">
                    {doc.specialty}
                  </span>
                  <h4 className="font-extrabold text-gray-900 text-base leading-snug">{doc.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold">{doc.experience}</p>
                </div>

                <button
                  onClick={() => startBooking(doc)}
                  className="mt-4 bg-[#1a4f9c] hover:bg-[#133a75] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm cursor-pointer text-center w-full transition-all"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form Dialog Box */}
        {bookingDoctor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="booking-dialog">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full border border-gray-100 animate-scale-up">
              {/* Header */}
              <div className="bg-[#1a4f9c] text-white p-6 relative">
                <span className="text-blue-200 text-xs font-extrabold uppercase tracking-wider">Appointment Booking</span>
                <h4 className="text-xl font-black mt-1">Book {bookingDoctor.name}</h4>
                <p className="text-blue-100 text-xs mt-1 font-semibold">{bookingDoctor.specialty}</p>
                <button
                  onClick={() => setBookingDoctor(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white text-lg font-black cursor-pointer bg-white/10 w-7 h-7 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              {successMessage ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner animate-pulse">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h5 className="font-extrabold text-gray-900 text-lg">Booking Confirmed!</h5>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed px-4">
                    {successMessage} You can review and manage this in the "My Children & Appointments" dashboard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 text-left">
                  {/* Select Kid profile */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Select Child profile</label>
                    {childrenList.length === 0 ? (
                      <div className="text-xs p-3 bg-red-50 text-red-700 rounded-xl font-semibold border border-red-100">
                        No children profiles configured yet! Please create a profile in the Children Manager screen first.
                      </div>
                    ) : (
                      <select
                        required
                        value={bookingChildId}
                        onChange={(e) => setBookingChildId(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] text-xs font-semibold"
                      >
                        {childrenList.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.allergies ? "Allergies: " + c.allergies : "No Allergies"})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Appointment Date</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] text-xs font-semibold"
                    />
                  </div>

                  {/* Slot selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Available Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {bookingDoctor.availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setBookingSlot(slot)}
                          className={`py-2 px-1 text-[10px] font-black rounded-lg text-center border transition-all ${
                            bookingSlot === slot
                              ? "bg-[#1a4f9c] border-[#1a4f9c] text-white shadow-sm"
                              : "bg-slate-50 text-gray-600 border-gray-100 hover:bg-slate-100"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Reason for Visit / Symptoms</label>
                    <textarea
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="e.g., Routine well-baby physical, ear infection check, food allergy questions..."
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a4f9c] text-xs resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setBookingDoctor(null)}
                      className="w-1/3 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={childrenList.length === 0}
                      className="w-2/3 py-2.5 bg-[#1a4f9c] hover:bg-[#133a75] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
