import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CountdownTimer from '../components/common/CountdownTimer';

const AcademicsEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual deployed Web App URL
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 1. Try to fetch fresh data directly
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({ action: "get_events" })
        });
        const data = await response.json();

        if (data.result === 'success') {
          setEvents(data.data);
          // Update session storage for other pages to use
          sessionStorage.setItem("events_data", JSON.stringify(data.data));
        } else {
          // Fallback to cache if API fails
          const cachedData = sessionStorage.getItem("events_data");
          if (cachedData) setEvents(JSON.parse(cachedData));
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        // Fallback to cache on error
        const cachedData = sessionStorage.getItem("events_data");
        if (cachedData) setEvents(JSON.parse(cachedData));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const EventSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-pulse">
      <div className="flex-grow space-y-4">
        {/* Title */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Meta info (date/loc) */}
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>

        {/* Description Text */}
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>

      {/* Action Side (Buttons & Timer) */}
      <div className="flex flex-col items-center md:items-end gap-4 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
        <div className="flex gap-3 w-full justify-center md:justify-end">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
        </div>
        {/* Timer Placeholder */}
        <div className="w-full md:w-64 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <motion.main
      className="container mx-auto px-6 py-12 md:py-20 min-h-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <SEO 
        title="Academics & Events" 
        description="Stay updated with the latest academic events, conferences, and workshops organized by SGIHPBP."
        keywords="pathology events, medical conferences, SGIHPBP academics, workshops"
      />
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white mb-4">
          Academics & Events
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore our calendar of CMEs, workshops, and conferences.
        </p>
      </div>

      <div className="grid gap-6">
        {loading && !events.length ? (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        ) : events.length > 0 ? (
          events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">{event.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center"><span className="material-symbols-outlined mr-2">calendar_month</span>{event.date}</div>
                  <div className="flex items-center"><span className="material-symbols-outlined mr-2">location_on</span>{event.location}</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">{event.description}</p>

                {event.abstractguidelines && (
                  <div className="mt-4">
                    <a
                      // href="/guidelines.jpg" 
                      href={event.abstractguidelines}
                      // download="Abstract_Submission_Guidelines.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-[#b39020] transition-colors group"
                    >
                      <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">download</span>
                      Download Abstract Submission Guidelines
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center md:items-end gap-4 flex-shrink-0 self-start md:self-center w-full md:w-auto mt-4 md:mt-0">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-wrap justify-center md:justify-end">
                  {event.flyerlink && (
                    <a href={event.flyerlink} target="_blank" rel="noreferrer" className="px-6 py-2 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition text-center whitespace-nowrap">
                      Download
                    </a>
                  )}
                  {event.registrationlink && (
                    <a href={event.registrationlink} target="_blank" rel="noreferrer" className="px-6 py-2 bg-yellow-500 text-primary font-bold rounded-full hover:bg-yellow-400 transition text-center shadow-md whitespace-nowrap">
                      Register Now
                    </a>
                  )}
                </div>

                {/* USE TIMER DATE - fallback to standard date if missing */}
                <div className="mt-1">
                  <CountdownTimer targetDate={event.timerdate || event.date} />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">No upcoming events scheduled.</div>
        )}
      </div>
    </motion.main>
  );
};

export default AcademicsEvents;