'use client'
import Mission from "./sections/Mission"
import GlobalHeroSection from "@/components/sections/GlobalHeroSection"
import GetInTouch from "@/components/sections/GetInTouch"
import OurCatalog from "@/components/sections/OurCatalog"

const About = () => {
    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"About"}
                title_end={"Us"}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full">
                <Mission />
                <OurCatalog/>
                <GetInTouch />
            </div>
        </main>
    )
}
export default About