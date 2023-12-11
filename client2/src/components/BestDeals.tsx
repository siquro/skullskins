import Image from 'next/image'
import { useRouter } from "next/router"
import React, { useState } from "react"
import Slider from "react-slick"
import { useAppDispatch, addToCart } from '@/redux';

const items: Array<any> = [
    { price: 150, imageURL: '/items/i1.png', marketHashName: 'AK-47', assetId:1 },
    { price: 54, imageURL: '/items/i2.png', marketHashName: 'Skull', assetId:2 },
    { price: 34, imageURL: '/items/i3.png', marketHashName: 'Crossbow', assetId:3  },
    { price: 2500, imageURL: '/items/i1.png', marketHashName: 'AK-47', assetId:4 },
    { price: 5, imageURL: '/items/i2.png', marketHashName: 'Skull', assetId:5 },
    { price: 15, imageURL: '/items/i3.png', marketHashName: 'Crossbow', assetId:6 },
]
const BestDeals = () => {
    const [currentItem, setCurrentItem] = useState(0);
    const router = useRouter()
    const [currentItemInfo, setCurrentItemInfo] = useState(items[currentItem]);
    const dispatch = useAppDispatch()

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        draggable: false,
        afterChange: (index: any) => handleAfterChange(index),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    fade: true,
                },
            },
        ],
    };

    const handleAfterChange = (index: number) => {
        setCurrentItem(index);
        setCurrentItemInfo(items[index]);
    };


    return (
        < div className="mt-[120px] sm:mt-[140px] pb-[50px]">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index}>
                        <div className={index === currentItem
                            ? "centeredItem scale-100 transition-transform duration-500 ease-in-out"
                            : "otherItem opacity-50 scale-75 transition-transform duration-500 ease-in-out"}>
                            <div className="relative flex w-[100%] items-center justify-center">
                                <Image src={item.imageURL} width={128} height={128} alt={item.name} className="item_img" />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <div className="bg-transparent min-h-[180px] sm:min-h-[230px] relative mt-[-180px] mx-auto flex rounded-[10px] fixed_frame items-end w-[200px] sm:w-[230px] md:w-[280px] lg:w-[320px]">
                <div className="relative min-h-[29px] h-[3vw] max-h-[90px] w-[100%] 
                   xl:rounded-[0_0_8px_0] rounded-[0_0_8px_0]
                   mx-auto my-0 pr-[1vw]
                   flex items-center">
                    <p className="ml-auto font-bold mr-3 text-[18px]">{currentItemInfo.marketHashName}</p>
                    <div className="absolute bg-accent text-primary px-[1vw] py-[2px] self-end skew-x-[-18deg] right-0 top-[-35px] mr-3">
                        <div className="skew-x-[18deg]">
                            <span className="text-[20px] font-bold">{currentItemInfo.price} $</span>
                        </div>
                    </div>
                </div>
                <button className="absolute bottom-[-110px] sm:bottom-[-100px] right-[0px] left-[0px] mx-auto my-0 
                font-barlow font-bold px-[45px] py-[15px] mt-[40px] text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover"
                    onClick={() => dispatch(addToCart(currentItemInfo))}  >ADD TO CART</button>
            </div>
        </div>
    );
}
export default BestDeals