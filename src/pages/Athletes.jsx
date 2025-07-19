import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Search, HeartPulse, Medal, Trophy, MapPin, Award, ChevronRight } from 'lucide-react';
import AthleteDistributionChart from '../components/AthleteDistributionChart';
import AthleteCareerTimeline from '../components/AthleteCareerTimeline';
import { champions } from '../data/champions';

// Remove the champions array from here since it's imported

const PSAGAthletes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Updated with complete PSAG data
  const athleteStats = [ // eslint-disable-line no-unused-vars
    { value: "3,112", label: "Registered Athletes", subtext: "2,142 Male | 970 Female" },
    { value: "33", label: "2025 Grand Prix Medals", subtext: "13 Gold | 10 Silver | 10 Bronze" },
    { value: "5", label: "Arjuna Awardees", subtext: "Since 2016" },
    { value: "33", label: "District Associations", subtext: "Statewide Network" }
  ];

  const supportPrograms = [
    {
      title: 'Athlete Development',
      icon: <Users className="w-5 h-5 text-[#FF9933]" />,
      content: [
        'Registered para-athletes across Gujarat',
        'Top districts: Ahmedabad, Surat, Vadodara',
        'Arjuna Award winners since 2016',
        'Annual stipends for elite athletes'
      ]
    },
    {
      title: 'Talent Identification',
      icon: <Search className="w-5 h-5 text-[#FF9933]" />,
      content: [
        'State-wide scouting in all districts',
        'Focus on inclusion and diversity',
        'Athlete tracking and development',
        'Junior development camps'
      ]
    },
    {
      title: 'Medical Support',
      icon: <HeartPulse className="w-5 h-5 text-[#FF9933]" />,
      content: [
        'Annual health screenings',
        'Support for prosthetics and aids',
        'Sports injury rehabilitation',
        'Mental wellness programs'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <div className="flex-1">
        {/* Hero Section */}
        <motion.div 
          className="bg-[var(--primary)] text-[var(--card-title)] py-20 px-4 flex items-center justify-center text-center relative overflow-hidden min-h-[260px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center w-full">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[var(--accent)]">Gujarat's</span> <span className="text-white">Para Champions</span>
            </motion.h1>
          </div>
          {/* Removed background/overlay behind the title */}
        </motion.div>

        {/* Champions Gallery */}
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-[var(--primary)] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            2025 World Para Grand Prix <span className="text-[var(--accent)]">Champions</span>
          </motion.h2>
          <motion.p 
            className="text-center text-[var(--text)] mb-16 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Meet Gujarat's top 7 para-athlete champions
          </motion.p>
          {/* Champions cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {champions.map((athlete, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl group"
                style={{
                  background: 'var(--card)',
                  border: '1.5px solid var(--card-border)',
                  color: 'var(--text)',
                  minHeight: '320px'
                }}
                aria-label={`Profile card for ${athlete.name}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.025,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-1 p-7 flex flex-col gap-5 justify-center">
                  <h4 className="font-extrabold text-2xl mb-1 tracking-tight" style={{ color: 'var(--card-title)' }}>{athlete.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <span className="text-base font-medium" style={{ color: 'var(--text)' }}>{athlete.district}</span>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full inline-block text-xs tracking-wide font-semibold uppercase" style={{ background: 'rgba(30,58,138,0.07)', color: 'var(--primary)', letterSpacing: '0.04em' }}>
                    Category: {athlete.category}
                  </div>
                  <div className="mt-3 w-full">
                    <h5 className="text-md font-bold mb-2 tracking-wide uppercase" style={{ color: 'var(--primary)', letterSpacing: '0.04em' }}>Events & Achievements</h5>
                    <ul className="space-y-2">
                      {athlete.events.map((ev, i) => (
                        <li key={i} className="rounded px-4 py-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-4" style={{ background: 'var(--bg)' }}>
                          <span className="flex items-center gap-1 font-semibold text-base" style={{ color: 'var(--primary)' }}>
                            {ev.medal === 'Gold' && <span className="inline-block min-w-5 min-h-5 rounded-full mr-2 align-middle" style={{ background: '#FFD700' }} aria-label="Gold medal" />} 
                            {ev.medal === 'Silver' && <span className="inline-block min-w-6 min-h-6 rounded-full mr-2 align-middle" style={{ background: '#C0C0C0' }} aria-label="Silver medal" />} 
                            {ev.medal === 'Bronze' && <span className="inline-block min-w-6 min-h-6 rounded-full mr-2 align-middle" style={{ background: '#CD7F32' }} aria-label="Bronze medal" />} 
                            {ev.event}
                          </span>
                          <span className="font-medium text-sm" style={{ color: 'var(--accent)' }}>{ev.medal} Medal</span>
                          <span className="text-sm" style={{ color: 'var(--text)' }}>Performance: <span className="font-bold">{ev.performance}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-stretch justify-center relative bg-[var(--card)] p-0 md:p-0">
                  <div className="w-px h-full absolute left-0 top-0 bg-[var(--card-border)]" />
                  <img
                    src={athlete.image}
                    alt={`Portrait of ${athlete.name}`}
                    className="h-full w-48 object-cover rounded-none md:rounded-xl shadow-md transition-all duration-200 group-hover:shadow-xl"
                    style={{ border: '2px solid var(--card-border)' }}
                  />
                </div>
                {/* Mobile image above content */}
                <div className="md:hidden flex items-center justify-center bg-[var(--card)] p-0 pb-4">
                  <img
                    src={athlete.image}
                    alt={`Portrait of ${athlete.name}`}
                    className="w-full max-w-xs h-120 object-cover rounded-xl shadow-md"
                    style={{ border: '2px solid var(--card-border)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Athlete Achievement & Interview Videos */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--primary)]">
            Athlete Achievements & Glorious Interviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow border border-[var(--card-border)] p-4">
              <video
                src="/videos/bhavana_chaudhary.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full h-64 object-cover rounded mb-4 border border-[var(--primary)]"
                poster="/public/champions/bhavana_chaudhary.jpg"
              />
              <div className="text-lg font-semibold text-[var(--primary)] mb-2 text-center">Bhavana Chaudhary - Achievement</div>
              <a
                href="/videos/bhavana_chaudhary.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline text-sm hover:text-[var(--primary)]"
              >
                Watch Full Video
              </a>
            </div>
            {/* Video 2 */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow border border-[var(--card-border)] p-4">
              <video
                src="/videos/parulben_parmar.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full h-64 object-cover rounded mb-4 border border-[var(--primary)]"
                poster="/public/champions/bhavana_chaudhary.jpg"
              />
              <div className="text-lg font-semibold text-[var(--primary)] mb-2 text-center">Parulben Parmar with Prime Minister</div>
              <a
                href="/videos/parulben_parmar.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline text-sm hover:text-[var(--primary)]"
              >
                Watch Full Video
              </a>
            </div>
            {/* Video 3 */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow border border-[var(--card-border)] p-4">
              <video
                src="/videos/bhavina_patel.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full h-64 object-cover rounded mb-4 border border-[var(--primary)]"
                poster="/public/champions/bhavik_bharvad.jpg"
              />
              <div className="text-lg font-semibold text-[var(--primary)] mb-2 text-center">Bhavina Patel - Glorious Moment</div>
              <a
                href="/videos/bhavina_patel.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline text-sm hover:text-[var(--primary)]"
              >
                Watch Full Video
              </a>
            </div>
          </div>
        </section>

        {/* Gujarat Para Athletes - World Class Champions Section and onward */}
        <div className="max-w-6xl mx-auto px-4 py-20 motion-safe:animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight text-[var(--primary)] leading-tight">
            Gujarat Para Athletes <span className="text-[var(--accent)]">World Class Champions</span>
          </h1>

          {/* Medal Tally Table */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-4 text-left md:text-center text-[var(--accent)]">Medal Tally 2025</h2>
            <table className="w-full mb-6 rounded-xl overflow-hidden text-base bg-[var(--card)] border border-[var(--card-border)]">
              <thead>
                <tr className="bg-[var(--primary)] text-[var(--card-title)]">
                  <th className="py-2 px-3 text-lg font-semibold">Medal</th>
                  <th className="py-2 px-3 text-lg font-semibold">Count</th>
                  <th className="py-2 px-3 text-lg font-semibold">Notable Achievements</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 px-3 flex items-center gap-2"><span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#FFD700' }}></span>Gold</td>
                  <td className="py-2 px-3 font-bold text-xl">5</td>
                  <td className="py-2 px-3">3 National Records broken</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 px-3 flex items-center gap-2"><span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#C0C0C0' }}></span>Silver</td>
                  <td className="py-2 px-3 font-bold text-xl">3</td>
                  <td className="py-2 px-3">2 Personal Bests achieved</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 flex items-center gap-2"><span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#CD7F32' }}></span>Bronze</td>
                  <td className="py-2 px-3 font-bold text-xl">4</td>
                  <td className="py-2 px-3">Youngest medalist: 17 years</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Gold Medalists */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--accent)]">
              <span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#FFD700' }}></span>Gold Medalists
            </h2>
            <div className="mb-6 pl-4 border-l-4 border-[var(--accent)] bg-transparent">
              <h3 className="font-bold text-lg mb-1 text-[var(--primary)]">
                1. Bhavna Chaudhary
              </h3>
              <ul className="list-disc ml-6 text-[var(--text)]">
                <li><b>District:</b> Banaskantha</li>
                <li><b>Category:</b> F46 (Upper limb impairment)</li>
                <li><b>Event:</b> Javelin Throw</li>
                <li><b>Performance:</b> 36.08m <span className="italic">(National Record)</span></li>
                <li><b>Training Base:</b> Palanpur Sports Complex</li>
                <li><b>Key Fact:</b> First Gujarati woman gold medalist in javelin</li>
              </ul>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-[var(--accent)] bg-transparent">
              <h3 className="font-bold text-lg mb-1 text-[var(--primary)]">
                2. Mit Patel
              </h3>
              <ul className="list-disc ml-6 text-[var(--text)]">
                <li><b>District:</b> Mehsana</li>
                <li><b>Category:</b> T44</li>
                <li><b>Events:</b>
                  <ul className="ml-6">
                    <li>100m: 12.67s (Gold)</li>
                    <li>200m: 26.68s (Gold)</li>
                    <li>Long Jump: 5.70m (Silver)</li>
                  </ul>
                </li>
                <li><b>Sponsors:</b> Adani Foundation, Decathlon India</li>
              </ul>
            </div>
          </section>

          {/* Silver Medalists */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#C0C0C0' }}>
              <span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#C0C0C0' }}></span>Silver Medalists
            </h2>
            <div className="mb-6 pl-4 border-l-4" style={{ borderColor: '#C0C0C0', background: 'transparent' }}>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--primary)' }}>
                1. Chandresh Bagda
              </h3>
              <ul className="list-disc ml-6 text-gray-700">
                <li><b>District:</b> Jamnagar</li>
                <li><b>Age:</b> 17 <span className="italic">(Youngest medalist)</span></li>
                <li><b>Event:</b> High Jump T47</li>
                <li><b>Performance:</b> 1.80m</li>
                <li><b>Coach:</b> Rajkumar College Sports Academy</li>
              </ul>
            </div>
          </section>

          {/* Bronze Medalists */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#CD7F32' }}>
              <span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{ background: '#CD7F32' }}></span>Bronze Medalists
            </h2>
            <div className="mb-6 pl-4 border-l-4" style={{ borderColor: '#CD7F32', background: 'transparent' }}>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--primary)' }}>
                1. Bhavik Bharwad
              </h3>
              <ul className="list-disc ml-6 text-gray-700">
                <li><b>District:</b> Anand</li>
                <li><b>Background:</b> Former kabaddi player</li>
                <li><b>Events:</b>
                  <ul className="ml-6">
                    <li>100m T46: 11.34s</li>
                    <li>400m T46: 50.30s</li>
                  </ul>
                </li>
                <li><b>Training:</b> Daily 6am sessions at Anand Stadium</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-[var(--card-border)] my-12"></div>

          {/* Athlete Support Ecosystem */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>Athlete Support Ecosystem</h2>
            <h3 className="text-lg font-semibold mb-2 mt-6" style={{ color: 'var(--accent)' }}>Training Infrastructure</h3>
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-[500px] w-full mb-8 rounded-xl overflow-hidden text-sm sm:text-base" style={{ background: 'var(--bg)', border: '1.5px solid var(--card-border)' }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: 'var(--card-title)' }}>
                    <th className="py-2 px-3">Facility</th>
                    <th className="py-2 px-3">Location</th>
                    <th className="py-2 px-3">Specialization</th>
                    <th className="py-2 px-3">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                    <td className="py-2 px-3">High Performance Centre</td>
                    <td className="py-2 px-3">Gandhinagar</td>
                    <td className="py-2 px-3">Wheelchair Sports</td>
                    <td className="py-2 px-3">200 athletes</td>
                  </tr>
                  <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                    <td className="py-2 px-3">Aquatic Excellence Center</td>
                    <td className="py-2 px-3">Vadodara</td>
                    <td className="py-2 px-3">Para Swimming</td>
                    <td className="py-2 px-3">50 trainees</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Tribal Talent Hub</td>
                    <td className="py-2 px-3">Dang</td>
                    <td className="py-2 px-3">Archery/Athletics</td>
                    <td className="py-2 px-3">32 spots</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-[var(--card-border)] my-12"></div>

          {/* Rising Stars Watchlist */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>Rising Stars Watchlist</h2>
            <table className="w-full mb-2 rounded-xl overflow-hidden text-base" style={{ background: 'var(--bg)', border: '1.5px solid var(--card-border)' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: 'var(--card-title)' }}>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">District</th>
                  <th className="py-2 px-3">Age</th>
                  <th className="py-2 px-3">Event</th>
                  <th className="py-2 px-3">Potential</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                  <td className="py-2 px-3">Daksha Patel</td>
                  <td className="py-2 px-3">Kutch</td>
                  <td className="py-2 px-3">12</td>
                  <td className="py-2 px-3">Wheelchair Racing</td>
                  <td className="py-2 px-3">Paralympic 2028 prospect</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Aarav Mehta</td>
                  <td className="py-2 px-3">Rajkot</td>
                  <td className="py-2 px-3">15</td>
                  <td className="py-2 px-3">Swimming S9</td>
                  <td className="py-2 px-3">Asian Games candidate</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* Support Programs */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-[#000080] mb-12">
            Our <span className="text-[#FF9933]">Support System</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-full ${program.icon.props.className.includes('text-[#FF9933]') ? 'bg-[#FF9933]/10' : ''}`}>
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#000080]">{program.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {program.content.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full mt-2 mr-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Advanced Athlete Hub Sections --- */}
        <div className="max-w-6xl mx-auto px-4 py-12 mt-8 space-y-16">
          {/* Rising Stars Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 pl-3" style={{ color: 'var(--primary)', borderColor: 'var(--accent)' }}>Rising Stars – New Talent Pipeline</h2>
            <ul className="list-disc ml-6 text-gray-700 mb-4">
              <li><b>Daksha Patel</b> (12, Kutch) – Wheelchair Racing T54 <span className="text-xs">(31.58s)</span></li>
              <li><b>Aarav Mehta</b> (15, Rajkot) – Swimming S9 <span className="text-xs">(1:02.34)</span></li>
            </ul>
            <div className="mt-6"><AthleteDistributionChart /></div>
          </section>
          <div className="border-t border-[var(--card-border)] my-8"></div>
          {/* Coach's Corner Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 pl-3" style={{ color: 'var(--primary)', borderColor: 'var(--accent)' }}>Coach’s Corner Behind the Success</h2>
            <ul className="list-disc ml-6 text-gray-700 mb-4">
              <li><b>Rajesh Vaghela</b> (Vadodara) – Produced 8 international medalists</li>
            </ul>
            <blockquote className="italic text-lg text-center text-[var(--primary)] ">
              “Gujarat’s athletes now train with the same tech used by Paralympic champions.”<br/>
              <span className="text-sm font-semibold">— Coach Vaghela, PCI Certified</span>
            </blockquote>
          </section>
          <div className="border-t border-[var(--card-border)] my-8"></div>
          {/* Equipment Innovation Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 pl-3" style={{ color: 'var(--primary)', borderColor: 'var(--accent)' }}>Equipment Innovation – Tech Spotlight</h2>
            <table className="w-full mb-6 rounded-xl overflow-hidden" style={{ background: 'var(--bg)', border: '1.5px solid var(--card-border)' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: 'var(--card-title)' }}>
                  <th className="py-2 px-3">Equipment</th>
                  <th className="py-2 px-3">Athlete</th>
                  <th className="py-2 px-3">Performance Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                  <td className="py-2 px-3">Carbon fiber running blades</td>
                  <td className="py-2 px-3">Mit Patel (T44)</td>
                  <td className="py-2 px-3">Improved 100m time by 0.8s</td>
                </tr>
                <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
                  <td className="py-2 px-3">Racing wheelchairs</td>
                  <td className="py-2 px-3">Anjana Budadiya (T47)</td>
                  <td className="py-2 px-3">400m PB by 3.2s</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Smart throwing frames</td>
                  <td className="py-2 px-3">Bhavna Chaudhary (F46)</td>
                  <td className="py-2 px-3">Increased javelin distance by 2.1m</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="border-t border-[var(--card-border)] my-8"></div>
          {/* Athlete Journey Map Section */}
          <div className="border-t border-[var(--card-border)] my-8"></div>
          <section className="py-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center tracking-tight" style={{ color: 'var(--primary)' }}>
              Athlete Journey Maps <span style={{ color: 'var(--accent)' }}>– Career Progression</span>
            </h2>
            <div className="w-full max-w-2xl mx-auto">
              <AthleteCareerTimeline />
            </div>
          </section>
          <div className="border-t border-[var(--card-border)] my-8"></div>
          {/* International Collaborations Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 pl-3" style={{ color: 'var(--primary)', borderColor: 'var(--accent)' }}>International Collaborations – Global Reach</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Training Camps</h3>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>Germany: Wheelchair racing</li>
                  <li>Japan: Para swimming</li>
                  <li>5 athletes sent annually</li>
                </ul>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Competition Exposure</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Dubai Grand Prix 2025: 12 participants</li>
                  <li>Paris 2024 Paralympic preparation camp</li>
                </ul>
                <div className="mt-2 text-sm text-gray-600">Funding: ₹2.5 crore/year from SAI</div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Call to Action */}
      <div className="bg-[#000080] text-white py-16 px-4 text-center mt-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join Gujarat's Para Sports Movement?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-[#FF9933] hover:bg-white text-white hover:text-[#000080] font-bold py-3 px-6 rounded-full transition-colors">
              Register as Athlete
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSAGAthletes;
