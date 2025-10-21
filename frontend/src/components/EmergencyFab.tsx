import React, { useState } from 'react';

const EmergencyFab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // This container holds the entire component and positions it.
    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 z-20">
      
      {/* Conditionally rendered menu */}
      {isOpen && (
        <div className="flex flex-col gap-2 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600">
          <button className="text-left w-full px-4 py-2 rounded-md font-medium text-text dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            Report Issue 📝
          </button>
          <button className="text-left w-full px-4 py-2 rounded-md font-medium text-text dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            Safe Route 🛣️
          </button>
          <button className="text-left w-full px-4 py-2 rounded-md font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50">
            Send SOS 🚨
          </button>
        </div>
      )}

      {/* The main Floating Action Button */}
      <button
        onClick={toggleMenu}
        className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-900"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

    </div>
  );
};

export default EmergencyFab;