import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import Image from 'next/image';
import { textVariant } from "../../utils/motion";
import BestDeals from "../BestDeals";
import SectionTitles from "../SectionTitles";

const BestDealSection = () => {

    return <div className='w-full py-4 relative'>
        <SectionTitles firstWord="Best " lastWord="deals" />
        <div className="bg-transparent relative after:absolute after:content-['']
        after:h-[240px] sm:after:h-[290px] after:w-[90%] sm:after:w-[95%] after:inset-x-0 after:bottom-[25px] sm:after:bottom-[20px] after:mx-[0 auto] 
        after:border-solid after:rounded-[10px] after:border-[1px] after:border-[#004615] after:my-[0px] after:mx-[auto]">
            <BestDeals />
        </div>
    </div>
}
export default SectionWrapper(BestDealSection, '', "bg-primary sectionAutoPadding", "border_top", "")