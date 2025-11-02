import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion'; // 1. Import motion

// 2. Define variants
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      duration: 0.5
    }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const Membership = () => {
  return (
    // <Layout>
    // 3. Page fade-in transition
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section 
          className="bg-cover bg-center py-20" 
          style={{
            backgroundImage: "linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url('https://assets.reface.ai/refaces/images/22379374_9855325_2.jpeg')"
          }}
        >
          <div className="container mx-auto px-6 text-center">
            {/* 4. Title fade-down */}
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Become a Member
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Join a distinguished community of pathologists dedicated to advancing the field.
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* 5. Section scroll-in animation */}
              <motion.div 
                className="mb-16"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Eligibility
                </h2>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark text-justify ">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Membership of the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India (SGIHPBPs) is open to medical professionals and scientists who have a significant interest and are actively involved in the field of gastrointestinal and hepato-pancreatobiliary pathology. Applicants should hold a postgraduate medical degree (MD/DNB) in Pathology or an equivalent qualification recognized by the Medical Council of India. Membership is also available to scientists with a Ph.D. or equivalent degree working in a relevant field. All applications are subject to review and approval by the governing body of the society.
                  </p>
                </div>
              </motion.div>

              {/* Section scroll-in animation */}
              <motion.div 
                className="mb-16"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Membership Types & Fees
                </h2>
                {/* 6. Stagger container for the two cards */}
                <motion.div 
                  className="grid md:grid-cols-2 gap-8"
                  variants={cardContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  
                  {/* Stagger item */}
                  <motion.div 
                    className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark flex flex-col"
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.03 }}
                  >
                    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                      Life Membership
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-justify">
                      A one-time fee for lifetime access to all member benefits, publications, and events at a reduced rate.
                    </p>
                    <div className="mt-auto">
                      <p className="text-3xl font-bold text-text-light dark:text-heading-dark">₹10,000</p>
                      <p className="text-gray-500 dark:text-gray-500">One-Time Payment</p>
                    </div>
                  </motion.div>

                  {/* Stagger item */}
                  <motion.div 
                    className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark flex flex-col"
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.03 }}
                  >
                    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                      Ad Hoc Membership
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-justify">
                      A temporary membership for specific events or a limited duration, ideal for trainees and international delegates.
                    </p>
                    <div className="mt-auto">
                      <p className="text-3xl font-bold text-text-light dark:text-heading-dark">₹2,000</p>
                      <p className="text-gray-500 dark:text-gray-500">Per Year</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Section scroll-in animation */}
              <motion.div 
                className="mb-16"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Membership Benefits
                </h2>
                <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-primary mt-1 mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Access to exclusive academic resources and publications.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-primary mt-1 mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Discounted registration fees for conferences, workshops, and events.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-primary mt-1 mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Networking opportunities with leading experts and peers in the field.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-primary mt-1 mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Eligibility to apply for society grants, awards, and fellowships.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-primary mt-1 mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Subscription to the official journal of the society.
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* 7. Animated button */}
              <motion.div 
                className="text-center"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.a 
                  className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-lg text-lg transition-opacity duration-300" 
                  href="#application-form"
                  whileHover={{ scale: 1.05, y: -2, opacity: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
    // </Layout>
  );
};

export default Membership;