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
    // const { user }: { user: IUser | null } = useAppSelector(selectUserData)
    const user = useAppSelector(selectUserData)
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
            .then((res) => {
                router.push('checkout/purchase')
            })
            .catch((e) => {
                setError('Sorry, Some error occured. Create a new order again...')
            })

    }


    const TableRecord: React.FC<IProp> = ({ item }) => {
        const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
        return (
            <tr>
                <td className="w-[25px]"><Image onClick={() => dispatch(removeFromCart(item.assetId))} src="/delete.png" width={48} height={48} alt={item.marketHashName}
                    className="w-[20px] cursor-pointer"
                /></td>
                <td><Image src={imageFullURL} width={128} height={128} alt={item.marketHashName} priority
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
            <Header />
            <h1 className="title mt-[3vw]">My Cart</h1>
            <h1 className="subHeader">Shopping cart</h1>

            {error ? <div>
                <h1 className="title mt-5">Sorry, some error occured. Make a new order again</h1>
            </div> :
                <div className="w-full flex flex-col sm:flex-row gap-[2vw] mt-[2vw]">

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
                            <span>+ 0%</span>
                        </div>
                        <div className="flex justify-between border-b-1 md:border-b-2 border-[#222222B2]">
                            <span className="p2">Total</span>
                            <span>$ {(totalPrice).toFixed(2)}</span>
                        </div>
                        {cart.length === 0 ? <></> :


                            !payBTNLoading ? <button onClick={handleCheckoutBTN} disabled={payBTNLoading} className="w-full hover:opacity-60 hover:text-gray-400  transition:opacity duration-300 btnText py-[.5vw] rounded-[inherit] outline-none  bg-[rgb(0,152,148)]">
                                {
                                    'Procceed to checkout'
                                }
                            </button>
                                :
                                <button disabled type="button" className="w-full hover:opacity-60 hover:text-gray-400  transition:opacity duration-300 btnText py-[.5vw] rounded-[inherit] outline-none  bg-[rgb(0,152,148)]">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                    Loading...
                                </button>}

                    </div>


                </div>}
        </div>
    )
}
export default SectionWrapper(ShoppingCart, '', "gradientBack")