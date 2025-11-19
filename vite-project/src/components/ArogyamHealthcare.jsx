import React, { useState, useEffect, useCallback } from 'react';
import { 
  Phone, MapPin, Search, Star, Calendar, 
  ArrowRight, Menu, X, Facebook, Linkedin, 
  Instagram, Youtube, Activity, Heart, Shield
} from 'lucide-react';
// REMOVED: Spline import and associated placeholder components to fix compilation error.
import { useNavigate } from 'react-router-dom';


// --- 0. SCROLLBAR HIDE STYLE (fixes horizontal scroll issue) ---
const ScrollbarStyle = () => (
    <style>
        {`
          /* Custom utility to hide scrollbar in horizontal flex containers */
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
          }

          /* Ensure all images scale correctly to their container size */
          .h-full img, .w-full img {
            max-width: 100%;
            height: 100%;
          }
        `}
    </style>
);

// --- 1. NAVBAR COMPONENT ---
const Navbar = ({ toggleEmergency }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-400 shadow-lg bg-white">
            <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-3xl font-serif font-bold text-teal-700 leading-none tracking-wide">
              Arogyam <span className="text-teal-400 block text-sm font-sans font-medium tracking-widest uppercase mt-1">Healthcare</span>
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-slate-300 hover:text-teal-400 transition-colors">
            <Search size={20} />
            <span className="font-medium">Search</span>
          </button>
          
          <button 
            onClick={toggleEmergency}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95"
          >
            <Activity size={20} />
            <span>Emergency</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- 2. EMERGENCY WIDGET COMPONENT ---
const EmergencyWidget = ({ isOpen, toggle }) => {
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 z-50 transition-all duration-500 ease-in-out ${isOpen ? 'top-24 opacity-100' : '-top-[500px] opacity-0'}`}>
      <div className="p-6 relative">
        <button onClick={toggle} className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-3 mb-6 text-red-500 border-b border-slate-800 pb-4">
          <Phone size={28} />
          <h3 className="text-2xl font-bold">Emergency Contacts 24/7</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {[
            { loc: "Delhi/NCR", num: "011-4055-4055" },
            { loc: "Mohali", num: "7710-777-107" },
            { loc: "Dehradun", num: "0135-719-3333" },
            { loc: "Bathinda", num: "0164-521-2039" },
            { loc: "Mumbai", num: "022-6134-7777" },
            { loc: "Brain Attack Helpline", num: "9910-204-023", highlight: true },
          ].map((item, idx) => (
            <div key={idx} className={`flex justify-between items-center p-3 rounded-lg ${item.highlight ? 'bg-red-900/30 border border-red-800' : 'hover:bg-slate-800'}`}>
              <span className="text-slate-300 font-medium">{item.loc}</span>
              <span className={`font-mono font-bold ${item.highlight ? 'text-red-400' : 'text-teal-400'}`}>{item.num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. HERO & APPOINTMENT SECTION ---
const HeroSection = () => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-10">
      {/* Quote Card */}
      <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl w-[90%] text-center mb-12 border-l-8 border-teal-500 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-inner border-4 border-slate-100 flex-shrink-0">
             <img src="/logo.jpg" alt="Arogyam" className="h-full w-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-slate-800 leading-tight mb-2">
              "Create Healthy Habits, <br/>
              <span className="text-teal-600">Not Restrictions."</span>
            </h2>
            <p className="text-slate-500 font-medium mt-4 text-lg">Your journey to wellness begins here.</p>
          </div>
        </div>
      </div>

      {/* Appointment Card */}
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-4 text-center">
          <h3 className="text-white font-bold text-lg uppercase tracking-wider">Book an Appointment</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="Search Doctor or Speciality" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="Select Location" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
          </div>
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-teal-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
            <Calendar size={20} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. ABOUT SECTION ---
const AboutSection = () => {
  return (
    <section className="bg-white py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full font-bold text-sm tracking-wide mb-2">WHO WE ARE</div>
            <h2 className="text-4xl font-bold text-slate-900">Redefining Healthcare with <span className="text-teal-600">Compassion.</span></h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Welcome to <span className="font-bold text-slate-900">Arogyam Healthcare</span>. We are committed to providing comprehensive, high-quality healthcare services to individuals of all ages. Our dedicated team of professionals combines state-of-the-art technology with a patient-centric approach.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {['Preventive Care', 'Specialised Consultations', 'Emergency Care', 'Wellness Programs', 'Robotic Surgery', 'Personalised Plans'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                  <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-teal-600/20 rounded-2xl transform rotate-3"></div>
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              {/* Ensure image sizing is controlled by the parent div */}
              <img src="/poster.jpg" alt="About Us" className="h-full w-full object-cover" />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="text-3xl font-bold">35+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. FACILITIES SECTION ---
const FacilitiesSection = ({ navigate }) => {
  return (
    <section className="py-20 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white relative">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

          <div className="grid md:grid-cols-2 gap-10 p-12 relative z-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Premium Membership & Facilities</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Priority based AI Diagnostics & Online Booking",
                  "Exclusive discounts on Health Checkups",
                  "Personalized AI Health Tracker (Vitals, Sleep, etc.)",
                  "Second Opinion Seeker & AI Symptom Checker"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield className="text-teal-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all hover:translate-x-2 flex items-center gap-2">
                Join Membership <ArrowRight size={20} />
              </button>
            </div>
            
            {/* Placeholder for Procedure Slider or iframe */}
            <div className="h-[350px] w-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col items-center justify-center text-center p-6">
               <Activity size={48} className="text-teal-400 mb-4" />
               <h4 className="text-xl font-bold mb-2">Interactive Procedures Guide</h4>
               <p className="text-slate-400 text-sm">Explore our specialized treatments and medical procedures visualizer here.</p>
               <div className="mt-6 px-4 py-2 bg-white/5 rounded-lg text-xs text-slate-500">
                 [Interactive Component Placeholder]
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NEW 6. AI CALLOUT SECTION ---
const AICalloutSection = ({ navigate }) => {
    return (
        <section className="py-16 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-blue-600 text-white p-10 md:p-16 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-10">
                    <div className="flex items-center space-x-4">
                        <Activity size={60} className="text-white animate-pulse" />
                        <div>
                            <h3 className="text-3xl font-extrabold mb-1">Need Immediate Advice?</h3>
                            <p className="text-blue-200 text-lg">Speak to our AI Health Assistant right now.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/callbot')}
                        className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all text-lg flex items-center gap-2"
                    >
                        <Phone size={20} />
                        Connect to Expert on Call
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- 7. DOCTORS SECTION (Renumbered) ---
const DoctorsSection = () => {
  const doctors = [
    { name: "Dr. R.S. Gupta", role: "Director and Chief", dept: "Internal Medicine", img: "doc1.jpeg" },
    { name: "Dr. Subhash Chaturvedi", role: "Chairman", dept: "Cardiology", img: "doc2.jpeg" },
    { name: "Dr. Vinni Kapoor", role: "Chairman", dept: "Cancer Care", img: "doc3.jpeg" },
    { name: "Dr. Pradeep Chaudhary", role: "Director", dept: "Laparoscopy", img: "doc4.jpeg" },
    { name: "Dr. Sudha Sharma", role: "Chairman", dept: "Gynecology", img: "doc5.jpeg" },
    { name: "Dr. Vijay Kohli", role: "Director", dept: "Urology", img: "doc6.jpeg" },
    { name: "Dr. Balbir Dosanjh", role: "Chairman", dept: "Orthopaedics", img: "doc7.jpeg" },
    { name: "Dr. Meenu Walia", role: "Chairman", dept: "Neurosurgery", img: "doc8.jpeg" },
    { name: "Dr. Neeru Parashar", role: "Director", dept: "Pulmonology", img: "doc9.jpeg" },
    { name: "Dr. Sanjay Sachdeva", role: "Head", dept: "ENT", img: "doc10.jpeg" },
  ];

  return (
    <section className="py-20 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Meet Our <span className="text-teal-600">Specialists</span></h2>
          <p className="text-slate-500 mt-2">World-class expertise at your service.</p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide">
          {doctors.map((doc, idx) => (
            <div key={idx} className="snap-center min-w-[300px] bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-64 w-full overflow-hidden">
                {/* Ensure image sizing is controlled by the parent div */}
                <img src={doc.img} alt={doc.name} className="h-full w-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                <p className="text-teal-600 font-medium text-sm mb-2">{doc.dept}</p>
                <p className="text-slate-500 text-xs mb-4">{doc.role}</p>
                <button className="w-full py-2 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 8. HOSPITALS SECTION (Renumbered) ---
const HospitalsSection = () => {
  const hospitals = [
    { name: "Pioneer Medical Care", rating: 4.5, img: "Hos1.jpeg" },
    { name: "Sanjeevni Hospital", rating: 4.5, img: "Hos2.jpeg" },
    { name: "Infinity Healthcare", rating: 4.1, img: "Hos3.jpeg" },
    { name: "Bharatam University", rating: 4.0, img: "Hos4.jpeg" },
    { name: "Medivista Healthcare", rating: 3.9, img: "Hos5.jpeg" },
    { name: "Arogya Kendra", rating: 3.8, img: "Hos6.jpeg" },
    { name: "HopeString Institute", rating: 3.7, img: "Hos7.jpeg" },
    { name: "Sukoon Hospital", rating: 3.6, img: "Hos8.jpeg" },
  ];

  return (
    <section className="py-20 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 border-l-4 border-teal-500 pl-4">Connected Network Hospitals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitals.map((hos, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all border border-slate-100">
              <div className="h-40 rounded-lg overflow-hidden mb-3">
                {/* Ensure image sizing is controlled by the parent div */}
                <img src={hos.img} alt={hos.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-slate-800 truncate">{hos.name}</h4>
              <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="text-slate-600 font-semibold">{hos.rating}</span>
              </div>
              <a href="#" className="text-xs text-teal-600 font-bold mt-3 block hover:underline uppercase tracking-wide">View Location</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 9. STORIES SECTION (Renumbered) ---
const StoriesSection = () => {
  const [activeStory, setActiveStory] = useState(null);

  const stories = [
    { title: "Miraculous Recovery: Brain Aneurysm", img: "card1.jpg", desc: "Mrs. Priya Verma's life-saving journey through our advanced Neuro-ICU intervention." },
    { title: "Victory Over Sepsis", img: "card2.jpg", desc: "How 55-year-old Mr. Patel fought a critical infection with our dedicated intensive care team." },
    { title: "Triumph Over Multi-Organ Failure", img: "card3.jpg", desc: "Mrs. Shalini Rao's incredible recovery powered by advanced dialysis and teamwork." },
  ];

  return (
    <section className="py-20 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-slate-900 mb-12">Real Stories, Real <span className="text-teal-600">Hope</span></h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[400px]" onClick={() => setActiveStory(activeStory === idx ? null : idx)}>
              {/* Ensure image sizing is controlled by the parent div */}
              <img src={story.img} alt={story.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-2 leading-tight">{story.title}</h3>
                <div className={`overflow-hidden transition-all duration-500 ${activeStory === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100'}`}>
                  <p className="text-slate-300 text-sm mb-4">
                    {/* Placeholder for full story text when expanded */}
                    {story.desc}
                    {activeStory === idx && (
                      <>
                        <br/>
                        <span className='text-xs font-light mt-1'> (Full story content for this entry would typically appear here) </span>
                      </>
                    )}
                  </p>
                  <span className="text-teal-400 text-sm font-bold flex items-center gap-1">Read Full Story <ArrowRight size={14}/></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 10. FOOTER COMPONENT (Renumbered) ---
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 relative z-10 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b-2 border-teal-500 inline-block pb-1">Patients</h4>
            <ul className="space-y-2 text-sm">
              {['Find a Doctor', 'Book Appointment', 'Emergency 24x7', 'Health Checkups', 'Lab Reports'].map((item, i) => (
                <li key={i}><a href="#" className="hover:text-teal-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
           {/* Column 2 */}
           <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b-2 border-teal-500 inline-block pb-1">International</h4>
            <ul className="space-y-2 text-sm">
              {['Request Appointment', 'Get Opinion', 'Medical Visa', 'Plan Your Trip'].map((item, i) => (
                <li key={i}><a href="#" className="hover:text-teal-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
           {/* Column 3 */}
           <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b-2 border-teal-500 inline-block pb-1">Academics</h4>
            <ul className="space-y-2 text-sm">
              {['Fellowship Programs', 'DNB Programs', 'Nursing College', 'Research', 'Our Alumni'].map((item, i) => (
                <li key={i}><a href="#" className="hover:text-teal-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          {/* Column 4: Social & App */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b-2 border-teal-500 inline-block pb-1">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-white hover:text-blue-500"><Facebook size={24} /></a>
              <a href="#" className="text-white hover:text-blue-400"><Linkedin size={24} /></a>
              <a href="#" className="text-white hover:text-pink-500"><Instagram size={24} /></a>
              <a href="#" className="text-white hover:text-red-500"><Youtube size={24} /></a>
            </div>
            <p className="text-xs text-slate-500 mb-2">Download our App</p>
            <div className="flex gap-2">
               <div className="h-8 w-24 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-slate-700">Google Play</div>
               <div className="h-8 w-24 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-slate-700">App Store</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p className="mb-2">Advisory: Please beware of fraudulent websites or calls asking for payments. Arogyam Healthcare never charges for job applications.</p>
          <div className="flex justify-center gap-4 mb-4">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <span>|</span>
             <a href="#" className="hover:text-white">Disclaimer</a>
             <span>|</span>
             <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p>© 2024 Arogyam Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- 11. FLOATING SPLINE CHATBOT (REMOVED) ---
// This function is no longer needed as the component is handled by the main App logic.

// --- 12. MAIN APP COMPONENT (Renumbered) ---
const ArogyamHealthcare = () => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="font-sans text-slate-800 bg-slate-50">
      <ScrollbarStyle /> 
      
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content Container (scrollable) */}
      <div className="relative z-10">
        <Navbar toggleEmergency={() => setIsEmergencyOpen(!isEmergencyOpen)} />
        
        <EmergencyWidget isOpen={isEmergencyOpen} toggle={() => setIsEmergencyOpen(false)} />
        
        <HeroSection />
        
        <AboutSection />
        
        {/* NOTE: Passing navigate to FacilitiesSection in case you add a button there later */}
        <FacilitiesSection navigate={navigate} />

        {/* AI CALLOUT SECTION: Button connects to /callbot route */}
        <AICalloutSection navigate={navigate} /> 
        
        <DoctorsSection />
        
        <HospitalsSection />
        
        <StoriesSection />
        
        <Footer />
        
        {/* The FloatingSpline component is removed entirely to fix compilation */}
      </div>
    </div>
  );
};

export default ArogyamHealthcare;