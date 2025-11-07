import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import celiacGuidelinePdf from '../assets/best_practices.pdf';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// This is the static list of publications
const publicationsList = [
  {
    id: 'guideline-1',
    category: 'Guideline Paper',
    title: 'Best practices of handling, processing, and interpretation of small intestinal biopsies for the diagnosis and management of celiac disease: A joint consensus of Indian Association of Pathologists and Microbiologists and Indian Society of Gastroenterology',
    author: 'A joint consensus of IAPM and ISG',
    description: 'A joint consensus guideline paper on the standards for handling, processing, and interpreting small intestinal biopsies for celiac disease.',
    href: celiacGuidelinePdf,
    linkText: 'Download PDF',
    linkIcon: 'download',
  },
  // You can add more publications here in the future
];

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // filtered list based on the search term
  const filteredPublications = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    
    if (!lowerSearch) {
      return publicationsList; // Show all if search is empty
    }
    
    return publicationsList.filter(pub =>
      pub.title.toLowerCase().includes(lowerSearch) ||
      pub.author.toLowerCase().includes(lowerSearch) ||
      pub.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]); // Re-filters whenever searchTerm changes

  return (
    <motion.main 
      className="flex-grow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <motion.div 
          className="mb-5 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-black tracking-tighter text-primary dark:text-white sm:text-5xl">
            Publications & Guidelines
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-text-muted-light dark:text-text-muted-dark">
            This section hosts society-endorsed guidelines, educational articles, research findings, and other important documents for members and the wider medical community.
          </p>
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
              search
            </span>
            <input
              type="text"
              placeholder="Search publications by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-border-light dark:border-border-dark rounded-xl bg-white dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </motion.div>

        {/* filtered list */}
        <motion.div 
          key={searchTerm} // Re-animate on search
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPublications.length > 0 ? (
            filteredPublications.map(pub => (
              <motion.div 
                key={pub.id}
                className="flex flex-col items-stretch gap-6 overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-border-dark dark:bg-background-dark/50 dark:hover:shadow-accent/10"
                variants={itemVariants}
              >
                <div className="flex flex-col justify-center gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">{pub.category}</p>
                    <p className="text-xl font-bold leading-tight text-primary dark:text-white">
                      {pub.title}
                    </p>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {pub.author}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-text-dark">
                      {pub.description}
                    </p>
                  </div>
                  <motion.a 
                    href={pub.href}
                    download="SGIHPBPs-Celiac-Guideline.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity"
                    whileHover={{ scale: 1.05, opacity: 0.9 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="truncate">{pub.linkText}</span>
                    <span className="material-symbols-outlined !text-lg">{pub.linkIcon}</span>
                  </motion.a>
                </div>
              </motion.div>
            ))
          ) : (
            // "no results" message
            <motion.div 
              className="col-span-1 text-center text-text-muted-light dark:text-text-muted-dark py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="material-symbols-outlined text-5xl">search_off</span>
              <h3 className="mt-4 text-xl font-bold text-primary dark:text-white">No Publications Available</h3>
              <p className="mt-2 text-lg">Please check back later.</p>
            </motion.div>
          )}
        </motion.div>
        
      </div>
    </motion.main>
  );
};

export default Publications;