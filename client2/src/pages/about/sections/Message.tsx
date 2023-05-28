import { SectionWrapper } from "../../../hoc"

const Message = () => {
    return (
        <div className="w-[90%] mb-[5vw]  shadow-2xl  mx-auto gradientBack min-h-[113px] h-[40vw] max-h-[490px] flex flex-col caret-slate-900 items-center p-[1vw_4vw_4vw_4vw] relative rounded-[0_0_10px_10px] xl:ronded-[0_0_30px_30px]">
            <p className="title text-center">Send a message</p>
            
                <input type="text" placeholder="Name" className="input" />
                <input type="text" placeholder="Email adress" className="input"/>
                <textarea name="" id="" rows={10} className="input h-[5vw]"></textarea>
                
            <button className="p2 bg-[#009894] shadow-2xl font-bold px-[1vw] py-[.5vw] rounded-[5px] xl:rounded-[10px] absolute top-[calc(95%)] hover:bg-opacity-75">SUBMIT</button>
        
        </div>
    )
}
export default SectionWrapper(Message, '', "")