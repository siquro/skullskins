import Header from "../../components/Header"
import { IShopList } from "../../interfaces"
import ShoppingCart from "../checkout/ShoppingCart"
import ItemList from "./sections/ItemList"
const Shop = () => {
    return (

        <div className="w-full gradientBack">
            <Header/>
            <ItemList />
        </div>
    )
}
export default Shop