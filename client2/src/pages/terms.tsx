import Header from "../components/Header"
import { SectionWrapper } from "../hoc"

const Terms = () => {
    return (
        <div className="w-full h-screen text-white  ">
            <Header/>
            <h1 className="text">Terms & Conditions</h1>

        </div>
    )
}
export default SectionWrapper(Terms, '', "gradientBack")