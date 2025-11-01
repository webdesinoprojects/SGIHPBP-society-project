import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo_SGIHPBPS.png'

const Header = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      // When menu is open, add class to body to prevent scrolling
      document.body.classList.add('overflow-hidden')
    } else {
      // When menu is closed, remove the class
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  return (
    <header className="bg-white/80 dark:bg-primary/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto p-2 ">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3"
          >
            <img
              alt="SGIHPBPs of India Logo"
              className="h-14 w-14"
              src={Logo}
            />
            <span className="font-display font-bold text-sm text-primary dark:text-white hidden md:block">
              SGIHPBPs of India
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link font-semibold transition-colors ${currentPage === 'home' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className={`nav-link font-semibold flex items-center transition-colors ${currentPage === 'about-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}>
                About Us <span className="material-icons text-sm ml-1">expand_more</span>
              </button>
              <div className="absolute hidden group-hover:block bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 rounded shadow-lg mt-2 py-1 w-48">
                <Link to="/about-us" className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-900 hover:text-gold-DEFAULT dark:hover:text-gold-light transition-colors">
                  Our Mission & Vision
                </Link>
                <Link to="/president-message" className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-900 hover:text-gold-DEFAULT dark:hover:text-gold-light transition-colors">
                  President's Message
                </Link>
                <Link to="/secretary-message" className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-900 hover:text-gold-DEFAULT dark:hover:text-gold-light transition-colors">
                  Secretary General's Message
                </Link>
              </div>
            </div>
            <Link
              to="/governing-body"
              className={`nav-link font-semibold transition-colors ${currentPage === 'governing-body' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Governing Body
            </Link>
            {/* President and Secretary links are in dropdown menu */}
            <Link
              to="/membership"
              className={`nav-link font-semibold transition-colors ${currentPage === 'membership' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Membership
            </Link>
            <Link
              to="/academics-events"
              className={`nav-link font-semibold transition-colors ${currentPage === 'academics-events' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Academics & Events
            </Link>
            <Link
              to="/publications"
              className={`nav-link font-semibold transition-colors ${currentPage === 'publications' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Publications
            </Link>
            <Link
              to="/contact-us"
              className={`nav-link font-semibold transition-colors ${currentPage === 'contact-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
            >
              Contact Us
            </Link>
            {/* <button
              className={`nav-link font-semibold transition-colors ${currentPage === 'admin' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'
                }`}
              onClick={() => setCurrentPage && setCurrentPage('admin')}
            >
              Admin
            </button> */}
          </div>

          <button
            className="lg:hidden text-primary dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons-outlined">mmenu</span> {/*menu*/}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-primary border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'home' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'about-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/governing-body"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'governing-body' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Governing Body
            </Link>
            <Link
              to="/president-message"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'president-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              President's Message
            </Link>
            <Link
              to="/secretary-message"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'secretary-message' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Secretary General's Message
            </Link>
            <Link
              to="/membership"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'membership' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Membership
            </Link>
            <Link
              to="/academics-events"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'academics-events' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Academics & Events
            </Link>
            <Link
              to="/publications"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'publications' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Publications
            </Link>
            <Link
              to="/contact-us"
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'contact-us' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            {/* <button
              className={`block w-full text-center py-2 font-semibold transition-colors ${currentPage === 'admin' ? 'text-gold-DEFAULT dark:text-gold-light' : 'text-gray-800 dark:text-white'}`}
              onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }}
            >
              Admin
            </button> */}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header