import ContactUs from '@/components/ContactUs'
import NavTopBar from '@/components/navTopbar/NavTopBar'
import AboutUs from './components/AboutUs'
import ActionBox from './components/ActionBox'
import ActionBox2 from './components/ActionBox2'
import Features from './components/Features'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import Services from './components/Services'
import State from './components/State'
import Team from './components/Team'
import Testimonial from './components/Testimonial'

const Startup = () => {
  return (
    <>
      <NavTopBar isDark />
      <Hero />
      <State />
      <AboutUs />
      <Features />
      <Services />
      <Testimonial />
      <ActionBox />
      <Team />
      <Pricing />
      <ContactUs />
      <ActionBox2 />
    </>
  )
}

export default Startup
