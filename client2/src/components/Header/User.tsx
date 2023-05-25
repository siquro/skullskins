import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowSVG, SettingsSVG, LogoutSVG, ShoppingCart } from "./SVGAssets"
import { selectCartData, selectUserData, setUserData, useAppDispatch, useAppSelector } from "../../redux"

const User = () => {
    const user = useAppSelector(selectUserData)

    const { cart } = useAppSelector(selectCartData)

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(setUserData(null))
    }

    const [menuActive, setMenuActive] = useState<boolean>(false)
    return (

        <div className="flex items-center">

            <span className="font-bold mr-3">{user.userName}</span>
            <Image src={user.avatarURL} width={64} height={64} alt="steam_icon" className="rounded-md w-[42px] h-[42px]" />
            <div onClick={() => setMenuActive(true)}>
                <ArrowSVG className={"fill-red-50 hover:fill-gray-400 cursor-pointer hover:translate-y-1"} />
            </div>


            {menuActive && <div className="
                    
                    px-3 py-2 flex flex-col bg-white shadow-md text-black rounded-md gap-2 absolute top-[80%] z-[100]">

                <Link href="/settings">
                    <div className="group flex justify-between gap-5 cursor-pointer">
                        <SettingsSVG className={'w-[20px] h-[20px] '} />
                        <span className="group-hover:text-[gray]">Settings</span>
                    </div>
                </Link>

                <div onClick={() => logout()} className="group flex justify-between gap-5 cursor-pointer ">
                    <LogoutSVG className={'w-[20px] h-[20px]'} />
                    <span className="group-hover:text-[gray] ">Log out</span>
                </div>
            </div>}
        </div>
    )
}
export default User