import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const PSAGFooter = () => {
  return (
    <footer className="bg-[#000080] text-white font-sans ">
      <div className="max-w-7xl mx-auto py-5 px-2 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-4 items-center sm:items-start border-b border-[#FF9933]/20 text-xs sm:text-base">
        {/* Branding */}
        <div className="space-y-2 flex flex-col items-center sm:items-center md:items-start text-center md:text-left w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 justify-center md:justify-start w-full">
            <img 
              src="/logo.png" 
              alt="PSAG Logo" 
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white p-1 shadow-sm mb-1 sm:mb-0"
            />
            <div>
              <h2 className="text-base sm:text-2xl font-bold text-[#FF9933]">PSAG</h2>
              <p className="text-xs sm:text-base">Para Sports Association of Gujarat</p>
            </div>
          </div>
          <p className="text-xs italic text-gray-300/90 mt-0.5 max-w-xs leading-snug">
            Empowering athletes with disabilities since 1993
          </p>
        </div>
        {/* Quick Links */}
        <div className="space-y-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
          <h3 className="text-xs sm:text-lg font-semibold text-[#FF9933] mb-1">Quick Links</h3>
          <ul className="space-y-0.5">
            {["Home", "Athletes", "Events", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[#FF9933] hover:underline underline-offset-4 transition-colors text-xs sm:text-base"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Top Districts */}
        <div className="space-y-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
          <h3 className="text-xs sm:text-lg font-semibold text-[#FF9933] mb-1">Top Districts</h3>
          <ul className="space-y-0.5 text-xs sm:text-base">
            {["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"].map(district => (
              <li key={district} className="flex items-center justify-center md:justify-start">
                <span className="hidden sm:inline-block w-2 h-2 bg-[#FF9933] mr-2 rounded-full"></span>
                {district}
              </li>
            ))}
          </ul>
        </div>
        {/* Contact & Social */}
        <div className="space-y-2 flex flex-col items-center md:items-start text-center md:text-left w-full">
          <div className="space-y-1 w-full">
            <h3 className="text-xs sm:text-lg font-semibold text-[#FF9933] mb-1">Contact Us</h3>
            <address className="not-italic space-y-0.5 text-xs sm:text-base w-full">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="text-[#FF9933] w-4 h-4 sm:w-6 sm:h-6" />
                <a href="mailto:psaofgujarat@gmail.com" className="hover:underline">psaofgujarat@gmail.com</a>
              </div>
            </address>
          </div>
          <div className="w-full">
            <h3 className="text-xs sm:text-lg font-semibold text-[#FF9933] mb-1">Follow Us</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
              {/* Social Media Icons */}
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-[#FF9933] hover:bg-white hover:text-[#000080] text-white p-2 rounded-full transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="bg-[#FF9933] hover:bg-white hover:text-[#000080] text-white p-2 rounded-full transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.36 4.1 7.6 1.67 4.98a4.48 4.48 0 0 0-.607 2.26c0 1.56.795 2.94 2.01 3.75a4.47 4.47 0 0 1-2.034-.563v.057c0 2.18 1.55 4 3.61 4.42-.378.104-.776.16-1.187.16-.29 0-.57-.028-.844-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z"/></svg>
              </a>
              <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="bg-[#FF9933] hover:bg-white hover:text-[#000080] text-white p-2 rounded-full transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.86.56a2.75 2.75 0 0 0-1.94 1.94C2.5 9.66 2.5 12 2.5 12s0 2.34.56 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18.5 12 18.5 12 18.5s6.2 0 7.86-.56a2.75 2.75 0 0 0 1.94-1.94C21.5 14.34 21.5 12 21.5 12s0-2.34-.56-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="bg-[#FF9933] hover:bg-white hover:text-[#000080] text-white p-2 rounded-full transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.282.292 2.394 1.272 3.374.98.98 2.092 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.394-.292 3.374-1.272.98-.98 1.213-2.092 1.272-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.282-.292-2.394-1.272-3.374-.98-.98-2.092-1.213-3.374-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="bg-[#FF9933] hover:bg-white hover:text-[#000080] text-white p-2 rounded-full transition-all duration-200 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="py-2 text-center text-xs sm:text-base text-gray-300 tracking-wide w-full">
        <p className="truncate max-w-full px-2">© {new Date().getFullYear()} PSAG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PSAGFooter;