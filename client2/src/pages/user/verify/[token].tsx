import { useRouter } from "next/router";
import { useEffect } from "react";
import Api from "../../../utils/api";
import { useDispatch } from "react-redux";
import { selectUserData, setUserData } from "../../../redux";
import { useSelector } from "react-redux";

const TokenVerificiation = () => {
    const router = useRouter();
    const { query } = router
    const dispatch = useDispatch()
    const user = useSelector(selectUserData)
    useEffect(() => {
        // @ts-ignore
        Api().user.updateEmail(query.token)
            .then((res: any) => {
                dispatch(setUserData({
                    ...user,
                    email: res.email
                }))
                router.push('/')
            })
            .catch((e) => console.error(e))
    }, [query])

    return (
        <div className="h-screen w-full p-4">
            Email verified...
        </div>
    )
}
export default TokenVerificiation