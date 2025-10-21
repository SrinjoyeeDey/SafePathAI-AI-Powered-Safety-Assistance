"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "../context/LocationContext";
import UserLocation from "../components/Dashboard/UserLocation";
import SummaryCards from "../components/SummaryCards";
import LocationPermissionModal from "../components/LocationPermissionModal";
import { ChartCard, SmallLineChart, SmallBarChart, SmallPieChart } from '../components/Analytics/ChartCard';
import FAQSection from "../components/FAQSection";
import {
  FaStar,
  FaMapMarkedAlt,
  FaExclamationTriangle,
  FaBrain,
  FaInfoCircle
} from "react-icons/fa";


import Map from "../components/Map";
import EmergencySiren from "../components/EmergencySiren";
import EmergencyFab from '../components/EmergencyFab';

interface SafeZone {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "hospital" | "police" | "pharmacy";
  isFavorite: boolean;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { showLocationModal, setShowLocationModal } = useLocation();

  useEffect(() => {
    document.title = "Dashboard | SafePathAI";
  }, []);

  // Redirect to login if not authenticated
  if (!user) {
    return null; // Will be handled by ProtectedRoute wrapper
  }

  const [locations, setLocations] = useState<SafeZone[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Summary data for cards
  const [summaryData] = useState({
    alertsCount: 3,
    savedPlacesCount: locations.filter(loc => loc.isFavorite).length,
    aiSuggestionsCount: 5,
    emergencyContactsCount: 4
  });

  const toggleFavorite = (id: number) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, isFavorite: !loc.isFavorite } : loc
      )
    );
  };

  return (
    <>
      <LocationPermissionModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <FaMapMarkedAlt className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-14">
              Monitor your safety metrics and manage locations
            </p>
          </div>

          {/* Summary Cards Section */}
          <SummaryCards
            alertsCount={summaryData.alertsCount}
            savedPlacesCount={summaryData.savedPlacesCount}
            aiSuggestionsCount={summaryData.aiSuggestionsCount}
            emergencyContactsCount={summaryData.emergencyContactsCount}
          />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Map Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="relative h-96">
              <div 
                className={`h-96 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                {/* <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-bounce-slow">
                  <FaMapMarkedAlt className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  🗺️ Interactive Map
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-md">
                  Real-time location tracking and safety zone visualization will appear here
                </p> */}
                <Map />
              </div>
              <EmergencyFab />
              </div>
          
              {/* AI Suggestions Section */}
              <div 
                className={`mt-6 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FaBrain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Recent AI Suggestions
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {[
                    { text: "Avoid Main Street due to high traffic", type: "warning" },
                    { text: "Safer route via Park Avenue available", type: "success" },
                    { text: "Well-lit path recommended for evening", type: "info" }
                  ].map((suggestion, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 transform hover:scale-[1.02] ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${300 + idx * 100}ms` }}
                    >
                      <FaInfoCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        suggestion.type === "warning" ? "text-orange-500" :
                        suggestion.type === "success" ? "text-green-500" :
                        "text-blue-500"
                      }`} />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {suggestion.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              {/* User Location Component */}
              <div 
                className={`p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <UserLocation />
              </div>

              {/* Nearby Safe Locations */}
              <div 
                className={`p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '250ms' }}
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center space-x-2">
                  <FaStar className="w-5 h-5 text-yellow-500" />
                  <span>Nearby Safe Locations</span>
                </h2>
                
                <ul className="space-y-3">
                  {locations.map((loc, idx) => (
                    <li
                      key={loc.id}
                      className={`p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl flex justify-between items-center hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 group transform hover:scale-[1.02] ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${350 + idx * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-200">
                          <FaMapMarkedAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {loc.name}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(loc.id)}
                        className={`text-2xl transition-all duration-300 hover:scale-125 ${
                          loc.isFavorite ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        ⭐
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Button */}
              <Link to="/emergency">
                <button 
                  className={`w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform flex items-center justify-center space-x-3 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '350ms' }}
                >
                  <FaExclamationTriangle className="w-5 h-5 animate-pulse" />
                  <span>Emergency SOS</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="mt-8">
            <div 
              className={`flex items-center justify-between mb-4 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Analytics Overview</h2>
              <Link to="/analytics" className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">View More Analytics</Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div 
                className={`transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <ChartCard title="Alerts This Week">
                  <SmallLineChart data={[{name:'Mon',alerts:3},{name:'Tue',alerts:5},{name:'Wed',alerts:4},{name:'Thu',alerts:6},{name:'Fri',alerts:2},{name:'Sat',alerts:1},{name:'Sun',alerts:2}]} dataKey="alerts" />
                </ChartCard>
              </div>

              <div 
                className={`transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '550ms' }}
              >
                <ChartCard title="Top Locations">
                  <SmallBarChart data={[{name:'Main St',value:10},{name:'Central',value:8},{name:'Park',value:5}]} dataKey="value" />
                </ChartCard>
              </div>

              <div 
                className={`transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '650ms' }}
              >
                <ChartCard title="Alert Types">
                  <SmallPieChart data={[{name:'Accident',value:10},{name:'Medical',value:6},{name:'Other',value:3}]} />
                </ChartCard>
              </div>
            </div>
          </div>

          {/* Add custom animation styles */}
          <style>{`
            @keyframes bounce-slow {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            .animate-bounce-slow {
              animation: bounce-slow 3s ease-in-out infinite;
            }
          `}</style>
                    
          {/* Floating Emergency Siren Button */}
          <EmergencySiren 
            integrateWithSOS={true}
            size="medium"
            floating={true}
          />
        </div>

        {/* FAQ and Q&A Section*/}
        <div className="mt-18">
          <FAQSection />
        </div>
      </div>
    </>
  );
}
