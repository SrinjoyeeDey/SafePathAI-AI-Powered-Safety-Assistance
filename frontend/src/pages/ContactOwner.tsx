import React from 'react';
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactOwner: React.FC = () => {
  const email = '';
  const socials = {
    twitter: '',
    github: '',
    linkedin: '',
    whatsapp: '',
  };

  return (
    <div className="min-h-screen bg-background text-text dark:bg-gray-900 dark:text-white">
      {/* HERO */}
      <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">Hi, I'm Srinjoyee Dey</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-primary">🚀</span>
              Full Stack Developer | AI/ML Explorer | Open Source Contributor
            </p>

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-6">
              Currently leading the Bunkify organization and diving deep into AI/ML. Built a Fake News Prediction Model and several full-stack apps using Next.js, React and Node.js. Open to collaborations and contributions.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 w-full sm:w-auto justify-center lg:justify-start">
              <a href="#projects" className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-primary text-black px-5 py-3 rounded-md shadow-md hover:shadow-lg transition">View Projects</a>
              <a href="#contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-3 border border-gray-700 px-5 py-3 rounded-md hover:bg-gray-800 transition">Contact Me</a>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <a href={socials.github || 'https://github.com/SrinjoyeeDey'}  className="text-2xl hover:opacity-90"><FaGithub /></a>
              <a href={socials.linkedin || 'https://www.linkedin.com/in/srinjoyee-dey'} className="text-2xl hover:opacity-90"><FaLinkedin /></a>
              <a href={socials.twitter || 'https://x.com/Tinnii_dey'} className="text-2xl hover:opacity-90"><FaTwitter /></a>

            </div>
          </div>

          <div className="flex-shrink-0 mx-auto lg:mx-0 lg:order-none order-first lg:order-last">
            <div className="w-40 h-40 sm:w-48 md:w-56 rounded-full overflow-hidden flex items-center justify-center" style={{ boxShadow: '0 18px 40px rgba(2,6,23,0.6)' }}>
              <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full bg-gray-100 dark:bg-gray-700 border-4 border-primary flex items-center justify-center" style={{ boxShadow: '0 10px 30px rgba(50,205,50,0.12)' }}>
                {/* Placeholder avatar - replace with actual image when available */}
                <span className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-200">SD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3">Crafting digital experiences that blend innovation with purpose.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg transition-shadow duration-300 hover:shadow-[0_12px_35px_rgba(50,205,50,0.12)]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Bunkify</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Smart Attendance Tracker</p>
                </div>
                <div className="text-sm text-green-400">Active</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Leading development of a revolutionary attendance tracker & bunk planner for students. Built with Next.js and AI-powered insights.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Next.js</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">React</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">AI-Powered</span>
              </div>
              <div className="flex justify-end">
                <a className="px-4 py-2 bg-primary text-white rounded-md shadow-sm" href="#">View Project</a>
              </div>
            </article>

            <article className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg transition-shadow duration-300 hover:shadow-[0_12px_35px_rgba(50,205,50,0.12)]">
              <h3 className="text-xl font-semibold mb-1">Fake News Detection</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">AI/ML Model (95.28% accuracy)</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Built a machine learning model that detects fake news using Python, scikit-learn, and NLP techniques.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Python</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Scikit-learn</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">NLP</span>
              </div>
              <div className="flex justify-end">
                <a className="px-4 py-2 bg-primary text-white rounded-md shadow-sm" href="#">View Project</a>
              </div>
            </article>

            <article className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg transition-shadow duration-300 hover:shadow-[0_12px_35px_rgba(50,205,50,0.12)]">
              <h3 className="text-xl font-semibold mb-1">Aashayein</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">The Life Saviours</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Member & developer for college social club. Built and maintain this impactful website for a great cause.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Next.js</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">React</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Social Impact</span>
              </div>
              <div className="flex justify-end">
                <a className="px-4 py-2 bg-primary text-white rounded-md shadow-sm" href="#">View Project</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT FORM LAST */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <a href={email ? `mailto:${email}` : '#'} className="flex items-center gap-3 px-4 py-2 border rounded-md hover:shadow-lg transition-shadow duration-200" onClick={(e) => { if (!email) e.preventDefault(); }}>
                <FaEnvelope className="text-primary" /> <span>Email</span>
              </a>

              <a href={socials.twitter || 'https://x.com/Tinnii_dey'} className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaTwitter className="text-blue-400" /> <span>Twitter</span>
              </a>

              <a href={socials.github || 'https://github.com/SrinjoyeeDey'} className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaGithub /> <span>GitHub</span>
              </a>

              <a href={socials.linkedin || 'https://www.linkedin.com/in/srinjoyee-dey'}  className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaLinkedin className="text-blue-600" /> <span>LinkedIn</span>
              </a>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); }}>
              <input type="text" placeholder="Your name" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" required />
              <input type="email" placeholder="Your email" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" required />
              <textarea placeholder="Message" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" rows={4} required />
              <div className="flex justify-end">
                <button type="submit" className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-md">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactOwner;
