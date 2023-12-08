import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Api from '../../../utils/api';
import GlobalHeroSection from '@/components/sections/GlobalHeroSection';

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
  const [records, setRecords] = useState<Array<TableRow>>([]);

  const [offerSent, setOfferSent] = useState<boolean>(false);

  const handleSendOffer = (orderId: number) => {
    Api().user.sendTrade(orderId)
      .then((res) => {
        setOfferSent(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Api().user.getTrades()
      // .then((res: Array<any>) => {
        const res = [{
          status: TradeStatus.WAITING,
          order: {
            id: 1,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 0,
          }
        },
        {
          status: TradeStatus.SENT,
          order: {
            id: 2,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 2,
          }
        },
        {
          status: TradeStatus.RECEIVED,
          order: {
            id: 3,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 99,
          }
        },
        {
          status: TradeStatus.REJECTED,
          order: {
            id: 4,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 54,
          }
        },
        {
          status: TradeStatus.WAITING,
          order: {
            id: 1,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 0,
          }
        },
        {
          status: TradeStatus.SENT,
          order: {
            id: 2,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 2,
          }
        },
        {
          status: TradeStatus.RECEIVED,
          order: {
            id: 3,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 99,
          }
        },
        {
          status: TradeStatus.REJECTED,
          order: {
            id: 4,
            createdAt: "2022-12-12",
            items: ["Skull", "Death Mask"],
            totalPrice: 54,
          }
        }
        ]
        setRecords(
          res.map((el) => ({
            date: el.order.createdAt,
            items: el.order.items.map((item: any) => item.marketHashName),
            total: el.order.totalPrice,
            status: el.status,
            orderId: el.order.id,
          })),
        );
      // }
      // )
      // .catch((err) => {
      //   console.log(err);
      // });
  }, []);

  const TableRow: React.FC<TableRow> = ({ date, items, total, status, orderId }) => {
    return (
      <tr className='bg-primary text-lightText border-y border-[#004615] dark:bg-gray-900 '>
        <th scope='row' className='px-6 py-4 font-medium text-accent whitespace-nowrap dark:text-white text-barlow'>
          {date}
        </th>
        <td className='px-6 py-4 '>
          skull
          {items}
        </td>
        <td className='px-6 py-4'>
          $ {total}
        </td>

        <td className='px-6 py-4'>
          {status === TradeStatus.REJECTED ? <span className='text-[red]'>{status}</span> : <span>{status}</span>
          }
        </td>

        <td className='px-6 py-4'>
          {
            <span onClick={() => handleSendOffer(orderId)}>yes</span>
          }
          {!offerSent && status === TradeStatus.WAITING && <button onClick={() => handleSendOffer(orderId)}
            className=' px-2 py-1 ml-[20px] font-barlow font-bold text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover'>Send</button>}
          {offerSent && status === TradeStatus.WAITING && <span className='ml-[20px] '>sent...</span>}
        </td>
      </tr>
    );
  };
  return (
    <main className="bg-primary relative w-full">
      <GlobalHeroSection
        title_start={"Trade"}
        title_end={"offers"}
        styles={"bg-bgWaveRight backgroundImage autoPaddings"}
        border_top={false}
        border_bottom={true} />

      <div className=' autoPaddings  relative w-full h-[calc(100%-106px)]'>
        <div className='relative max-h-[calc(100%-106px)] overflow-x-auto rounded-lg h-screen'>
          <table className='w-full text-md text-left'>
            <thead className='text-xm text-lightText uppercase sticky top-0 bg-secondary font-grotesk'>
              <tr className=''>
                <th scope='col' className='px-6 py-3 sticky'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3 sticky'>
                  Items
                </th>
                <th scope='col' className='px-6 py-3 sticky'>
                  Total
                </th>
                <th scope='col' className='px-6 py-3 sticky'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 sticky'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((el, index) => (
                <TableRow key={index} date={el.date} items={el.items} total={el.total} status={el.status}
                  orderId={el.orderId} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default Trades;
