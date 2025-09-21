import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GujaratMap from '../components/GujaratMap';
import Section from '../components/Section';
import MedalCounter from '../components/MedalCounter';
import EventCard from '../components/EventCard';
import RecordsTable from '../components/RecordsTable';
import MilestoneList from '../components/MilestoneList';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Animated Counter Hook
function useCountUp(end, duration = 2000, showPlus = true, trigger = true) {
  const ref = useRef();
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    let current = start;
    const node = ref.current;
    if (!node) return;
    node.textContent = showPlus ? '0+' : '0';
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        node.textContent = showPlus ? `${end}+` : `${end}`;
        clearInterval(interval);
      } else {
        node.textContent = showPlus ? `${current}+` : `${current}`;
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end, duration, showPlus, trigger]);
  return ref;
}

// Three static image boxes, large and highly visible
function HeroImageBoxes() {
  return (
    <div className="absolute right-0 top-0 h-full w-[80%] lg:w-[90%] flex items-center justify-center" style={{zIndex: 1}}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Box 1 */}
        <div className="absolute left-[-10%] top-[-25%] w-[60%] h-[80%] rounded-2xl shadow-2xl rotate-4 overflow-hidden border-4 border-white/80 z-20 transition-all duration-500 group hover:rotate-0 hover:scale-105 hover:z-50">
          <img src="/front.jpg" alt="PSAG 1" className="scale-130 object-cover w-full h-full select-none pointer-events-none transition-all duration-500" draggable={false} />
        </div>
        {/* Box 2 */}
        <div className="absolute left-[40%] top-[0%] w-[60%] h-[80%] rounded-2xl shadow-xl -rotate-6 overflow-hidden border-4 border-white/60 z-10 transition-all duration-500 group hover:rotate-0 hover:scale-105 hover:z-50">
          <img src="/front2.jpg" alt="PSAG 2" className="object-cover w-full h-full select-none pointer-events-none transition-all duration-500" draggable={false} />
        </div>
        {/* Box 3 */}
        <div className="absolute left-[0%] top-[50%] w-[50%] h-[60%] rounded-2xl shadow-lg rotate-2 overflow-hidden border-4 border-white/50 z-0 transition-all duration-500 group hover:rotate-0 hover:scale-105 hover:z-50">
          <img src="/front3.webp" alt="PSAG 3" className="object-cover w-full h-full select-none pointer-events-none transition-all duration-500" draggable={false} />
        </div>
      </div>
    </div>
  );
}

function AnimatedStats() {
  const [visible, setVisible] = React.useState(false);
  const sectionRef = React.useRef();

  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // All counters use the same 'visible' trigger, so they animate together
  const athletesRef = useCountUp(3100, 1200, true, visible);
  const medalistsRef = useCountUp(33, 1200, false, visible);
  const arjunaRef = useCountUp(5, 1200, false, visible);
  const awardeesRef = useCountUp(114, 1200, false, visible);
  return (
    <section ref={sectionRef} className="w-full py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center bg-[var(--card)] rounded-xl shadow p-6 min-w-[180px]">
          <span ref={athletesRef} className="text-4xl font-extrabold text-[var(--accent)] mb-1"/>
          <span className="text-lg font-semibold text-[var(--text)]">Total Para Athletes</span>
        </div>
        <div className="flex flex-col items-center bg-[var(--card)] rounded-xl shadow p-6 min-w-[180px]">
          <span ref={medalistsRef} className="text-4xl font-extrabold text-[var(--accent)] mb-1"/>
          <span className="text-lg font-semibold text-[var(--text)]">2025 Grand Prix Medalists</span>
        </div>
        <div className="flex flex-col items-center bg-[var(--card)] rounded-xl shadow p-6 min-w-[180px]">
          <span ref={arjunaRef} className="text-4xl font-extrabold text-[var(--accent)] mb-1"/>
          <span className="text-lg font-semibold text-[var(--text)]">Arjuna Awardees</span>
        </div>
        <div className="flex flex-col items-center bg-[var(--card)] rounded-xl shadow p-6 min-w-[180px]">
          <span ref={awardeesRef} className="text-4xl font-extrabold text-[var(--accent)] mb-1"/>
          <span className="text-lg font-semibold text-[var(--text)]">National/State Awardees</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 60 });
  }, []);
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);
  const [districtContacts, setDistrictContacts] = useState([]);
  const [attachedDistricts, setAttachedDistricts] = useState([]);
  const districtRefs = useRef([]);

  // Fetch district contacts JSON
  useEffect(() => {
    fetch('/src/districtContacts.json')
      .then(res => res.json())
      .then(data => setDistrictContacts(data));
  }, []);

  // Intersection Observer for district list (attach effect)
  useEffect(() => {
    if (!districtContacts.length) return;
    const attached = new Set();
    const observer = new window.IntersectionObserver(
      (entries) => {
        let newHighlight = highlightedDistrict;
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            attached.add(e.target.getAttribute('data-district'));
            newHighlight = e.target.getAttribute('data-district');
          }
        });
        setAttachedDistricts(Array.from(attached));
        setHighlightedDistrict(newHighlight);
      },
      { threshold: [0.5] }
    );
    districtRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [districtContacts, highlightedDistrict]);
  // Replace animated counters with static numbers
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'theme-light' : 'theme-light';
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-10 sm:py-16 lg:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, var(--bg) 0%, var(--card) 100%)', color: 'var(--primary)'}} data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 relative min-h-[20rem] sm:min-h-[28rem] lg:min-h-[32rem]">
          {/* Hero Text - Center */}
          <div className="flex-1 text-center lg:text-left z-10 flex flex-col justify-center lg:basis-7/12 lg:w-7/12" data-aos="fade-right">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-8 mt-2 tracking-tight leading-tight max-w-4xl w-full mx-auto lg:mx-0" style={{color: 'var(--primary)'}}>
              Empowering Champions
              <br className="hidden md:block" />
              Inspiring Gujarat
            </h1>
            <div className="mx-auto lg:mx-0 my-2 w-full max-w-2xl">
              <span className="block text-base sm:text-lg md:text-xl font-semibold text-[var(--accent)]">
              Where Every Ability is a Strength, and Every Story a Victory.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-2">
              <Link to="/athletes" className="font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg transition text-base sm:text-lg md:text-xl" style={{background: 'var(--accent)', color: '#fff'}}>Meet Our Champions</Link>
              <Link to="/contact" className="font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg transition border-2 text-base sm:text-lg md:text-xl" style={{background: 'var(--card)', color: 'var(--accent)', borderColor: 'var(--accent)'}}>Join the Movement</Link>
            </div>
          </div>
          {/* Hero Image - Right Side (three static image boxes, large and visible) */}
          <div className="flex-1 flex items-center justify-center relative z-0 min-h-[12rem] sm:min-h-[20rem] lg:min-h-[28rem] lg:basis-5/12 lg:w-5/12" data-aos="zoom-in">
            <HeroImageBoxes />
          </div>
        </div>
      </section>

      {/* Mini About Section - Professional, not card */}
      <section className="w-full py-8 sm:py-14" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <hr className="mb-6 sm:mb-8 border-t-2 border-[var(--accent)] w-16 sm:w-20 mx-auto" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--accent)] mb-2 sm:mb-3 tracking-tight text-center">About Para Sports Association of Gujarat</h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--text)] text-center font-medium">
            The Para Sports Association of Gujarat (PSAG) is the state's official para-sports body, affiliated with the Paralympic Committee of India and recognized by the Sports Authority of Gujarat. Headquartered in Ahmedabad, PSAG's mission is to build a fit, healthy, and active Gujarat by empowering para-athletes through a vibrant sports culture, in close collaboration with district-level associations.
          </p>
        </div>
      </section>

      {/* Background Video Section */}
      <section className="relative w-full h-[200px] sm:h-[340px] md:h-[900px] flex items-center justify-center overflow-hidden" data-aos="fade-up">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/bg.mp4" // <-- Change to your actual video filename
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Orange overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#FF9933]/20 z-10 pointer-events-none" aria-hidden="true" />
        {/* Optionally, keep the black overlay for extra contrast: <div className=\"absolute top-0 left-0 w-full h-full bg-black/30 z-10 pointer-events-none\" aria-hidden=\"true\" /> */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
          {/* <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Para Sports in Motion</h2> */}
          {/* <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl mx-auto">Experience the energy, passion, and achievements of Gujarat's para-athletes in action.</p> */}
        </div>
      </section>

      {/* Gujarat Para Sports Map Section */}
      <section className="w-full py-6 sm:py-10" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-[var(--accent)]">Male and Female Para-Athlets by District (Gujarat)</h2>
          <GujaratMap highlightedDistrict={highlightedDistrict} attachedDistricts={attachedDistricts} />
        </div>
      </section>
      <div data-aos="fade-up">
        <AnimatedStats />
      </div>

      {/* Quick Impact Section */}
      <Section title="PSAG Recent Achievements">
        <div className="flex flex-col gap-6 sm:gap-10">
          {/* 1. Animated Medal Counter */}
          <div data-aos="zoom-in-up">
            <MedalCounter gold={13} silver={10} bronze={10} />
          </div>

          {/* 2. Event Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full mb-6">
            <div data-aos="fade-right">
              <EventCard
                title="2025 World Para Athletics Grand Prix (Dubai)"
                medals={[13, 10, 10]}
                achievements={[
                  { name: "Mit Patel", detail: "(3x Gold)" },
                  { name: "Priya Sharma", detail: "(2x Gold)" },
                  { name: "Team Relay", detail: "" },
                  { name: "Rajesh Vaghela", detail: "(400m T47 Silver)" },
                  { name: "Junior Team", detail: "" },
                  { name: "New athletes from Mehsana & Gandhinagar", detail: "" }
                ]}
              />
            </div>
            <div data-aos="fade-left">
              <EventCard
                title="Asian Para Games 2023"
                medals={[4, 2, 1]}
                achievements={[
                  { name: "Anjali Desai", detail: "(Badminton SL3 Gold)" },
                  { name: "Team India", detail: "7 Medals (4G, 2S, 1B)" },
                  { name: "Other Medalists", detail: "See full list on website" }
                ]}
              />
            </div>
          </div>
          <div className="flex justify-center w-full" data-aos="fade-up">
            <div className="max-w-xl w-full">
              <h3 className="text-base sm:text-xl font-bold text-[#FF9933] mb-2 sm:mb-4 text-center">National Records Broken</h3>
              <RecordsTable
                columns={["Athlete", "Event", "Record"]}
                data={[
                  { athlete: "Mit Patel", event: "200m T44", record: "23.67 sec (Asian)" },
                  { athlete: "Priya Sharma", event: "Powerlifting F55", record: "142kg (World)" },
                  { athlete: "Aarav Mehta", event: "100m Freestyle S9", record: "1:02.34 (India)" },
                ]}
                theme={theme}
              />
            </div>
          </div>

          {/* 4. State-Level Milestones */}
          <div data-aos="fade-up">
            <h3 className="text-base sm:text-xl font-bold text-[#FF9933] mb-2 sm:mb-4 text-center">State-Level Milestones</h3>
            <MilestoneList
              milestones={[
                "New Training Centers: 3 opened (Surat, Rajkot, Dwarka)",
                "Youngest Medalist: 12-year-old wheelchair racer (Daksha Patel, Kutch)",
                "First All-Women Team: Wheelchair basketball (Ahmedabad)",
              ]}
            />
          </div>
        </div>
      </Section>

      {/* TODO: Vision & Mission Section */}
      {/* TODO: Upcoming Events Section */}
      {/* TODO: Sports Excellence Section */}
      {/* TODO: Leadership & Support Section */}
      {/* TODO: Technology & Innovation Section */}
      {/* TODO: Success Stories Section */}
      {/* TODO: Get Involved Section */}
      {/* TODO: Contact & Location Section */}
      {/* TODO: Footer */}


    </>
  );
}