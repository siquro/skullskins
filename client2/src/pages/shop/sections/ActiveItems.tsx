import Image from "next/image"
import { IItem } from "../../../interfaces"
import { addToCart, removeFromCart, selectCartData, useAppDispatch, useAppSelector } from "../../../redux"
import { useSelector } from "react-redux"
import { CloseBTNSVG } from "../../../utils/SVGAssets"
interface IProps {
    item: IItem
    setActiveWatching: React.Dispatch<React.SetStateAction<IItem | null>>;
}
const ActiveItem: React.FC<IProps> = ({ item, setActiveWatching }) => {

    const { cart } = useAppSelector(selectCartData)
    const dispatch = useAppDispatch()


    const itemExistsInCard = cart.some((el: IItem) => el.assetId === item.assetId)

    const AddToCartButton: React.FC<any> = () => {
        return (
            <button onClick={() => dispatch(addToCart(item))} className="hover:opacity-70 h-[40px] w-[110px] bg-[#04D99D] rounded-md text-white font-bold">Add To Cart</button>

        )
    }

    const RemoveFromCartButton: React.FC<any> = () => {
        return (
            <button onClick={() => dispatch(removeFromCart(item.assetId))} className="hover:opacity-70 h-[40px] w-[110px] text-[12px] bg-red-500 rounded-md text-white font-bold">Remove From Cart</button>
        )
    }
    const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
    return (
        <div className="absolute  w-full h-full bg-[#1B3939] py-3">
            <div className="max-w-[600px] h-full bg-[#363636] mx-auto rounded-md p-4 relative flex flex-col justify-between">

                <div className="w-full flex justify-between">
                    <div className="flex flex-col justify-center items-center mx-auto">
                        <h1 className="title text-white">{item.marketHashName}</h1>
                        <p className="text-primary">Market Hash Name</p>
                    </div>


                    <div className="absolute right-4" onClick={() => setActiveWatching(null)}>
                        <CloseBTNSVG className="fill-white cursor-pointer hover:rotate-90 transition-transform duration-100 hover:fill-gray-400" />
                    </div>
                </div>

                <div className="w-full">
                    <Image priority src={imageFullURL} alt={item.marketHashName} width={256} height={256} className="mx-auto" />
                </div>

                <div className="w-full flex justify-between items-center">
                    <button className="h-[40px] flex  justify-center hover:opacity-70 items-center w-[110px] bg-secondary rounded-md text-white font-bold">
                        <Image priority src="./steam_icon.svg" alt={item.marketHashName} width={32} height={32} />
                    </button>
                    <div className="flex flex-col justify-center items-center mx-auto">
                        <h1 className="title text-[#FFD911]">$ {item.price}</h1>
                        <p className="text-primary">Market Price</p>
                    </div>

                    {!itemExistsInCard ? <AddToCartButton /> : <RemoveFromCartButton />}

                </div>
            </div>
        </div>

    )
}
export default ActiveItem