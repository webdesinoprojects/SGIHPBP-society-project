import HeroSection from '../components/sections/HeroSection'
import MissionSection from '../components/sections/MissionSection'
import PresidentSection from '../components/sections/PresidentSection'
import SecretarySection from '../components/sections/SecretarySection'
import QuickLinksSection from '../components/sections/QuickLinksSection'
import EventTicker from '../components/sections/EventTicker'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <EventTicker />
      <MissionSection />
      <PresidentSection />
      <SecretarySection />
      <QuickLinksSection />
    </main>
  )
}

export default Home