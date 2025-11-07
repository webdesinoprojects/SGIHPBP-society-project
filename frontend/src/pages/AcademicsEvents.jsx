import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import eventFlyer from '../assets/1st-Annual-CME-event.pdf';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};


const AcademicsEvents = () => {
  return (
    // <Layout>
    // Page fade-in transition
    <motion.main
      className="container mx-auto px-6 py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title fade-down */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white mb-4">
          Academics & Events
        </h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
        <p className="text-lg text-text-light dark:text-text-dark leading-relaxed text-justify">
          Stay informed about our upcoming CMEs, workshops, and conferences. The Society is committed to fostering
          continuous learning and professional development for all its members. Explore our calendar of events to find
          opportunities for networking, knowledge sharing, and advancing your expertise in the field of pathology.
        </p>
      </motion.div>

      {/* Stagger container */}
      <motion.div
        className="mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-md border border-border-light dark:border-border-dark divide-y divide-border-light dark:divide-border-dark overflow-hidden">

          {/* Stagger item - UPDATED FROM PDF */}
          <motion.div
            className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6"
            variants={itemVariants}
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-display font-bold text-primary dark:text-white mb-2">
                1st Annual CME of SGIHPBPs of India
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-text-light dark:text-text-dark">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-secondary mr-2 text-xl">calendar_month</span>
                  <span>February 27-28, 2026 (Workshop & CME)</span>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-secondary mr-2 text-xl">location_on</span>
                  <span>Auditorium, GB Pant Hospital GIPMER, New Delhi</span>
                </div>
              </div>
              <p className="text-sm text-text-light dark:text-text-dark mt-3">
                Early bird registration open until December 31, 2025.
              </p>
            </div>
            {/* Button Container */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 flex-shrink-0">

              {/* 1. NEW Download Flyer Button */}
              <motion.a
                className="bg-white border border-primary text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg transition-opacity duration-300 whitespace-nowrap text-center"
                href={eventFlyer} // Use the imported PDF
                download="SGIHPBPs_CME_2026_Flyer.pdf" // Sets the download filename
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.a>

              {/* 2. Existing Register Button (now centered) */}
              <motion.a
                className="bg-secondary text-primary font-bold py-3 px-8 rounded-full shadow-lg transition-opacity duration-300 whitespace-nowrap text-center"
                href="https://forms.gle/cA5SJdTV4QLrCQPj8"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.a>
            </div>
          </motion.div>

          {/* Stagger item - Placeholder for next event */}
          {/* <motion.div 
              className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6 opacity-60"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-display font-bold text-gray-500 dark:text-gray-400 mb-2">
                  Future Event Title
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">calendar_month</span>
                    <span>Date To Be Announced</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">location_on</span>
                    <span>Location To Be Announced</span>
                  </div>
                </div>
              </div>
              <button className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-bold py-3 px-8 rounded-full cursor-not-allowed whitespace-nowrap">
                Coming Soon
              </button>
            </motion.div> */}
        </div>
      </motion.div>
    </motion.main>
    // </Layout>
  );
};

export default AcademicsEvents;