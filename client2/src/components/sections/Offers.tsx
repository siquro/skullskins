'use client'
import { motion } from "framer-motion"
import { SectionWrapper } from "../../hoc"
import Image from 'next/image'
import { IItem } from "../../interfaces"
import React from "react"
import { fadeIn, textVariant } from "../../utils/motion"
import { useRouter } from "next/router"
import SectionTitles from "../SectionTitles"
import ItemCard from "../ItemCard"
import OurCatalog from "./OurCatalog"

const topItems: Array<any> = [
    { price: 150, imageURL: '/items/i1.png', name: 'AK-47' },
    { price: 54, imageURL: '/items/i2.png', name: 'Skull' },
    { price: 34, imageURL: '/items/i3.png', name: 'Crossbow' },
    { price: 99, imageURL: '/items/i4.png', name: 'Death Mask' },
    { price: 2500, imageURL: '/items/i1.png', name: 'AK-47' },
    { price: 5, imageURL: '/items/i2.png', name: 'Skull' },
    { price: 15, imageURL: '/items/i3.png', name: 'Crossbow' },
    { price: 99, imageURL: '/items/i4.png', name: 'Death Mask' },
    { price: 34, imageURL: '/items/i3.png', name: 'Crossbow' },
    { price: 2500, imageURL: '/items/i1.png', name: 'AK-47' },
    { price: 5, imageURL: '/items/i2.png', name: 'Skull' },
    { price: 15, imageURL: '/items/i3.png', name: 'Crossbow' },
    { price: 99, imageURL: '/items/i4.png', name: 'Death Mask' },
]
const Offers = () => {
    const router = useRouter()

    return <div className="pb-5">
        <SectionTitles firstWord="Top " lastWord="items" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[15px]">
            {topItems.slice(0, 10).map((el, index) => <ItemCard key={index} price={el.price} imageURL={el.imageURL} name={el.name} idx={index} />)}
        </div>
        <OurCatalog />
    </div>
}
export default SectionWrapper(Offers, '', "autoPaddings", "", "")
