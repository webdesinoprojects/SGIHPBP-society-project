import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // YOUR SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  useEffect(() => {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "get_publications" })
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'success') setPublications(data.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  // --- HELPER: CONVERT DRIVE VIEW LINK TO DOWNLOAD LINK ---
  const getDownloadLink = (link) => {
    if (!link) return "";
    
    // Check if it's a Google Drive link
    if (link.includes("drive.google.com") || link.includes("docs.google.com")) {
      try {
        // Extract the File ID using Regex
        const idMatch = link.match(/\/d\/(.+?)(\/|$)/);
        if (idMatch && idMatch[1]) {
          // Return the specific 'export=download' URL
          return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
        }
      } catch (e) {
        console.error("Error parsing Drive link", e);
      }
    }
    // If not a drive link (or parsing failed), return original
    return link;
  };

  const filteredPublications = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    if (!lowerSearch) return publications;
    return publications.filter(pub =>
      (pub.title || "").toLowerCase().includes(lowerSearch) ||
      (pub.author || "").toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, publications]);

  return (
    <motion.main 
      className="flex-grow min-h-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-primary dark:text-white sm:text-5xl">
            Publications & Guidelines
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Society-endorsed guidelines, educational articles, and research findings.
          </p>
        </div>

        <div className="mb-10 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-primary outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
             <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          </div>
        ) : (
          <motion.div className="grid gap-8">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-yellow-600 mb-1">{pub.category}</p>
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-1">{pub.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">{pub.author}</p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{pub.description}</p>
                  </div>
                  
                  {pub.linkurl && (
                    <a 
                      href={getDownloadLink(pub.linkurl)} // <--- USING THE HELPER FUNCTION
                      target="_blank" // Still keep this so it doesn't navigate away if download fails
                      rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors"
                    >
                      <span>Download</span>
                      <span className="material-symbols-outlined text-sm">download</span>
                    </a>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">No publications found.</div>
            )}
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

export default Publications;