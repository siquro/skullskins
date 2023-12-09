import GlobalHeroSection from "@/components/sections/GlobalHeroSection"
import Profile from "./Profile"

const Settings = () => {
    return (

        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Account"}
                title_end={"settings"}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full autoPaddings pb-[50px] sm:pb-[150px]">
                <Profile />
            </div>
        </main>
    )
}
export default Settings