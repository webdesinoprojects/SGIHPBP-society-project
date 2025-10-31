import DrPrasenjitDas from '../../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';

const SecretarySection = ({ setCurrentPage }) => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="md:w-1/3 text-center">
            <img
              className="w-64 h-64 rounded-full mx-auto object-contain border-4 border-gold-DEFAULT shadow-xl"
              src={DrPrasenjitDas}
            />
            <h3 className="font-display text-2xl font-bold text-primary dark:text-white mt-6">
              Prof Prasenjit Das
            </h3>
            <p className="text-gold-DEFAULT dark:text-gold-light font-semibold">
              Secretary General, SGIHPBPs
            </p>
          </div>

          <div className="md:w-2/3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              Message from the Secretary General
            </h2>
            <div className="w-24 h-1 bg-gold-DEFAULT mb-6"></div>
            <p>
              Dear Members and Colleagues,
            </p>
            &nbsp;
            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
              "I am deeply honored to serve as the Secretary General of the Society of Gastrointestinal and Hepatopancreatobiliary Pathologists of India (SGIHPBPs). I am committed to advancing our society in alignment with our core mission of training, collaboration, research, and academic excellence."
            </p>
            <a
              className="inline-block text-primary font-bold py-3 px-8 rounded bg-yellow-500 dark:hover:bg-gold-light transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('secretary-message'); }}
            >
              Read Full Message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecretarySection