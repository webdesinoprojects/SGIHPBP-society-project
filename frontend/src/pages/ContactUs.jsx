import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion'; // 1. Import motion

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
    address: '78, LD Block, PITAMPURA,\nNew Delhi-110034',
    phone: '+91 22 2417 7000',
    email: 'sgihpbpsindia2025@gmail.com'
  });

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

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      sent_time: new Date().toLocaleString()
    };

    emailjs.send(
      'service_bxrjafe',
      'template_t9rmf8l',
      templateParams,
      'lPdqKL7mHHgqGcUOS'
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      setSubmissionState({
        loading: false,
        success: true,
        error: null
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmissionState(prev => ({ ...prev, success: false }));
      }, 5000);

    }, (error) => {
      console.error('EmailJS Error:', error.text);
      console.error('FAILED...', error.text);
      setSubmissionState({
        loading: false,
        success: false,
        error: `Sorry, we couldn't send your message. Please try again later or email us directly at ${contactInfo.email}.`
      });
    });

  };

  return (
    // 2. Page fade-in transition
    <motion.main 
      className="flex-grow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-6">
        {/* 3. Title fade-down */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mt-2 text-accent dark:text-white">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
            We'd love to hear from you. Please fill out the form below to contact us, and we will
            get back to you as soon as possible.
          </p>
        </motion.div>

        {/* 4. Content fade-up */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
              {/* ... form fields ... */}
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
                  placeholder="Subject of your message"
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

              {/* 5. Animated submit button */}
              <motion.button
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent text-primary text-base font-bold tracking-wide hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={submissionState.loading}
                whileHover={!submissionState.loading ? { scale: 1.03 } : {}}
                whileTap={!submissionState.loading ? { scale: 0.98 } : {}}
              >
                {submissionState.loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    <span className="truncate">Sending...</span>
                  </>
                ) : (
                  <span className="truncate">Send Message</span>
                )}
              </motion.button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Our Address</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-accent text-xl mt-1">location_on</span>
                  <div className="flex flex-col">
                    <p className="font-semibold text-primary dark:text-white">{contactInfo.officeName}</p>
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.646195610842!2d77.1336480753443!3d28.6993186756281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e9c5654c6b%3A0x6bae810624c30ca!2s78%2C%20LD%20Block%2C%20Poorbi%20Pitampura%2C%20Pitam%20Pura%2C%20Delhi%2C%20110034!5e0!3m2!1sen!2sin!4v1730416719634!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-80 rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
    // </Layout>
  );
};

export default ContactUs;