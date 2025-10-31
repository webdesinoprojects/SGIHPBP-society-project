import { useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import GoverningBody from './pages/GoverningBody'
import AboutUs from './pages/AboutUs'
import SecretaryMessage from './pages/SecretaryMessage'
import Membership from './pages/Membership'
import AcademicsEvents from './pages/AcademicsEvents'
import Publications from './pages/Publications'
import ContactUs from './pages/ContactUs'
import Admin from './pages/Admin'
import PresidentMessage from './pages/PresidentMessage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'governing-body':
        return <GoverningBody />
      case 'about-us':
        return <AboutUs />
      case 'secretary-message':
        return <SecretaryMessage />
      case 'president-message':
        return <PresidentMessage />
      case 'membership':
        return <Membership />
      case 'academics-events':
        return <AcademicsEvents />
      case 'publications':
        return <Publications />
      case 'contact-us':
        return <ContactUs />
      case 'admin':
        return <Admin />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App