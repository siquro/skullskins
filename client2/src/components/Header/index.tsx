import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { selectCartData, selectUserData, setUserData, useAppDispatch, useAppSelector } from "../../redux"
import SteamButton from "./SteamButton"
import { ArrowSVG, LogoutSVG, SendSVG, SettingsSVG, ShoppingCart } from "./SVGAssets"
import User from "./User"
import { toast } from "react-toastify"
import { IUser } from "../../interfaces"
import { useRouter } from "next/router"

const Header: React.FC<any> = ({ }) => {

    const user: IUser = useAppSelector(selectUserData)
    const router = useRouter()
    const { cart } = useAppSelector(selectCartData)
    const dispatch = useAppDispatch()

    const [burgerActive, setBurgerActive] = useState<boolean>(false)

    const customId = "solo";
    const notify = (message: string) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: customId
        });
    }
    const handleShopCartClick = () => {
        if (!user) { notify("Sign up with Steam Profile !"); return }
        else if (!user.tradeOfferLink) { notify('Steam trade offer link is missing !'); return }
        else if (!user.email) { notify('Email is missing in profile !'); return }
        else {
            router.push('/checkout')
        }

    }



    return (
        <div className="header autoPaddings py-[32px]  flex items-center justify-between relative bg-none">

            {burgerActive && <div className="w-fit h-[200px] bg-black absolute top-[60px] flex flex-col gap-4 p-5 rounded-xl z-[100]">
                <a href="/login" onClick={() => { setBurgerActive(false) }} className="flex gap-5 items-center">
                    <span>Sign in Steam</span>
                    <Image src="/skull_logoDemo.svg" width={32} height={32} alt="steam_logo w-[32px] h-[auto]" priority />
                </a>
                <Link href="/" onClick={() => { setBurgerActive(false) }}><span>Home</span></Link>
                <Link href="/about" onClick={() => { setBurgerActive(false) }}><span>About us</span></Link>
                <Link href="/shop" onClick={() => { setBurgerActive(false) }}><span>Shop</span></Link>
            </div>}

            <Image className="block md:hidden cursor-pointer" src="/burger_menu.svg" width={25} height={16} alt="menu" onClick={() => {
                setBurgerActive(true)
            }} />

            <nav className="hidden md:block">
                <Link href="/">
                    <span className="mr-[64px] hover:text-gray-300">Home</span>
                </Link>
                <Link href="/about">
                    <span className=" mr-[64px] hover:text-gray-300">About Us</span>
                </Link>
                <Link href="/shop">
                    <span className="mr-[64px] hover:text-gray-300">Shop</span>
                </Link>
            </nav>
            <Link href="/" className="hidden md:block">
                <Image src="/skull_skins-text.svg" width={64} height={64} alt="skull_logo" className="skullLogo w-[64px] h-auto" priority />
            </Link>

            <div className="flex items-center">
                <Link href={"/user/trades"}>
                    <SendSVG className={'w-2[24px] h-[24px] fill-white cursor-pointer hover:scale-110 hover:fill-gray-200'} />
                </Link>

                <div className="relative mr-[1vw]" onClick={handleShopCartClick}>
                    <div className="absolute top-[-50%] right-[0] w-[20px] h-[20px]
                 text-gray-500 bg-white text-center rounded-full">
                        <span>{cart.length}</span>
                    </div>

                    <ShoppingCart className="w-2[24px] h-[24px] fill-white cursor-pointer hover:scale-110 hover:fill-gray-200" />
                </div>

                {user ? <User /> : <SteamButton />}
            </div>
        </div>

    )
}
export default Header
