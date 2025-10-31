const MissionSection = ({ setCurrentPage }) => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gold-DEFAULT mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients.
          </p>
          <a 
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentPage('about-us'); }}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

export default MissionSection