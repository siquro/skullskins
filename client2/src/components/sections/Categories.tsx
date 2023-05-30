
import { motion } from "framer-motion"
import { SectionWrapper } from "../../hoc"
import Image from 'next/image'
import { fadeIn, textVariant } from "../../utils/motion"
interface ICard {
    title: string,
    imageURL: string,
    index: number
}

const categories = [
    { title: 'Action', imageURL: '/categories/action.png' },
    { title: 'Adventure', imageURL: '/categories/adventure.png' },
    { title: 'Arcade', imageURL: '/categories/arcade.png' },
    { title: 'FPS', imageURL: '/categories/fps.png' },
    { title: 'Racing', imageURL: '/categories/racing.png' },
    { title: 'Simulation', imageURL: '/categories/simulation.png' },
    { title: 'Sports', imageURL: '/categories/sports.png' },
    { title: 'Fighting', imageURL: '/categories/fighting.png' },
]
const Categories = () => {


    const Card: React.FC<ICard> = ({ title, imageURL, index }) => {
        return <motion.div variants={fadeIn('', 'linear', .50 * index, 2.25)} className="flex items-end justify-center w-full">
            <Image src={imageURL} width={193} height={193} alt={title} priority />
            <span className="absolute text-[12px] sm:text-[30px] font-bold">{title}</span>
        </motion.div>
    }

    return <div className='w-full py-4'>
        <div className="mx-auto w-fit flex">
            <Image src="/about/headphones.png" width={506} height={561} alt="player" className="about_image_2" />
            <div className="gradientBack w-[134px] about_image_3 rounded-[0_10px_10px_10px] xl:rounded-[0_30px_30px_30px] relative ">
                <motion.h2 variants={textVariant(.25)} className="title mt-[3vh] mx-[3vw]">Find the categories you are interested in</motion.h2>
            </div>
        </div>

        <div className="w-fit  grid grid-cols-4 opacityGradientBack rounded-[10px] p-8 mb-[5rem] lg:rounded-[45px] gap-4 mx-auto mt-[80px] bg-opacity-30">
            {categories.map((el, idx) => {
                return <Card title={el.title} imageURL={el.imageURL} index={idx} key={idx} />
            }
            )}
        </div>
        <span className="text absolute bottom-0 spanExtra">Reviews</span>
    </div>
}
export default SectionWrapper(Categories, '', "bg-categoriesBg backgroundImage")