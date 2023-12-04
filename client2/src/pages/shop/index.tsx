import GlobalHeroSection from "@/components/sections/GlobalHeroSection"
import Header from "../../components/Header"
import { IShopList } from "../../interfaces"
import ShoppingCart from "../checkout/ShoppingCart"
import ItemList from "./sections/ItemList"

const Shop = () => {

    return (
        <main className="w-full bg-primary">
            <GlobalHeroSection
                title_start={"Shop"}
                title_end={""}
                styles={"bg-bgWaveRight backgroundImage autoPaddings"}
                border_top={false}
                border_bottom={true} />

            <div className="w-full">
                <ItemList />
            </div>
        </main>
    )
}
export default Shop