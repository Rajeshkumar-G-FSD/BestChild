import React, { useState } from "react";
import { ContactMessage } from "../types";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar } from "lucide-react";

interface ContactProps {
  onSendMessage: (message: ContactMessage) => void;
  messageList: ContactMessage[];
}

export default function Contact({ onSendMessage, messageList }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in Name, Email, and Message.");
      return;
    }

    const newMessage: ContactMessage = {
      id: "msg-" + Date.now(),
      name,
      email,
      mobile,
      message,
      date: new Date().toLocaleDateString()
    };

    onSendMessage(newMessage);
    setShowSuccess(true);

    // Clear form
    setName("");
    setEmail("");
    setMobile("");
    setMessage("");

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-slate-50 relative text-left" id="contact-section">
      <div className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-pink-100 text-[#1a4f9c] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            Hospital Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a4f9c] tracking-tight mt-3">
            Contact &amp; Hours of Operation
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            Find us in Erode or connect with our pediatric specialists anytime 24/7.
          </p>
        </div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
            <div>
              <div className="p-3 bg-pink-50 text-[#1a4f9c] rounded-2xl w-fit mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1a4f9c] text-base mb-2">Hospital Address</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">
                947, EVN road, ERODE<br />
                Opp. LKM HOSPITAL<br />
                Near Surampatty, Nall road<br />
                Erode, Tamil Nadu 638009
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <a 
                href="https://maps.google.com/?q=947,EVN+road,+ERODE+Opp.+LKM+HOSPITAL" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-pink-500 font-extrabold hover:underline flex items-center gap-1"
              >
                View on Google Maps &rarr;
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
            <div>
              <div className="p-3 bg-pink-50 text-[#1a4f9c] rounded-2xl w-fit mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1a4f9c] text-base mb-2">Emergency Phone</h3>
              <p className="text-2xl font-black text-[#1a4f9c] tracking-tight mb-1">
                099943 72322
              </p>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Call for emergency ambulance, neonatal ICU coordination, or children's doctors booking.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <a 
                href="tel:09994372322" 
                className="text-xs text-pink-500 font-extrabold hover:underline flex items-center gap-1"
              >
                Call Hospital Now &rarr;
              </a>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
            <div>
              <div className="p-3 bg-pink-50 text-[#1a4f9c] rounded-2xl w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1a4f9c] text-base mb-2">Working Hours</h3>
              <div className="space-y-1 text-xs text-gray-500 font-semibold">
                <div className="flex justify-between border-b border-gray-50 pb-1 font-bold text-emerald-700">
                  <span>Friday - Thursday:</span>
                  <span>Open 24 hours</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  Our emergency reception, pediatric ward, and diagnostic laboratory are functional 24 hours daily.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <span className="text-xs text-[#1a4f9c] font-black flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span>Fully Operational 24/7</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center gap-12">
        {/* Contact Image (Left) */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-[32px] transform -rotate-2 -z-10"></div>
            <img
              alt="Baby playing with telephone"
              className="max-w-full h-auto drop-shadow-2xl rounded-[24px] hover:scale-105 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuGTWq4-yzBKQlL2gL5H-hdEWvdLt4wHLDIWsuUIvvxaTkmL3FRPF-gMY2N5X4eeHlixdwQus3nRvzByt-hSlsTJ8lO_2CI2Zx2sbrFLxJbPpwTRycthJMBQkjpJsnIzTK34hqpx-RQo_N6HBH8Lfx1a1SjJ1YRmGIiFcuGbf_8_ZSya-WaPTl_Ik5XyBCYVfLWaSXtMb3XmMV-_97RUiRWkMpD9H9_yF047C4UxOdXs2EmxVlFaC6B0wd4xEESoMHiXDsWnud_Upx"
              id="contact-baby-telephone"
            />
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="md:w-1/2 w-full">
          <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-10 border border-gray-100 max-w-md mx-auto relative overflow-hidden">
            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h4 className="text-[#1a4f9c] font-black text-xl mb-2">Message Sent!</h4>
                <p className="text-gray-500 text-xs font-semibold px-4">
                  Thank you for dropping us a line. Our pediatric coordination expert will respond to your email within 24 hours.
                </p>
              </div>
            )}

            <h2 className="text-3xl font-extrabold text-center text-[#1a4f9c] mb-2">Send Message</h2>
            <p className="text-center text-[#1a4f9c]/80 text-sm mb-8 font-semibold">Have a query? Drop us an inquiry below!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10 placeholder-gray-400 transition-all"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10 placeholder-gray-400 transition-all"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10 placeholder-gray-400 transition-all"
                  placeholder="Mobile No."
                />
              </div>
              <div>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10 placeholder-gray-400 resize-none transition-all"
                  placeholder="Message"
                  rows={4}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#1a4f9c] hover:bg-[#133a75] text-white w-full py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Submitted message logs for complete fidelity (admin check) */}
      {messageList.length > 0 && (
        <div className="container mx-auto px-4 max-w-4xl mt-16 border-t border-gray-100 pt-10">
          <h4 className="font-extrabold text-[#1a4f9c] text-lg mb-4">Submitted Messages Log (Demowall)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {messageList.map((msg) => (
              <div key={msg.id} className="bg-slate-50 border border-gray-200 p-4 rounded-2xl relative text-xs text-gray-700">
                <span className="absolute top-4 right-4 text-[10px] text-gray-400 font-bold">{msg.date}</span>
                <p className="font-extrabold text-gray-900 mb-1">{msg.name}</p>
                <p className="text-gray-500 mb-2">{msg.email} | {msg.mobile || "N/A"}</p>
                <div className="bg-white p-2 rounded-xl text-gray-600 italic">
                  "{msg.message}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
