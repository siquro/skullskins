import Image from "next/image"
import { setUserData, useAppDispatch } from "../../redux";
import Api from "../../utils/api";
import { useEffect } from "react";
const SteamButton = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log(process.env.BASE_URL)
        console.log(`http://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${process.env.BASE_URL}/auth/callback&steam_response&openid.realm=${process.env.BASE_URL}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`)
    }, [])
    const handleLogin = async () => {

        const url = `http://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${process.env.BASE_URL}/auth/callback&steam_response&openid.realm=${process.env.BASE_URL}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`
        const newWindow = window.open(url, '_blank', 'width=1000,height=800');

        if (newWindow) {
            const inter = setInterval(() => {
                if (localStorage.getItem('accessToken')) {
                    Api()
                        .user.getMe()
                        .then((res) => {
                            dispatch(setUserData(res));
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    clearInterval(inter);
                    newWindow.close()
                }
            }, 500)
        }
    };



    return (
        <div className="flex items-center gap-[102.27px] cursor-pointer hover:opacity-60">
            <a onClick={
                async () => {
                    await handleLogin();
                }
            } className="hidden items-center gap-[16px] sm:flex">
                <span>Sign in Steam</span>
                <Image src="/steam_icon.svg" width={32} height={32} alt="steam_logo" priority />
            </a>
        </div>
    )
}
export default SteamButton