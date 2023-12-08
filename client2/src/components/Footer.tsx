import Image from 'next/image'

const links = [
    { title: 'Privay Policy', link: '/privacy' },
    { title: 'Terms & Conditions', link: '/terms' },
    { title: 'Shop', link: '/shop' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/about#contact' },
]

const Footer = () => {

    return (
        <div className="flex flex-col bg-secondary items-center py-[28px] md:py-[30px] xl:py-[64px] px-[1vw]">
            <Image src="/skull_logoDemo.svg" width={70} height={70} alt="skull_logo" className="logo w-[70px] h-[auto] lg:h-[auto]" priority />

            <div className='flex justify-between items-center autoPaddings w-full pb-[40px] max-sm:flex-col'>
                {
                    links.map((el, idx) => (
                        <a href={el.link} key={idx} className="hover:text-accent text-lightText text-lg max-sm:py-[10px] font-barlow" >{el.title}</a>
                    ))
                }
            </div>

            <div>
                <a href="/" className="hover:text-accent text-lightText text-lg" >2023 @ skullskins</a>
            </div>
        </div>
    )
}
export default Footer