import DrPrasenjitDas from '../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';

const SecretaryMessage = () => {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 pb-12 border-b border-border-light dark:border-border-dark">
            <div className="flex-shrink-0">
              <img
                className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-gold"
                src={DrPrasenjitDas}
              />
            </div>
            <div className="text-center sm:text-left pt-4">
              <h2 className="text-3xl font-bold font-display text-primary dark:text-white">
                Prof Prasenjit Das
              </h2>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mt-2">
                Secretary General, SGIHPBPs of India
              </p>
            </div>
          </div>

          {/* Message Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-text-light dark:text-text-dark prose-headings:text-primary dark:prose-headings:text-white prose-headings:font-display">
            <p>
              Dear Members and Colleagues,
            </p>
            &nbsp;

            <p>
              I am deeply honored to serve as the Secretary General of the Society of Gastrointestinal and Hepatopancreatobiliary Pathologists of India (SGIHPBPs). I am committed to advancing our society in alignment with our core mission of training, collaboration, research, and academic excellence.
            </p>
            &nbsp;
            <p>
              This is a pivotal time for every anatomic pathologist to consider specializing and refining their skills and knowledge in specific areas of surgical pathology and cytopathology. In today's era of personalized medicine, it is essential not only to excel in anatomic pathology but also to embrace all facets of tissue and cellular pathology, including genomics, transcriptomics, and metabolomics. The integration of artificial intelligence will augment our capabilities, enhancing our performance and precision in the near future, and it is crucial that we incorporate these advancements into our daily practice.
            </p>
            &nbsp;
            <p>
              Together, I believe we can guide SGIHPBPs to the forefront of this transformation, fostering excellence in gastrointestinal and hepatopancreatobiliary pathology through our diverse activities. As we stand on the threshold of a new era in healthcare, I am truly excited about the opportunities that await our society.
            </p>
            &nbsp;
            <p>With warm regards,</p>
            &nbsp;
            <p>
              <strong>Prof Prasenjit Das</strong><br />
              Secretary General,<br />
              SGIHPBPs of India
            </p>
          </article>
        </div>
      </div>
    </main>
  );
};

export default SecretaryMessage;
