import Image from "next/image"
import { useEffect, useState } from "react"
import Api from "../../utils/api";
import { selectCartData, selectUserData, useAppSelector } from "../../redux";
import { ICart, IItem } from "../../interfaces";
import { NextResponse } from 'next/server'
import axios from "axios";
const CardDetails = () => {
    const { cart }: { cart: Array<any> } = useAppSelector(selectCartData)

    const [fullName, setFullName] = useState<string>('');
    const [adress1, setAdress1] = useState<string>('');
    const [adress2, setAdress2] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [country, setCountry] = useState<string>('')

    const [expMonth, setExpMonth] = useState<number>(1)
    const [expYear, setExpYear] = useState<number>(25)
    const [cardCVV, setCardCVV] = useState<string>('')
    const [cardHolderName, setCardHolderName] = useState<string>('')
    const [cardNumber, setCardNumber] = useState<string>('')

    useEffect(() => {
        Api().user.getBillingInfo()
            .then((res) => {
                setFullName(res.fullName)
                setAdress1(res.adress1)
                setAdress2(res.adress2)
                setCity(res.city)
                setCountry(res.country)
            })
            .catch((error) => console.log(error))
        handle3DSecure()
    }, [])

    const handle3DSecure = () => {
        const body = {
            MD: 'n9DCTDKDOK-8N_afCc0kH5ba_2YkTifUV40AQaa3IFg',
            PaReq: 'eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjNkNjcxNjI5LWE0MTAtNGE1ZC05Mjg4LWIzOGNlYWRkNDFmMiIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczovL21lcmNoYW50LmNvbS8zZHMtbWV0aG9kLWNvbXBsZXRlLyJ9',
            TermUrl: 'http://localhost:3000'
        }
        axios.post('https://payments.siquro.com/processings/b152dec6-068a-4809-b4d9-7276a5d36e9e/3ds2/proxy-acs/?token=n9DCTDKDOK-8N_afCc0kH5ba_2YkTifUV40AQaa3IFg&connection=3n_7a75d596da0d654d83f6dc65926b4bca&key=pk_live_eefe092012916ef8f0b74479ebba18de',
            body, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then((res) => {
            if (res.data.url) window.location.href = res.data.url
        }).catch((err) => console.log(err))
    }

    const handleCardHolderNameChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern: RegExp = /^[A-Za-z\s'.-]+$/
        if (e.target.value.length === 0) setCardHolderName('')
        if (pattern.test(e.target.value)) setCardHolderName(e.target.value)
    }
    const handleCardNumberChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern: RegExp = /^[0-9]+$/
        if (e.target.value.length === 0) setCardNumber('')
        if (pattern.test(e.target.value)) {
            setCardNumber(e.target.value)
            if (e.target.value.length === 16) {
                const splitPattern: RegExp = /^(\w{4})(\w{4})(\w{4})(\w{4})$/
                const groups: RegExpExecArray = splitPattern.exec(e.target.value)!
                // setCardNumber('')
                // setCardNumber(`${groups[0]} ${groups[1]} ${groups[2]} ${groups[3]}`)
            }
        }

    }

    const handleCardCVVChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pattern: RegExp = /^[0-9]+$/
        if (e.target.value.length === 0) setCardCVV('')
        if (pattern.test(e.target.value)) setCardCVV(e.target.value)

    }
    const handleCardMonthExpChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const isValid = /^\d{1,2}$/.test(input) && parseInt(input) >= 1 && parseInt(input) <= 12;
        isValid ? setExpMonth(parseInt(input)) : setExpMonth(0)
    }
    const handleCardYearExpChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const pattern: RegExp = /^[0-9]+$/
        if (pattern.test(input)) setExpYear(parseInt(input))
        else setExpYear(0)
    }

    const handlePayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('PAY')
        Api().orders.initiatePayment({
            full_name: fullName,
            street_address: adress1,
            city: city,
            country: country,
            zip_code: "LV-1024",
            state: city,
            card_number: cardNumber,
            cardholder_name: cardHolderName,
            cvc: cardCVV,
            expires: `${expMonth < 10 ? '0'.concat(expMonth.toString()) : expMonth}/${expYear}`,
        }, {
            items: cart.map((el) => ({
                assetId: el.assetId,
                price: el.price
            }))
        }).then((res) => console.log(res))
            .catch((error) => console.log(error))
    }




    return (
        <div className="w-full   text-white autoPaddings">
            <h1 className="title mb-10">Checkout</h1>

            <div className="w-full flex justify-center gap-[3vw]">
                <Image src="/creditcard.png" width={181} height={121} alt="credit"
                    className="w-[90px] h-[60px] md:w-[181px] md:h-[121px]"
                />
                <Image src="/paypal.png" width={181} height={121} alt="paypal"
                    className="w-[90px] h-[60px] md:w-[181px] md:h-[121px] opacity-10"
                />
            </div>

            <form className="w-full shadow-2xl p-8 flex items-center justify-center gap-[5vw] mt-5 sm:flex-row flex-col">
                <div className="w-[300px] flex flex-col gap-5">
                    <div className="">
                        <p className="inputLabel">FULL NAME</p>
                        {/* @ts-ignore */}
                        <input value={fullName} required type="text" maxLength={128} className="formInput" />
                    </div>
                    <div className="">
                        <p className="inputLabel">ADRESS 1</p>
                        {/* @ts-ignore */}
                        <input value={adress1} required maxLength={128} type="text" className="formInput" />
                    </div>
                    <div className="">
                        <p className="inputLabel">ADRESS 2</p>
                        {/* @ts-ignore */}
                        <input value={adress2} required maxLength={128} type="text" className="formInput" />
                    </div>
                    <div className="">
                        <p className="inputLabel">CITY</p>
                        {/* @ts-ignore */}
                        <input value={city} required type="text" maxLength={128} className="formInput" />
                    </div>

                    <div className="w-[300px] flex justify-between">
                        <div className="w-[150px]">
                            <p className="inputLabel">COUNTRY</p>
                            {/* @ts-ignore */}
                            <input required value={country} type="text" maxLength={128} className="w-full rounded-sm  shadow-md bg-white text-gray-400 focus:outline-none caret-gray-400 px-2 py-1" />
                        </div>
                        <div className="w-[100px]">
                            <p className="inputLabel">ZIP CODE</p>
                            <input required type="text" maxLength={32} className="w-full rounded-sm  shadow-md bg-white text-gray-400 focus:outline-none caret-gray-400 px-2 py-1" />
                        </div>

                    </div>


                </div>
                <div className="w-[300px] flex flex-col gap-5">
                    <div className="">
                        <p className="inputLabel">CARDHOLDER</p>
                        <input
                            type="text"
                            maxLength={30}
                            className="formInput"
                            placeholder="NAME SURNAME"
                            required
                            // @ts-ignore
                            value={cardHolderName}
                            onChange={handleCardHolderNameChangeEvenet}

                        />
                    </div>
                    <div className="">
                        <p className="inputLabel">CARD NUMBER</p>
                        <input
                            minLength={16}
                            maxLength={16}
                            type="text"
                            className="formInput"
                            required
                            placeholder="0000 0000 0000 0000"
                            onChange={handleCardNumberChangeEvenet}
                            value={cardNumber}

                        />
                    </div>

                    <div className="flex w-full justify-between">
                        <div className="">
                            <p className="inputLabel">CVV</p>
                            <input
                                minLength={3}
                                maxLength={4}
                                type="text"
                                className="w-[50px] rounded-sm  shadow-md bg-white text-gray-400 focus:outline-none caret-gray-400 px-2 py-1"
                                required
                                placeholder="CVV"
                                onChange={handleCardCVVChangeEvenet}
                                // @ts-ignore
                                value={cardCVV}
                            />
                        </div>
                        <div className="">
                            <p className="inputLabel">Exp. MONTH</p>
                            <input
                                minLength={2}
                                maxLength={2}
                                type="text"
                                className="w-[75px] rounded-sm  shadow-md bg-white text-gray-400 focus:outline-none caret-gray-400 px-2 py-1"
                                required
                                placeholder="MM"
                                onChange={handleCardMonthExpChangeEvenet}
                                value={expMonth}
                            />
                        </div>
                        <div className="">
                            <p className="inputLabel">Exp. YEAR</p>
                            <input
                                minLength={2}
                                maxLength={2}
                                type="text"
                                className="w-[75px] rounded-sm  shadow-md bg-white text-gray-400 focus:outline-none caret-gray-400 px-2 py-1"
                                required
                                placeholder="YY"
                                onChange={handleCardYearExpChangeEvenet}
                                value={expYear}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Image src="/visa.png" width={100} height={10} alt="visa" className="bg-white p-1 rounded-md h-[40px]" />
                        <Image src="/mastercard.png" width={100} height={100} alt="visa" className="bg-white p-1 rounded-md h-[60px]" />

                    </div>

                    <button onClick={handlePayClick} className="font-bold w-full bg-primary rounded-md py-4 hover:bg-opacity-70 shadow-2xl transition-hover duration-150">PAY</button>


                </div>


            </form>

        </div>
    )
}
export default CardDetails

