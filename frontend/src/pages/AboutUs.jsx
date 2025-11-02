import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.main 
      className="container mx-auto px-6 py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold font-display text-accent-blue dark:text-white mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Us
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Understanding the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India
          (SGIHPBPs) - our purpose, goals, and guiding principles.
        </motion.p>
      </div>

      {/* Main Content Sections - Swapped Layout */}
      <div className="space-y-12">

        {/* First Row: Mission & Role */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Our Mission */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm h-full flex flex-col">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
             Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients. We are also committed to promoting public education and awareness, including the integration of wellness practices like Yoga, to benefit the broader community.
            </p>
          </div>

          {/* Our Role (Moved Up) */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm h-full flex flex-col">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Role
            </h2>
            <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed ">
              <p><b>As the national representative for gastrointestinal and Hepatopancreatobiliary pathologists, in India, SGIHPBPs role is:</b></p>
              <ul className="text-justify">
                &nbsp;
                <li>• Train and educate anatomic pathologists in this evolving field of pathology</li>
                <li>• Provide a platform for national and international professionals working in this field to come together to update knowledge and skills, exchange ideas and network, and learn about latest innovations and developments.</li>
                <li>• Facilitating training and research in collaboration with eminent international societies to encourage young anatomic pathologists to work in this field.</li>
                <li>• To collaborate and work together with international societies of gastroenterology, hepatology, gastrointestinal pathology and Hepatopancreatobiliary pathology in the best possible manner.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Second Row: Objectives & Vision */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Our Vision (Moved Down) */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm h-full flex flex-col">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
             Our vision is to create a future where knowledge and understanding of Gastrointestinal and Hepatobiliary disorders are widespread, and where patients receive the highest quality care through a well-trained and informed network of professionals. We aim to build strong collaborations with national and international organizations, facilitate innovative research, and develop infrastructure to support our objectives. By nurturing emerging talents and continuously improving educational standards, we aspire to be a leading force in enhancing healthcare outcomes and supporting communities during times of need.
            </p>
          </div>
          
          {/* Our Constitution */}
          <div className="bg-accent-blue dark:bg-secondary-dark p-8 rounded-lg shadow-sm h-full flex flex-col">
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Our Constitution
            </h2>
            <p className="text-base text-gray-300 dark:text-gray-300 leading-relaxed text-justifymb-6">
              The constitution of the SGIHPBPs of India outlines the framework, rules, and regulations
              that govern our society. It details our objectives, membership criteria, governance structure,
              and the responsibilities of our office-bearers. We encourage all members and prospective
              members to familiarize themselves with this important document.
            </p>
            &nbsp;
            <motion.a 
              href="/constitution.pdf" 
              download="SGIHPBPs_Constitution.pdf"
              className="inline-flex items-center justify-center px-8 py-3 text-accent-blue font-bold rounded-md bg-[#D4AF37] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark mt-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-icons mr-2">download</span>
              Download Constitution
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}

export default AboutUs;