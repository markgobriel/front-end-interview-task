import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import CategoryShowcase from '../components/CategoryShowcase.jsx'
import Stats from '../components/Stats.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Newsletter from '../components/Newsletter.jsx'

export default function HomePage({ onShopClick, onPickCategory }) {
  return (
    <>
      <Hero onShopClick={onShopClick} />
      <Marquee />
      <CategoryShowcase onPickCategory={onPickCategory} />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  )
}
