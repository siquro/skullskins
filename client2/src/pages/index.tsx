import Hero from '../components/sections/Hero'
import Offers from '../components/sections/Offers'
import BestDealSection from '../components/sections/BestDealSection'
import Comments from '../components/sections/Comments'
import Footer from '../components/Footer'
import BestDeals from '../components/BestDeals'
import { Metadata } from 'next'
import Head from 'next/head'
import FeaturedGamesSection from '@/components/sections/FeaturedGamesSection'
import Header from '@/components/Header'
import GetInTouch from '@/components/sections/GetInTouch'


export default function Home() {

  return (
    <>
      <Head>
        <title>SKULL SKINS</title>
        <link rel="icon" href="./logo_hero.png" />
      </Head>
      <main className="w-full text-white overflow-hidden bg-primary">
        <Hero />
        <FeaturedGamesSection />
        <Offers />
        <BestDealSection />
        <Comments />
        <GetInTouch />
      </main>
    </>

  )
}
