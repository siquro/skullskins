'use client'
import Image from "next/image"
import Header from "../../components/Header"
import Mission from "./sections/Mission"
import Contact from "./sections/Contact"
import Message from "./sections/Message"
import Footer from "../../components/Footer"
import Catalog from "./sections/Catalog"

const About = () => {
    return (
        <main className="w-full text-white relative gradientBack">
            <Header />
            <Image src="./about/pattern.svg" width={1440} height={2140} alt="pattern" className="absolute w-full z-1" />
            <div className="w-full">
                <div className="w-full h-[72px] sm:h-[134px] lg:h-[286px] bg-aboutBg backgroundImage autoPaddings flex items-center mb-5">
                    <p className="headerText">About us</p>
                </div>

                <Mission />
                <Catalog />
                <Contact />
                <Message />
            </div>
        </main>
    )
}
export default About