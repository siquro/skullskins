import { useRouter } from "next/router";
import { IItem, IUser } from "../../interfaces";
import { selectCartData, selectUserData, useAppSelector } from "../../redux";
import ShoppingCart from "./ShoppingCart";
import { useEffect } from "react"
import Header from "../../components/Header"
import CardDetails from "./CardDetails"
import GlobalHeroSection from "@/components/sections/GlobalHeroSection";

const Checkout = () => {
    const user: IUser = useAppSelector(selectUserData)
    const router = useRouter()


    //open this lines after redesign
    // useEffect(() => {
    //     if (!user || !user.tradeOfferLink || !user.email) router.back()
    // }, [])

    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Shopping"}
                title_end={"cart"}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full autoPaddings pb-[50px] sm:pb-[150px]">
                <ShoppingCart />
            </div>
        </main>
    )
}
export default Checkout;