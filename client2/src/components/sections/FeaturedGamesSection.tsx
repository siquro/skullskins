
import { motion } from "framer-motion"
import FeaturedGamesList from "../FeaturedGamesList"
import { SectionWrapper } from "../../hoc"
import { useRouter } from "next/router"
import SectionTitles from "../SectionTitles"

const FeaturedGamesSection = () => {
    const router = useRouter()
    return <div className="w-full">
        <motion.div>
            <SectionTitles firstWord="Featured " lastWord="games"/>
            <FeaturedGamesList />
        </motion.div>
    </div>
}
export default SectionWrapper(FeaturedGamesSection, '', "bg-primary sectionAutoPadding", "", "")