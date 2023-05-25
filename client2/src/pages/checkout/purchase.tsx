import { useRouter } from "next/router"
import Header from "../../components/Header"
import CardDetails from "./CardDetails"
import { useEffect } from "react"
import axios from "axios"

const Purchase = () => {


    const router = useRouter()

    // Check if user has any available orders

    const redirectUser: boolean = false



    return (
        <div className="w-full h-screen autoPadding gradientBack">
            <Header />
            <CardDetails />
        </div>
    )
}
export default Purchase