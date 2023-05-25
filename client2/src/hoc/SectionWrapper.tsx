import { motion } from 'framer-motion'
import { staggerContainer } from '../utils/motion'
// import ".."
// @ts-ignore
const SectionWrapper = (Component, idName, styles) => () => {
    return (
        <motion.section
        // @ts-ignore
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`${styles} autoPaddings w-full relative z-0 overflow-hidden`}
        >
            <Component />
        </motion.section>
    ) 
}
export default SectionWrapper