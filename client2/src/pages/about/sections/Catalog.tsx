
import Image from "next/image"
import { textVariant } from "../../../utils/motion"
import { motion } from "framer-motion"
import { SectionWrapper } from "../../../hoc"
import { useRouter } from "next/router"
const Catalog = () => {
    const router = useRouter()
    return (
        <div className="mx-auto w-fit flex ">
            <Image src="/about/headphones.png" width={506} height={561} alt="player" className="about_image_2" priority />
            <div className="gradientBack w-[134px] about_image_3 rounded-[0_10px_10px_10px] xl:rounded-[0_30px_30px_30px] relative ">
                <motion.h2  variants={textVariant(.25)} className="title mt-[3vh] mx-[3vw]">CATALOG</motion.h2>
                <motion.p variants={textVariant(.50)} className="p2 mx-[3vw]">We offer a vast selection of in game skins for all platforms, from the trending  or valuable item to classic simple skin. Our mission is to provide gamers with an easy and convenient way to access the skins they love, all in one place for your favorite games.</motion.p>
            
                <motion.button variants={textVariant(.75)} className="p2 bg-[#009894] shadow-2xl font-bold px-[1vw] py-[.5vw] rounded-[5px] xl:rounded-[10px] btnShadow absolute bottom-[3vw] right-[3vw] hover:bg-opacity-25" onClick={() => router.push('/shop')}>View all</motion.button>
        
            </div>
        </div>
    )
}
export default SectionWrapper(Catalog, '', "")