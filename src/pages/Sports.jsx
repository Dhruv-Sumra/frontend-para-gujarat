import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper functions for zone styling
const getZoneColor = (index) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  return colors[index % colors.length];
};

const getZoneIcon = (index) => {
  const icons = ['🏔️', '🏙️', '🌊', '🏜️'];
  return icons[index % icons.length];
};

// --- All Para Sports with Background Images ---
const paraSports = [
  { name: 'Para Archery', icon: 'archery.png', bgImage: 'https://i.postimg.cc/TPvtpyPG/archery.jpg' },
  { name: 'Para Athletics', icon: 'athlet.png', bgImage: 'https://i.postimg.cc/5t5nvxHz/athletics.jpg' },
  { name: 'Para Badminton', icon: 'badminton.png', bgImage: 'https://i.postimg.cc/G2czxZY5/badminton.jpg' },
  { name: 'Para Boccia', icon: 'boccia.png', bgImage: 'https://i.postimg.cc/kGGckKTN/boccia.jpg' },
  { name: 'Para Canoe', icon: 'canoe.png', bgImage: 'https://i.postimg.cc/ZnQcZnQG/canoe.jpg' },
  { name: 'Blind Chess', icon: 'chess.png', bgImage: 'https://i.postimg.cc/zB07t0FX/chess.png' },
  { name: 'Para Cycling', icon: 'cycling.png', bgImage: 'https://i.postimg.cc/VsZ4XZNK/cycling.jpg' },
  { name: 'Para Wheelchair Fencing', icon: 'wheelchairFencing.png', bgImage: 'https://i.postimg.cc/x1MRD03Z/fencing.jpg' },
  { name: 'Blind Football', icon: 'football.png', bgImage: 'https://i.postimg.cc/m20w5cCM/football.jpg' },
  { name: 'Blind Judo', icon: 'judo.png', bgImage: 'https://i.postimg.cc/m2cjj3zB/judo.webp' },
  { name: 'Para Lawn Bowls', icon: 'lawnBowls.png', bgImage: 'https://i.postimg.cc/PqMQJ2cz/lawn-Bowls.webp' },
  { name: 'Para Powerlifting', icon: 'powerlifting.png', bgImage: 'https://i.postimg.cc/wBzk9SWj/powerlifting.jpg' },
  { name: 'Para Rowing', icon: 'rowing.png', bgImage: 'https://i.postimg.cc/wvTcmDYK/rowing.jpg' },
  { name: 'Para Shooting', icon: 'shooting.png', bgImage: 'https://i.postimg.cc/PJCW6hq2/shooting.jpg' },
  { name: 'Para Swimming', icon: 'swimming.png', bgImage: 'https://i.postimg.cc/ydQhXW7D/swimming.jpg' },
  { name: 'Para Table Tennis', icon: 'tableTennis.png', bgImage: 'https://i.postimg.cc/br4QWMD8/table-Tennis.webp' },
  { name: 'Para Taekwondo', icon: 'taekwondo.png', bgImage: 'https://i.postimg.cc/Mp27YCJm/taekwondo.jpg' },
  { name: 'Wheelchair Tennis', icon: 'tennis.png', bgImage: 'https://i.postimg.cc/RCYQW3P8/tennis.png' },
  { name: 'Para Sitting Volleyball', icon: 'sittingVollyball.png', bgImage: 'https://i.postimg.cc/Kvg7BZwY/volleyball.jpg' },
];



const classifications = [
  {
    group: 'Visual Impairment',
    codes: [
      { code: 'T11/F11', desc: 'No light perception or minimal light perception', extra: 'Guide runners for T11/T12' },
      { code: 'T12/F12', desc: 'Higher visual acuity and/or visual field' },
      { code: 'T13/F13', desc: 'Least severe visual impairment' },
    ],
  },
  {
    group: 'Intellectual Impairment',
    codes: [
      { code: 'T20/F20', desc: 'Athletes with intellectual impairments', extra: 'IQ ≤ 75, adaptive behavior limits' },
    ],
  },
  {
    group: 'Cerebral Palsy',
    codes: [
      { code: 'T31-T38/F31-F38', desc: 'Cerebral palsy, brain injury, or stroke' },
      { code: 'T31-T34', desc: 'Wheelchair users' },
      { code: 'T35-T38', desc: 'Ambulant with coordination impairments' },
    ],
  },
  {
    group: 'Short Stature',
    codes: [
      { code: 'T40-T41/F40-F41', desc: 'Athletes with short stature', extra: 'Max height restrictions' },
    ],
  },
  {
    group: 'Leg Impairments',
    codes: [
      { code: 'T42-T44/F42-F46', desc: 'Leg impairments' },
      { code: 'T42', desc: 'Single below-knee amputation' },
      { code: 'T43', desc: 'Double below-knee amputation' },
      { code: 'T44', desc: 'Single above-knee amputation', extra: 'Prosthetic limbs allowed' },
    ],
  },
  {
    group: 'Arm Impairments',
    codes: [
      { code: 'T45-T47/F47', desc: 'Arm impairments' },
      { code: 'T45', desc: 'Double arm amputation' },
      { code: 'T46', desc: 'Single arm amputation' },
      { code: 'T47', desc: 'Arm deficiency' },
    ],
  },
  {
    group: 'Wheelchair Athletes',
    codes: [
      { code: 'T51-T57/F51-F57', desc: 'Competing in wheelchairs' },
      { code: 'T51', desc: 'No trunk function' },
      { code: 'T52', desc: 'Limited trunk function' },
      { code: 'T53-T54', desc: 'Increasing trunk function', extra: 'Racing wheelchairs' },
    ],
  },
  {
    group: 'Prosthetic Leg Athletes',
    codes: [
      { code: 'T62-T64/F62-F64', desc: 'Prosthetic legs' },
      { code: 'T62', desc: 'Double below-knee amputation' },
      { code: 'T63', desc: 'Single below-knee amputation' },
      { code: 'T64', desc: 'Single above-knee amputation', extra: 'Running blades' },
    ],
  },
];

const zones = [
  {
    name: 'North Gujarat Zone',
    center: 'Himmatnagar',
    districts: ['Banaskantha', 'Sabarkantha', 'Arvalli', 'Gandhinagar', 'Mahisagar'],
    sports: ['Para Athletics', 'Para Badminton', 'Para Swimming', 'Para Archery', 'Para Fencing'],
    facility: 'Proposed academy in Himmatnagar',
  },
  {
    name: 'Central Gujarat Zone',
    center: 'Nadiad',
    districts: ['Anand', 'Kheda', 'Vadodara', 'Chhota Udaipur', 'Dahod', 'Panch Mahal'],
    sports: ['Para Athletics', 'Para Table Tennis', 'Para Powerlifting', 'Para Archery', 'Para Taekwondo'],
    facility: 'Proposed academy in Nadiad',
  },
  {
    name: 'South Gujarat Zone',
    center: 'Rajpipla',
    districts: ['Bharuch', 'Narmada', 'Surat', 'Tapi', 'Valsad', 'Navsari', 'Dang'],
    sports: ['Para Athletics', 'Para Powerlifting', 'Para Badminton'],
    facility: 'Proposed academy in Rajpipla',
  },
  {
    name: 'Saurashtra Zone',
    center: 'Porbandar',
    districts: ['Rajkot', 'Jamnagar', 'Junagadh', 'Porbandar', 'Bhavnagar', 'Amreli', 'Gir Somnath', 'Botad', 'Morbi', 'Surendranagar', 'Devbhumi Dwarka', 'Kachchh'],
    sports: ['Para Athletics', 'Para Table Tennis', 'Para Badminton', 'Para Shooting', 'Para Powerlifting'],
    facility: 'Proposed academy in Porbandar',
  },
];

const competitionLevels = [
  {
    level: 'District Level',
    competitions: [
      { name: 'District Championships', desc: 'Annual district competitions' },
      { name: 'School Competitions', desc: 'Inter-school para sports events' },
      { name: 'Local Tournaments', desc: 'Community sports events' },
    ],
  },
  {
    level: 'State Level',
    competitions: [
      { name: 'State Championships', desc: 'Annual state-level competitions' },
      { name: 'Zone Championships', desc: 'Regional competitions' },
      { name: 'Inter-State Meets', desc: 'State vs state competitions' },
    ],
  },
  {
    level: 'National Level',
    competitions: [
      { name: 'National Championships', desc: 'Annual national competitions' },
      { name: 'National Games', desc: 'Multi-sport national events' },
      { name: 'Federation Events', desc: 'Sport-specific championships' },
    ],
  },
  {
    level: 'International Level',
    competitions: [
      { name: 'Paralympic Games', desc: 'Olympic level - every 4 years' },
      { name: 'Asian Games', desc: 'Continental championships' },
      { name: 'World Championships', desc: 'World level competitions' },
    ],
  },
];



export default function Sports() {
  const [open, setOpen] = useState(null);
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* All Para Sports Grid */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight text-[var(--primary)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          All Para Sports
        </motion.h1>
        
        <motion.p 
          className="text-lg text-[var(--text)] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover the diverse range of para sports available in Gujarat. Each sport is designed to accommodate athletes with different abilities, promoting inclusion and excellence in sports.
        </motion.p>
        
        {/* Sports Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paraSports.map((sport, idx) => (
            <motion.div
              key={sport.name}
              className="relative rounded-xl shadow-lg overflow-hidden h-48 cursor-pointer group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  backgroundImage: `url(${sport.bgImage})`,
                  // backgroundColor: '#667eea' // Fallback color
                }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black opacity-40 transition-all duration-300" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                {/* Icon */}
                <div className="mb-3 p-3 bg-white bg-opacity-95 rounded-full shadow-lg flex items-center justify-center min-w-[60px] min-h-[60px] group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={`/icons/${sport.icon}`} 
                    alt={`${sport.name} icon`} 
                    className="w-10 h-10 text-orange-500 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.innerHTML = '🏅';
                      fallback.className = 'text-2xl';
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
                
                {/* Sport Name */}
                <h3 className="text-lg font-bold text-white text-center drop-shadow-lg group-hover:text-xl transition-all duration-300">
                  {sport.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.section>
      {/* Classification System */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center" 
          style={{ color: 'var(--primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Classification System
        </motion.h2>
        <motion.p 
          className="text-lg text-[var(--text)] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Para sports classification ensures fair competition by grouping athletes with similar levels of impairment
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classifications.map((group, idx) => (
            <div key={group.group} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2" style={{ borderColor: 'var(--primary)', opacity: 0.7 }}>
                {group.group}
              </h3>
              <div className="space-y-3">
                {group.codes.map((c) => (
                  <div key={c.code} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <span className="font-bold text-sm px-3 py-1 rounded-md flex-shrink-0 text-white" style={{ backgroundColor: 'var(--accent)', opacity: 0.8 }}>
                      {c.code}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm font-medium leading-relaxed">{c.desc}</p>
                      {c.extra && (
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">{c.extra}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Geographic Coverage Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center" 
          style={{ color: 'var(--primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Geographic Coverage
        </motion.h2>
        <motion.p 
          className="text-lg text-[var(--text)] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Gujarat is divided into four strategic zones to ensure comprehensive para sports development across the state
        </motion.p>

        {/* Zone Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {zones.map((zone, idx) => (
            <motion.div
              key={zone.name}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 mx-auto"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {zone.districts.length}
              </div>
              <h3 className="font-bold mb-1 text-gray-800">
                {zone.name}
              </h3>
              <p className="text-sm text-gray-600">{zone.districts.length} Districts</p>
            </motion.div>
          ))}
        </div>

        {/* District Distribution */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>
            District Distribution by Zone
          </h3>
          
          <div className="space-y-4">
            {zones.map((zone, idx) => {
              const percentage = (zone.districts.length / 33) * 100;
              return (
                <div key={zone.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{zone.name}</span>
                    <span className="font-bold text-gray-700">
                      {zone.districts.length} districts ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: 'var(--primary)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Summary Statistics */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>
            Coverage Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>4</div>
              <div className="text-sm text-gray-600">Total Zones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>33</div>
              <div className="text-sm text-gray-600">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>19</div>
              <div className="text-sm text-gray-600">Sports Offered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>4</div>
              <div className="text-sm text-gray-600">Training Centers</div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      {/* Competition Levels Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center" 
          style={{ color: 'var(--primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Competition Levels
        </motion.h2>
        <motion.p 
          className="text-lg text-[var(--text)] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Our athletes compete at various levels from local championships to international events
        </motion.p>
        
        <div className="relative">
          {/* Central Timeline Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" 
            style={{ backgroundColor: 'var(--primary)', opacity: 0.3 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          <div className="space-y-16">
            {competitionLevels.map((level, idx) => (
              <motion.div 
                key={level.level} 
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Level Circle */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--primary)' }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                </motion.div>
                
                {/* Content */}
                <div className={`flex flex-col sm:flex-row items-center ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="w-full sm:w-5/12 px-0 sm:px-12 text-left">
                    <motion.h3 
                      className="text-lg sm:text-2xl font-bold mb-4" 
                      style={{ color: 'var(--primary)' }}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.2 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {level.level}
                    </motion.h3>
                    <div className="space-y-3">
                      {level.competitions.map((c, compIdx) => (
                        <motion.div 
                          key={c.name} 
                          className={`flex items-start gap-3 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} sm:justify-start`}
                          initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.2 + 0.5 + compIdx * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 0, transition: { duration: 0.2 } }}
                        >
                          <motion.span 
                            className="font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full text-white flex-shrink-0" 
                            style={{ backgroundColor: 'var(--accent)' }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                          >
                            {c.name}
                          </motion.span>
                          <span className="hidden sm:inline text-gray-700 text-base leading-relaxed">{c.desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Spacer */}
                  <div className="hidden sm:block w-2/12"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </main>
  );
} 