import React from 'react';
import { Newspaper, Star, Users } from 'lucide-react';

const featuredNews = {
  title: 'World Para Athletics Grand Prix 2025',
  subtitle: 'India Hosts First-Ever World Para Athletics Grand Prix in New Delhi – Gujarat Shines with 12 Medals',
  date: '8–13 March 2025',
  venue: 'Jawaharlal Nehru Stadium, New Delhi',
  participants: '105 athletes from UAE, Germany, Japan, Kazakhstan, Brazil, etc.',
  supporters: 'Paralympic Committee of India & World Para Athletics',
  medals: { gold: 5, silver: 3, bronze: 4 },
};

const newsArticles = [
  {
    title: 'New Academies Launched Across Gujarat',
    date: 'Feb 2025',
    summary: 'South Gujarat (Rajpipla), Central Gujarat (Nadiad), Saurashtra (Porbandar), North Gujarat (Himmatnagar) now have new para-sports academies. These centers will nurture talent and provide world-class training facilities for para-athletes.',
    image: 'https://static.sportzbusiness.com/uploads/2023/12/Para-Athletes-Khelo-India-Para-Games.jpg',
    link: 'https://timesofindia.indiatimes.com/city/ahmedabad/gujarat-para-sports-academy-launch',
    source: 'Times of India',
    reporter: 'Rohit Patel',
  },
  {
    title: 'State-wide Para Sports Talent Hunt',
    date: 'Jan 2025',
    summary: 'PSAG launches a new talent identification program with digital registration and AI-powered athlete tracking. The initiative aims to discover hidden talent in rural and urban Gujarat.',
    image: 'https://www-cdn.yahaha.com/images/talent-hunt/banner-text.png',
    link: 'https://www.paralympic.org/news/india-talent-hunt',
    source: 'Paralympic.org',
    reporter: 'Anjali Mehta',
  },
  {
    title: 'MoU Signed: PSAG + SFA',
    date: 'Dec 2024',
    summary: 'A new partnership to boost para-sports infrastructure and athlete support in Gujarat. The MoU will enable resource sharing and joint events.',
    image: 'https://cdn.edsi.com/img/inline/_1168x614_crop_center-center_82_line_ns/MOU-graphic.png',
    link: 'https://www.sportstarlive.com/psag-sfa-mou',
    source: 'Sportstar',
    reporter: 'Priya Shah',
  },
  {
    title: 'Launch of GMS (Games Management System)',
    date: 'Nov 2024',
    summary: 'Technology enablement: dashboards, digital profiles, athlete registration via Aadhaar. The GMS will streamline event management and athlete data.',
    image: 'https://softtribe.com/images/SOFTTRIBE-LOGOS-05.png',
    link: 'https://www.thehindu.com/sport/other-sports/gms-launch',
    source: 'The Hindu',
    reporter: 'Suresh Kumar',
  },
];

const officials = [
  'Gauravbhai Parikh',
  'Niranjan Chaurasia',
  'Jagdishbhai Thakor',
  'Rajiv Gupta',
  'Yashu Sharma',
];

export default function News() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Page Title */}
      <div className="w-full py-8 bg-[var(--card)] border-b border-[var(--card-border)] mb-8">
        <h1 className="text-4xl font-extrabold text-center tracking-tight text-[var(--primary)]">
          PSAG <span className="text-[var(--accent)]">News</span>
        </h1>
        <p className="text-center text-[var(--text-secondary)] mt-2 text-base font-medium">
          Latest updates, achievements, and official announcements from the Para Sports Association of Gujarat.
        </p>
      </div>
      {/* Featured News */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-[var(--card)] rounded-2xl shadow-lg p-0 border border-[var(--card-border)] mb-10 overflow-hidden">
          <img src="https://media.assettype.com/outlookindia/2024-05/45214a6d-e3eb-4c5d-9ca2-2ad9ec580f6f/World_Para_Athletics_Championships_India_Javelin_X_SAI_media.jpg?w=1200&amp;ar=40:21&amp;auto=format%2Ccompress&amp;ogImage=true&amp;mode=crop&amp;enlarge=true&amp;overlay=false&amp;overlay_position=bottom&amp;overlay_width=100" alt="Featured News" className="w-full h-90 object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="text-xl font-bold text-[var(--primary)]">{featuredNews.title}</h2>
            </div>
            <div className="text-[var(--text-secondary)] font-semibold mb-2 text-base">{featuredNews.subtitle}</div>
            <div className="flex flex-wrap gap-4 text-xs text-[var(--text-secondary)] mb-2">
              <span>Date: {featuredNews.date}</span>
              <span>Venue: {featuredNews.venue}</span>
              <span>Participants: {featuredNews.participants}</span>
              <span>Supporters: {featuredNews.supporters}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">🥇 Gold: {featuredNews.medals.gold}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--card-border)] text-[var(--text)]">🥈 Silver: {featuredNews.medals.silver}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">🥉 Bronze: {featuredNews.medals.bronze}</span>
            </div>
            <a href="https://affairscloud.com/world-para-athletics-grand-prix-2025-india-tops-medal-tally-with-134-medals/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[var(--accent)] font-semibold hover:underline text-sm">Read Full Story</a>
          </div>
        </div>
        {/* News Articles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2"><Newspaper className="w-5 h-5 text-[var(--accent)]" /> Latest News</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {newsArticles.map((article) => (
              <div key={article.title} className="bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--card-border)] flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.025]">
                <img src={article.image} alt={article.title} className="w-full h-44 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-[var(--text-secondary)] mb-1">{article.date}</div>
                  <div className="font-bold text-[var(--primary)] mb-1 text-lg">{article.title}</div>
                  <div className="text-[var(--text-secondary)] text-sm mb-3 flex-1">{article.summary}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">{article.source} | {article.reporter}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 