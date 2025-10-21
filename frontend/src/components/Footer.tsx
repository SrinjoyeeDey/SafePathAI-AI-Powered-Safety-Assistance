import React, { useState } from 'react';
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaUsers,
  FaHeart,
  FaArrowRight,
  FaPaperPlane
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleEmergencyClick = () => {
    // Emergency functionality
    alert('Emergency services contacted! Help is on the way.');
  };
  const handleContributorsClick = () => {
    // Navigate to contributors page
    window.open('https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance/graphs/contributors', '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 pt-16 pb-8 px-6 md:px-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SafePathAI
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-powered safety assistance providing real-time alerts, emergency response, 
              and intelligent guidance. Stay protected wherever your journey takes you.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Safety First Street, AI City 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FaPhone className="w-4 h-4" />
                <span>+1 (555) SAFE-AI1</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="w-4 h-4" />
                <span>help@safepath.ai</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Safety Features', href: '/features' },
                { name: 'Emergency', href: '/emergency' },
                { name: 'Favorites', href: '/favorites' },
                { name: 'Settings', href: '/settings' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 relative">
              Resources
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Help Center', href: '/help' },
                { name: 'Safety Tips', href: '/safety-tips' },
                { name: 'API Documentation', href: '/docs' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Accessibility', href: '/accessibility' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 relative">
              Stay Updated
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Get safety tips, feature updates, and emergency alerts delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
              
              {isSubscribed && (
                <div className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center space-x-2">
                  <FaHeart className="w-4 h-4" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>

            {/* Social Media Links */}
            <div className="pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Follow us:</p>
              <div className="flex space-x-3">
                {[
                  { icon: FaTwitter, href: 'https://x.com/Tinnii_dey', label: 'Twitter' },
                  { icon: FaGithub, href: 'https://github.com/SrinjoyeeDey', label: 'GitHub' },
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/srinjoyee-dey', label: 'LinkedIn' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Special Action Buttons */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Emergency Button */}
            <button
              onClick={handleEmergencyClick}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
            >
              <FaExclamationTriangle className="w-5 h-5 animate-pulse" />
              <span>Emergency Alert</span>
            </button>

            {/* Contributors Button */}
            <button
              onClick={handleContributorsClick}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              <FaUsers className="w-5 h-5" />
              <span>View Contributors</span>
              <FaHeart className="w-4 h-4 text-red-300" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start space-x-1">
                <span>© 2025 SafePathAI. Made with</span>
                <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>by</span>
                <a 
                  href="https://github.com/SrinjoyeeDey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors duration-300 font-medium"
                >
                  Srinjoyee Dey
                </a>
                <span>& the community</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300">
                Terms
              </a>
              <a href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;
