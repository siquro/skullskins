import { useRouter } from "next/router"
import Header from "../../components/Header"
import CardDetails from "./CardDetails"
import { useEffect } from "react"
import axios from "axios"
import GlobalHeroSection from "@/components/sections/GlobalHeroSection"

const Purchase = () => {


    const router = useRouter()

    // Check if user has any available orders

    const redirectUser: boolean = false



    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Checkout"}
                title_end={""}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full autoPaddings pb-[50px] sm:pb-[150px]">
                <CardDetails />
            </div>
        </main>
    )
}
export default Purchase