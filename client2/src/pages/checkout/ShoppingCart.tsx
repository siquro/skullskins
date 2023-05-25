'use client'
import React, { useEffect, useState } from "react"
import { SectionWrapper } from "../../hoc"
import Image from "next/image"
import { IItem, IUser } from "../../interfaces"
import { removeFromCart, selectCartData, selectUserData, useAppDispatch, useAppSelector } from "../../redux"
import Api from "../../utils/api"
import Header from "../../components/Header"
import { useRouter } from "next/router"
import CardDetails from "./CardDetails"


interface IProps {
    items: Array<IItem>
}
interface IProp {
    item: IItem
}
const ShoppingCart: React.FC<any> = () => {
    const dispatch = useAppDispatch()
    const { user }: { user: IUser } = useAppSelector(selectUserData)
    const { cart, totalPrice }: { cart: Array<IItem>, totalPrice: number } = useAppSelector(selectCartData)

    const [checkedCartItems, setCheckedCartItems] = useState<Array<IItem>>([])

    const [payBTNLoading, setPayBTNLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleCheckoutBTN = () => {


        // Check for availability of each product
        cart.forEach(async (el) => {
            try {
                const itemIsAvailable: boolean = await Api().items.checkItemForQuantity('252490', el.assetId)
                if (!itemIsAvailable) setError('Sorry, Some error occured. Create a new order again...')
            }
            catch (e: any) {
                setError(e.code)
                return
            }
        })
        // Make order
        setPayBTNLoading(true)
        Api().orders.createOrder({
            items: cart.map((el) => ({
                assetId: el.assetId,
                price: el.price
            }))
        })
            .then((res)=> {
                router.push('checkout/purchase')
            })
            .catch((e) => {
                setError('Sorry, Some error occured. Create a new order again...')
            })

        // Make reservation ()


        // router.push('/checkout/purchase')
    }


    const TableRecord: React.FC<IProp> = ({ item }) => {
        const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
        return (
            <tr>
                <td className="w-[25px]"><Image onClick={() => dispatch(removeFromCart(item.assetId))} src="/delete.png" width={48} height={48} alt={item.marketHashName}
                    className="w-[20px] cursor-pointer"
                /></td>
                <td><Image src={imageFullURL} width={128} height={128} alt={item.marketHashName}
                    className="w-[80%] h-[80%]"
                /></td>
                <td className="text-right">{item.marketHashName}</td>
                <td className="text-right">$ {item.price}</td>
                <td className="text-right">1</td>
                <td className="text-right">$ {item.price}</td>
            </tr>
        )
    }
    return (
        <div className="w-full h-screen  text-white">
            <Header/>
            <h1 className="title mt-[3vw]">My Cart</h1>
            <h1 className="subHeader">Shopping cart</h1>

            {error ? <div>
                <h1 className="title mt-5">Sorry, some error occured. Make a new order again</h1>
            </div> : 
            <div className="w-full flex flex-col  sm:flex-row gap-[2vw] mt-[2vw]">

                <div className="w-full max-h-[500px] overflow-y-auto bg-[#363636] rounded-sm xl:rounded-xl p-[1vw] p2">
                    <table className="w-full table-fixed">
                        <tbody>
                            <tr className="mt-4 border-collapse border-b-[#222222B2] border-b-2">
                                <td className="w-[25px]"></td>
                                <td></td>
                                <td className="text-right">Product</td>
                                <td className="text-right">Price</td>
                                <td className="text-right">Quantity</td>
                                <td className="text-right">Subtotal</td>
                            </tr>

                            {
                                cart.map((el) => <TableRecord item={el} key={el.assetId} />)
                            }


                        </tbody>
                    </table>
                </div>


                <div className="w-[60%] h-fit  bg-[#363636] rounded-sm xl:rounded-xl p-[1vw] p2 flex flex-col gap-[2vw] mx-auto">
                    <h1 className="title">My cart</h1>
                    <div className="flex justify-between border-b-1 md:border-b-2 border-[#222222B2]">
                        <span className="p2">Subtotal</span>
                        <span>$ {totalPrice}</span>
                    </div>
                    <div className="flex justify-between border-b-1 md:border-b-2 border-[#222222B2]">
                        <span className="p2">Vat</span>
                        <span>+ 21%</span>
                    </div>
                    <div className="flex justify-between border-b-1 md:border-b-2 border-[#222222B2]">
                        <span className="p2">Total</span>
                        <span>$ {totalPrice * 1.21}</span>
                    </div>
                    <button onClick={handleCheckoutBTN} disabled={payBTNLoading} className="w-full hover:opacity-60 hover:text-gray-400  transition:opacity duration-300 btnText py-[.5vw] rounded-[inherit] outline-none  bg-[rgb(0,152,148)]">
                        {
                            payBTNLoading ? 'Loading...' : 'Procceed to checkout'
                        }
                    </button>

                </div>

                
            </div>}
        </div>
    )
}
export default SectionWrapper(ShoppingCart, '', "gradientBack")