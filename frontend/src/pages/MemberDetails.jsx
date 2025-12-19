import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Import MUI components
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const categories = ['All', 'Life', 'Founder', 'Ad Hoc', 'Associate'];
const ITEMS_PER_PAGE = 20;

const MembersDetails = () => {
  // === 1. URL PARAMETER HANDLING ===
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initial values from URL
  const initialQuery = searchParams.get('m_search') || '';
  const initialCat = searchParams.get('cat') || 'All';

  // Input State (What the user is typing/selecting)
  const [inputSearch, setInputSearch] = useState(initialQuery);
  const [inputCategory, setInputCategory] = useState(initialCat);

  // Active Filter State (What is actually being used to filter results)
  const [activeSearch, setActiveSearch] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCat);

  // Data State
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false); 
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Track if a search has been performed
  const [hasSearched, setHasSearched] = useState(!!initialQuery || initialCat !== 'All');

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  // === 2. DATA FETCHING (Server-Side) ===
  const fetchMembers = async (page, search, category) => {
    setLoading(true);
    
    // Prepare payload for server-side pagination
    const payload = {
        action: "get_members",
        page: page,
        limit: ITEMS_PER_PAGE,
        search: search,
        category: category === 'All' ? '' : category 
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (data.result === 'success') {
        setMembers(data.members || []);
        
        if (data.pagination) {
            setTotalPages(data.pagination.totalPages);
            setTotalItems(data.pagination.totalItems);
            setCurrentPage(data.pagination.currentPage);
        } else {
            setTotalPages(1);
            setTotalItems(data.members.length);
        }
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    if (hasSearched) {
        fetchMembers(1, initialQuery, initialCat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === 3. HANDLERS ===
  const handleSearch = () => {
    setActiveSearch(inputSearch);
    setActiveCategory(inputCategory);
    setHasSearched(true);
    setCurrentPage(1); 

    const params = {};
    if (inputSearch) params.m_search = inputSearch;
    if (inputCategory !== 'All') params.cat = inputCategory;
    setSearchParams(params);

    fetchMembers(1, inputSearch, inputCategory);
  };

  const handleClear = () => {
    setInputSearch('');
    setInputCategory('All');
    setActiveSearch('');
    setActiveCategory('All');
    setHasSearched(false);
    setSearchParams({});
    setCurrentPage(1);
    setMembers([]); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        fetchMembers(newPage, activeSearch, activeCategory);
        document.getElementById('results-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

   const getCityState = (address) => {
    if (!address) return "";
    const parts = address.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      return parts.slice(-2).join(', ');
    }
    return address;
  };


  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans"
    >
      {/* === HERO === */}
      <section className="bg-primary text-white pt-16 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Member Directory</h1>
          <p className="opacity-90 max-w-xl mx-auto text-sm md:text-base">
            Search the official registry of the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologist's of India.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        
        {/* === SEARCH PANEL === */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
           <div className="grid md:grid-cols-12 gap-4 items-end">
             
             {/* Search Input */}
             <div className="md:col-span-6 lg:col-span-7">
               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Search Keywords</label>
               <div className="relative group">
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                 <input 
                   type="text" 
                   placeholder="Name, Membership ID, Email, or Mobile..." 
                   value={inputSearch} 
                   onChange={(e) => setInputSearch(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                   className="w-full h-[56px] pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 dark:text-white"
                 />
                 {inputSearch && (
                   <button onClick={() => setInputSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                     <span className="material-symbols-outlined text-sm">cancel</span>
                   </button>
                 )}
               </div>
             </div>

             {/* MUI Select Dropdown */}
             <div className="md:col-span-4 lg:col-span-3">
               <FormControl fullWidth variant="outlined" className="bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                 <InputLabel id="category-select-label" className="dark:text-gray-400">Membership Category</InputLabel>
                 <Select
                   labelId="category-select-label"
                   id="category-select"
                   value={inputCategory}
                   onChange={(e) => setInputCategory(e.target.value)}
                   label="Membership Category"
                   className="dark:text-white h-[56px]"
                 >
                   {categories.map((cat) => (
                     <MenuItem key={cat} value={cat}>
                       {cat}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </div>

             {/* Search Button */}
             <div className="md:col-span-2 lg:col-span-2">
               <button 
                 onClick={handleSearch}
                 className="w-full h-[56px] bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                 Search
               </button>
             </div>
           </div>
           
           {/* Active Filter Status */}
           {hasSearched && (
             <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
               <div className="text-sm text-gray-600 dark:text-gray-300">
                 Results for <span className="font-bold text-primary dark:text-white">"{activeSearch || 'All'}"</span> in <span className="font-bold text-primary dark:text-white">{activeCategory}</span>
               </div>
               <button onClick={handleClear} className="text-sm text-red-500 hover:text-red-700 font-semibold flex items-center gap-1">
                 <span className="material-symbols-outlined text-sm">restart_alt</span> Reset Filters
               </button>
             </div>
           )}
        </div>

        {/* === RESULTS SECTION === */}
        <AnimatePresence mode='wait'>
          {!hasSearched ? (
            // EMPTY STATE
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 opacity-75"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-gray-400">person_search</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Search Directory</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm">
                Use the search box above to find members by name, ID, email, or phone number.
              </p>
            </motion.div>
          ) : (
            // DATA CONTAINER
            <motion.div 
              key="results"
              id="results-table"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">list_alt</span> Search Results
                </h3>
                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {loading ? 'Processing...' : `${totalItems} Members`}
                </span>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="md:hidden">
                {loading ? (
                  <div className="p-4 space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-40"></div>
                    ))}
                  </div>
                ) : members.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {members.map((member, i) => (
                      <div key={i} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        
                        {/* 1. Header: Name, ID, Category */}
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{member.name}</h4>
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded mt-1 inline-block">
                              {member.memberId}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                            (member.category || "").includes('Life')
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                          }`}>
                             {member.category}
                          </span>
                        </div>
                        
                        {/* 2. Details in a Single Grid */}
                        <div className="grid grid-cols-2 gap-x-1 gap-y-1 mt-4 text-sm text-gray-600 dark:text-gray-300">
                           
                           {/* Row 1, Col 1 */}
                           <div className="flex items-start gap-2 min-w-0">
                               <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5 flex-shrink-0">school</span>
                               <span className="font-medium break-words">{member.qualification || 'N/A'}</span>
                           </div>

                           {/* Row 1, Col 2 */}
                           <div className="flex items-start gap-2 min-w-0">
                                <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5 flex-shrink-0">mail</span>
                                {member.email ? (
                                  <a href={`mailto:${member.email}`} className="text-primary hover:underline break-all leading-tight">
                                    {member.email}
                                  </a>
                                ) : <span>-</span>}
                           </div>

                           {/* Row 2, Col 1 */}
                           {/* <div className="flex items-start gap-2 min-w-0">
                               <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5 flex-shrink-0">location_on</span>
                               <span className="leading-tight break-words">{getCityState(member.address) || 'Unknown'}</span>
                           </div> */}

                           {/* Row 2, Col 2 */}
                           <div className="flex items-start gap-2 min-w-0">
                                <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5 flex-shrink-0">call</span>
                                {member.phone ? (
                                  <a href={`tel:${member.phone}`} className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                                    {member.phone}
                                  </a>
                                ) : <span>-</span>}
                           </div>
                        </div>

                        {/* 3. Footer: Action Buttons */}
                        <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded transition-colors">
                              <span className="material-symbols-outlined text-sm">mail</span> Email
                            </a>
                          )}
                          {member.phone && (
                            <a href={`tel:${member.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded transition-colors">
                              <span className="material-symbols-outlined text-sm">call</span> Call
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">No members found.</div>
                )}
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4 border-b dark:border-gray-600">ID</th>
                      <th className="px-6 py-4 border-b dark:border-gray-600">Name</th>
                      <th className="px-6 py-4 border-b dark:border-gray-600">Qualification</th>
                      {/* <th className="px-6 py-4 border-b dark:border-gray-600">Location</th> */}
                      <th className="px-6 py-4 border-b dark:border-gray-600">Email</th>
                      <th className="px-6 py-4 border-b dark:border-gray-600">Phone</th>
                      <th className="px-6 py-4 border-b dark:border-gray-600 text-center">Category</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                          {/* <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td> */}
                          <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                          <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mx-auto"></div></td>
                        </tr>
                      ))
                    ) : members.length > 0 ? (
                      members.map((member, i) => (
                        <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs font-bold text-gray-500">
                            {member.memberId || <span className="text-gray-400">N/A</span>}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                            {member.name || <span className="text-gray-400">N/A</span>}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {member.qualification || <span className="text-gray-400">N/A</span>}
                          </td>
                          {/* <td className="px-6 py-4 text-gray-600 dark:text-gray-300"> */}
                            {/* <span className="flex items-center gap-1">
                               <span className="material-symbols-outlined text-[16px] text-gray-400">location_on</span>
                               {getCityState(member.address) || <span className="text-gray-400">Unknown</span>}
                            </span> */}
                          {/* </td> */}
                          <td className="px-6 py-4">
                            {member.email ? (
                               <a href={`mailto:${member.email}`} className="text-primary hover:underline font-medium">
                                 {member.email}
                               </a>
                            ) : <span className="text-gray-400">-</span>}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                             {member.phone || <span className="text-gray-300">-</span>}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                              (member.category || "").includes('Life')
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                            }`}>
                               {member.category}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                           No members found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {!loading && members.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-500 font-medium">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-600 border border-transparent hover:border-gray-200 dark:hover:border-gray-500 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    
                    {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                       let pNum = i + 1;
                       if (totalPages > 5 && currentPage > 3) pNum = currentPage - 2 + i;
                       if (totalPages > 5 && currentPage > totalPages - 2) pNum = totalPages - 4 + i;
                       if (pNum > totalPages || pNum < 1) return null;

                       return (
                         <button 
                           key={pNum}
                           onClick={() => handlePageChange(pNum)}
                           className={`w-8 h-8 rounded text-xs font-bold transition-all border ${
                             currentPage === pNum 
                             ? 'bg-primary text-white border-primary' 
                             : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-500 hover:border-primary'
                           }`}
                         >
                           {pNum}
                         </button>
                       )
                    })}
                    
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-600 border border-transparent hover:border-gray-200 dark:hover:border-gray-500 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.main>
  );
};

export default MembersDetails;