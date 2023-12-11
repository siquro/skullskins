
import { motion } from "framer-motion";
import Header from "../Header";
import { SectionWrapper } from "../../hoc";
import { typeWriterEffect, letterAnimation } from "../../utils/motion";
import { useRouter } from "next/router";
import Image from "next/image";

const Hero = () => {
    const router = useRouter()
    const text = " the best store for your needs.."

    return <div className="w-full">
        <Header />
        <div className='w-full flex items-center flex-col pb-[120px] md:pb-[200px] mt-[70px] md:mt-[150px]'>
            <div className="block md:hidden mb-[40px]">
                <Image src="/skull_skins-text.svg" width={64} height={64} alt="skull_logo" className="skullLogo w-[64px] h-auto" priority />
            </div>
            <motion.p variants={typeWriterEffect} initial="hidden" animate="show" className="text-[32px] md:text-[48px] lg:text-[73px] text-center text-lightText font-grotesk">
                Buy your games, skins <br /> here in
                {text.split('').map((letter, idx) => (
                    <motion.span key={idx} variants={letterAnimation}
                        className="text-accent uppercase font-bold">
                        {letter}
                    </motion.span>
                ))}
            </motion.p>
            <button
                className='font-barlow font-bold px-[45px] py-[15px] mt-[40px] custom_btn text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover'
                onClick={() => router.push('/shop')}>SHOP NOW</button>
        </div>
    </div>
}
export default SectionWrapper(Hero, '', "backgroundImage bg-newHeroBg bg-fixed autoPaddings", "", "border_bottom")