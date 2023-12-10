import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Api from '../../utils/api';
import { selectCartData, selectUserData, useAppSelector, emptyCart } from '../../redux';
import { ICart, IItem } from '../../interfaces';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

interface FormData {
  MD: string,
  PaReq: string,
  TermUrl: string,
  url: string
}

const CardDetails = () => {
  const { cart }: { cart: Array<any> } = useAppSelector(selectCartData);

  const [fullName, setFullName] = useState<string>('');
  const [adress1, setAdress1] = useState<string>('');
  const [adress2, setAdress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [expMonth, setExpMonth] = useState<number>(1);
  const [expYear, setExpYear] = useState<number>(25);
  const [cardCVV, setCardCVV] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [formVisible, setFormVisible] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{
    MD: string,
    Method: 'POST' | 'GET',
    PaReq: string,
    URL: string,
    callback_url: string
  } | null>(null);
  const router = useRouter();
  useEffect(() => {
    Api().user.getBillingInfo()
      .then((res) => {
        setFullName(res.fullName);
        setAdress1(res.adress1);
        setAdress2(res.adress2);
        setCity(res.city);
        setCountry(res.country);
      })
      .catch((error) => console.log(error));
  }, []);

  const RedirectForm: React.FC<FormData> = ({ url, TermUrl, MD, PaReq }) => {
    const ref = useRef(null);
    // @ts-ignore
    useEffect(() => {
      ref.current.submit();
    }, []);
    return <form action={url} method='POST' ref={ref}>
      <input type='hidden' name='MD' value={MD} />
      <input type='hidden' name='PaReq' value={PaReq} />
      <input type='hidden' name='TermUrl' value={TermUrl} />
    </form>;
  };


  const handleCardHolderNameChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern: RegExp = /^[A-Za-z\s'.-]+$/;
    if (e.target.value.length === 0) setCardHolderName('');
    if (pattern.test(e.target.value)) setCardHolderName(e.target.value);
  };
  const handleCardNumberChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern: RegExp = /^[0-9]+$/;
    if (e.target.value.length === 0) setCardNumber('');
    if (pattern.test(e.target.value)) {
      setCardNumber(e.target.value);
      if (e.target.value.length === 16) {
        const splitPattern: RegExp = /^(\w{4})(\w{4})(\w{4})(\w{4})$/;
        const groups: RegExpExecArray = splitPattern.exec(e.target.value)!;
        // setCardNumber('')
        // setCardNumber(`${groups[0]} ${groups[1]} ${groups[2]} ${groups[3]}`)
      }
    }

  };

  const handleCardCVVChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern: RegExp = /^[0-9]+$/;
    if (e.target.value.length === 0) setCardCVV('');
    if (pattern.test(e.target.value)) setCardCVV(e.target.value);

  };
  const handleCardMonthExpChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isValid = /^\d{1,2}$/.test(input) && parseInt(input) >= 1 && parseInt(input) <= 12;
    isValid ? setExpMonth(parseInt(input)) : setExpMonth(0);
  };
  const handleCardYearExpChangeEvenet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const pattern: RegExp = /^[0-9]+$/;
    if (pattern.test(input)) setExpYear(parseInt(input));
    else setExpYear(0);
  };

  const handlePayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Api().orders.initiatePayment({
      full_name: fullName,
      street_address: adress1,
      city: city,
      country: country,
      zip_code: 'LV-1024',
      state: city,
      card_number: cardNumber,
      cardholder_name: cardHolderName,
      cvc: cardCVV,
      expires: `${expMonth < 10 ? '0'.concat(expMonth.toString()) : expMonth}/${expYear}`,
      phone: phone,
      phone_code: phoneCode,
    }).then((res) => {
      console.log(res);
      // dispatch(emptyCart(null));
      //  router.push('/user/trades');
      setFormData({
        MD: res.MD,
        Method: res.Method,
        PaReq: res.PaReq,
        URL: res.URL,
        callback_url: res.callback_url
      })
    })
      .catch((error) => console.log(error));
  };


  return (
    <div className='w-full   text-white autoPaddings'>

      <div className='w-full flex justify-center gap-[3vw]'>
        <Image src='/credit-card.svg' width={181} height={121} alt='credit'
          className='w-[90px] h-[60px] md:w-[181px] md:h-[121px]'
        />
        <Image src='/paypal.svg' width={181} height={121} alt='paypal'
          className='w-[90px] h-[60px] md:w-[181px] md:h-[121px] opacity-30'
        />
      </div>

      <form className='w-full shadow-2xl md:p-8 flex  justify-center gap-[5vw] mt-5 md:flex-row flex-col'>
        <div className='w-[100%] md:w-[60%] flex flex-col gap-5'>
          <div className=''>
            <p className='inputLabel'>FULL NAME</p>
            {/* @ts-ignore */}
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} required type='text' maxLength={128}
              className='formInput' />
          </div>
          <div className=''>
            <p className='inputLabel'>ADRESS 1</p>
            {/* @ts-ignore */}
            <input value={adress1} onChange={(e) => setAdress1(e.target.value)} required maxLength={128} type='text'
              className='formInput' />
          </div>
          <div className=''>
            <p className='inputLabel'>ADRESS 2</p>
            {/* @ts-ignore */}
            <input value={adress2} onChange={(e) => setAdress2(e.target.value)} required maxLength={128} type='text'
              className='formInput' />
          </div>
          <div className=''>
            <p className='inputLabel'>CITY</p>
            {/* @ts-ignore */}
            <input value={city} onChange={(e) => setCity(e.target.value)} required type='text' maxLength={128}
              className='formInput' />
          </div>

          <div className='flex justify-between'>
            <div className='w-[65%]'>
              <p className='inputLabel'>COUNTRY</p>
              {/* @ts-ignore */}
              <input required value={country} onChange={(e) => setCountry(e.target.value)} type='text' maxLength={128}
                className='formInput' />
            </div>
            <div className='w-[25%]'>
              <p className='inputLabel'>ZIP CODE</p>
              <input required type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} maxLength={32}
                className='formInput' />
            </div>

          </div>
          <div className='flex justify-between'>
            <div className='w-[25%]'>
              <p className='inputLabel'>PHONE CODE</p>
              {/* @ts-ignore */}
              <input required value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} type='text'
                maxLength={4}
                className='formInput' />
            </div>
            <div className='w-[65%]'>
              <p className='inputLabel'>PHONE</p>
              <input required type='text' value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={32}
                className='formInput' />
            </div>
          </div>
        </div>

        <div className='w-[100%] md:w-[40%] flex flex-col gap-5'>
          <div className=''>
            <p className='font-grotesk'>CARDHOLDER</p>
            <input
              type='text'
              maxLength={30}
              className='formInput'
              placeholder='NAME SURNAME'
              required
              // @ts-ignore
              value={cardHolderName}
              onChange={handleCardHolderNameChangeEvenet}
            />
          </div>
          <div className=''>
            <p className='font-grotesk'>CARD NUMBER</p>
            <input
              minLength={16}
              maxLength={16}
              type='text'
              className='formInput'
              required
              placeholder='0000 0000 0000 0000'
              onChange={handleCardNumberChangeEvenet}
              value={cardNumber}

            />
          </div>

          <div className='flex w-full justify-start gap-[10px]'>
            <div className=''>
              <p className='font-grotesk'>CVV</p>
              <input
                minLength={3}
                maxLength={4}
                type='text'
                className='formInput'
                required
                placeholder='CVV'
                onChange={handleCardCVVChangeEvenet}
                // @ts-ignore
                value={cardCVV}
              />
            </div>
            <div className=''>
              <p className='font-grotesk'>Exp. MONTH</p>
              <input
                minLength={2}
                maxLength={2}
                type='text'
                className='formInput'
                required
                placeholder='MM'
                onChange={handleCardMonthExpChangeEvenet}
                value={expMonth}
              />
            </div>
            <div className=''>
              <p className='font-grotesk'>Exp. YEAR</p>
              <input
                minLength={2}
                maxLength={2}
                type='text'
                className='formInput'
                required
                placeholder='YY'
                onChange={handleCardYearExpChangeEvenet}
                value={expYear}
              />
            </div>
          </div>

          <div className='flex'>
            <Image src='/credit-card-visa.svg' width={100} height={100} alt='visa' 
            className='h-[80px]' />
            <Image src='/credit-card-mastercard.svg' width={100} height={100} alt='mast'
            className=' h-[80px]' />
          </div>

          <button onClick={handlePayClick} className='w-full font-barlow font-bold px-[25px] py-[15px] mt-[40px] custom_btn text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover'>
            PAY
          </button>
        </div>


      </form>
      {formData &&
        <RedirectForm MD={formData.MD} PaReq={formData.PaReq} TermUrl={'http://localhost:3000'} url={formData.URL} />
      }
    </div>
  );
};
export default CardDetails;

