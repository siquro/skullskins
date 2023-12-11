import Image from "next/image";
import { IItem } from "../../../interfaces";
import { addToCart, removeFromCart, selectCartData, useAppDispatch, useAppSelector } from "../../../redux";
import { useSelector } from "react-redux";
import { CloseBTNSVG } from "../../../utils/SVGAssets";

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
            <button onClick={() => dispatch(addToCart(item))}
                className="h-[40px] w-[110px] cursor-pointer transition ease-in-out delay-200 
            font-barlow font-bold custom_btn text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover ">Add To Cart</button>
        )
    }

    const RemoveFromCartButton: React.FC<any> = () => {
        return (
            <button onClick={() => dispatch(removeFromCart(item.assetId))}
                className="hover:opacity-70 h-[40px] w-[110px] text-[12px] bg-red-500 cursor-pointer transition ease-in-out delay-200 
            font-barlow font-bold custom_btn text-lightText rounded-[10px]">Remove From Cart</button>
        )
    }

    //DONT DELETE THIS IMAGE LINK FROM STEAMSTATIC AFTER REDISGN DELETE SECOND ONE
    // const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
    const imageFullURL = `${item.imageURL}`

    return (
        <div className={`absolute bg-secondary rounded-[10px] p-[10px] sm:p-[2em] mt-[110px] sm:mt-[48px] mx-[auto] w-full h-fit sm:h-[500px] md:h-full`}>
            <div className="h-full mx-auto p-[10px] sm:p-4 relative flex flex-col sm:flex-row justify-between w-[100%]">
                <div className="w-[100%] sm:w-1/2 bg-primary h-[250px] sm:h-full flex items-center
                border-[#004615] border-solid border sm:rounded-l-[10px]">
                    <Image priority src={imageFullURL} alt={item.marketHashName} width={256} height={256} className="mx-auto w-[150px] h-auto md:w-[256px]" />
                </div>

                <div className="relative w-[100%] sm:w-1/2 flex flex-col justify-between p-[15px] sm:p-[2em] h-[350px] sm:h-[auto] bg-bgGreenOneCornerShade
                sm:rounded-r-[10px] border-solid border-2 border-[#02fe4f]">

                    <div className="absolute right-[15px] top-[15px]" onClick={() => setActiveWatching(null)}>
                        <CloseBTNSVG className="fill-white cursor-pointer hover:rotate-90 transition-transform duration-100 hover:fill-secondAccent w-[25px] h-[25px]" />
                    </div>

                    <div className="w-full mt-[50px] sm:mt-[30%] flex flex-col md:flex-row justify-between">
                        <div className="">
                            <h1 className="title text-accent text-[32px] font-bold">{item.marketHashName}</h1>
                            <p className="text-lightText">Market Hash Name</p>
                        </div>

                        <div className="mt-[20px] md:mt-[0]">
                            <h1 className="title text-secondAccent text-[32px] font-bold">$ {item.price}</h1>
                            <p className="text-lightText">Market Price</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center">
                        <button className="h-[40px] sm:flex  hover:opacity-70 items-center sm:w-[110px] bg-transparent rounded-md text-white font-bold">
                            <Image priority src="./steam_icon.svg" alt={item.marketHashName} width={42} height={42} className="w-[32px] sm:w-[42px]  h-[auto]" />
                        </button>

                        {!itemExistsInCard ? <AddToCartButton /> : <RemoveFromCartButton />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ActiveItem