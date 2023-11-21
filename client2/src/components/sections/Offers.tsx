'use client'
import { motion } from "framer-motion"
import { SectionWrapper } from "../../hoc"
import Image from 'next/image'
import { IItem } from "../../interfaces"
import React from "react"
import { fadeIn, textVariant } from "../../utils/motion"
import { useRouter } from "next/router"

const topItems: Array<any> = [
    { price: 34, imageURL: '/items/i1.png', name: 'AK-47' },
    { price: 34, imageURL: '/items/i2.png', name: 'AK-47' },
    { price: 34, imageURL: '/items/i3.png', name: 'AK-47' },
]
const Offers = () => {
    const router = useRouter()

    const ItemCard: React.FC<any> = ({ price, imageURL, name }) => {
        return (
            <div className="min-w-[76px] max-w-[304px] w-full aspect-square bg-primary rounded-[10px] flex flex-col items-center justify-between p-[1vw]">

                <p className="text mb-0">{name}</p>
                <Image src={imageURL} width={128} height={128} alt={name}
                    className="w-[64px] h-[64px] xl:w-[128px] xl:h-[128px]"
                />
                <Image src='/cart.png' width={45} height={40} alt={name}
                onClick={() => router.push('/shop')}
                    className="self self-end clear-left w-[22.5px] h-[20px] md:w-[45px] md:h-[40px] cursor-pointer hover:scale-110 "
                />

            </div>
        )
    }

    return <div className="pb-5">
        <div className="w-full flex relative">

            <div className="bg-secondary absolute opacity-90 mt-[1rem] sm:mt-[2rem] md:mt-[4rem] rounded-[10px] lg:rounded-[45px]
                 flex items-center
                 w-[calc(100%-50px)]

                 min-h-[105px]
                 h-[20vw]
                 max-h-[420px]

                 pl-[5vw]
                 ">
                <motion.p variants={textVariant(1)} className="title">Take a look at our catalog <br /> to find the skin for your <br /> needs</motion.p>

            </div>

            <div className="relative ml-auto ">
                <div className="relative
                    gradientBack 
                    lg:w-[450px]
                    lg:h-[623px]
                    md:w-[301px]
                    md:h-[415.3px]
                    sm:w-[201px]
                    sm:h-[276.8px]
                    w-[134px]
                    h-[184px]

                    skew-x-[-20deg]
                ">
                    <motion.div variants={fadeIn('left', 'linear', .5, 1)}>
                        <Image src="/offers_section/man_gun.png"
                            width={374}
                            height={573}
                            alt={"skull_skins"}
                            className="skew-x-[20deg] absolute

                            lg:w-[374px]
                            lg:h-[573px]
                            lg:mt-[80px]
                            lg:ml-[35px]

                            md:w-[249px]
                            md:h-[382px]
                            md:mt-[53px]
                            md:ml-[23.3px]

                            sm:w-[166px]
                            sm:h-[254px]
                            sm:mt-[35.3px]
                            sm:ml-[15.53px]

                            w-[110.6px]
                            h-[169.33px]
                            mt-[23.5px]
                            ml-[10.33px]
                        
                            "
                        />
                    </motion.div>

                </div>
            </div>
        </div>

        <div className="
        gradientBack
        w-full
        rounded-[10px] 
        xl:rounded-[45px]
        relative 
        bg-opacity-70
        flex
        p-[2vw]
        gap-[3vw]
        items-center
        justify-center
        "
        >
            <p className="absolute top-[-40px] text underline text-[#04D99D] ml-10 left-0">TOP ITEMS</p>
            {topItems.map((el, index) => <ItemCard key={index} price={el.price} imageURL={el.imageURL} name={el.name} />)}
        </div>

    </div>
}
export default SectionWrapper(Offers, '', "bg-offersBg backgroundImage")
