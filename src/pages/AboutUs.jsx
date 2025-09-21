import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Target,
  Flag,
  Users,
  Award,
  Star,
  BookOpen,
  Medal,
  Trophy,
  HeartPulse,
  MapPin,
} from "lucide-react";

const aboutData = {
  stats: [
    {
      value: "3,112",
      label: "Registered Para-Athletes",
      subtext: "Across Gujarat",
    },
    {
      value: "33",
      label: "2025 Grand Prix Medals",
      subtext: "13 Gold | 10 Silver | 10 Bronze",
    },
    { value: "5", label: "Arjuna Awardees", subtext: "Since 2016" },
    {
      value: "33",
      label: "District Associations",
      subtext: "Statewide Network",
    },
  ],
  sections: [
    {
      title: "Our Vision & Mission",
      icon: <Target className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#FF9933] to-[#FF6B35]",
      content: [
        "To make Gujarat the leading state for para-sports in India by 2030",
        "Mission: Identify, train, and support para-athletes from grassroots to international competitions",
        "Core Values: Inclusivity, Excellence, Empowerment",
      ],
      isList: true,
    },
    {
      title: "Strategic Roadmap 2028-2047",
      icon: <Flag className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#000080] to-[#1E3A8A]",
      content: [
        "2028: Establish 10 regional para-sports training centers",
        "2036: Host National Para Games in Gujarat",
        "2047: Produce 25+ Paralympic medalists from Gujarat",
      ],
      isList: true,
    },
    {
      title: "Organization Profile",
      icon: <Users className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#138808] to-[#4CAF50]",
      content: [
        "Founded: 1993 (30+ years of service)",
        "Headquarters: Ahmedabad",
        "Recognized by: Ministry of Youth Affairs & Sports, Govt. of India",
        "Affiliated to: Paralympic Committee of India (PCI)",
      ],
      isList: true,
    },
    {
      title: "Key Achievements",
      icon: <Medal className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#FFD700] to-[#FFA500]",
      content: [
        "2025: 33 medals at World Para Athletics Grand Prix",
        "2023: 7 medals at Asian Para Games",
        "Produced 5 Arjuna Award winners",
        "Launched Gujarat Para Sports Academy (2022)",
      ],
      isList: true,
    },
    {
      title: "Athlete Support Programs",
      icon: <HeartPulse className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#E91E63] to-[#9C27B0]",
      content: [
        "Monthly stipends for elite athletes (₹15,000-₹25,000)",
        "Free medical insurance up to ₹5 lakh",
        "Prosthetics & wheelchair support",
        "Career transition programs",
      ],
      isList: true,
    },
    {
      title: "District Network",
      icon: <MapPin className="w-7 h-7 text-white" />,
      iconBg: "bg-gradient-to-br from-[#607D8B] to-[#795548]",
      content: [
        "33 district associations",
        "Top performing districts: Ahmedabad, Surat, Vadodara",
        "Annual district championships since 2005",
      ],
      isList: true,
    },
  ],
  leadership: [
    {
      name: "Shri Kantibhai Parmar",
      role: "President",
      // tenure: "Since 2018",
      achievement: "Led PSAG's Asian Para Games 2023 campaign",
    },
    {
      name: "Shri Chandubhai Bhatti",
      role: "Secretary General",
      // tenure: "Since 2015",
      achievement: "Established Gujarat Para Sports Academy",
    },
    {
      name: "Dr. Dinesh Parmar",
      role: "Technical Director",
      // tenure: "Since 2020",
      // achievement: "Implemented athlete health monitoring system"
    },
  ],
};

const StatCard = ({ value, label, subtext }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center border border-[#FF9933]/20">
    <div className="text-3xl font-bold text-[#000080]">{value}</div>
    <div className="text-lg font-medium text-[#FF9933] mt-1">{label}</div>
    <div className="text-sm text-[var(--text)] mt-1">{subtext}</div>
  </div>
);

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <div
        className="py-16 px-2 bg-[var(--primary)] text-[var(--card)]"
        data-aos="fade-down"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[var(--accent)]">About</span> PSAG
          </h1>
        </div>
      </div>
      {/* PSAG Highlights Section - Simple Lines */}
      <div className="max-w-6xl mx-auto px-2 mt-10 mb-12 flex flex-col gap-7">
        {[
          "Legacy & Recognition",
          "Grassroots Impact",
          "Competitive Excellence",
          "Infrastructure Development",
          "Athlete Support Systems",
          "Women's Empowerment",
        ].map((title, i) => (
          <div key={title} data-aos="fade-up" data-aos-delay={i * 80}>
            <span className="block text-lg font-bold text-[var(--primary)] mb-1">
              {title}
            </span>
            <span className="block text-[var(--text)] leading-relaxed">
              {aboutData.sections[i]
                ? aboutData.sections[i].content.join(" ")
                : ""}
            </span>
          </div>
        ))}
      </div>
      {/* Leadership Section - moved to just after highlights */}
      <div className="p-8 mt-15" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center">
          Our <span className="text-[var(--accent)]">Leadership</span>
        </h2>
        <div className="flex flex-col gap-8 w-full items-center">
          {aboutData.leadership.map((leader, index) => {
            let imgSrc = "";
            if (leader.name.includes("Kantibhai Parmar"))
              imgSrc = "/leaders/kantibhai_parmar.jpg";
            if (leader.name.includes("Chandubhai Bhatti"))
              imgSrc = "/leaders/chandubhai_bhatti.jpg";
            if (leader.name.includes("Dinesh Parmar"))
              imgSrc = "/leaders/dineshbhai_parmar.jpg";
            return (
              <div
                key={index}
                className="w-full max-w-3xl border-b border-[var(--card-border)] flex flex-col items-center p-6"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="w-24 h-24 md:w-35 md:h-auto rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-1 text-center">
                  {leader.name}
                </h3>
                <p className="text-[var(--accent)] font-semibold mb-1 text-center">
                  {leader.role}
                </p>
                <p className="text-[var(--text)] text-sm mb-2 text-center">
                  {leader.achievement}
                </p>
                {leader.name.includes("Kantibhai Parmar") && (
                  <div className="mt-2 text-sm text-[var(--text)] text-center w-full">
                    To all our remarkable Para Athletes,
                    <br />
                    As we look to the future, our commitment to empowering each
                    one of you remains unwavering. The path you walk is one of
                    immense courage, resilience, and dedication. The Para Sports
                    Association of Gujarat is dedicated to creating an
                    inclusive, supportive environment where you are not only
                    celebrated for your talent but provided with the
                    opportunities and resources to thrive.
                    <br />
                    Together, we are working towards a future where every Para
                    Athlete has access to world-class training, facilities, and
                    the unwavering support they deserve. Our mission is to break
                    barriers, overcome challenges, and ensure that
                    accessibility, opportunity, and equality are not just
                    ideals, but the reality of every athlete's journey.
                    <br />
                    You inspire us every day. With determination and unity, we
                    will build a future where the skies are limitless for Para
                    Athletes, and the world recognizes and celebrates your
                    immense potential.
                    <br />
                    Stay strong, stay committed, and continue to push the
                    boundaries of what is possible.
                    <br />
                    <span className="block mt-2 font-semibold">
                      With pride and solidarity,
                    </span>
                  </div>
                )}
                {leader.name.includes("Chandubhai Bhatti") && (
                  <div className="mt-2 text-sm text-[var(--text)] text-center w-full">
                    Dear Para Athletes,
                    <br />
                    Shri Chandubhai Bhatti
                    <br />
                    Secretary, PSAG
                    <br />
                    Executive Member of PCI
                    <br />
                    As the Secretary of the Para Sports Association of Gujarat,
                    I stand alongside you in our collective journey toward a
                    future where your dreams are not just possible, but
                    inevitable. You have shown immense courage, determination,
                    and strength, and it is our responsibility to ensure that
                    you have the support, resources, and opportunities to
                    continue your pursuit of excellence.
                    <br />
                    We are committed to creating a more accessible and inclusive
                    environment for all Para Athletes. Every step you take in
                    your training and competition brings us closer to a world
                    where accessibility and equality are the foundations of
                    every sport. Our focus remains on improving infrastructure,
                    providing necessary tools, and ensuring that every Para
                    Athlete has a fair and equal chance to succeed.
                    <br />
                    You inspire us to break down barriers and redefine what is
                    possible. Together, we will pave the way for a future where
                    your potential knows no bounds.
                    <br />
                    Keep striving, keep achieving, and know that we are with you
                    every step of the way.
                    <br />
                    <span className="block mt-2 font-semibold">
                      With respect and dedication,
                    </span>
                  </div>
                )}
                {leader.name.includes("Dinesh Parmar") && (
                  <div className="mt-2 text-sm text-[var(--text)] text-center w-full">
                    Dear Para Athletes and Stakeholders,
                    <br />
                    As the Technical Director of the Para Sports Association of
                    Gujarat, I am proud to share with you our bold vision for
                    the future. We are committed to reaching every corner of
                    Gujarat, ensuring that no talent goes unnoticed and that
                    every Para Athlete has the opportunity to achieve their
                    dreams on the global stage.
                    <br />
                    Our strategic vision for 2036 is clear: we aim to elevate
                    Gujarat's Para Sports to new heights and make our athletes a
                    source of pride for the entire nation. With a focused
                    strategy, cutting-edge training programs, and world-class
                    facilities, we will ensure that our athletes are not only
                    prepared but are poised to make a significant impact at the
                    Paralympics.
                    <br />
                    By 2036, we will have built a legacy of excellence,
                    inclusivity, and pride, where every Para Athlete from
                    Gujarat can compete with the best in the world. Together, we
                    will reach new milestones, overcome every challenge, and
                    ensure that Gujarat’s presence on the global stage is not
                    just noticed, but celebrated.
                    <br />
                    Let’s move forward with purpose, determination, and a shared
                    vision for success. We are with you every step of the way.
                    <br />
                    <span className="block mt-2 font-semibold">
                      With unwavering commitment,
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 pb-20">
        <h2
          className="text-2xl font-bold text-[var(--primary)] mb-8 mt-4 text-center"
          data-aos="fade-up"
        >
          Our Strategic Pillars
        </h2>
        {/* 3-column grid for Mission, Vision, Key Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[0, 1, 4].map((idx, i) => {
            const section = aboutData.sections[idx];
            let paragraph = "";
            if (idx === 0)
              paragraph =
                "Our vision is to make Gujarat the leading state for para-sports in India by 2030. We are committed to identifying, training, and supporting para-athletes from the grassroots to international competitions, guided by our core values of inclusivity, excellence, and empowerment.";
            if (idx === 1)
              paragraph =
                "Our strategic roadmap includes establishing 10 regional para-sports training centers by 2028, hosting the National Para Games in Gujarat by 2036, and producing over 25 Paralympic medalists from Gujarat by 2047.";
            if (idx === 4)
              paragraph =
                "PSAG has achieved remarkable milestones, including 33 medals at the 2025 World Para Athletics Grand Prix, 7 medals at the 2023 Asian Para Games, producing 5 Arjuna Award winners, and launching the Gujarat Para Sports Academy in 2022.";
            return (
              <section
                key={idx}
                className="bg-[var(--card)] rounded-xl border border-[var(--card-border)] p-8 flex flex-col items-center shadow-sm"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--card)] mb-3">
                  {React.cloneElement(section.icon, {
                    className: "w-8 h-8 text-[var(--accent)]",
                  })}
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] text-center mb-3">
                  {section.title}
                </h3>
                <p className="text-[var(--text)] text-center leading-relaxed">
                  {paragraph}
                </p>
              </section>
            );
          })}
        </div>
        {/* The rest of the cards, as detailed paragraphs */}
        <div className="flex flex-col gap-12">
          {[2, 3, 5].map((idx, i) => {
            const section = aboutData.sections[idx];
            let paragraph = "";
            if (idx === 2)
              paragraph =
                "Founded in 1993, PSAG has over 30 years of service, headquartered in Ahmedabad. We are recognized by the Ministry of Youth Affairs & Sports, Government of India, and affiliated with the Paralympic Committee of India (PCI).";
            if (idx === 3)
              paragraph =
                "Our athlete support programs include monthly stipends for elite athletes, free medical insurance up to ₹5 lakh, prosthetics and wheelchair support, and career transition programs to ensure holistic development.";
            if (idx === 5)
              paragraph =
                "With 33 district associations, PSAG has built a statewide network, with top performing districts like Ahmedabad, Surat, and Vadodara, and has organized annual district championships since 2005.";
            return (
              <div
                key={idx}
                className="border-l-4 border-[var(--accent)] pl-6"
                data-aos="fade-left"
                data-aos-delay={i * 100}
              >
                <h3 className="text-lg font-bold text-[var(--primary)] mb-1">
                  {section.title}
                </h3>
                <p className="text-[var(--text)] leading-relaxed">
                  {paragraph}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
