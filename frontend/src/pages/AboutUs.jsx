const AboutUs = () => {
  return (
    // <Layout currentPage="About Us">
    <main className="container mx-auto px-6 py-12 md:py-20">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-accent-blue dark:text-white mb-4">
          About Us
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Understanding the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India
          (SGIHPBPs) - our purpose, goals, and guiding principles.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-12">
          {/* Our Mission */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
             Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients. We are also committed to promoting public education and awareness, including the integration of wellness practices like Yoga, to benefit the broader community.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
             Our vision is to create a future where knowledge and understanding of Gastrointestinal and Hepatobiliary disorders are widespread, and where patients receive the highest quality care through a well-trained and informed network of professionals. We aim to build strong collaborations with national and international organizations, facilitate innovative research, and develop infrastructure to support our objectives. By nurturing emerging talents and continuously improving educational standards, we aspire to be a leading force in enhancing healthcare outcomes and supporting communities during times of need.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Our Role */}
          <div className="bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold font-display text-accent-blue dark:text-white mb-4">
              Our Role
            </h2>
            <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              <p><b>As the national representative for gastrointestinal and Hepatopancreatobiliary pathologists, in India, SGIHPBPs role is:</b></p>
              <ul>
                &nbsp;
                <li>• Train and educate anatomic pathologists in this evolving field of pathology</li>
                <li>• Provide a platform for national and international professionals working in this field to come together to update knowledge and skills, exchange ideas and network, and learn about latest innovations and developments.</li>
                <li>• Facilitating training and research in collaboration with eminent international societies to encourage young anatomic pathologists to work in this field.</li>
                <li>• To collaborate and work together with international societies of gastroenterology, hepatology, gastrointestinal pathology and Hepatopancreatobiliary pathology in the best possible manner.</li>
              </ul>

            </div>
          </div>

          {/* Our Constitution */}
          <div className="bg-accent-blue dark:bg-secondary-dark p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Our Constitution
            </h2>
            <p className="text-base text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              The constitution of the SGIHPBPs of India outlines the framework, rules, and regulations
              that govern our society. It details our objectives, membership criteria, governance structure,
              and the responsibilities of our office-bearers. We encourage all members and prospective
              members to familiarize themselves with this important document.
            </p>
            <button 
              className="inline-flex items-center justify-center px-8 py-3 text-accent-blue font-bold rounded-md bg-[#D4AF37] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'http://localhost:4000/api/constitution/download';
                link.click();
              }}
            >
              <span className="material-icons mr-2">download</span>
              Download Constitution
            </button>
          </div>
        </div>
      </div>
    </main>
    // </Layout>
  );
};

export default AboutUs;