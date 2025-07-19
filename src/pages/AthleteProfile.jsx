import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ChevronLeft } from 'lucide-react';
import { champions } from '../data/champions';

export default function AthleteProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const athlete = champions.find(a => a.id === id);
  if (!athlete) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#000080] mb-4">Athlete Not Found</h1>
        <button onClick={() => navigate(-1)} className="flex items-center text-[#000080] hover:text-[#FF9933] font-medium">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#000080] hover:text-[#FF9933] font-medium mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Athletes
        </button>
        <div className="flex flex-col items-center">
          <img src={athlete.image} alt={athlete.name} className="w-32 h-32 object-cover rounded-full border-4 border-[#000080]/10 mb-4" />
          <h1 className="text-3xl font-bold text-[#000080] mb-2">{athlete.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#FF9933]" />
            <span className="text-lg text-gray-600">{athlete.district}</span>
          </div>
          <div className="mt-2 bg-[#000080]/5 px-4 py-2 rounded-full inline-block text-[#000080] font-medium">
            Category: {athlete.category}
          </div>
          <div className="mt-6 w-full">
            <h2 className="text-xl font-bold text-[#000080] mb-2">Events & Achievements</h2>
            <ul className="space-y-3">
              {athlete.events.map((ev, idx) => (
                <li key={idx} className="bg-[#F3F4F6] rounded-lg px-4 py-3 flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-semibold text-[#000080]">{ev.event}</span>
                  <span className="ml-0 md:ml-4 text-[#FF9933] font-medium">{ev.medal} Medal</span>
                  <span className="ml-0 md:ml-4 text-gray-700">Performance: <span className="font-bold">{ev.performance}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-gray-700 mt-6 italic text-center">"{athlete.achievement}"</p>
        </div>
      </div>
    </main>
  );
} 