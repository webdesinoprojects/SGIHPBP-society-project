import React from 'react';
import Layout from '../components/Layout';

const Publications = () => {
  return (
    // <Layout>
      <main className="flex-grow">
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
          {/* Page Heading */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tighter text-primary dark:text-white sm:text-5xl">
              Publications & Guidelines
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-text-muted-light dark:text-text-muted-dark">
              This section hosts society-endorsed guidelines, educational articles, research findings, and other important documents for members and the wider medical community.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex-grow">
              <label className="flex h-12 w-full flex-col">
                <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                  <div className="flex items-center justify-center rounded-l-lg border border-r-0 border-border-light bg-white dark:border-border-dark dark:bg-background-dark pl-4 text-text-muted-light dark:text-text-muted-dark">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-border-light bg-white px-4 text-base font-normal text-text-light placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-accent/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-text-muted-dark dark:focus:ring-accent/60" 
                    placeholder="Search publications..." 
                    defaultValue=""
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-border-light bg-white px-4 dark:border-border-dark dark:bg-background-dark">
                <p className="text-sm font-medium text-text-light dark:text-text-dark">Category: All</p>
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">expand_more</span>
              </button>
            </div>
          </div>

          {/* Publication Cards */}
          <div className="grid gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-stretch gap-6 overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-border-dark dark:bg-background-dark/50 dark:hover:shadow-accent/10 md:flex-row">
              <div className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 md:w-1/3">
                <img 
                  className="h-full w-full object-cover aspect-video md:aspect-auto rounded-lg" 
                  alt="Microscope in a modern laboratory setting" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtL4Fj5ovKJNz6sb6QWdjUWd_Z75xpVb-0_nZPigBu5p698E5ZD2HPSep4hCjfD-cR3yqAzdkpowvrtWS2LNY-0MzX4JCxHPNOr1Zam8E8v7jizFMGLNv5bE-5wC_81vvf_bP_At1JV84vF31mVh6VKXlJVDRzj8j9x5UdtIHYtsia0Xjf_r-2r-eFCLrcX0v5Vlf6p7mCNPYuHWv645hOCUcBX4zONCDYwAzRR6l88XHbkeElSs4dR5XPpaA5zSokVK3YhpsPsg"
                />
              </div>
              <div className="flex flex-[2_2_0px] flex-col justify-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Clinical Guideline</p>
                  <p className="text-xl font-bold leading-tight text-primary dark:text-white">
                    Consensus Guidelines for the Pathological Diagnosis of Autoimmune Hepatitis
                  </p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Dr. Anjali Mehta, Dr. Rohan Sharma | 2023
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-text-dark">
                    A comprehensive set of guidelines developed by a panel of experts to standardize the diagnostic criteria for autoimmune hepatitis across India.
                  </p>
                </div>
                <button className="flex h-10 w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                  <span className="truncate">Read More</span>
                  <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-stretch gap-6 overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-border-dark dark:bg-background-dark/50 dark:hover:shadow-accent/10 md:flex-row">
              <div className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 md:w-1/3">
                <img 
                  className="h-full w-full object-cover aspect-video md:aspect-auto rounded-lg" 
                  alt="DNA helix and other scientific graphics" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfSBcIqdVqpn1SiQm2xJDwLb3Zlfjctzy_MyBhfD8m9y9EsPuLYUvKGdcim-5yhVr19vJhOnsxwxeaFZGTln08NfQKXp76HgJJHDaoxJ-XwcjByW5EdTZcva0VKMwl5dS4jJ8KmGdZrr914RxKNJ5bcjhiFWXwAa-9dcAvJpXY5HlqsdChlEFLKmXcM5jOCihUgSbIgjdHBsvK4OxsRkb1QLK3GHz2CT9I5sBRIFclA5xe98BS_3BRCg3cuApnIT7S6gdROzrFzg"
                />
              </div>
              <div className="flex flex-[2_2_0px] flex-col justify-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Research Paper</p>
                  <p className="text-xl font-bold leading-tight text-primary dark:text-white">
                    Molecular Subtyping of Hepatocellular Carcinoma: An Indian Cohort Study
                  </p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Dr. Priya Singh, Dr. Vikram Rao | 2022
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-text-dark">
                    This research provides new insights into the genetic landscape of hepatocellular carcinoma within the Indian population, identifying key mutations.
                  </p>
                </div>
                <button className="flex h-10 w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                  <span className="truncate">Download PDF</span>
                  <span className="material-symbols-outlined !text-lg">download</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-stretch gap-6 overflow-hidden rounded-xl border border-border-light bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-border-dark dark:bg-background-dark/50 dark:hover:shadow-accent/10 md:flex-row">
              <div className="w-full rounded-lg bg-gray-200 dark:bg-gray-700 md:w-1/3">
                <img 
                  className="h-full w-full object-cover aspect-video md:aspect-auto rounded-lg" 
                  alt="A doctor explaining something to a patient" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjAb8ctCHdD78sZTyZBUyK6FAnppEPD7LBNkAuwIXMxSroorOwGC45HPlO_xjtxbXUy7t4NY_TunBbLKL0X_K7DdQWWbuBG7jYf9HpgQbOZ-_tM7AxAFcNUwZA7yOEtWns-6Z3fS-9PUV1zKydAC74rnb8kkfjbZyff1SkfBhVJQBFPqfWuYze0lgnSuw_p4vQ0hqhYUm3KXGfsnnRbU8_yWEdx7-l3lbNmogd521-oY5-XOlA6g2dfQ3kR5jKenKVWv5H1KlX5A"
                />
              </div>
              <div className="flex flex-[2_2_0px] flex-col justify-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Educational Article</p>
                  <p className="text-xl font-bold leading-tight text-primary dark:text-white">
                    The Role of Biopsy in the Management of Pancreatic Cysts
                  </p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Dr. Sanjay Gupta | 2021
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-text-dark">
                    An educational review discussing the indications, techniques, and diagnostic yield of endoscopic ultrasound-guided fine-needle aspiration for pancreatic cysts.
                  </p>
                </div>
                <button className="flex h-10 w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                  <span className="truncate">Read More</span>
                  <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-white transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark/50 dark:hover:bg-background-dark">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent bg-primary text-sm font-bold text-white">
              1
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-white text-sm font-medium transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark/50 dark:hover:bg-background-dark">
              2
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-white text-sm font-medium transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark/50 dark:hover:bg-background-dark">
              3
            </button>
            <span className="text-text-muted-light dark:text-text-muted-dark">...</span>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-white text-sm font-medium transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark/50 dark:hover:bg-background-dark">
              10
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-white transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark/50 dark:hover:bg-background-dark">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>
    // </Layout>
  );
};

export default Publications;