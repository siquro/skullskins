
import { motion } from "framer-motion"
import FeaturedGames from "../FeaturedGames"
import Header from "../Header"
import Image from 'next/image'
import { SectionWrapper } from "../../hoc"
// import "./globals.css"
import { textVariant } from "../../utils/motion"
import { useRouter } from "next/router"

const Hero = () => {
    const router = useRouter()
    return <div className="w-full">
        <Header />
        <div className='w-full flex items-center flex-col'>
            <Image src="./skull_logo_hero.svg" width={168} height={168} alt="skull_logo" className="logo lg:w-[168px] lg-h-[168px]" priority />
            <motion.p variants={textVariant(.25)}
                className='text w-[240px] text-center'>Buy your games, skins here in the best store for your needs </motion.p>
            <button className='bg-primary px-[37px] py-[6px] rounded-[45px] mt-[17px] hover:bg-opacity-25' onClick={() => router.push('/shop')}>SHOP NOW</button>
        </div>
        <motion.div>
            <p className='text mt-[68px] text-[30px] w-full'>FEATURED GAMES</p>
            <FeaturedGames />
        </motion.div>
    </div>
}
export default SectionWrapper(Hero, '', "gradientBack")