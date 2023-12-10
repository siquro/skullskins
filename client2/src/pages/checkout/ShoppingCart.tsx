'use client'
import React, { useEffect, useState } from "react"
import { SectionWrapper } from "../../hoc"
import Image from "next/image"
import { IItem, IUser } from "../../interfaces"
import { removeFromCart, selectCartData, selectUserData, useAppDispatch, useAppSelector } from "../../redux"
import Api from "../../utils/api"
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
        // const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`

        //delete this after redesign
        const imageFullURL = item.imageURL

        return (
            <tr className="font-barlow h-[100px]">
                <td className="w-[25px]"><Image onClick={() => dispatch(removeFromCart(item.assetId))} src="/delete.svg" width={48} height={48} alt={item.marketHashName}
                    className="w-[20px] cursor-pointer opacity-80 hover:opacity-100"
                /></td>
                <td className="w-[100px] p-[10px]" ><Image src={imageFullURL} width={80} height={80} alt={item.marketHashName} priority
                    className="w-[60%] h-[60%] mx-auto"
                /></td>
                <td className="text-right p-[10px]">{item.marketHashName}</td>
                <td className="text-right p-[10px]">$ {item.price}</td>
                <td className="text-right p-[10px]">1</td>
                <td className="text-right p-[10px]">$ {item.price}</td>
            </tr>
        )
    }
    return (
        <div className="w-full text-lightText mt-5 mx-auto">

            {error ?
                <div>
                    <h1 className="mt-5 font-grotesk text-[22px]">Sorry, some error occured. Make a new order again.</h1>
                    <button
                        className='font-barlow font-bold px-[45px] py-[15px] mt-[40px] custom_btn text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover'
                        onClick={() => router.push('/shop')}>SHOP NOW</button>
                </div>
                :
                <div className="w-full flex flex-col sm:flex-row gap-[2vw] mt-[2vw]">

                    <div className="w-full max-h-[500px] overflow-y-auto  p-[15px] p2 rounded-[10px] border-solid border-2 border-[#02fe4f] bg-bgGreenOneCornerShade ">
                        <table className="w-full table-fixed font-grotesk">
                            <tbody>
                                <tr className="mt-4 border-collapse border-b-[#004615] border-b-2 font-grotesk font-bold text-[18px]">
                                    <td className="w-[25px]"></td>
                                    <td className="w-[100px] md:w-[120px]"></td>
                                    <td className="text-right w-[100px]">Product</td>
                                    <td className="text-right w-[70px]">Price</td>
                                    <td className="text-right w-[100px]">Quantity</td>
                                    <td className="text-right w-[100px]">Subtotal</td>
                                </tr>

                                {
                                    cart.map((el) => <TableRecord item={el} key={el.assetId} />)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="w-[100%] sm:w-[60%] h-fit rounded-[10px] p-[15px] p2 flex flex-col gap-[2vw] mx-auto mt-[40px] sm:mt-[0] bg-[#222222CC]">
                        <h1 className="font-grotesk font-bold text-[18px]">My cart</h1>
                        <div className="flex justify-between border-b-1 md:border-b-2 border-[#004615]">
                            <span className="p2">Subtotal</span>
                            <span>$ {totalPrice}</span>
                        </div>
                        <div className="flex justify-between border-b-1 md:border-b-2 border-[#004615]">
                            <span className="p2">Vat</span>
                            <span>+ 0%</span>
                        </div>
                        <div className="flex justify-between border-b-1 md:border-b-2 border-[#004615]">
                            <span className="p2">Total</span>
                            <span>$ {(totalPrice).toFixed(2)}</span>
                        </div>

                        {cart.length === 0 ? <></> : !payBTNLoading ?
                            <button onClick={handleCheckoutBTN} disabled={payBTNLoading} className='w-full font-barlow font-bold px-[25px] py-[15px] mt-[40px] custom_btn text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover'>
                                {'Procceed to checkout'}
                            </button>
                            :
                            <button disabled type="button" className="w-full font-barlow font-bold px-[25px] py-[15px] mt-[40px] custom_btn text-lightText rounded-[10px] bg-btnBg hover:opacity-90">
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
export default SectionWrapper(ShoppingCart, '', "", "", "")