import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { formatNoticeDate, listHomeNotices } from '../../lib/homeNotices';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

const MissionSection = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadNotices = useCallback(async () => {
    try {
      setNotices(await listHomeNotices({ limit: 4 }));
    } catch (error) {
      console.error('Unable to load homepage notices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotices(); }, [loadNotices]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    const channel = supabase
      .channel('public-home-notices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'home_notices' }, loadNotices)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadNotices]);

  return (
    <motion.section
      className="bg-gradient-to-br from-white via-white to-blue-50/60 py-16 dark:from-background-dark dark:via-background-dark dark:to-gray-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-white p-7 shadow-sm md:p-10 dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gold-DEFAULT">Who we are</p>
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl dark:text-white">Our Mission</h2>
            <div className="my-5 h-1 w-20 bg-gold-DEFAULT" />
            <p className="text-base leading-7 text-gray-600 md:text-lg md:leading-8 dark:text-gray-300">
            Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients.
            </p>
            <motion.div className="mt-7 self-start" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/about-us" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-md transition hover:bg-blue-900">
                Learn More
                <span className="material-icons-outlined text-lg" aria-hidden="true">arrow_forward</span>
              </Link>
            </motion.div>
          </div>

          <aside className="overflow-hidden rounded-2xl border border-[#d7e1ee] bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800" aria-labelledby="latest-notices-heading">
            <div className="flex items-center justify-between bg-primary px-6 py-5 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">Stay informed</p>
                <h2 id="latest-notices-heading" className="mt-1 text-2xl font-bold">Latest Notices</h2>
              </div>
              <span className="material-icons-outlined text-3xl text-yellow-300" aria-hidden="true">campaign</span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading && <div className="grid min-h-64 place-items-center p-6 text-sm font-semibold text-gray-500">Loading notices...</div>}
              {!loading && notices.map((notice) => (
                <button key={notice.id} type="button" onClick={() => setSelectedNotice(notice)} className="group block w-full p-5 text-left transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gold-dark dark:text-yellow-300">
                    <span>{notice.notice_type}</span><span aria-hidden="true">•</span>
                    <time dateTime={notice.published_on}>{formatNoticeDate(notice.published_on)}</time>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold leading-6 text-primary group-hover:text-blue-700 dark:text-white">{notice.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary dark:text-blue-300">
                    Read full notice <span className="material-icons-outlined text-base transition group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
                  </span>
                </button>
              ))}
              {!loading && notices.length === 0 && (
                <div className="grid min-h-64 place-items-center p-8 text-center">
                  <div><span className="material-icons-outlined text-4xl text-gray-300" aria-hidden="true">notifications_none</span><p className="mt-2 font-semibold text-gray-500 dark:text-gray-300">No new notices at the moment.</p></div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {selectedNotice && <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
      </AnimatePresence>
    </motion.section>
  );
};

const NoticeModal = ({ notice, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-[#06162b]/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.article role="dialog" aria-modal="true" aria-labelledby="notice-modal-title" className="max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
        <header className="flex items-start justify-between gap-4 border-b border-gray-100 bg-primary px-6 py-5 text-white dark:border-gray-700">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">{notice.notice_type} • {formatNoticeDate(notice.published_on)}</p>
            <h2 id="notice-modal-title" className="mt-2 text-xl font-bold leading-7 md:text-2xl">{notice.title}</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close notice">
            <span className="material-icons-outlined" aria-hidden="true">close</span>
          </button>
        </header>
        <div className="max-h-[calc(88vh-7.5rem)] overflow-y-auto px-6 py-6 md:px-8">
          <p className="whitespace-pre-wrap text-base leading-7 text-gray-700 dark:text-gray-200">{notice.message}</p>
        </div>
      </motion.article>
    </motion.div>,
    document.body,
  );
};

export default MissionSection
