import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import {
    ArrowLeft, MapPin, Phone, Mail, Star,
    CheckCircle, Shield, Clock, Navigation
} from 'lucide-react';

const HospitalLocation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hospital = hospitals.find(h => h.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!hospital) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
                <h2 className="text-3xl font-bold mb-4">Hospital Not Found</h2>
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
            {/* Navigation Bar */}
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
                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10 border border-slate-100">
                    <div className="relative h-[300px] md:h-[400px]">
                        <img
                            src={`/${hospital.img}`}
                            alt={hospital.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            Network Hospital
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star size={16} fill="currentColor" />
                                            <span className="font-bold">{hospital.rating}</span>
                                        </div>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{hospital.name}</h1>
                                    <p className="text-slate-200 flex items-center gap-2 text-lg">
                                        <MapPin size={20} className="text-teal-400" />
                                        {hospital.address}
                                    </p>
                                </div>
                                <button className="bg-white text-slate-900 hover:bg-teal-50 px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
                                    <Navigation size={20} className="text-teal-600" />
                                    Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Facilities */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="text-teal-500" />
                                About the Hospital
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {hospital.description}
                            </p>
                        </div>

                        {/* Facilities Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="text-teal-500" />
                                Key Facilities
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {hospital.facilities.map((facility, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors">
                                        <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                                        <span className="font-medium text-slate-700">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map & Contact */}
                    <div className="space-y-8">
                        {/* Map Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="text-red-500" />
                                    Location Map
                                </h3>
                            </div>
                            <div className="h-[300px] w-full bg-slate-100 relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(hospital.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    title="Hospital Location"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                            <div className="p-4 bg-slate-50 text-xs text-slate-500 text-center">
                                *Map location is approximate based on the address.
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>

                            <h4 className="font-bold text-xl mb-6">Contact Information</h4>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <Phone className="text-teal-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Emergency / Enquiry</p>
                                        <p className="text-lg font-bold">{hospital.contact}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <Mail className="text-teal-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Email Address</p>
                                        <p className="text-lg font-bold">{hospital.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <Clock className="text-teal-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Opening Hours</p>
                                        <p className="text-lg font-bold">Open 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HospitalLocation;
