import Header from "../components/Header"
import { SectionWrapper } from "../hoc"

const Help = () => {
    return (
        <div className="w-full h-screen text-white  ">
            <Header/>
            <h1 className="text">Help</h1>

        </div>
    )
}
export default SectionWrapper(Help, '', "gradientBack", "", "")