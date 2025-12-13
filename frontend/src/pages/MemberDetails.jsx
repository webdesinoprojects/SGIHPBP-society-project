import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'Life', 'Founder', 'Ad Hoc', 'Associate'];

const MembersDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // PASTE YOUR DEPLOYED GOOGLE SCRIPT URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  // Fetch Data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?t=${new Date().getTime()}`, {
          method: "POST",
          body: JSON.stringify({ action: "get_members" })
        });
        const data = await response.json();
        if (data.result === 'success') {
          setMembers(data.members);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Filter Logic
  const filteredMembers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return members.filter(member => {
      // Search across useful fields
      const searchMatch = 
        (member.name || "").toLowerCase().includes(lowerSearch) ||
        (member.memberId || "").toLowerCase().includes(lowerSearch) ||
        (member.institute || "").toLowerCase().includes(lowerSearch) ||
        (member.email || "").toLowerCase().includes(lowerSearch) ||
        (member.phone || "").toString().includes(lowerSearch);
      
      // Category Filter
      let categoryMatch = true;
      if (selectedCategory !== 'All') {
         categoryMatch = (member.category || "").toLowerCase().includes(selectedCategory.toLowerCase());
      }
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory, members]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <section className="bg-primary text-white py-12 text-center">
        <h1 className="text-3xl font-bold font-display">Member Directory</h1>
        <p className="opacity-90">Official Registry of SGIHPBPs Members</p>
      </section>

      <section className="container mx-auto px-4 py-12">
        
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
           <div className="relative w-full lg:w-2/4">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input 
               type="text" 
               placeholder="Search Name, ID, Mobile, Email..." 
               value={searchTerm} 
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full p-3 pl-10 border rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none shadow-sm"
             />
           </div>

           <div className="flex gap-2 flex-wrap justify-center">
             {categories.map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wide transition-colors ${
                   selectedCategory === cat 
                   ? 'bg-primary text-white shadow-md' 
                   : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        {/* --- THE TABLE --- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              {/* Table Head */}
              <thead className="bg-primary text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[60px]">Serial No</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[150px]">Name</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[100px]">Fee Paid</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[120px]">Membership ID</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[150px]">Address</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[150px]">Institute</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[150px]">Email</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[100px]">Mobile</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[120px]">Transaction Details</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[140px]">Category</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[120px]">Qualification</th>
                  <th className="px-4 py-4 border-b border-gray-600 min-w-[200px]">Interest</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="12" className="px-6 py-16 text-center">
                       <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                         <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                         <span>Loading Directory Data...</span>
                       </div>
                    </td>
                  </tr>
                ) : filteredMembers.length > 0 ? (
                  filteredMembers.map((member, i) => (
                    <tr key={i} className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors even:bg-gray-50 dark:even:bg-gray-800/50">
                      <td className="px-4 py-3 font-mono text-gray-500 dark:text-gray-400 text-center">{member.serial || i + 1}</td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{member.name}</td>
                      <td className="px-4 py-3 text-green-600 font-medium">{member.amount}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
                          {member.memberId}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate" title={member.address}>
                        {member.address}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{member.institute}</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline text-xs">
                         <a href={`mailto:${member.email}`}>{member.email}</a>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{member.phone}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{member.transId}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                           {member.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{member.qualification}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs max-w-xs truncate" title={member.interest}>
                        {member.interest}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="px-6 py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/50">
                      <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
                      No authorized members found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer Note */}
          <div className="bg-gray-100 dark:bg-gray-900/50 px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {filteredMembers.length} Members</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">swipe</span> Scroll horizontally to view more columns</span>
          </div>
        </div>

      </section>
    </motion.main>
  );
};

export default MembersDetails;