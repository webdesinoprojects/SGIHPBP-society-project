import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentQR from '../assets/payment-qr.png';

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    action: 'register_event', 
    EventName: '1st Annual CME of SGIHPBPs', 
    Name: '',
    Institute: '',
    Designation: 'PG student',
    City: '',
    Mobile: '',
    Email: '',
    IsMember: 'No',
    RegType: 'Only Workshop 27 Feb 2026',
    PaymentMode: 'UPI',
    TransactionID: '',
    TransactionDate: '',
    screenshot: null
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({}); 

  // YOUR SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { 
        setErrors({ ...errors, screenshot: "File size must be less than 10MB" });
        e.target.value = ''; 
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, screenshot: { data: reader.result, type: file.type } });
        if (errors.screenshot) setErrors({ ...errors, screenshot: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.Name.trim()) { tempErrors.Name = "Name is required"; isValid = false; }
    if (!formData.Institute.trim()) { tempErrors.Institute = "Institute is required"; isValid = false; }
    if (!formData.City.trim()) { tempErrors.City = "City is required"; isValid = false; }
    
    // Validate Mobile (10 digits)
    if (!formData.Mobile.trim()) {
      tempErrors.Mobile = "Mobile is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.Mobile)) {
      tempErrors.Mobile = "Mobile must be 10 digits";
      isValid = false;
    }

    if (!formData.Email.trim()) { tempErrors.Email = "Email is required"; isValid = false; }
    if (!formData.TransactionID.trim()) { tempErrors.TransactionID = "Transaction ID is required"; isValid = false; }
    if (!formData.TransactionDate) { tempErrors.TransactionDate = "Transaction Date is required"; isValid = false; }
    if (!formData.screenshot) { tempErrors.screenshot = "Payment screenshot is required"; isValid = false; }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus('success');
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-secondary text-primary p-8 text-center">
          <h1 className="text-3xl font-bold font-display">1st Annual CME Registration</h1>
          <p className="mt-2 font-semibold">SGIHPBPs of India | Feb 27-28, 2026 | GB Pant Hospital GIPMER, New Delhi</p>
        </div>

        <div className="grid lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1 p-8 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-6 flex items-center">
              <span className="material-symbols-outlined mr-2">payments</span> Registration Fees
            </h3>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
               <div className="p-4 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500">
                 <p className="font-bold text-primary dark:text-white mb-2">Early Bird (Till 31 Dec 2025)</p>
                 <ul className="space-y-1">
                   <li><strong>Workshop Only:</strong> ₹2000 (For Members) / ₹2500 (Non-Members)</li>
                   <li><strong>CME Only:</strong> ₹2000 (For Members) / ₹2500 (Non-Members)</li>
                   <li><strong>Both:</strong> ₹3500 (For Members) / ₹4000 (Non-Members)</li>
                 </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500 text-center">
               <p className="font-bold text-left mb-2">Bank Transfer</p>
               <p className="text-xs text-left mb-4">
                 Account: SGIHPBPs<br/>Bank: Bank of Baroda<br/>A/c No: 26020100024967<br/>IFSC: BARB0RAMEEL (5th is Zero)
               </p>
               <img src={PaymentQR} className="w-32 h-32 mx-auto border rounded mb-2"/>
               <p className="text-xs">Scan to Pay</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Registration Submitted!</h3>
                <button onClick={() => window.location.reload()} className="mt-8 bg-secondary text-primary px-6 py-2 rounded font-bold">Register Another Person</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="form-input" />
                        {errors.Name && <p className="text-red-500 text-xs mt-1">{errors.Name}</p>}
                    </div>
                    <div>
                        <label className="form-label">Designation <span className="text-red-500">*</span></label>
                        <select name="Designation" value={formData.Designation} onChange={handleChange} className="form-input">
                            <option>PG student</option>
                            <option>Senior Resident / Fellow</option>
                            <option>Consultant/ Faculty</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="form-label">Institute Name <span className="text-red-500">*</span></label>
                        <input type="text" name="Institute" value={formData.Institute} onChange={handleChange} className="form-input" />
                        {errors.Institute && <p className="text-red-500 text-xs mt-1">{errors.Institute}</p>}
                    </div>
                    <div>
                        <label className="form-label">City <span className="text-red-500">*</span></label>
                        <input type="text" name="City" value={formData.City} onChange={handleChange} className="form-input" />
                        {errors.City && <p className="text-red-500 text-xs mt-1">{errors.City}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="tel" name="Mobile" value={formData.Mobile} onChange={handleChange} className="form-input" maxLength="10" />
                        {errors.Mobile && <p className="text-red-500 text-xs mt-1">{errors.Mobile}</p>}
                    </div>
                    <div>
                        <label className="form-label">Email ID <span className="text-red-500">*</span></label>
                        <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="form-input" />
                        {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email}</p>}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <label className="form-label mb-2">Are you a Member of SGIHPBPs? <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        <label className="flex items-center"><input type="radio" name="IsMember" value="Yes" checked={formData.IsMember === 'Yes'} onChange={handleChange} className="mr-2" /> Yes</label>
                        <label className="flex items-center"><input type="radio" name="IsMember" value="No" checked={formData.IsMember === 'No'} onChange={handleChange} className="mr-2" /> No</label>
                    </div>
                </div>

                <div>
                    <label className="form-label">Registration Category <span className="text-red-500">*</span></label>
                    <select name="RegType" value={formData.RegType} onChange={handleChange} className="form-input bg-yellow-50 dark:bg-gray-800 border-yellow-200">
                        <option value="Only Workshop 27 Feb 2026">Only Workshop 27 Feb</option>
                        <option value="Only CME 28 Feb 2026">Only CME 28 Feb</option>
                        <option value="Both Workshop+CME">Both Workshop+CME</option>
                    </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Transaction ID <span className="text-red-500">*</span></label>
                        <input type="text" name="TransactionID" value={formData.TransactionID} onChange={handleChange} className="form-input" />
                        {errors.TransactionID && <p className="text-red-500 text-xs mt-1">{errors.TransactionID}</p>}
                    </div>
                    <div>
                        <label className="form-label">Transaction Date <span className="text-red-500">*</span></label>
                        <input type="date" name="TransactionDate" value={formData.TransactionDate} onChange={handleChange} className="form-input" />
                        {errors.TransactionDate && <p className="text-red-500 text-xs mt-1">{errors.TransactionDate}</p>}
                    </div>
                </div>

                <div>
                    <label className="form-label">Payment Screenshot <span className="text-red-500">*</span></label>
                    <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-yellow-500"/>
                    {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
                </div>

                <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-colors shadow-lg disabled:opacity-50 text-lg mt-4">
                  {status === 'submitting' ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: #4B5563; margin-bottom: 0.25rem; }
        .dark .form-label { color: #D1D5DB; }
        .form-input { width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #D1D5DB; background-color: white; color: #111827; }
        .dark .form-input { background-color: #374151; border-color: #4B5563; color: white; }
      `}</style>
    </motion.div>
  );
};

export default EventRegistration;