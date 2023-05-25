
import Image from 'next/image'
import { SectionWrapper } from "../../hoc"

const comments = [
    {
        text: 'Lorem ipsum dolor sit amet, consecte adip assa iaculis porta ultricies semper massa amet pretium dia nibh cursus.',
        stars: 5
    },
    {
        text: 'Lorem ipsum dolor sit amet, consecte adip assa iaculis porta ultricies semper massa amet pretium dia nibh cursus.',
        stars: 5
    },
    {
        text: 'Lorem ipsum dolor sit amet, consecte adip assa iaculis porta ultricies semper massa amet pretium dia nibh cursus.',
        stars: 5
    },

]

const Comments = () => {

    const Card = ({text, stars, idx}: {text: string, stars: number, idx:number}) => {
        return <div className={`w-[100%] h-[350px] rounded-[35px] flex flex-col items-center  p-7 bg-red-50`}>
            <div  className="flex">
                {
                   new Array(stars).fill(1).map(() => <Image src="./star.svg" width={27} height={27} alt="star"/>)
                }
            </div>

            <div className="w-[100px] h-[3px] bg-secondary mt-4 rounded-sm"></div>
            <p className="text-black mt-4 w-full text-center">{text}</p>
        </div>
    }

    return <div className='w-full grid grid-cols-2 sm:grid-cols-3 justify-center gap-[2vw] py-[5rem]'>
                {comments.map((el, idx) => <Card text={el.text} stars={el.stars} idx={idx}/>)}
            
            <span className="text absolute bottom-0 spanExtra">Best deals</span>
        </div>
}
export default SectionWrapper(Comments, '',"bg-[#016174]")