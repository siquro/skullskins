import Hero from '../components/sections/Hero'
import Offers from '../components/sections/Offers'
import Categories from '../components/sections/Categories'
import Comments from '../components/sections/Comments'
import Footer from '../components/Footer'
import BestDeals from '../components/sections/BestDeals'
import { Metadata } from 'next'
import Head from 'next/head'


export default function Home() {

  return (
    <>
      <Head>
        <title>SKULL SKINS</title>
        <link rel="icon" href="./logo_hero.png" />
      </Head>
      <main className="w-full text-white overflow-hidden">
        <Hero />
        <Offers />
        <Categories />
        <Comments />
        <BestDeals />
      </main>
    </>

  )
}
