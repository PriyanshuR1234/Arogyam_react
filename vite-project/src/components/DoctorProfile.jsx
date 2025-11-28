import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import {
    ArrowLeft, Calendar, Star, Award,
    Users, Clock, MapPin, Phone, Shield,
    Activity, CheckCircle
} from 'lucide-react';

const DoctorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const doctor = doctors.find(d => d.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
                <h2 className="text-3xl font-bold mb-4">Doctor Not Found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold"
                >
                    <ArrowLeft size={20} /> Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Navigation Bar (Simplified for Profile) */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-teal-400">
                            <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
                        </div>
                        <h1 className="text-xl font-serif font-bold text-slate-700">
                            Arogyam <span className="text-teal-500">Healthcare</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Back to List
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10 border border-slate-100">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/3 h-[400px] md:h-auto relative bg-slate-200">
                            <img
                                src={doctor.img}
                                alt={doctor.name}
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden"></div>
                            <div className="absolute bottom-4 left-4 text-white md:hidden">
                                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                                <p className="opacity-90">{doctor.dept}</p>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                            <div className="hidden md:block mb-6">
                                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
                                    {doctor.dept}
                                </span>
                                <h1 className="text-4xl font-bold text-slate-900 mb-2">{doctor.name}</h1>
                                <p className="text-xl text-slate-500 font-medium">{doctor.role}</p>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-8 border-y border-slate-100 py-6">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center gap-2 justify-center md:justify-start text-teal-600 mb-1">
                                        <Clock size={20} />
                                        <span className="font-bold text-2xl">{doctor.experience}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                                </div>
                                <div className="text-center md:text-left border-l border-slate-100 pl-4">
                                    <div className="flex items-center gap-2 justify-center md:justify-start text-blue-600 mb-1">
                                        <Users size={20} />
                                        <span className="font-bold text-2xl">{doctor.patients}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Happy Patients</p>
                                </div>
                                <div className="text-center md:text-left border-l border-slate-100 pl-4">
                                    <div className="flex items-center gap-2 justify-center md:justify-start text-yellow-500 mb-1">
                                        <Star size={20} fill="currentColor" />
                                        <span className="font-bold text-2xl">{doctor.successRate}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Success Rate</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2">
                                    <Calendar size={20} />
                                    Book Appointment
                                </button>
                                <button className="flex-1 bg-white border-2 border-slate-200 hover:border-teal-500 text-slate-700 hover:text-teal-600 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    <Phone size={20} />
                                    Contact Clinic
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: About & Education */}
                    <div className="md:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="text-teal-500" />
                                About {doctor.name}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {doctor.about}
                            </p>
                        </div>

                        {/* Expertise Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Shield className="text-teal-500" />
                                Areas of Expertise
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {doctor.expertise.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors">
                                        <CheckCircle className="text-teal-500 mt-0.5 flex-shrink-0" size={18} />
                                        <span className="font-medium text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Availability */}
                    <div className="space-y-8">
                        {/* Education & Awards */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Award className="text-yellow-500" />
                                Education & Awards
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Education</p>
                                    <p className="text-slate-700 font-medium">{doctor.education}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Awards & Recognition</p>
                                    <ul className="space-y-2 mt-2">
                                        {doctor.awards.map((award, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                                                {award}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Availability Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-teal-500 rounded-full opacity-20 blur-2xl"></div>

                            <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Clock className="text-teal-400" />
                                OPD Timings
                            </h4>
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-6">
                                <p className="text-teal-300 font-bold mb-1">Availability</p>
                                <p className="text-lg font-medium">{doctor.availability}</p>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-300 mb-6">
                                <MapPin className="flex-shrink-0 text-teal-400" size={18} />
                                <p>Room No. 12, Block B, Arogyam Healthcare Main Building</p>
                            </div>
                            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold transition-colors">
                                Check Slots
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorProfile;
