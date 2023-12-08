'use client'
import Image from "next/image"
import { SectionWrapper } from "../../../hoc"
import { missions } from "../../../utils/constants"
import { motion } from "framer-motion"
import { fadeIn} from "../../../utils/motion"

const Mission = () => {

    const Card: React.FC<any> = ({ title, par, imageURL, reverse }) => {
        return (
            <motion.div className={`w-full flex flex-col relative mx-[0] md:ma-[20px] rounded-[10px] p-[2em] bg-[#1c1c1c80] h-fit`}>
                <div className="">
                    <Image src={imageURL} width={752} height={520} alt="player" className="about_image rounded-[10px]" priority />
                </div>


                <div className="rounded-[10px] border-solid border-2 border-[#02fe4f] bg-bgGreenOneCornerShade p-[2em]">
                    <h2 className="mt-7 mb-[40px] text-[36px] font-semibold leading-7 font-grotesk text-lightText">{title}</h2>
                    <p className="mt-2 text-base leading-7 text-lightText font-barlow text-lightText">{par}</p>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="w-full flex flex-col md:flex-row gap-[40px] ">
            {missions.map((el, idx) =>
                <div>
                    {idx % 2 === 0 ? (<motion.div variants={fadeIn('right', 'linear', .2, 1)}>
                        <Card title={el.title} par={el.par} imageURL={el.imageURL} key={idx + el.par.length} reverse={el.reverse} />
                    </motion.div>) : (<motion.div variants={fadeIn('left', 'linear', .8, 1)} className="mt-[0px] md:mt-[80px]">
                        <Card title={el.title} par={el.par} imageURL={el.imageURL} key={idx + el.par.length} reverse={el.reverse} />
                    </motion.div>)}
                </div>
            )}
        </div>
    )
}
export default SectionWrapper(Mission, '', "autoPaddings", "", "")