import { motion } from 'framer-motion';
import DrPujaSakhuja from '../assets/Dr-Puja-Sakhuja,-President.jpg';

const PresidentMessage = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
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
                                src={DrPujaSakhuja}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </div>
                        <div className="text-center sm:text-left pt-4">
                            <h2 className="text-3xl font-bold font-display text-primary dark:text-white">
                                Prof. Puja Sakhuja
                            </h2>
                            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mt-2">
                                President, SGIHPBPs of India
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
                            It gives me great pleasure to extend a warm welcome to all members and colleagues to the Society of Gastrointestinal and Hepatopancreatobiliary Pathologists (SGIHPBPs), of India. Our Society has been established with the vision of advancing the discipline of gastrointestinal and Hepatopancreatobiliary pathology in our country, a field that lies at the crossroads of clinical medicine, surgery, and research.
                        </p>
                        &nbsp;
                        <p>
                            Our foremost aim is to promote collaboration and translational research that bridges the gap between diagnostic pathology and clinical application, directly addressing real-world challenges and contributing to improved patient outcomes.
                        </p>
                        &nbsp;
                        <p>
                            We are equally committed to capacity building and education through multidisciplinary workshops, hands-on training programs, and academic meetings that foster learning and the exchange of expertise across institutions and experience levels.
                        </p>
                        &nbsp;
                        <p>
                            As a Society, we aspire to raise the standards of practice by integrating the latest scientific developments and technological innovations into routine diagnostic workflows. By doing so, we hope to create a dynamic platform that not only supports professional growth but also contributes meaningfully to the progress of gastrointestinal and HPB pathology in India.
                        </p>
                        &nbsp;
                        <p>
                            I invite all colleagues, trainees, and allied specialists to actively participate in this collective endeavour to learn, collaborate, and contribute towards shaping the future of our specialty. Together, we can strengthen our community and make a lasting impact on patient care and scientific advancement.
                        </p>
                        &nbsp;
                        <p>
                            <strong>Prof. Puja Sakhuja</strong><br />
                            President,<br />
                            SGIHPBPs of India
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.main>
    );
};

export default PresidentMessage;
