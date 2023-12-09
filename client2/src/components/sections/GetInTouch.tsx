import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import SectionTitles from "../SectionTitles";

const GetInTouch = () => {

    return <div className='w-full py-4 relative flex flex-col md:flex-row' id="contact" >
        <div className="flex flex-col items-center relative w-[100%] md:w-[50%]">
            <div className="rounded_box bg-[#222222CC] p-[4vw] w-[100%] md:w-40px">
                <SectionTitles firstWord={"get in"} lastWord="touch" />
                <p className="p2">We’re on a mission to enable everyone to discover the joy of gaming. We hope that our products and resources can help you on your own gaming journey, and we look forward to welcoming you to our community of gamers.</p>
                <p className="p2 font-bold mt-[2vw]">Address</p>
                <p className="p2">63-66 Hatton Gardens, London, EC1N 8LE</p>

                <p className="p2 font-bold mt-[2vw]">Phone</p>
                <p className="p2">(+021) 345 678 910</p>

                <p className="p2 font-bold mt-[2vw]">Email</p>
                <p className="p2">customer@skullskins.online</p>
                <p className="p2 font-bold mt-[2vw]">Follow Us</p>
                <p className="p2"></p>
            </div>
        </div>

        <motion.div variants={fadeIn('left', 'linear', .2, 1)}
            className="mx-auto flex flex-col caret-slate-900 items-center relative w-[100%] md:w-[50%] self-center my-[40px] py-[40px]">
            <p className="title text-center">Send a message</p>

            <input type="text" placeholder="Name" className="input" />
            <input type="text" placeholder="Email adress" className="input" />
            <textarea name="" id="" rows={10} placeholder="Message here" className="input h-[5vw]" ></textarea>


            <button className='font-barlow font-bold px-[45px] py-[15px] mt-[40px] text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover'>SUBMIT</button>
        </motion.div>
    </div>
}
export default SectionWrapper(GetInTouch, '', "bg-bgGreenTwoCornerShade sectionAutoPadding", "border_top", "")