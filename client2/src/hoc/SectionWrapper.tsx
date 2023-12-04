import { motion } from 'framer-motion'
import { staggerContainer } from '../utils/motion'
// import ".."
// @ts-ignore
const SectionWrapper = (Component, idName, styles, border_top, border_bottom) => () => {
    return (
        <>
            <motion.section
                // @ts-ignore
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`${styles} w-full relative z-0 overflow-hidden`}
            >
                {border_top && <div className="w-full gradient_border-top absolute" />}
                <Component />
                {border_bottom && <div className="w-full gradient_border-bottom absolute" />}
            </motion.section>
        </>

    )
}
export default SectionWrapper