import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import DrPrasenjitDas from '../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';

const SecretaryMessage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="Secretary's Message" 
        description="Read the message from the Secretary General of SGIHPBP, Prof. Prasenjit Das."
        keywords="secretary message, SGIHPBP secretary, pathology society leadership"
      />
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 pb-12 border-b border-border-light dark:border-border-dark"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-shrink-0">
              <motion.img
                className="w-40 h-40 rounded-full object-contain shadow-lg border-4 border-gold"
                src={DrPrasenjitDas}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <div className="text-center sm:text-left pt-4">
              <h2 className="text-3xl font-bold font-display text-primary dark:text-white">
                Prof Prasenjit Das
              </h2>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mt-2">
                Secretary General, SGIHPBP's of India
              </p>
            </div>
          </motion.div>

          {/* Message Section */}
          <motion.div
            className="prose prose-lg max-w-none dark:prose-invert text-justify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>
              Dear Members and Colleagues,
            </p>
            &nbsp;

            <p>
              I am deeply honored to serve as the Secretary General of the Society of Gastrointestinal and Hepatopancreatobiliary Pathologist's of India (SGIHPBP's). I am committed to advancing our society in alignment with our core mission of training, collaboration, research, and academic excellence.
            </p>
            &nbsp;
            <p>
              This is a pivotal time for every anatomic pathologist to consider specializing and refining their skills and knowledge in specific areas of surgical pathology and cytopathology. In today's era of personalized medicine, it is essential not only to excel in anatomic pathology but also to embrace all facets of tissue and cellular pathology, including genomics, transcriptomics, and metabolomics. The integration of artificial intelligence will augment our capabilities, enhancing our performance and precision in the near future, and it is crucial that we incorporate these advancements into our daily practice.
            </p>
            &nbsp;
            <p>
              Together, I believe we can guide SGIHPBP's to the forefront of this transformation, fostering excellence in gastrointestinal and hepatopancreatobiliary pathology through our diverse activities. As we stand on the threshold of a new era in healthcare, I am truly excited about the opportunities that await our society.
            </p>
            &nbsp;
            <p>With warm regards,</p>
            &nbsp;
            <p>
              <strong>Prof Prasenjit Das</strong><br />
              Secretary General,<br />
              SGIHPBP's of India
            </p>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default SecretaryMessage;
