
const links = [
    { title: 'Privay Policy', link: '/privacy' },
    { title: 'Terms & Conditions', link: '/terms' },
    { title: 'Buy', link: '/shop' },
    { title: 'Help', link: '/help' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/about#contact' },
    { title: '2023 @ skullskins', link: '/' },
]

const Footer = () => {

    return (
        <div className="flex justify-between items-center text-[black] autoPaddings w-full bg-[#04D99D] py-[28px] md:py-[40px] xl:py-[84px] px-[1vw]">
            {
                links.map((el, idx) => (
                    <a href={el.link} key={idx} className="p2 hover:text-gray-600" >{el.title}</a>
                ))
            }
        </div>
    )
}
export default Footer