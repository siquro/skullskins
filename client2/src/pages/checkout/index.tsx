import { useRouter } from "next/router"
import { IItem, IUser } from "../../interfaces"
import { selectCartData, selectUserData, useAppSelector } from "../../redux"
import ShoppingCart from "./ShoppingCart"
import { useEffect } from "react"
import Header from "../../components/Header"
import CardDetails from "./CardDetails"

const Checkout = () => {
    const user: IUser = useAppSelector(selectUserData)
    const router = useRouter()

    useEffect(() => {
        if (!user || !user.tradeOfferLink || !user.email) router.back()
    }, [])

    return (
        <>
            <ShoppingCart />
        </>
    )
}
export default Checkout