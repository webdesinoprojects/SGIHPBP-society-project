const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold mb-4">SGIHPBPs of India</h3>
            <p className="text-sm text-gray-300">
              The Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about-us'); }}>
                  About Us
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('membership'); }}>
                  Membership
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('academics-events'); }}>
                  Events
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact-us'); }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('publications'); }}>
                  Publications & Guidelines
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-gold-light transition-colors" href="#">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact us</h3>
            <p className="text-sm text-gray-300">
              Department of Pathology,<br/>
              AIIMS, New Delhi, India</p>
              &nbsp; 
              <p className="text-sm text-gray-300">Email: contact@sgihpbps.org</p>
          </div>
        </div>
        
        <div className="mt-12 border-t border-blue-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer