import { SectionWrapper } from "../../hoc"
import Image from 'next/image'
// import './globals.css'
import { IItem } from "../../interfaces"
import React from "react"

const items: Array<any> = [
    { price: 34, imageURL: '/items/i1.png', name: 'AK-47' },
    { price: 34, imageURL: '/items/i2.png', name: 'AK-47' },
    { price: 34, imageURL: '/items/i3.png', name: 'AK-47' },
]
const BestDeals = () => {

    return (
        <div className="w-full py-5">
            <div className="rounded-[10px] xl:rounded-[30px] px-[3vw] w-full h-[30vw] justify-between min-h-[95px] max-h-[384px] gradientBack flex items-center relative">
                <Image src="/arrow.png" width={10} height={16} alt={items[0].name} className="cursor-pointer hover:opacity-50" />
                <div className="opacity-50 flex items-center justify-center min-h-[68px] h-[10vw] max-h-[266px] w-1/4  rounded-[10px] skew-x-[-18deg] bg-[#222222CC]">
                    <div className="skew-x-[20deg]">
                        <Image src={items[1].imageURL} width={128} height={128} alt={items[0].name}
                            className="w-[64px] h-[64px] xl:w-[128px] xl:h-[128px] z-10" />
                    </div>
                </div>


                {/* center */}
                <div className="w-[30%] h-[80%] relative flex flex-col items-center">
                    <div className="absolute w-[calc(100%-2vw)] h-[calc(100%-2vw)] skew-x-[-18deg] rounded-[10px] rotate-[0] bg-primary z-0 p-[1vw]">
                        <div className="w-full h-full gradientBack blur-[10px]"></div>
                    </div>
                    <Image src={items[0].imageURL} width={128} height={128} alt={items[0].name}
                        className="w-[64px] h-[64px] xl:w-[128px] xl:h-[128px] mt-[3vw] z-10" />
                    <div className="w-full relative min-h-[29px] h-[3vw] max-h-[90px]  bg-[#01AFAB]
                    xl:rounded-[0_0_30px_0]
                    rounded-[0_0_10px_0]
                    mt-auto
                    flex
                    items-center
                    pr-[1vw]
                    ">
                        <button className="bg-[rgb(4,217,157)] h-full px-[1vw] p2 xl:rounded-[30px]
                    rounded-[10px] font-bold absolute left-[-30px] translate-y-0 hover:text-[#01AFAB]">ADD TO CART</button>
                        <p className="p2 ml-auto font-bold">{items[1].name}</p>
                        <div className="absolute bg-secondary px-[1vw] py-[2px] self-end skew-x-[-18deg] right-0 top-[-35px]">
                            <div className="skew-x-[18deg]">
                                <span className="text-[20px] font-bold">{items[0].price} $</span>
                            </div>

                        </div>
                    </div>

                </div>



                <div className="opacity-50 flex items-center justify-center min-h-[68px] h-[10vw] max-h-[266px] w-1/4  rounded-[10px] skew-x-[-18deg] bg-[#222222CC]">
                    <div className="skew-x-[20deg]">
                        <Image src={items[2].imageURL} width={128} height={128} alt={items[0].name}
                            className="w-[64px] h-[64px] xl:w-[128px] xl:h-[128px] z-10" />
                    </div>
                </div>

                <Image src="/arrow.png" width={10} height={16} alt={items[0].name}
                    className="rotate-[180deg] cursor-pointer hover:opacity-50" />
            </div>
        </div>
    )



}
export default SectionWrapper(BestDeals, '', "bg-[#016174]")