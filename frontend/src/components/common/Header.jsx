import { useState } from 'react'
import Logo from '../../assets/Logo_SGIHPBPS.png'

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 dark:bg-primary/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-3 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center space-x-3"
            onClick={() => setCurrentPage && setCurrentPage('home')}
          >
            <img
              alt="SGIHPBPs of India Logo"
              className="h-14 w-14"
              src={Logo}
            />
            <span className="font-display font-bold text-sm text-primary dark:text-white hidden md:block">
              SGIHPBPs of India
            </span>
          </button>

          <div className="hidden lg:flex items-center space-x-6">
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'home' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('home')}
            >
              Home
            </button>
            <div className="relative group">
              <button className={`nav-link font-semibold flex items-center transition-colors ${currentPage === 'about-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
                onClick={() => setCurrentPage && setCurrentPage('about-us')}>
                About Us
              </button>
            </div>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'governing-body' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('governing-body')}
            >
              Governing Body
            </button>
           <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'president-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('president-message')}
            >
              President's Message
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'secretary-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('secretary-message')}
            >
              Secretary General's Message
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'membership' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('membership')}
            >
              Membership
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'academics-events' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('academics-events')}
            >
              Academics & Events
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'publications' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('publications')}
            >
              Publications
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'contact-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('contact-us')}
            >
              Contact Us
            </button>
            <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'admin' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('admin')}
            >
              Admin
            </button>
          </div>

          <button
            className="lg:hidden text-primary dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-primary border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-1">
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'home' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
            >
              Home
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'about-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('about-us'); setIsMenuOpen(false); }}
            >
              About Us
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'governing-body' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('governing-body'); setIsMenuOpen(false); }}
            >
              Governing Body
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'president-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('president-message'); setIsMenuOpen(false); }}
            >
              President's Message
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'secretary-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('secretary-message'); setIsMenuOpen(false); }}
            >
              Secretary General's Message
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'membership' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('membership'); setIsMenuOpen(false); }}
            >
              Membership
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'academics-events' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('academics-events'); setIsMenuOpen(false); }}
            >
              Academics & Events
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'publications' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('publications'); setIsMenuOpen(false); }}
            >
              Publications
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'contact-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('contact-us'); setIsMenuOpen(false); }}
            >
              Contact Us
            </button>
            <button
              className={`block w-full text-left py-2 font-semibold transition-colors ${currentPage === 'admin' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }}
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header