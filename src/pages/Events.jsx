import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Globe, 
  Star, 
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  Trophy,
  Target,
  Clock,
  Heart,
  Medal,
  Play,
  Filter,
  Search,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      title: "Gujarat Paralympic Games 2025",
      date: "November 15–25, 2025",
      location: "Multiple cities (Ahmedabad, Gandhinagar, Vadodara)",
      participants: "3,000+ athletes from 33 districts",
      sports: "22 disciplines",
      highlights: [
        "Talent scouting for National Para Games 2026",
        "Integration with SFA's High-Performance Center (HPC)",
        "Live streaming via SFA GMS Platform",
        "Largest para-sports event in Gujarat's history"
      ],
      registrationDeadline: "October 10, 2025",
      status: "open",
      category: "major",
      image: "https://media.assettype.com/outlookindia/2025-03-12/e6axod2u/M-Jothi-Mens-400m-T37-event-para-athletics-gp-pti-photo.jpg?w=640&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0"
    },
    {
      id: 2,
      title: "World Para Athletics Grand Prix 2025",
      date: "March 8–13, 2025",
      location: "Jawaharlal Nehru Stadium, New Delhi",
      participants: "International athletes",
      sports: "Para Athletics",
      highlights: [
        "Gujarat contingent: 10 medal-winning athletes",
        "Featuring Bhavna Chaudhary, Ramsingh Padhiyar",
        "Preparation for Paris Paralympics qualification",
        "Live coverage on PSAG social media"
      ],
      status: "completed",
      category: "international",
      image: "https://media.assettype.com/outlookindia/2025-03-12/e6axod2u/M-Jothi-Mens-400m-T37-event-para-athletics-gp-pti-photo.jpg?w=640&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0"
    }
  ];

  const recentAchievements = [
    {
      id: 3,
      title: "6th Annual General Meeting (AGM) 2025",
      date: "July 20, 2025",
      location: "SAG Sports Complex, Nadiad",
      outcomes: [
        "Launched Vision 2036 for para-sports infrastructure",
        "Signed MoU with Sports Authority of Gujarat",
        "Recognized PCI Secretary Mr. Jayawant G.H.",
        "Approved expansion plans for district centers"
      ],
      type: "meeting",
      image: "https://salemubc.org/wp-content/uploads/2019/08/annual_general_meeting-862x485.png"
    },
    {
      id: 4,
      title: "World Para Athletics Grand Prix 2025 - Results",
      date: "March 8–13, 2025",
      location: "New Delhi",
      medalTally: {
        india: 42,
        npa: 21,
        others: "Strong performances by Uzbekistan & Australia"
      },
      notablePerformances: [
        { athlete: "Jaspreet Kaur (IND)", achievement: "Asian Record in Women's Discus F52 (6.05m)" },
        { athlete: "Rinku (IND)", achievement: "Gold in Men's Javelin F46 (60.26m)" },
        { athlete: "Bhagyashri Jadhav (IND)", achievement: "Gold in Women's Shot Put F34 (6.83m)" },
        { athlete: "Sharath Shankarappa (IND)", achievement: "Gold in Men's 1500m T12 (4:10.27)" }
      ],
      type: "competition",
      image: "https://sportsmintmedia.com/wp-content/uploads/2021/12/Paris-set-to-host-World-Para-Athletics-Championship-2023.jpg"
    },
    {
      id: 5,
      title: "Khel Mahakumbh 2024",
      date: "January 5–15, 2024",
      location: "Gujarat (State-wide)",
      stats: {
        participants: "5,000+ athletes",
        categories: "15 disability categories",
        medals: { gold: 120, silver: 98, bronze: 85 }
      },
      impact: "30 athletes selected for National Para Championships",
      type: "state",
      image: "https://i.ytimg.com/vi/m7eZCe2aaHs/maxresdefault.jpg"
    }
  ];

  const programs = [
    {
      title: "Talent Identification Camps",
      frequency: "Quarterly",
      phases: "Phase 1–4: Grassroots to Elite",
      process: [
        "Mass Assessments (District-level)",
        "Sport-Specific Trials (HPC Coaches)",
        "Elite Athlete Pool (State Team Selection)"
      ],
      nextCamp: "August 2025",
      icon: Target
    },
    {
      title: "Coaches & Officials Training",
      focus: "Classification rules, adaptive coaching techniques",
      upcoming: "Wheelchair Rugby Workshop - September 2025",
      certification: "International standards compliance",
      icon: BookOpen
    }
  ];

  const toggleEventExpansion = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };


  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInStagger {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-stagger-1 {
          animation: slideInStagger 0.6s ease-out 0.1s both;
        }

        .animate-stagger-2 {
          animation: slideInStagger 0.6s ease-out 0.2s both;
        }

        .animate-stagger-3 {
          animation: slideInStagger 0.6s ease-out 0.3s both;
        }

        .animate-stagger-4 {
          animation: slideInStagger 0.6s ease-out 0.4s both;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .button-hover {
          transition: all 0.2s ease;
        }

        .button-hover:hover {
          transform: translateY(-2px);
        }

        .button-hover:active {
          transform: translateY(0);
        }

        .card-enter {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .hero-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        }

        .event-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          background: var(--card);
          border: 1px solid var(--card-border);
        }

        .event-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .badge-upcoming {
          background: var(--success);
        }

        .badge-completed {
          background: var(--info);
        }

        .badge-meeting {
          background: var(--warning);
        }

        .badge-competition {
          background: var(--indigo);
        }

        .badge-state {
          background: var(--gray);
        }

        .highlight-item {
          position: relative;
          padding-left: 1.5rem;
        }

        .highlight-item:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: var(--accent);
        }

        .expand-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .expand-content.open {
          max-height: 1000px;
          transition: max-height 0.5s ease-in;
        }
      `}</style>

      {/* Hero Section */}
      <section className="w-full py-20 px-4 hero-gradient animate-fadeIn">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[var(--accent)]">Events</span> <span className="text-[var(--primary)]">& Achievements</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-[var(--text)] opacity-80">
            Discover upcoming competitions, past achievements, and programs empowering para-athletes across Gujarat
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--primary)]">
              Upcoming & Recent Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...upcomingEvents, ...recentAchievements].slice(1).map((event, idx) => {
              // Determine event type badge
              let badge = '';
              let badgeClass = '';
              if (event.status === 'open') {
                badge = 'Upcoming'; badgeClass = 'badge-upcoming';
              } else if (event.status === 'completed') {
                badge = 'Completed'; badgeClass = 'badge-completed';
              } else if (event.type === 'meeting') {
                badge = 'Meeting'; badgeClass = 'badge-meeting';
              } else if (event.type === 'competition') {
                badge = 'Competition'; badgeClass = 'badge-competition';
              } else if (event.type) {
                badge = event.type.charAt(0).toUpperCase() + event.type.slice(1);
                badgeClass = 'badge-state';
              }

              // Only wrap the first card (idx === 0) with the link
              const cardContent = (
                <div
                  key={event.id}
                  className={`event-card rounded-xl overflow-hidden shadow-sm hover-lift ${idx % 3 === 0 ? 'animate-stagger-1' : idx % 3 === 1 ? 'animate-stagger-2' : 'animate-stagger-3'}`}
                >
                  <div className="relative h-48">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        {badge && (
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeClass}`}>
                            {badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text)] mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {event.date}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {event.location}
                        </span>
                      )}
                      {event.participants && (
                        <span className="flex items-center gap-2">
                          <Users size={16} />
                          {event.participants}
                        </span>
                      )}
                    </div>

                    {(event.highlights || event.outcomes || event.impact) && (
                      <div className="mb-2">
                        {event.highlights && event.highlights.length > 0 && (
                          <>
                            <h4 className="font-semibold text-[var(--primary)] mb-1">Highlights</h4>
                            <ul className="list-disc list-inside text-[var(--text)] text-sm space-y-1">
                              {event.highlights.slice(0,2).map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {event.outcomes && event.outcomes.length > 0 && (
                          <>
                            <h4 className="font-semibold text-[var(--primary)] mb-1 mt-2">Key Outcomes</h4>
                            <ul className="list-disc list-inside text-[var(--text)] text-sm space-y-1">
                              {event.outcomes.slice(0,2).map((outcome, i) => (
                                <li key={i}>{outcome}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {event.impact && !event.highlights && !event.outcomes && (
                          <p className="text-[var(--text)] text-sm">{event.impact}</p>
                        )}
                      </div>
                    )}

                    {event.notablePerformances && event.notablePerformances.length > 0 && (
                      <div className="mt-2">
                        <h4 className="font-semibold text-[var(--primary)] mb-1">Notable Performances</h4>
                        <ul className="list-disc list-inside text-[var(--text)] text-sm space-y-1">
                          {event.notablePerformances.slice(0,2).map((performance, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Medal size={16} className="mt-0.5 flex-shrink-0 text-[var(--accent)]" />
                              <span><strong>{performance.athlete}</strong>: {performance.achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );

              return cardContent;
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-12 text-center">
            Ongoing Programs & Initiatives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, idx) => {
              const Icon = program.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[var(--card)] rounded-2xl p-8 shadow border border-[var(--card-border)] flex flex-col gap-4 hover-lift"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--primary)]">{program.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {program.frequency && (
                      <div>
                        <h4 className="font-semibold text-[var(--primary)] text-sm mb-1">Frequency</h4>
                        <p className="text-[var(--text)] text-sm">{program.frequency}</p>
                      </div>
                    )}
                    {program.phases && (
                      <div>
                        <h4 className="font-semibold text-[var(--primary)] text-sm mb-1">Phases</h4>
                        <p className="text-[var(--text)] text-sm">{program.phases}</p>
                      </div>
                    )}
                    {program.process && (
                      <div>
                        <h4 className="font-semibold text-[var(--primary)] text-sm mb-1">Process</h4>
                        <ul className="list-disc list-inside text-[var(--text)] text-sm space-y-1">
                          {program.process.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {program.nextCamp && (
                      <div>
                        <h4 className="font-semibold text-[var(--primary)] text-sm mb-1">Next Session</h4>
                        <p className="text-[var(--text)] text-sm">{program.nextCamp}</p>
                      </div>
                    )}
                    {program.upcoming && (
                      <div>
                        <h4 className="font-semibold text-[var(--primary)] text-sm mb-1">Upcoming Workshop</h4>
                        <p className="text-[var(--text)] text-sm">{program.upcoming}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}