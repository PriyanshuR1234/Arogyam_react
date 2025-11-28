import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, MapPin, Calendar, Clock, ArrowLeft, X,
    CheckCircle, User, Stethoscope, Building2, ChevronRight
} from 'lucide-react';
import { doctors } from '../data/doctors';
import { hospitals } from '../data/hospitals';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    // Extract unique specialties
    const specialties = [...new Set(doctors.map(d => d.dept))];

    // Extract unique locations from hospitals
    const locations = [...new Set(hospitals.map(h => h.address.split(',').slice(-2).join(',').trim()))];

    // Filter doctors and hospitals based on search and filters
    useEffect(() => {
        let filtered = doctors;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(doc =>
                doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by specialty
        if (selectedSpecialty) {
            filtered = filtered.filter(doc => doc.dept === selectedSpecialty);
        }

        setFilteredDoctors(filtered);

        // Filter hospitals by location
        if (selectedLocation) {
            const filteredHosp = hospitals.filter(h =>
                h.address.toLowerCase().includes(selectedLocation.toLowerCase())
            );
            setFilteredHospitals(filteredHosp);
        } else {
            setFilteredHospitals(hospitals);
        }
    }, [searchQuery, selectedSpecialty, selectedLocation]);

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowBookingModal(true);
    };

    const confirmBooking = () => {
        if (selectedDate && selectedTime) {
            setShowBookingModal(false);
            setShowSuccessNotification(true);
            setTimeout(() => setShowSuccessNotification(false), 4000);

            // Reset form
            setSelectedDate('');
            setSelectedTime('');
        }
    };

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Success Notification */}
            {showSuccessNotification && (
                <div className="fixed top-6 right-6 z-[100] animate-slide-in-right">
                    <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-green-500 p-6 flex items-start gap-4 max-w-md">
                        <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 mb-1">Appointment Booked Successfully!</h4>
                            <p className="text-sm text-slate-600">
                                Your appointment with <span className="font-semibold">{selectedDoctor?.name}</span> is confirmed for {selectedDate} at {selectedTime}.
                            </p>
                        </div>
                        <button onClick={() => setShowSuccessNotification(false)}>
                            <X size={20} className="text-slate-400 hover:text-slate-600" />
                        </button>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-scale-in">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-t-3xl text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold">Book Appointment</h3>
                                    <p className="text-teal-100 mt-1">with {selectedDoctor?.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <img
                                    src={selectedDoctor?.img}
                                    alt={selectedDoctor?.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-slate-900">{selectedDoctor?.name}</h4>
                                    <p className="text-teal-600 text-sm">{selectedDoctor?.dept}</p>
                                    <p className="text-slate-500 text-xs">{selectedDoctor?.role}</p>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    <Calendar className="inline mr-2" size={16} />
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                                />
                            </div>

                            {/* Time Selection */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    <Clock className="inline mr-2" size={16} />
                                    Select Time Slot
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {timeSlots.map(slot => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedTime === slot
                                                    ? 'bg-teal-600 text-white shadow-lg'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <button
                                onClick={confirmBooking}
                                disabled={!selectedDate || !selectedTime}
                                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                Confirm Appointment
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200">
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
                        <ArrowLeft size={18} /> Back to Home
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                        Book Your <span className="text-teal-600">Appointment</span>
                    </h1>
                    <p className="text-slate-600 text-lg">Find the right specialist and schedule your visit in minutes</p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors appearance-none bg-white"
                            >
                                <option value="">All Locations</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Specialty Filter */}
                        <div className="relative">
                            <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                value={selectedSpecialty}
                                onChange={(e) => setSelectedSpecialty(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors appearance-none bg-white"
                            >
                                <option value="">All Specialties</option>
                                {specialties.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Doctors List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <User className="text-teal-600" size={28} />
                            Available Doctors ({filteredDoctors.length})
                        </h2>

                        {filteredDoctors.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl">
                                <p className="text-slate-400 text-lg">No doctors found matching your criteria</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredDoctors.map(doctor => (
                                    <div
                                        key={doctor.id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100"
                                    >
                                        <div className="flex gap-6">
                                            <img
                                                src={doctor.img}
                                                alt={doctor.name}
                                                className="h-24 w-24 rounded-xl object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                                                <p className="text-teal-600 font-medium mb-1">{doctor.dept}</p>
                                                <p className="text-slate-500 text-sm mb-3">{doctor.role}</p>
                                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                                    <span className="bg-blue-50 px-3 py-1 rounded-full">{doctor.experience}</span>
                                                    <span className="bg-green-50 px-3 py-1 rounded-full">{doctor.patients}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleBookAppointment(doctor)}
                                                className="self-center bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hospitals Sidebar */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Building2 className="text-teal-600" size={28} />
                            Nearby Hospitals
                        </h2>

                        <div className="space-y-4">
                            {filteredHospitals.slice(0, 4).map(hospital => (
                                <div
                                    key={hospital.id}
                                    className="bg-white rounded-xl shadow-md p-4 border border-slate-100 hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={hospital.img}
                                        alt={hospital.name}
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="font-bold text-slate-900 mb-1">{hospital.name}</h4>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                                        <span>★</span>
                                        <span className="text-slate-600 font-semibold">{hospital.rating}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/hospital/${hospital.id}`)}
                                        className="text-teal-600 text-sm font-bold hover:underline"
                                    >
                                        View Location →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes scale-in {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.4s ease-out;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default BookAppointment;
