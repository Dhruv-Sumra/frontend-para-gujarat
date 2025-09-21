import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, Users, MapPin, Building, Clock, Send, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import GujaratMap from '../components/GujaratMap';

const leadership = [
  {
    name: 'Shri Kantibhai Parmar',
    role: 'President',
    phone: '9427007072',
    email: 'psaofgujarat@gmail.com',
    department: 'Executive'
  },
  {
    name: 'Shri Chandubhai Bhatti',
    role: 'Secretary',
    phone: '9824090149',
    email: 'gauravkparikh@gmail.com',
    department: 'Administration'
  },
  {
    name: 'Dr. Dinesh Parmar',
    role: 'Technical Director',
    phone: '9898754279',
    email: 'tdpsag@gmail.com',
    department: 'Technical'
  },
];

const ContactCard = ({ icon: Icon, title, children, className = "" }) => (
  <motion.div 
    className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>{title}</h3>
    </div>
    {children}
  </motion.div>
);

const LeadershipCard = ({ person, index }) => (
  <motion.div 
    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
  >
          <div className="mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{person.name}</h4>
          <p className="font-medium" style={{ color: 'var(--primary)' }}>{person.role}</p>
          <p className="text-sm text-gray-600">{person.department} Department</p>
        </div>
      </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-1 bg-gray-100 rounded">
          <Phone className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        </div>
        <a href={`tel:${person.phone}`} className="text-gray-900 hover:text-blue-600 transition-colors">
          {person.phone}
        </a>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-1 bg-gray-100 rounded">
          <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        </div>
        <a href={`mailto:${person.email}`} className="text-gray-900 hover:text-blue-600 transition-colors">
          {person.email}
        </a>
      </div>
    </div>
  </motion.div>
);

const DistrictToggle = ({ district, isOpen, onToggle }) => (
  <motion.div 
    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="text-left">
        <h4 className="text-lg font-semibold text-gray-900">{district.district}</h4>
        <p className="text-sm text-gray-600">{district.association}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{district.contacts.length} contacts</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
    </button>
    
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-gray-200 p-4 bg-gray-50"
      >
        <div className="space-y-4">
          {district.established && (
            <div className="text-sm text-gray-600">
              <strong>Established:</strong> {district.established}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Contact Persons:</p>
            <div className="space-y-2">
              {district.contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-3 text-sm bg-white p-3 rounded border">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{contact.name}</span>
                                     <Phone className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                   <a href={`tel:${contact.phone}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                         <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
             <a href={`mailto:${district.email}`} className="text-sm text-gray-900 hover:text-blue-600 transition-colors">
              {district.email}
            </a>
          </div>
        </div>
      </motion.div>
    )}
  </motion.div>
);

export default function ContactUs() {
  const [districts, setDistricts] = useState([]);
  const [openDistricts, setOpenDistricts] = useState(new Set());
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch('/src/districtContacts.json')
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  const toggleDistrict = (districtName) => {
    const newOpenDistricts = new Set(openDistricts);
    if (newOpenDistricts.has(districtName)) {
      newOpenDistricts.delete(districtName);
    } else {
      newOpenDistricts.add(districtName);
    }
    setOpenDistricts(newOpenDistricts);
  };

  // Intersection Observer for district cards
  useEffect(() => {
    if (!districts.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting && e.intersectionRatio > 0.5);
        if (visible.length > 0) {
          setHighlightedDistrict(visible[0].target.getAttribute('data-district'));
        }
      },
      { threshold: [0.5] }
    );
    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [districts]);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Header Section */}
      <motion.div 
        className="bg-[var(--card)] border-b border-[var(--card-border)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-2 py-16">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Contact <span className="text-[var(--accent)]">PSAG</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-[var(--text)] max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Connect with our leadership team or find your local district para sports association. We're here to support Gujarat's para-athletes.
            </motion.p>
          </div>
        </div>
      </motion.div>

              <div className="max-w-6xl mx-auto px-2 py-16">
        {/* Leadership Team */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet our dedicated leaders driving para sports development in Gujarat</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((person, index) => (
              <LeadershipCard key={person.name} person={person} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Gujarat Map + District Directory */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">District Associations</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Find your local para sports association across Gujarat districts. Click on any district to view contact details.
            </p>
          </div>
          
          {/* District Toggle List */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {districts.map((district, i) => (
                <div
                  key={district.district}
                  data-district={district.district}
                  ref={el => (cardRefs.current[i] = el)}
                >
                  <DistrictToggle 
                    district={district} 
                    isOpen={openDistricts.has(district.district)}
                    onToggle={() => toggleDistrict(district.district)}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
                      <ContactCard icon={Mail} title="Email Support">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">General Inquiries</h4>
                  <a href="mailto:gujaratparasports@gmail.com" className="hover:underline flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                    gujaratparasports@gmail.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-600 mt-1">For general questions and information</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                  <a href="mailto:tdpsag@gmail.com" className="hover:underline flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                    tdpsag@gmail.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-600 mt-1">For technical and training queries</p>
                </div>
              </div>
            </ContactCard>
          
          <ContactCard icon={Phone} title="Phone Support">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Primary Contact</h4>
                                 <a href="tel:9427007072" className="hover:underline text-lg font-medium" style={{ color: 'var(--primary)' }}>
                  +91 9427007072
                </a>
                <p className="text-sm text-gray-600 mt-1">President's Office</p>

              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Contact</h4>
                                 <a href="tel:9898754279" className="hover:underline text-lg font-medium" style={{ color: 'var(--primary)' }}>
                  +91 9898754279
                </a>
                <p className="text-sm text-gray-600 mt-1">Technical Director</p>

              </div>
            </div>
          </ContactCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8">
              Whether you're an athlete looking to join our programs or an organization wanting to partner with us, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <motion.a 
                  href="/send-email"
                  className="px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center text-white"
                  style={{ backgroundColor: 'var(--accent)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                  Send us an Email
                </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}