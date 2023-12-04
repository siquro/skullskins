import Header from "../Header"
import { FC } from "react"

interface IGlovalHeroSection {
    styles: string;
    border_top: boolean;
    border_bottom: boolean;
    title_start: string;
    title_end: string;
}

const GlobalHeroSection: FC<IGlovalHeroSection> = ({ title_start, title_end, styles, border_top, border_bottom }) => {
    return <section className={`${styles} relative`}>
        {border_top && <div className="w-full gradient_border-top absolute" />}
        <div className="w-full">
            <Header />
            <div className='w-full flex items-center flex-col pb-[50px] md:pb-[100px]'>
                <h1 className='hero_text text-[32px] md:text-[48px] lg:text-[96px] text-center text-lightText font-grotesk'>{title_start} <span className="text-accent">{title_end}</span> </h1>
            </div>
        </div>
        {border_bottom && <div className="w-full gradient_border-bottom absolute" />}
    </section>
}
export default GlobalHeroSection;