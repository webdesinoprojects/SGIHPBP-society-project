import React from 'react';
import Layout from '../components/Layout';

const Membership = () => {
  return (
    // <Layout>
      <main>
        {/* Hero Section */}
        <section 
          className="bg-cover bg-center py-20" 
          style={{
            backgroundImage: "linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url('https://assets.reface.ai/refaces/images/22379374_9855325_2.jpeg')"
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Become a Member
            </h1>
            <p className="text-lg text-gray-200">
              Join a distinguished community of pathologists dedicated to advancing the field.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Eligibility Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Eligibility
                </h2>
                <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Membership of the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India (SGIHPBPs) is open to medical professionals and scientists who have a significant interest and are actively involved in the field of gastrointestinal and hepato-pancreatobiliary pathology. Applicants should hold a postgraduate medical degree (MD/DNB) in Pathology or an equivalent qualification recognized by the Medical Council of India. Membership is also available to scientists with a Ph.D. or equivalent degree working in a relevant field. All applications are subject to review and approval by the governing body of the society.
                  </p>
                </div>
              </div>

              {/* Membership Types & Fees Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Membership Types & Fees
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Life Membership Card */}
                  <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark flex flex-col">
                    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                      Life Membership
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                      A one-time fee for lifetime access to all member benefits, publications, and events at a reduced rate.
                    </p>
                    <div className="mt-auto">
                      <p className="text-3xl font-bold text-text-light dark:text-heading-dark">₹10,000</p>
                      <p className="text-gray-500 dark:text-gray-500">One-Time Payment</p>
                    </div>
                  </div>

                  {/* Ad Hoc Membership Card */}
                  <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark flex flex-col">
                    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                      Ad Hoc Membership
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                      A temporary membership for specific events or a limited duration, ideal for trainees and international delegates.
                    </p>
                    <div className="mt-auto">
                      <p className="text-3xl font-bold text-text-light dark:text-heading-dark">₹2,000</p>
                      <p className="text-gray-500 dark:text-gray-500">Per Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Benefits Section */}
              <div className="mb-16">
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
              </div>

              {/* Join Now Button */}
              <div className="text-center">
                <a 
                  className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-lg text-lg hover:opacity-90 transition-opacity duration-300" 
                  href="#application-form"
                >
                  Join Now
                </a>
              </div>

              {/* Membership Application Section */}
              <div className="mt-24 pt-16 border-t border-border-light dark:border-border-dark" id="application-form">
                <h2 className="text-3xl font-display font-bold text-text-light dark:text-heading-dark text-center mb-10">
                  Membership Application
                </h2>
                <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg border border-border-light dark:border-border-dark text-center">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    The online application form is currently under development.
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-500">
                    Please check back soon to apply for membership. We appreciate your patience.
                  </p>
                  <div className="mt-6">
                    <span className="material-symbols-outlined text-5xl text-primary animate-spin">
                      progress_activity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    // </Layout>
  );
};

export default Membership;