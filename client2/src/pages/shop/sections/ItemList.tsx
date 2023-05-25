import React, { useEffect, useState } from "react"
import Image from "next/image"
import { IItem, IShopList } from "../../../interfaces"
import Api from "../../../utils/api";
import ActiveItem from "./ActiveItems";
enum SortingENUM {
    ASC_PRICE = 'ASC_PRICE',
    DESC_PRICE = 'DESC_PRICE',
    AZ = 'AZ',
    ZA = 'ZA'
}
interface ICardProps {
    item: IItem
}
const ItemList = () => {

    const ITEMS_PER_PAGE = 10

    const [parsedItemList, setParsedItemList] = useState<Array<IItem>>([])
    const [activeListing, setActiveListing] = useState<Array<IItem>>([])

    const [activePage, setActivePage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const [watchingItem, setWatchingItem] = useState<IItem | null>(null)



    useEffect(() => {
        Api().items.getListing('252490', 1)
            .then((res) => {
                setParsedItemList(res)
                setActiveListing(res)
            })
    }, [])

    useEffect(() => {
        Api().items.getListing('252490', activePage)
            .then((res) => {
                setParsedItemList(res)
                setActiveListing(res)
            })
    }, [activePage])



    const handleFiltering = (type: SortingENUM) => {
        switch (type) {
            case SortingENUM.ASC_PRICE:
                setActiveListing((prev) => (
                    [...prev.sort((a, b) => a.price - b.price)]
                ))
                break
            case SortingENUM.DESC_PRICE:

                setActiveListing((prev) => (
                    [...prev.sort((a, b) => b.price - a.price)]
                ))
                break
        }


    }


    const ItemCard: React.FC<ICardProps> = ({ item }) => {
        const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
        return (
            <div
                onClick={() => setWatchingItem(item)}
                className="w-full hover:opacity-60 transition-opacity duration-300 cursor-pointer aspect-square p-4 bg-primary rounded-[20px] flex flex-col justify-between items-center">
                <h3 className="text-[16px] font-bold text-[#FFD911] self-start">$ {item.price}</h3>
                <Image src={imageFullURL} priority width={128} height={128} alt={item.marketHashName} />
                <p className="text-[17px]">{item.marketHashName.length > 15 ? item.marketHashName.slice(0, 15).concat('...') : item.marketHashName}</p>
            </div>
        )
    }

    const Navigation: React.FC<any> = ({ }) => {
        return (
            <div className="w-full mt-4 py-[24px] px-4 flex justify-between items-center bg-primary rounded-[10px] bg-opacity-70 text-[white]">

                {<button
                    onClick={() => { setActivePage((prev) => prev - 1) }}
                    disabled={activePage <= 1}
                    className={`${activePage >= totalPages ? "invisible" : 'visible'} px-5 py-3 bg-secondary rounded-[10px] hover:bg-gray-400 transition ease-in-out delay-200`}
                >
                    BACK</button>}
                <span>{activePage}/{totalPages}</span>
                {<button

                    onClick={() => { setActivePage((prev) => prev + 1) }}
                    disabled={activePage >= totalPages}
                    className={`${activePage < totalPages ? "visible" : 'invisible'} px-5 py-3 bg-secondary rounded-[10px] hover:bg-gray-400 transition ease-in-out delay-200`}>
                    NEXT</button>}

            </div>
        )
    }

    return (
        <div className="w-full py-5 relative bg-[#1B3939] autoPaddings h-screen">

            {/* <ActiveItem/> */}



            <div className="relative">
                {watchingItem && <ActiveItem item={watchingItem} setActiveWatching={setWatchingItem} />}
                <div className="flex gap-3 ml-auto w-fit px-2 py-1 bg-gray-600 rounded-md">
                    <Image onClick={() => handleFiltering(SortingENUM.DESC_PRICE)} src="./sorting/19.svg" width={32} height={32} alt="sort" className="gradientBack p-[3px] rounded-md cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-75" />
                    <Image onClick={() => handleFiltering(SortingENUM.ASC_PRICE)} src="./sorting/91.svg" width={32} height={32} alt="sort" className="gradientBack p-[3px] rounded-md cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-75" />
                </div>

                {/* items */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 min-h-[500px] ">
                    {
                        activeListing.map((el, idx) => <ItemCard key={idx} item={el} />)

                    }
                </div>
            </div>


            {/* arrows */}

            <Navigation />


        </div>
    )
}
export default ItemList