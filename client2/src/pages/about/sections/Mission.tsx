'use client'
import Image from "next/image"
import { SectionWrapper } from "../../../hoc"
import { missions } from "../../../utils/constants"
import { motion } from "framer-motion"
import { textVariant } from "../../../utils/motion"

const Mission = () => {

    const Card: React.FC<any> = ({ title, par, imageURL, reverse }) => {
        return (
            <motion.div className={`w-full justify-between flex ${reverse ? 'flex-row-reverse':''} mb-[1rem] lg:mb-[5rem]`}>
                <Image src={imageURL} width={752} height={520} alt="player" className="about_image" />
                
                <div className="">
                    <motion.h2 variants={textVariant(.25)} className="title">{title}</motion.h2>
                    <motion.p variants={textVariant(.50)} className="paragraph">{par}</motion.p>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="w-full">
            {missions.map((el, idx) => <Card title={el.title} par={el.par} imageURL={el.imageURL} key={idx + el.par.length} reverse = {el.reverse} />)}
        
        </div>

    )
}
export default SectionWrapper(Mission, '', "")