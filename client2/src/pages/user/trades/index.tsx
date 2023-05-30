import { NextPage } from "next";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import Api from "../../../utils/api";
enum TradeStatus {
    WAITING = 'WAITING',
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
    REJECTED = 'REJECTED'
}
interface TableRow {
    date: string,
    items: Array<string>,
    total: number,
    status: TradeStatus,
    orderId: number
}
const Trades: NextPage = () => {
    const [records, setRecords] = useState<Array<TableRow>>([])

    const [offerSent, setOfferSent] = useState<boolean>(false)

    const handleSendOffer = (orderId: number) => {
        Api().user.sendTrade(orderId)
            .then((res) => {
                console.log(res)
                setOfferSent(true)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        Api().user.getTrades()
            .then((res: Array<any>) => {
                setRecords(
                    res.map((el) => ({
                        date: el.order.createdAt,
                        items: el.order.items.map((item: any) => item.marketHashName),
                        total: el.order.totalPrice,
                        status: el.status,
                        orderId: el.order.id
                    }))
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const TableRow: React.FC<TableRow> = ({ date, items, total, status, orderId }) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {date}
                </th>
                <td className="px-6 py-4">
                    {items}
                </td>
                <td className="px-6 py-4">
                    $ {total}
                </td>
                <td className="px-6 py-4">
                    {status}
                </td>
                <td className="px-6 py-4">
                    {!offerSent && status === TradeStatus.WAITING && <button onClick={() => handleSendOffer(orderId)} className="bg-gray-300 px-2 py-1 hover:bg-opacity-75 rounded-md">Send</button>}
                    {offerSent && status === TradeStatus.WAITING && <p>sent...</p>}
                </td>
            </tr>
        )
    }
    return (
        <div className="relative h-screen w-full gradientBack autoPaddings pb-4">
            <Header />
            <div className="relative w-full h-[calc(100%-106px)]">
                <h1 className="text text-white mb-4">Trade offers</h1>

                <div className="relative max-h-[calc(100%-106px)] overflow-x-auto rounded-lg">
                    <table className="w-full text-md text-left">
                        <thead className="text-xs bg-white uppercase sticky top-0">
                            <tr className="">
                                <th scope="col" className="px-6 py-3 sticky">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 sticky">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 sticky">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3 sticky">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 sticky">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((el) => (
                                <TableRow date={el.date} items={el.items} total={el.total} status={el.status} orderId={el.orderId} />
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}
export default Trades