import Header from "../components/Header"
import { SectionWrapper } from "../hoc"

const Privacy = () => {
    return (
        <div className="w-full h-screen text-white  ">
            <Header/>
            <h1 className="text">Privacy Policy</h1>

        </div>
    )
}
export default SectionWrapper(Privacy, '', "gradientBack")