const PresidentSection = ({ setCurrentPage }) => {
  return (
    <section className="py-16 lg:py-24 bg-background-light dark:bg-primary">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-12">
          <div className="md:w-1/3 text-center">
            <img 
              className="w-64 h-64 rounded-full mx-auto object-contain border-4 border-gold-DEFAULT shadow-xl" 
              // src={DrPujaSakhuja}
            />
            <h3 className="font-display text-2xl font-bold text-primary dark:text-white mt-6">
              Prof Puja Sakhuja
            </h3>
            <p className="text-gold-DEFAULT dark:text-gold-light font-semibold">
              President, SGIHPBPs
            </p>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              Message from the President
            </h2>
            <div className="w-24 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
              "It gives me great pleasure to extend a warm welcome to all members and colleagues to the Society of Gastrointestinal and Hepatopancreatobiliary Pathologists (SGIHPBPs), of India. Our Society has been established with the vision of advancing the discipline of gastrointestinal and Hepatopancreatobiliary pathology in our country, a field that lies at the crossroads of clinical medicine, surgery, and research."
            </p>
            <a 
              className="inline-block text-primary font-bold py-3 px-8 rounded bg-yellow-500 dark:hover:bg-gold-light transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('president-message'); }}
            >
              Read Full Message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PresidentSection