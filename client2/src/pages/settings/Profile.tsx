import React, { useEffect, useState } from "react"
import { SectionWrapper } from "../../hoc"
import { useSelector } from "react-redux"
import { selectUserData, setUserData, useAppDispatch } from "../../redux"
import { IUser } from "../../interfaces"
import Api from "../../utils/api"
import { EditPencil, EmailSVG } from "../../utils/SVGAssets"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/motion"

const Profile: React.FC<any> = () => {


    const user: IUser = useSelector(selectUserData)
    const verified: boolean = user && user.email && user.tradeOfferLink && user.email ? true : false
    const dispatch = useAppDispatch()

    // const [tradeURLEditable, setTradeURLEditable] = useState<boolean>(false)
    // const [tradeURL, setTradeURL] = useState<string>(user.tradeOfferLink ? user.tradeOfferLink : 'null')

    // const [userEmail, setUserEmail] = useState<string>(user.email ? user.email : 'unverified')
    // const [emailEditable, setEmailEditable] = useState<boolean>(false)

    //for redesign comment 19-23 line and use this lines 
    const [tradeURLEditable, setTradeURLEditable] = useState<boolean>(true);
    const [tradeURL, setTradeURL] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [emailEditable, setEmailEditable] = useState<boolean>(true);

    const [spin, setSpin] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const [emailSent, setEmailSent] = useState<boolean>(false)

    const [tradeURLChanged, setTradeURLChanged] = useState<boolean>(false)
    const [tradeURLError, setTradeURLError] = useState<string>('')

    const notify = (message: string) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: "solo"
        });
    }

    const VerifyButton = () => {
        return (
            <button onClick={() => {
                const data = {
                    email: userEmail
                }
                setEmailEditable(false)
                setSpin(true)

                Api().user.verifyEmail(data)
                    .then((res) => {

                        setEmailSent(true)
                    })
                    .catch((e) => {
                        setError(e)
                        setEmailSent(false)
                        setEmailEditable(false)
                        setSpin(false)
                    })
            }}
                className="px-[15px] cursor-pointer h-[30px] shadow-xd font-barlow font-bold text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover">Verify</button>
        )

    }

    const VerifyTradeUrlButton = () => {
        return (
            <button onClick={() => {
                const data = {
                    tradeURL
                }
                setTradeURLEditable(false)

                Api().user.updateTradeOfferLink(data)
                    .then((res) => {
                        setTradeURLChanged(true)
                        setTradeURLEditable(false)
                        dispatch(setUserData({
                            ...user,
                            tradeOfferLink: tradeURL
                        }))
                        notify('Trade URL has been sucessfully changed!')

                    })
                    .catch((e) => {
                        setTradeURLError(e.code)
                    })
            }}
                className="px-[15px] cursor-pointer h-[30px] shadow-xd font-barlow font-bold text-lightText
                rounded-[10px] bg-btnBg hover:bg-btnBgHover">Verify</button>
        )

    }

    const EditPencilSVG = ({ handler }: { handler: () => void }) => (
        <div onClick={handler}
            className="w-[25%] flex justify-end">
            <EditPencil className="w-[24px] h-[24px] fill-gray-400 cursor-pointer hover:scale-110" />
        </div>
    )
    const SentEmailNotification = () => (
        <div className="w-full px-3 py-1 text-center mt-5 shadow-md flex justify-center gap-3  rounded-sm items-center font-barlow">
            <EmailSVG />
            <p>Verification email has been succesfully sent</p>
        </div>
    )
    const ErrorNotification = () => (
        <div className="w-full px-3 py-1 text-center mt-5 shadow-md bg-red-500 flex justify-center gap-3  rounded-sm items-center font-barlow">
            <p>Something went wrong... Try again</p>
        </div>
    )
    const Loader = () => (
        <svg aria-hidden="true" className="ml-auto w-8 h-8 mr-2 text-gray-400 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
    )



    return (
        <motion.div variants={fadeIn('left', 'linear', .2, 1)}
            className="w-full text-lightText sm:w-[650px] mt-5 mx-auto rounded-[10px] bg-bgGreenTwoCornerShade">
            <div
                className="bg-[#222222CC] w-full p-[2em] border-solid border-[1px] border-[#004615] rounded-[10px]">
                <span className="text-[16px] font-grotesk">Status: <span className="font-bold font-barlow">{verified ? 'verified' : 'unverified'}</span></span>

                <>
                    <div className="w-full border-b-gray-400 border-b-2 py-5 ">
                        <div className="w-full flex justify-between">
                            <div className="text mb-5 font-grotesk">Email </div>
                            {
                                emailEditable ? <VerifyButton /> : spin ? <Loader /> : <EditPencilSVG handler={() => setEmailEditable(true)} />
                            }
                        </div>

                        <input type="text" className={
                            `w-full px-2 rounded-[10px] shadow-lg outline-none border-[1px] border-solid border-[#004615] px-[1vw] py-[1vh] ${emailEditable ? 'text-lightText caret-lightText bg-secondary ' : 'text-accent bg-[#004615]'}`
                        }
                            value={userEmail}
                            readOnly={!emailEditable}
                            onChange={(e) => {
                                setUserEmail(e.target.value)
                            }}
                        />

                        {emailSent && <SentEmailNotification />}
                        {error.length > 0 && <ErrorNotification />}
                    </div>
                </>

                <>
                    <div className="w-full border-b-gray-400 border-b-2 py-5">
                        <div className="w-full flex justify-between">
                            <div className="text mb-5 font-grotesk">Steam Trade URL</div>
                            {tradeURLEditable ? <VerifyTradeUrlButton /> : <EditPencilSVG handler={() => setTradeURLEditable(true)} />}
                        </div>

                        <input type="text" className={
                            `w-full px-2 rounded-[10px] shadow-lg outline-none border-[1px] border-solid border-[#004615] px-[1vw] py-[1vh] ${tradeURLEditable ? 'text-lightText caret-lightText bg-secondary' : 'text-accent bg-[#004615]'}`
                        }
                            value={tradeURL}
                            readOnly={!tradeURLEditable}
                            onChange={(e) => {
                                setTradeURL(e.target.value)
                            }}
                        />
                    </div>

                    {tradeURLError &&
                        <div className="w-full px-3 py-1 text-center mt-5 shadow-md bg-red-500 flex justify-center gap-3  rounded-sm items-center font-barlow">
                            <p>ERROR OCCURED</p>
                        </div>
                    }
                </>
            </div>
        </motion.div>
    )
}
export default SectionWrapper(Profile, "", "", "", "")