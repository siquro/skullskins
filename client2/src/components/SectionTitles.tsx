import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

interface ISectionTitle {
    firstWord: string;
    lastWord?: string;
}

const SectionTitles: React.FC<ISectionTitle> = ({ firstWord, lastWord }) => {
    return <motion.div variants={fadeIn('right', 'linear', .2, 1)}>
        <h2 className="section_title text-center text-lightText font-grotesk mb-[40px]"> 
        {firstWord}<span className="text-accent">{lastWord}</span></h2>
    </motion.div>
}
export default SectionTitles;