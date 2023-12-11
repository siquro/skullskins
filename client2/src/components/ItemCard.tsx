import Image from 'next/image'
import { useRouter } from "next/router"
import React from "react"

interface IItems {
    imageURL: string
    name: string
    price: number
    idx: number
}

const ItemCard: React.FC<IItems> = ({ imageURL, name, price, idx, }) => {
    const router = useRouter()

    return (
        <div className="rounded-[10px] border-solid border-[1px] border-[#004615] bg-[#02010100] p-[15px] md:p-[2em]
        hover:border-[#02fe4f] hover:bg-bgCardHover cursor-pointer"
            onClick={() => router.push('/shop')}>

            <Image src={imageURL} width={128} height={128} alt={name}
                className="w-[90px] h-[90px] xl:w-[128px] xl:h-[128px] offer-item my-[0] mx-[auto]"
            />

            <h3 className="text mb-0 font-grotesk mt-[20px]">{name}</h3>
            <p className="text mb-0 font-barlow text-accent font-[18px]">€ {price}</p>

            <div className='flex justify-end'>
                <Image src='/cart.svg' width={45} height={40} alt={name}
                    className="w-[35px] h-[35px] md:w-[45px] md:h-[40px] hover:scale-110"
                />
            </div>
        </div>
    );
}
export default ItemCard