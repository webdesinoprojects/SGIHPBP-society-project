import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiClient, useAPI } from '../utils/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [contactInfo, setContactInfo] = useState({
    officeName: 'SGIHPBPs Registered Office',
    address: 'Department of Pathology, Tata Memorial Hospital, Parel, Mumbai, Maharashtra, 400012',
    phone: '+91 22 2417 7000',
    email: 'contact@sgihpbps.org'
  });

  const { handleAPIError } = useAPI();

  // Load dynamic contact information
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const [officeName, address, phone, email] = await Promise.all([
          apiClient.getContent('contact_office_name'),
          apiClient.getContent('contact_address'),
          apiClient.getContent('contact_phone'),
          apiClient.getContent('contact_email')
        ]);

        setContactInfo({
          officeName: officeName.value || contactInfo.officeName,
          address: address.value || contactInfo.address,
          phone: phone.value || contactInfo.phone,
          email: email.value || contactInfo.email
        });
      } catch (error) {
        console.warn('Failed to load contact info, using defaults:', error);
      }
    };

    loadContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionState({ loading: true, success: false, error: null });

    try {
      const response = await apiClient.submitContact(formData);
      
      setSubmissionState({ 
        loading: false, 
        success: true, 
        error: null 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmissionState(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setSubmissionState({ 
        loading: false, 
        success: false, 
        error: error.message 
      });
    }
  };

  return (
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-6">
          {/* Page Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mt-2 text-accent dark:text-white">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
              We'd love to hear from you. Please fill out the form below to contact us, and we will 
              get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-subtle-light dark:bg-subtle-dark p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Send Us a Message</h2>
              
              {/* Success Message */}
              {submissionState.success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 mr-3">check_circle</span>
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submissionState.error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 mr-3">error</span>
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      {submissionState.error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-sm font-medium pb-2 text-primary dark:text-slate-300">Full Name</p>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-accent/50 border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark h-26 placeholder:text-slate-400 dark:placeholder-slate-500 px-4 text-base font-normal" 
                      placeholder="John Doe" 
                      type="text"
                      required
                      disabled={submissionState.loading}
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-sm font-medium pb-2 text-primary dark:text-slate-300">Email Address</p>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-accent/50 border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-500 px-4 text-base font-normal" 
                      placeholder="you@example.com" 
                      type="email"
                      required
                      disabled={submissionState.loading}
                    />
                  </label>
                </div>

                {/* Subject */}
                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2 text-primary dark:text-slate-300">Subject</p>
                  <input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-accent/50 border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark h-26 placeholder:text-slate-400 dark:placeholder-slate-500 px-4 text-base font-normal" 
                    placeholder="Regarding Membership" 
                    type="text"
                    required
                    disabled={submissionState.loading}
                  />
                </label>

                {/* Message */}
                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2 text-primary dark:text-slate-300">Message</p>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-accent/50 border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark p-4 placeholder:text-slate-400 dark:placeholder-slate-500 text-base font-normal" 
                    placeholder="Write your message here..." 
                    rows="5"
                    required
                    disabled={submissionState.loading}
                  ></textarea>
                </label>

                {/* Submit Button */}
                <button 
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent text-primary text-base font-bold tracking-wide hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={submissionState.loading}
                >
                  {submissionState.loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                      <span className="truncate">Sending...</span>
                    </>
                  ) : (
                    <span className="truncate">Send Message</span>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Our Address</h2>
                <div className="space-y-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  <p className="font-semibold text-primary dark:text-white">{contactInfo.officeName}</p>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {contactInfo.address}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="material-symbols-outlined text-accent text-xl">phone</span>
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent text-xl">mail</span>
                    <span>{contactInfo.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                  <iframe 
                    allowFullScreen="" 
                    data-location="Mumbai" 
                    height="100%" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.100902888241!2d72.84411987588362!3d19.01543885361225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ceeb5c292f75%3A0x8a735b557c328905!2sTata%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1701072895513!5m2!1sen!2sin" 
                    style={{border:0}} 
                    width="100%"
                    className="w-full h-80 rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    // </Layout>
  );
};

export default ContactUs;