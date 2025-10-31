const PresidentMessage = () => {
    return (
        <main>
            <div className="container mx-auto px-4 lg:px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 pb-12 border-b border-border-light dark:border-border-dark">
                        <div className="flex-shrink-0">
                            <img
                                className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-gold"
                            // src={DrPujaSakhuja}
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
                    </div>

                    {/* Message Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none text-text-light dark:text-text-dark prose-headings:text-primary dark:prose-headings:text-white prose-headings:font-display">
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
                    </article>
                </div>
            </div>
        </main>
    );
};

export default PresidentMessage;
