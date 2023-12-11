import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { SectionWrapper } from "../../hoc";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionTitles from '../SectionTitles';

const comments = [
    {
        name: 'Chin Jon',
        text: 'Absolutely love the variety of skins available at CullSkins! I bought a Fortnite skin and the quality is amazing. The transaction was smooth, and the delivery was quick. Will definitely come back for more!',
        stars: 5
    },
    {
        name: 'Doa Cha',
        text: 'CullSkins has an impressive collection of skins for different games. I got a CS:GO skin, and it is fantastic! The only downside was the slightly delayed delivery, but the quality of the skin made up for it. Great service overall.',
        stars: 4
    },
    {
        name: 'John Doe',
        text: 'I`ve purchased several skins from CullSkins for various games, and I`ve never been disappointed. The designs are unique, and the website is user-friendly. Plus, their customer service is top-notch. Highly recommended!',
        stars: 5
    },
    {
        name: 'Doa Cha',
        text: 'CullSkins is my go-to place for game skins! I`ve bought skins for League of Legends and Overwatch, and they never disappoint. The quality is consistent, and I`ve never had any issues with payments or deliveries. Highly recommended for all gamers!',
        stars: 5
    }
]


const Comments = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const Card = ({ name, text, stars }: { name: string, text: string, stars: number }) => {
        return <div
            className="relative min-h-[440px] flex flex-col justify-center mx-[20px] rounded-[10px] p-[15px] sm:p-[2em] bg-[#1c1c1c80]">
            <div className='rounded-[10px] border-solid border-2 border-[#02fe4f] bg-bgGreenOneCornerShade p-[2em] min-h-[370px] '>
                <dt className="flex justify-center">
                    <div className="flex flex-row h-10 w-10 justify-center gap-1">
                        {
                            new Array(stars).fill(1).map((star, key) =>
                                <Image src="./star-reviews.svg" key={key} width={28} height={28} alt="star" className=' w-[15px] sm:w-[auto] h-[auto]' />)
                        }
                    </div>
                </dt>
                <dd className="mt-7 mb-3 text-2xl text-center font-semibold leading-7 font-grotesk"> {name}</dd>
                <dd className="mt-2 text-base text-center leading-7 text-lightText  font-barlow">{text}</dd>
            </div>

        </div>
    }

    return <div className=''>
        <SectionTitles firstWord={"Reviews"} lastWord={''} />

        <div className='w-full'>
            <Slider {...settings}>
                {comments.map((el, idx) => <div className='' key={idx}><Card text={el.text} stars={el.stars} name={el.name} /> </div>)}
            </Slider>
        </div>
    </div>
}
export default SectionWrapper(Comments, '', "sectionAutoPadding  bg-lightHeroBg backgroundImage", "border_top", "border_bottom")
