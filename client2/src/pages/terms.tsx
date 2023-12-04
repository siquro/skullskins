import TermsContent from "@/components/sections/TermsContent"
import Header from "../components/Header"
import { SectionWrapper } from "../hoc"
import GlobalHeroSection from "@/components/sections/GlobalHeroSection"

const Terms = () => {
    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Terms &"}
                title_end={"Conditions"}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full">
                <TermsContent />
            </div>
        </main>
    )
}
export default SectionWrapper(Terms, '', "gradientBack", "", "")