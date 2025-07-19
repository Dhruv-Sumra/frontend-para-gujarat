import React from "react";
import { Rocket, Eye, Gem } from "lucide-react";

const cards = [
  {
    title: "MISSION",
    icon: <Rocket className="w-7 h-7 text-white" />,
    gradient: "from-pink-500 to-red-400",
    titleColor: "text-pink-600",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
  },
  {
    title: "VISION",
    icon: <Eye className="w-7 h-7 text-white" />,
    gradient: "from-cyan-500 to-blue-500",
    titleColor: "text-cyan-600",
    desc: "Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam.",
  },
  {
    title: "VALUES",
    icon: <Gem className="w-7 h-7 text-white" />,
    gradient: "from-yellow-400 to-orange-500",
    titleColor: "text-orange-500",
    desc: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis.",
  },
];

const MissionVisionValues = () => (
  <section className="w-full py-16 px-2 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF9933] mb-2">Mission Vision Values</h2>
      <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">Our guiding principles drive us to empower, inspire, and uphold excellence in para sports across Gujarat.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.title}
          className={
            "group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-8 text-center"
          }
        >
          <div
            className={`mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${card.gradient} shadow-lg mx-auto`}
          >
            {card.icon}
          </div>
          <h3 className={`text-xl font-bold mb-2 tracking-wide ${card.titleColor}`}>{card.title}</h3>
          <p className="text-gray-700 text-base leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MissionVisionValues; 