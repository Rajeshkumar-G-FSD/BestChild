import React from "react";
import { Baby, Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f7aab7] pt-16 pb-12 relative overflow-hidden text-left" id="main-footer">
      {/* Decorative babies in footer (precise absolute position placement on large screens, matching mockup) */}
      <img
        alt="Baby bottom left"
        className="absolute bottom-0 left-0 w-32 hidden md:block opacity-70 hover:opacity-95 transition-opacity"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA9zRNoBKc6pKs_LXtrhS1GXcOyNSUyRaT4HbwHWPj95IINH4TGUp1Tw7ehKuf7J3MUwEP3ulSurUjpvNH34dbuumNNVOqiIbeXb1NHrvC5SvFFqr0ovQyTYPCEfcdqGmb9AnNEP7WoxCfSlzrhy05JK4wCapTAmrckfhNs6gHYSAgQaRw-mFp_4prJw6uzWQXF-CvrrIeN_9xD4AT3qZby3-vACJOjqldhmsGYMVezICH5cnMfTr6LJy66a95RJDXHPRIPx5PWzbc"
      />
      <img
        alt="Baby bottom right"
        className="absolute bottom-0 right-0 w-40 hidden md:block opacity-70 hover:opacity-95 transition-opacity"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-8yBjVk5TpCQAZVEgIdEHKcsqYB4ajwzppJzugjoppVrndC2DL6WJFQ5hvFpIBYeQJBUAuiB3b_aRr-poXEkZ3JhG-ha6r6n8cfqu3m0mpu1AcEZN3i9AoFQY6LwIVlzbLVOM-tYZti-etO05E1F5v-K2gNQh5NnzBTNV7Fr_A6YRTwYaaO3rjvJKpY7MFinUVCIlDQZFHkJBrUMC40ooVKE1ld_Dv8xnHyP2E3ECYTHioXWpYUUBZ6rh3L8jy8lTo4-6IEakJ2Xt"
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Footer Info left */}
        <div className="md:col-span-5">
          <a href="#" className="flex items-center gap-3 text-[#1a4f9c] font-bold text-2xl mb-4">
            <img
              src="https://i.postimg.cc/vBj2zr2j/bestchildrenerode.png"
              alt="best Children Hospital Logo"
              className="h-12 w-auto object-contain rounded"
              referrerPolicy="no-referrer"
            />
            <span className="font-extrabold tracking-tight">best Children Hospital</span>
          </a>
          <p className="text-[#1a4f9c] text-sm font-semibold leading-relaxed max-w-md mb-6">
            Child Disease and treatment web is for childhood diseases, treatment and it's suitable for children's doctors. You can easy book doctors or children experts for solve your children disease.
          </p>
          <p className="text-[#1a4f9c] text-xs font-bold">
            ©2024 - 2026 | All right reserved by Awnix.com
          </p>
        </div>

        {/* Hospital Contact details middle */}
        <div className="md:col-span-4 text-[#1a4f9c] text-xs font-bold space-y-3 pt-2">
          <h4 className="text-sm font-black uppercase tracking-wider text-[#1a4f9c] mb-2">Hospital Contact</h4>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4.5 h-4.5 shrink-0 mt-0.5 text-[#1a4f9c]" />
            <div>
              <p className="font-black text-[#1a4f9c] text-sm leading-tight">947, EVN Road, Erode</p>
              <p className="text-[#1a4f9c]/90 text-[11px] leading-relaxed mt-1 font-semibold">
                Opp. LKM Hospital, Near Surampatty<br />
                Nall Road, Erode, Tamil Nadu 638009
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 pt-1">
            <Phone className="w-4.5 h-4.5 shrink-0 text-[#1a4f9c]" />
            <div>
              <p className="text-sm font-black text-[#1a4f9c] leading-none">099943 72322</p>
              <p className="text-[10px] text-[#1a4f9c]/80 mt-1 font-semibold">24/7 Pediatrics Helpline</p>
            </div>
          </div>
        </div>

        {/* Social Links & Hours right */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end w-full pt-2">
          <h4 className="text-[#1a4f9c] font-black text-sm uppercase tracking-wider mb-2">OPD &amp; Emergency</h4>
          <div className="flex items-start gap-2 text-xs font-semibold text-[#1a4f9c] mb-6 md:text-right md:justify-end">
            <Clock className="w-4.5 h-4.5 shrink-0 mt-0.5 md:hidden" />
            <div>
              <p className="font-extrabold text-emerald-800 text-sm leading-tight">Open 24 Hours / 7 Days</p>
              <p className="text-[10px] text-[#1a4f9c]/80 mt-1">Friday - Thursday: Open 24 hrs</p>
            </div>
          </div>

          <h4 className="text-[#1a4f9c] font-black text-sm uppercase tracking-wider mb-2">Follow US</h4>
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-[#1a4f9c] hover:bg-[#1a4f9c] hover:text-white transition-all p-2.5 bg-white/20 rounded-full"
              title="Twitter"
            >
              <Twitter className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#"
              className="text-[#1a4f9c] hover:bg-[#1a4f9c] hover:text-white transition-all p-2.5 bg-white/20 rounded-full"
              title="Facebook"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#"
              className="text-[#1a4f9c] hover:bg-[#1a4f9c] hover:text-white transition-all p-2.5 bg-white/20 rounded-full"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-[#1a4f9c] hover:bg-[#1a4f9c] hover:text-white transition-all p-2.5 bg-white/20 rounded-full"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
