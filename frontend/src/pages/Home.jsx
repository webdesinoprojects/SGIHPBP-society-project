import HeroSection from '../components/sections/HeroSection'
import MissionSection from '../components/sections/MissionSection'
import PresidentSection from '../components/sections/PresidentSection'
import SecretarySection from '../components/sections/SecretarySection'
import QuickLinksSection from '../components/sections/QuickLinksSection'

const Home = ({ setCurrentPage }) => {
  return (
    <main>
      <HeroSection />
      <MissionSection setCurrentPage={setCurrentPage} />
      <PresidentSection setCurrentPage={setCurrentPage} />
      <SecretarySection setCurrentPage={setCurrentPage} />
      <QuickLinksSection />
    </main>
  )
}

export default Home