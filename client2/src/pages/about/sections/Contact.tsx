import { SectionWrapper } from "../../../hoc"

const Contact = () => {
    return (
        <div className="mt-[5vw] w-full bg-[#222222CC] min-h-[179px] h-[40vw] max-h-[805px] flex flex-col items-center p-[1vw_3vw_3vw_3vw] rounded_box relative">
            <p className="title text-center">GET IN TOUCH</p>

            <div className="flex w-full h-full">
                <div className="w-[50%] h-full  rounded_box bg-[#222222CC] p-[4vw]">
                    <p className="p2 font-bold">Address</p>
                    <p className="p2">63-66 Hatton Gardens, London, EC1N 8LE</p>

                    <p className="p2 font-bold mt-[2vw]">Phone</p>
                    <p className="p2">(+021) 345 678 910</p>

                    <p className="p2 font-bold mt-[2vw]">Email</p>
                    <p className="p2">customer@skullskins.online</p>
                    <p className="p2 font-bold mt-[2vw]">Follow Us</p>
                    <p className="p2"></p>
                </div>
                <div className="w-[50%] h-full  rounded_box bg-[#222222CC]">
                    GOOGLE MAPS
                </div>
            </div>
        </div>
    )
}
export default SectionWrapper(Contact, '', "")