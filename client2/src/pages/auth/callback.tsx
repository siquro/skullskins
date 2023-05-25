import { useRouter } from "next/router"
import { useEffect } from "react"
import Api from "../../utils/api"

const Callback = () => {
    const history = useRouter()

    useEffect(() => {

        const query = history.query
        Api().user.login(query)
            .then((res) => {
                localStorage.setItem('accessToken', res)
            })
            .catch((e) => console.error(e))

    }, [history.query])
    return (
        <h1>Hello</h1>
    )
}
export default Callback