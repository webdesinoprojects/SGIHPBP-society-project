import React, { useState, useMemo, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion'; // Removed AnimatePresence
import textbookImage from '../assets/textbook.png'

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

const allPublications = [
  {
    id: 1,
    category: 'Textbook',
    title: 'Surgical Pathology of the Gastrointestinal System',
    author: 'Editor: Prasenjit Das | Springer',
    description: 'A comprehensive textbook published by Springer, covering the surgical pathology of the gastrointestinal system.',
    href: 'https://link.springer.com/book/10.1007/978-981-16-6395-6',
    linkText: 'View on Springer',
    linkIcon: 'open_in_new',
    imageUrl: textbookImage
  },
  {
    id: 2,
    category: 'Research Publications',
    title: 'PubMed Publications',
    author: 'Prasenjit Das',
    description: 'A list of publications indexed in PubMed, showcasing research in the field of gastrointestinal pathology and related areas.',
    href: 'https://www.ncbi.nlm.nih.gov/pubmed/?term=Prasenjit+Das',
    linkText: 'View on PubMed',
    linkIcon: 'open_in_new',
    imageUrl: 'https://placehold.co/600x400/0d1b2a/e0e1dd?text=PubMed'
  },
  {
    id: 3,
    category: 'Academic Profile',
    title: 'Google Scholar Citations',
    author: 'Prasenjit Das',
    description: 'An academic profile on Google Scholar, detailing publications, citations, h-index, and research interests.',
    href: 'https://scholar.google.com/citations?hl=en&user=0zr8MycAAAAJ',
    linkText: 'View on Google Scholar',
    linkIcon: 'open_in_new',
    imageUrl: 'https://placehold.co/600x400/0d1b2a/e0e1dd?text=Scholar'
  }
];

const categories = ['All', 'Textbook', 'Research Publications', 'Academic Profile'];

// --- (Component start) ---

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const filteredPublications = useMemo(() => {
    return allPublications.filter(pub => {
      const categoryMatch = selectedCategory === 'All' || pub.category === selectedCategory;
      const searchMatch = searchTerm.toLowerCase() === '' ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.author.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  // This `useEffect` hook manages the "click outside" listener
  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Remove dropdownRef from dependencies

  return (
    // <Layout>
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <motion.div 
            className="mb-12 text-center"
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

          {/* Filter & Search Bar */}
          <motion.div 
            className="mb-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Search input */}
            <div className="flex-grow">
              <label className="flex h-12 w-full flex-col">
                <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                  <div className="flex items-center justify-center rounded-l-lg border border-r-0 border-border-light bg-white dark:border-border-dark dark:bg-background-dark pl-4 text-text-muted-light dark:text-text-muted-dark">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-border-light bg-white px-4 text-base font-normal text-text-light placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-accent/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-text-muted-dark dark:focus:ring-accent/60" 
                    placeholder="Search publications..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            
            {/* Category dropdown - Add the ref to the parent div */}
            <div className="relative flex gap-2" ref={dropdownRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(prev => !prev);
                }}
                className="flex h-12 w-full sm:w-auto shrink-0 items-center justify-between gap-x-2 rounded-lg border border-border-light bg-white px-4 dark:border-border-dark dark:bg-background-dark"
              >
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  { selectedCategory === 'All' ? 'Category: All' : `${selectedCategory}` }</p>
                <motion.span 
                  className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark"
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  expand_more
                </motion.span>
              </button>
              
              {/* Removed AnimatePresence and all motion props from the div */}
              {isDropdownOpen && (
                <div 
                  className="absolute top-14 right-0 z-10 w-full sm:w-48 rounded-lg border border-border-light bg-white py-1 shadow-lg dark:border-border-dark dark:bg-background-dark"
                >
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm font-medium text-text-light hover:bg-gray-100 dark:text-text-dark dark:hover:bg-gray-700"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

            </div>
          </motion.div>

          {/* Render the filtered list */}
          <motion.div 
            key={selectedCategory + searchTerm}
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Check if filtered list is empty */}
            {filteredPublications.length > 0 ? (
              filteredPublications.map(pub => (
                <motion.div 
                  key={pub.id}
                  className="flex flex-col items-stretch gap-6 overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-border-dark dark:bg-background-dark/50 dark:hover:shadow-accent/10 md:flex-row"
                  variants={itemVariants}
                >
                  <div className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 md:w-1/3 md:max-w-xs flex-shrink-0">
                    <img 
                      className="w-full h-48 md:h-full object-contain rounded-lg" 
                      alt={`${pub.title} placeholder`} 
                      src={pub.imageUrl}
                    />
                  </div>
                  <div className="flex flex-[2_2_0px] flex-col justify-center gap-4">
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
              // Show a message if no results found
              <motion.div 
                className="col-span-1 text-center text-text-muted-light dark:text-text-muted-dark py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="material-symbols-outlined text-5xl">search_off</span>
                <h3 className="mt-4 text-xl font-bold text-primary dark:text-white">No Publications Found</h3>
                <p className="mt-2 text-lg">Try adjusting your search term or category.</p>
              </motion.div>
            )}
          </motion.div>
          
        </div>
      </motion.main>
    // </Layout>
  );
};

export default Publications;