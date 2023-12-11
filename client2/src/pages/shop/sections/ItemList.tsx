import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IItem, IShopList } from "../../../interfaces";
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
    const ITEMS_PER_PAGE = 12;

    const [parsedItemList, setParsedItemList] = useState<Array<IItem>>([]);
    const [activeListing, setActiveListing] = useState<Array<IItem>>([]);

    const [activePage, setActivePage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [watchingItem, setWatchingItem] = useState<IItem | null>(null);
    const [active, setActive] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

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
            case SortingENUM.AZ:
                setActiveListing((prev) => (
                    [...prev.sort((a, b) => a.marketHashName.localeCompare(b.marketHashName))]
                ))
                break
            case SortingENUM.ZA:
                setActiveListing((prev) => (
                    [...prev.sort((a, b) => b.marketHashName.localeCompare(a.marketHashName))]
                ))
                break
        }
    }

    const handelSortMenu = () => {
        setActive(prevActive => !prevActive);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredList = activeListing.filter((item) => {
        return (
            item.marketHashName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm)
        );
    });

    const ItemCard: React.FC<ICardProps> = ({ item }) => {

        //DONT DELETE THIS IMAGE LINK FROM STEAMSTATIC AFTER REDISGN DELETE SECOND ONE
        // const imageFullURL = `https://community.akamai.steamstatic.com/economy/image/${item.imageURL}`
        const imageFullURL = `${item.imageURL}`

        return (
            <div className="rounded-[10px] border-solid border-[1px] border-[#004615] bg-[#02010100] p-[15px]
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
                    font-barlow font-bold px-[20px] sm:px-[35px] py-[10px] text-lightText text-[12px]
                    rounded-[10px] bg-btnBg hover:bg-btnBgHover`}
                >
                    BACK</button>}
                <span>{activePage}/{totalPages}</span>
                {<button

                    onClick={() => { setActivePage((prev) => prev + 1) }}
                    disabled={activePage >= totalPages}
                    className={`${activePage < totalPages ? "visible" : 'invisible'}  cursor-pointer transition ease-in-out delay-200 
                    font-barlow font-bold px-[20px] sm:px-[35px] py-[10px] text-lightText text-[12px]
                rounded-[10px] bg-btnBg hover:bg-btnBgHover`}>
                    NEXT</button>}

            </div>
        )
    }

    return (
        <div className="w-full py-5 relative bg-primary autoPaddings min-h-screen h-fit">
            {
                activeListing.length > 0 ?
                    <div className="relative">
                        {watchingItem && <ActiveItem item={watchingItem} setActiveWatching={setWatchingItem} />}

                        <div className="relative flex flex-col sm:flex-row gap-[20px] justify-between">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search by name or price"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-[100%] caret-lightText rounded-[10px] px-3 py-2 text-sm font-semibold font-grotesk text-lightText shadow-sm border-solid border-[1px] border-[#004615] focus:outline-none bg-secondary"
                                />
                            </div>

                            <div>
                                <div className="" onClick={() => handelSortMenu()}>
                                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-[10px] bg-secondary px-3 py-2 text-sm font-semibold font-grotesk text-lightText shadow-sm border-solid border-[1px] border-[#004615] " id="menu-button" aria-expanded="true" aria-haspopup="true" >
                                        Sort by
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`${active ? "block" : "hidden"
                                    } absolute top-[90px] sm:top-[35px] right-0 z-10 mt-2 w-[100%] sm:w-56 origin-top-right divide-y divide-[#004615] rounded-[10px] bg-secondary shadow-lg border-[#004615] border-solid border-[1px] text-lightText font-barlow`}  >
                                    <div className="py-1">
                                        <div onClick={() => (handleFiltering(SortingENUM.ASC_PRICE), handelSortMenu())}
                                            className="cursor-pointer hover:text-accent">
                                            <Image src="./sorting/19.svg" width={32} height={32} alt="sort"
                                                className="inline-block p-[3px] rounded-md" /> <span>price: low to high</span> </div>
                                        <div onClick={() => (handleFiltering(SortingENUM.DESC_PRICE), handelSortMenu())}
                                            className="cursor-pointer hover:text-accent">
                                            <Image src="./sorting/91.svg" width={32} height={32} alt="sort"
                                                className="inline-block p-[3px] rounded-md" /> <span>price: high to low</span> </div>
                                    </div>

                                    <div className="py-1">
                                        <div onClick={() => (handleFiltering(SortingENUM.AZ), handelSortMenu())}
                                            className="cursor-pointer hover:text-accent">
                                            <Image src="./sorting/az.svg" width={32} height={32} alt="sort"
                                                className="inline-block p-[3px] rounded-md" /> <span>name: A to Z</span>
                                        </div>

                                        <div onClick={() => (handleFiltering(SortingENUM.ZA), handelSortMenu())}
                                            className="cursor-pointer hover:text-accent">
                                            <Image src="./sorting/za.svg" width={32} height={32} alt="sort"
                                                className="inline-block p-[3px] rounded-md" /> <span>name: Z to A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* items */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 min-h-[500px] ">
                            {filteredList.length > 0 ?
                                (filteredList.map((el, idx) => <ItemCard key={idx} item={el} />))
                                : (<h1 className="text text-accent">No items found...</h1>)
                            }
                        </div>
                    </div>
                    :
                    <h1 className="text text-accent">Loading...</h1>
            }
            <Navigation />
        </div>
    )
}
export default ItemList;