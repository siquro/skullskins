import Image from "next/image"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/hoc"
import { fadeIn } from "@/utils/motion"
import { useRouter } from "next/router"


const OurCatalog = () => {
    const router = useRouter()

    return (
        <motion.div variants={fadeIn('right', 'linear', .2, 1)} className={`w-fit flex flex-col md:flex-row relative rounded-[10px] p-[2em] mt-[70px] bg-[#1c1c1c80] justify-center mx-[auto]`}>
            <div className="">
                <Image src="/about/headphones.png" width={506} height={561} alt="player" className="" priority />
            </div>
            <div className="flex flex-col justify-center rounded-[10px] border-solid border-2 border-[#02fe4f] bg-bgGreenOneCornerShade p-[2em] h-[auto] w-[100%] md:w-[60%]">
                <h2 className="mt-7 mb-[40px] text-[36px] font-semibold leading-7 font-grotesk text-lightText">Get Your Game On With Us</h2>
                <p className="mt-2 text-base leading-7 text-lightText font-barlow text-lightText">We offer a vast selection of video games for all platforms, from the latest releases to beloved classics. Our mission is to provide gamers with an easy and convenient way to access the titles they love, all in one place.</p>
                <button
                className='font-barlow font-bold px-[45px] py-[15px] mt-[60px] custom_btn text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover'
                onClick={() => router.push('/shop')}>SHOP NOW</button>
            </div>
        </motion.div>
    )
}
export default SectionWrapper(OurCatalog, '', "autoPaddings", "", "")