import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Users, Bot, X, Phone } from 'lucide-react';

// --- Message Modal Component (Replacement for alert/confirm) ---
const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null;

    const typeClasses = {
        success: "bg-green-600 border-green-800",
        error: "bg-red-600 border-red-800",
        warning: "bg-yellow-600 border-yellow-800",
        info: "bg-blue-600 border-blue-800"
    };

    const icon = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`w-full max-w-sm p-6 rounded-xl shadow-2xl text-white ${typeClasses[type]} border-t-8`}
            >
                <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold">{icon[type]} Notification</h4>
                    <button onClick={onClose} className="text-white hover:opacity-75 transition-opacity">
                        <X size={20} />
                    </button>
                </div>
                <p className="mb-6">{message}</p>
                <button 
                    onClick={onClose} 
                    className="w-full bg-white text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

const CallBotPage = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalState, setModalState] = useState({ message: null, type: 'info' });

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // numeric only
    setPhoneNumber(value);
  };

  const handleStartCall = async () => {
    if (!phoneNumber) {
        setModalState({ message: "Please enter a phone number!", type: 'warning' });
        return;
    }

    const fullNumber = `${countryCode}${phoneNumber}`;
    try {
        const response = await fetch("https://etongue-mid-call.onrender.com/call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: fullNumber }),
        });

        if (response.ok) {
            setModalState({ message: `Call started successfully to: ${fullNumber}`, type: 'success' });
        } else {
            const err = await response.json();
            setModalState({ message: `Error: ${err.message || "Failed to start call. Ensure the number is correct."}`, type: 'error' });
        }
    } catch (error) {
        setModalState({ message: "Server not reachable or network error. Please try again later.", type: 'error' });
        console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('/callpageBG.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <MessageModal 
            message={modalState.message} 
            type={modalState.type} 
            onClose={() => setModalState({ message: null, type: 'info' })}
        />

        {/* semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 via-sky-950/80 to-black/90" />

        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 z-10">
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-500 drop-shadow-lg"
            >
                AI Voice Assistant for Health Queries
            </motion.h1>

            <p className="text-lg sm:text-xl text-sky-100 max-w-2xl mb-12">
                E-Tongue Call Assistant brings futuristic, AI-powered, human-like voice interactions directly to your phone for instant health advice and appointment booking.
            </p>

            {/* Input + Button Section */}
            <section className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg z-10">
                {/* Country Code Selector */}
                <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/80 text-gray-900 text-md font-medium border border-sky-300 focus:ring-2 focus:ring-sky-400"
                >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                </select>

                <motion.input
                    type="tel"
                    inputMode="numeric"
                    placeholder="📞 Enter your phone number"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.03 }}
                    className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-md
                            bg-white/80 backdrop-blur-md border border-sky-300
                            focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-600"
                />

                <motion.button
                    onClick={handleStartCall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl font-bold text-md text-white
                            bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700
                            shadow-md hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                    <Bot size={20} /> Start AI Call
                </motion.button>
            </section>
            <p className="text-sky-200 text-sm mt-4 italic max-w-md">
                Enter your number to receive an instant call from our AI Health Assistant. Standard calling rates may apply.
            </p>

        </section>

        {/* FEATURES */}
        <section className="py-24 px-6 bg-gradient-to-b from-sky-950/90 to-sky-800/90 relative z-10">
            <h2 className="text-4xl font-extrabold text-center mb-16 text-sky-300">
                Why Use Our Voice AI Health Assistant?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {[
                    { icon: <Zap size={40} className="text-sky-300" />, title: "Instant Response", desc: "Get answers to common health questions and first aid advice immediately, 24/7." },
                    { icon: <Shield size={40} className="text-sky-300" />, title: "Privacy Assured", desc: "All conversations are handled with the highest security and privacy standards." },
                    { icon: <Users size={40} className="text-sky-300" />, title: "Book Appointments", desc: "Seamlessly schedule consultations with specialists using simple voice commands." },
                    { icon: <Bot size={40} className="text-sky-300" />, title: "Human-Quality Voice", desc: "Powered by advanced neural voice AI for realistic and empathetic interactions." },
                ].map((f, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md border border-sky-700 hover:border-sky-300 transition-all"
                    >
                        <div className="mb-4 flex justify-center">{f.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-sky-50">{f.title}</h3>
                        <p className="text-sky-100 text-sm">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center bg-sky-900/80 backdrop-blur-xl z-10">
            <p className="text-sky-100">© 2025 Arogyam Healthcare AI Voice. Designed By 💙</p>
        </footer>
    </div>
  );
};

export default CallBotPage;