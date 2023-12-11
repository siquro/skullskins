import { motion } from "framer-motion"
import Image from "next/image"
import { fadeIn } from "../utils/motion"


interface game {
    title: string,
    avatarURL: string,
    active: boolean,
    index: number
}

const FeaturedGamesList = () => {

    const games = [
        { title: 'CS:GO', avatarURL: './games/csgo.svg', active: false },
        { title: 'RUST', avatarURL: './games/rust.svg', active: true },
        { title: 'FORTNITE', avatarURL: './games/fortnite.svg', active: false },
        { title: 'DOTA 2', avatarURL: './games/dota.svg', active: false },
    ]

    const Card: React.FC<game> = ({ title, avatarURL, active, index }) => {
        return (
            <motion.div className="" variants={fadeIn('left', 'spring', 0.5 * index, .75)}>
                <Image src={avatarURL} width={90} height={160} alt={title} priority
                    className={`${active ? 'opacity-100' : 'opacity-20'} sm:w-[255px] sm:h-[400px]`
                    }
                />
                <p className={`${active ? 'opacity-100' : 'opacity-20'} text-center text`}>{title}</p>
            </motion.div>
        )
    }
    return (
        <div className="w-ful flex flex-col gap-[20px] items-center sm:flex-row justify-between mt-[2rem]">
            {games.map((el, idx) => <Card key={idx} title={el.title} avatarURL={el.avatarURL} active={el.active} index = {idx}/>)}
        </div>
    )
}
export default FeaturedGamesList;
