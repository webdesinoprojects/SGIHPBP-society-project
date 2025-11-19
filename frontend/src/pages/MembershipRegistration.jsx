import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentQR from '../assets/payment-qr.png'; // Ensure this image exists

const MembershipRegistration = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Institution: '', // "Institution & Country"
    Practicing: 'Yes', // "Are you a practicing Pathologist?"
    StudentStatus: '', // "PG student, PhD student or Fellow?"
    Address: '',
    Email: '',
    Phone: '',
    MembershipType: 'Life Membership',
    Amount: '10,000 INR',
    TransactionDetails: '', // "Transaction Details and date"
    Interest: 'I am a gastrointestinal & hepatopancreatobiliary pathologist', // Interest dropdown
    photo: null // Will hold the base64 string
  });

  const [status, setStatus] = useState(null);
  
  // PASTE YOUR NEW GOOGLE SCRIPT URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzxqhFFViFMnIy3bSgS3TOUCKj9Pn2L4q1TAw-8wr_wXEwFpq0fn8Kcx4VqQu9WV83/exec";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit
        alert("File size must be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: { data: reader.result, type: file.type } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // We use fetch to send the JSON data including the base64 photo
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      // Reset form
      setFormData({
        Name: '', Institution: '', Practicing: 'Yes', StudentStatus: '', Address: '', Email: '', Phone: '', MembershipType: 'Life Membership', Amount: '10,000 INR', TransactionDetails: '', Interest: 'I am a gastrointestinal & hepatopancreatobiliary pathologist', photo: null
      });
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        
        <div className="bg-primary text-white p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold font-display">Membership Form for the Society of Gastrointestinal & Hepatopancreatobiliary Pathologists, of India</h1>
          <p className="mt-2 opacity-90">Please complete all details below.</p>
        </div>

        <div className="grid lg:grid-cols-3">
          
          {/* LEFT SIDE: Bank Details (Takes up 1/3 on large screens) */}
          <div className="lg:col-span-1 p-8 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-6 flex items-center">
              <span className="material-symbols-outlined mr-2">payments</span>
              Payment Information
            </h3>
            
            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
               {/* Bank Details Card */}
              <div className="bg-white dark:bg-gray-600 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500">
                <h4 className="font-bold text-lg mb-3 text-primary dark:text-white border-b pb-2">Bank Transfer</h4>
                <div className="space-y-2">
                    <p><strong>Account Name:</strong> Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists</p>
                    <p><strong>Bank:</strong> Bank of Baroda</p>
                    <p><strong>Account No:</strong> 26020100024967</p>
                    <p><strong>IFSC Code:</strong> BARB0RAMEEL <br/><span className="text-xs text-red-500">(5th character is Zero)</span></p>
                    <p><strong>Branch:</strong> Dr. RML Hospital, New Delhi</p>
                </div>
              </div>

               {/* QR Code Card */}
              <div className="bg-white dark:bg-gray-600 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500 text-center">
                <h4 className="font-bold text-lg mb-3 text-primary dark:text-white border-b pb-2 text-left">Scan QR to Pay</h4>
                <img 
                  src={PaymentQR} 
                  alt="Payment QR Code" 
                  className="w-40 h-40 mx-auto object-contain border rounded-lg mb-2"
                  onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML+='<p class="text-red-500 text-xs">QR Code image not found</p>'}}
                />
                <p className="text-xs text-gray-500 dark:text-gray-300">Accepts UPI, GPay, Paytm, PhonePe</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-800 dark:text-blue-200 text-xs">
                  <strong>Note:</strong> Please complete your payment <strong>before</strong> filling this form. You will need the Transaction ID.
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Form (Takes up 2/3 on large screens) */}
          <div className="lg:col-span-2 p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Application Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We have received your application. An email has been automatically sent to the Secretary.
                </p>
                <p className="text-sm text-gray-500">You will also receive a copy of your response via email shortly.</p>
                <button onClick={() => setStatus(null)} className="mt-8 bg-primary text-white px-6 py-2 rounded font-bold hover:bg-blue-900">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Details */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Your Name <span className="text-red-500">*</span></label>
                        <input required type="text" name="Name" value={formData.Name} onChange={handleChange} className="form-input" />
                    </div>
                    <div>
                         <label className="form-label">Passport Size Photo (Max 1MB) <span className="text-red-500">*</span></label>
                         <input required type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    </div>
                </div>

                <div>
                    <label className="form-label">Institution & Country <span className="text-red-500">*</span></label>
                    <input required type="text" name="Institution" value={formData.Institution} onChange={handleChange} className="form-input" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Email ID <span className="text-red-500">*</span></label>
                        <input required type="email" name="Email" value={formData.Email} onChange={handleChange} className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Phone Number <span className="text-red-500">*</span></label>
                        <input required type="tel" name="Phone" value={formData.Phone} onChange={handleChange} className="form-input" />
                    </div>
                </div>

                <div>
                    <label className="form-label">Your Address <span className="text-red-500">*</span></label>
                    <textarea required name="Address" value={formData.Address} onChange={handleChange} rows="2" className="form-input"></textarea>
                </div>

                {/* Professional Status */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4 border border-gray-200 dark:border-gray-600">
                    <div>
                        <label className="form-label mb-2 block">Are you a practicing Pathologist? <span className="text-red-500">*</span></label>
                        <div className="flex gap-4">
                            <label className="flex items-center"><input type="radio" name="Practicing" value="Yes" checked={formData.Practicing === 'Yes'} onChange={handleChange} className="mr-2" /> Yes</label>
                            <label className="flex items-center"><input type="radio" name="Practicing" value="No" checked={formData.Practicing === 'No'} onChange={handleChange} className="mr-2" /> No</label>
                        </div>
                    </div>

                    <div>
                        <label className="form-label">If PG student, PhD student or Fellow, specify subspecialty:</label>
                        <input type="text" name="StudentStatus" value={formData.StudentStatus} onChange={handleChange} className="form-input" placeholder="e.g., 2nd Year PG, GI Pathology Fellow" />
                    </div>
                </div>

                {/* Membership Selection */}
                <div className="p-4 border-2 border-gold-DEFAULT/30 rounded-lg space-y-4 bg-yellow-50/50 dark:bg-gray-800">
                    <h4 className="font-bold text-primary dark:text-white border-b border-gold-DEFAULT/20 pb-2">Membership & Payment</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Membership Type <span className="text-red-500">*</span></label>
                            <select name="MembershipType" value={formData.MembershipType} onChange={handleChange} className="form-input">
                                <option>Life Membership</option>
                                <option>Ad Hoc Membership (For 3 years)</option>
                                <option>Associate Life Membership</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Amount Paid <span className="text-red-500">*</span></label>
                            <select name="Amount" value={formData.Amount} onChange={handleChange} className="form-input">
                                <option>10,000 INR</option>
                                <option>2,500 INR</option>
                                <option>300 USD</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Transaction Details & Date <span className="text-red-500">*</span></label>
                        <input required type="text" name="TransactionDetails" value={formData.TransactionDetails} onChange={handleChange} className="form-input" placeholder="e.g., UPI Ref: 1234567890, Date: 25/11/2025" />
                    </div>
                </div>

                {/* Interest */}
                <div>
                    <label className="form-label">How are you interested in GI & HPB Pathology? <span className="text-red-500">*</span></label>
                    <select name="Interest" value={formData.Interest} onChange={handleChange} className="form-input">
                        <option>I am a gastrointestinal & hepatopancreatobiliary pathologist</option>
                        <option>I am a PG student interested in this field of pathology</option>
                        <option>I am a Fellow/ PDCC in gastrointestinal & hepatopancreatobiliary pathology</option>
                        <option>I am a clinical gastroenterologist/ gastrointestinal surgeon/ radiologist</option>
                        <option>I am a researcher in this field</option>
                        <option>I am a pathologist who wants to be associated with this society to remain updated</option>
                    </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-colors shadow-lg disabled:opacity-50 text-lg"
                >
                  {status === 'submitting' ? 'Submitting Application...' : 'Submit Application'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* Style Helper */}
      <style>{`
        .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: #4B5563; margin-bottom: 0.25rem; }
        .dark .form-label { color: #D1D5DB; }
        .form-input { width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #D1D5DB; background-color: white; color: #111827; }
        .dark .form-input { background-color: #374151; border-color: #4B5563; color: white; }
        .form-input:focus { outline: none; ring: 2px solid #D4AF37; border-color: transparent; }
      `}</style>
    </motion.div>
  );
};

export default MembershipRegistration;