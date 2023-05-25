import Hero from '../components/sections/Hero'
import Offers from '../components/sections/Offers'
import Categories from '../components/sections/Categories'
import Comments from '../components/sections/Comments'
import Footer from '../components/Footer'
import BestDeals from '../components/sections/BestDeals'


export default function Home() {
  return (
    <main className="w-full text-white">

      <Hero />
      <Offers />
      <Categories />
      <Comments />
      <BestDeals />


    </main>
  )
}
