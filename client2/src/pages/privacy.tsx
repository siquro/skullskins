import GlobalHeroSection from "@/components/sections/GlobalHeroSection"

import Header from "../components/Header"
import { SectionWrapper } from "../hoc"
import PrivacyContent from "@/components/sections/PrivacyContent"

const Privacy = () => {
    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Privacy"}
                title_end={"Policy"}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full">
                <PrivacyContent />
            </div>
        </main>
    )
}
export default SectionWrapper(Privacy, '', "gradientBack", "", "")