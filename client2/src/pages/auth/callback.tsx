import { useRouter } from "next/router"
import { useEffect } from "react"
import Api from "../../utils/api"

const Callback = () => {
    const history = useRouter()
    console.log (history)
    useEffect(() => {

        const query = history.query
        Api().user.login(query)
            .then((res) => {
              console.log('callback', res)
                console.log(res)
                localStorage.setItem('accessToken', res)
            })
            .catch((e) => console.error(e))

    }, [history.query])
    return (
        <div className="w-full h-screen">Loading...</div>
    )
}
export default Callback
