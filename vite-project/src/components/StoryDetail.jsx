import React, { useEffect, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stories } from '../data/stories';
import {
    ArrowLeft, ArrowRight, Activity, Heart, Shield,
    CheckCircle, Clock, Zap, User
} from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("StoryDetail Error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 p-10">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full overflow-auto border border-red-200">
                        <h3 className="font-bold text-red-600 mb-2">Error:</h3>
                        <pre className="text-sm bg-red-50 p-4 rounded mb-4 whitespace-pre-wrap">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h3 className="font-bold text-slate-700 mb-2">Component Stack:</h3>
                        <pre className="text-xs text-slate-500 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

const StoryDetailContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Safety check for stories data
    const storyList = Array.isArray(stories) ? stories : [];
    const story = storyList.find(s => s.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!story) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
                <h2 className="text-3xl font-bold mb-4">Story Not Found</h2>
                <p className="mb-4 text-red-500">Could not find story with ID: {id}</p>
                <p className="text-sm text-slate-400 mb-6">Available IDs: {storyList.map(s => s.id).join(', ')}</p>
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
                        <ArrowLeft size={18} /> Back to Stories
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10">
                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-slate-100">
                    <div className="relative h-[400px]">
                        <img
                            src={`/${story.img}`}
                            alt={story.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Story+Image' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse">
                                    Critical Case
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                    <User size={12} /> {story.patientName}, {story.age} yrs
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{story.title}</h1>
                            <p className="text-slate-200 text-lg md:text-xl max-w-3xl font-light">
                                {story.summary}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 gap-10">
                    {/* Main Content */}
                    <div className="md:col-span-8 space-y-10">
                        {/* The Incident */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                    <Activity size={24} />
                                </div>
                                The Incident
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                {story.fullStory}
                            </p>
                        </section>

                        {/* Medical Intervention */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Heart size={24} />
                                </div>
                                Medical Intervention
                            </h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                    {story.doctorContribution}
                                </p>
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <Shield size={18} className="text-teal-500" />
                                        Key Facilities Deployed
                                    </h4>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {story.facilitiesUsed && story.facilitiesUsed.map((facility, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-slate-600 font-medium">
                                                <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                                                {facility}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Arogyam Impact */}
                    <div className="md:col-span-4">
                        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-8 text-white shadow-2xl sticky top-28">
                            <div className="flex items-center gap-3 mb-6 border-b border-teal-500/50 pb-4">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Zap size={24} className="text-yellow-300" />
                                </div>
                                <h3 className="text-xl font-bold">The Arogyam Difference</h3>
                            </div>

                            <p className="text-teal-50 leading-relaxed mb-8 text-lg">
                                {story.arogyamImpact}
                            </p>

                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-6">
                                <div className="flex items-start gap-3">
                                    <Clock className="text-yellow-300 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-white text-sm">Rapid Connection</p>
                                        <p className="text-teal-100 text-xs mt-1">
                                            Our technology connects patients to the right specialist in minutes, not hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-white text-teal-800 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                                Download App <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Wrap the main component with ErrorBoundary
const StoryDetail = () => (
    <ErrorBoundary>
        <StoryDetailContent />
    </ErrorBoundary>
);

export default StoryDetail;
