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
        // .then((res) => {
        //     setParsedItemList(res)
        //     setActiveListing(res)
        // })
        let res = [{
            price: 2,
            imageURL: '/items/i2.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "jh",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 999,
            imageURL: '/items/i4.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "jh",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 54,
            imageURL: '/items/i3.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "jh",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }]
        setParsedItemList(res)
        setActiveListing(res)
    }, [])

    useEffect(() => {
        Api().items.getListing('252490', activePage)
        // .then((res) => {
        //     setParsedItemList(res)
        //     setActiveListing(res)
        // })
        let res = [{
            price: 88,
            imageURL: '/items/i1.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "AK-47",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 17,
            imageURL: '/items/i3.png',
            appId: 25,
            assetId: "Crossbow",
            marketHashName: "Crossbow",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 17,
            imageURL: '/items/i2.png',
            appId: 25,
            assetId: "Skull",
            marketHashName: "Skull",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 666,
            imageURL: '/items/i4.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "Death Mask",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 88,
            imageURL: '/items/i1.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "AK-47",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 17,
            imageURL: '/items/i3.png',
            appId: 25,
            assetId: "Crossbow",
            marketHashName: "Crossbow",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 17,
            imageURL: '/items/i2.png',
            appId: 25,
            assetId: "Skull",
            marketHashName: "Skull",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        }, {
            price: 666,
            imageURL: '/items/i4.png',
            appId: 25,
            assetId: "jkl",
            marketHashName: "Death Mask",
            quantity: 45,
            steamLink: "jhg",
            tags: "kkk"
        },]
        setParsedItemList(res)
        setActiveListing(res)
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

        //DONT DELETE THIS IMAGE LINK FROM STEAMSTATIC AFTER REDISGN DELETE SECOND ONE
        // const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
        const imageFullURL = `${item.imageURL}`

        return (
            <div className="rounded-[10px] border-solid border-[1px] border-[#004615] bg-[#02010100] p-[2em]
            hover:border-[#02fe4f] hover:bg-bgCardHover cursor-pointer h-fit"
                onClick={() => setWatchingItem(item)}>

                <h3 className="text mb-0 font-grotesk text-lightText text-center mb-[20px]">
                    {item.marketHashName.length > 15 ? item.marketHashName.slice(0, 15).concat('...') : item.marketHashName}</h3>
                <Image src={imageFullURL} width={128} height={128} alt={item.marketHashName}
                    className="w-[64px] h-[64px] xl:w-[128px] xl:h-[128px] offer-item my-[0] mx-[auto]"
                />
                <p className="text mb-0 font-barlow text-accent font-[18px] mt-[20px]">€ {item.price}</p>
            </div>
        )
    }

    const Navigation: React.FC<any> = ({ }) => {
        return (
            <div className="w-full mt-4 py-[24px] px-4 flex justify-between items-center bg-primary rounded-[10px] bg-opacity-70 font-barlow text-lightText">

                {<button
                    onClick={() => { setActivePage((prev) => prev - 1) }}
                    disabled={activePage <= 1}
                    className={`${activePage >= totalPages ? "invisible" : 'visible'} cursor-pointer transition ease-in-out delay-200 
                    font-barlow font-bold px-[45px] py-[15px] mt-[40px] custom_btn text-lightText
                    rounded-[10px] bg-btnBg hover:bg-btnBgHover`}
                >
                    BACK</button>}
                <span>{activePage}/{totalPages}</span>
                {<button

                    onClick={() => { setActivePage((prev) => prev + 1) }}
                    disabled={activePage >= totalPages}
                    className={`${activePage < totalPages ? "visible" : 'invisible'}  cursor-pointer transition ease-in-out delay-200 
                    font-barlow font-bold px-[45px] py-[15px] mt-[40px] custom_btn text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover`}>
                    NEXT</button>}

            </div>
        )
    }

    return (
        <div className="w-full py-5 relative bg-primary autoPaddings min-h-screen h-fit">
            {/* <ActiveItem/> */}
            {
                activeListing.length > 0 ?

                    <div className="relative">
                        {watchingItem && <ActiveItem item={watchingItem} setActiveWatching={setWatchingItem} />}
                        <div className="flex gap-3 ml-auto w-fit px-3 py-2 bg-secondary rounded-md">
                            <Image onClick={() => handleFiltering(SortingENUM.DESC_PRICE)} src="./sorting/19.svg" width={32} height={32} alt="sort" className="gradientBack p-[3px] rounded-md cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-75" />
                            <Image onClick={() => handleFiltering(SortingENUM.ASC_PRICE)} src="./sorting/91.svg" width={32} height={32} alt="sort" className="gradientBack p-[3px] rounded-md cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-75" />
                        </div>

                        {/* items */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 min-h-[500px] ">
                            {
                                activeListing.map((el, idx) => <ItemCard key={idx} item={el} />)
                            }
                        </div>
                    </div>

                    : <h1 className="text text-accent">Loading...</h1>
            }

            <Navigation />
        </div>
    )
}
export default ItemList