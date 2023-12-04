import { useRouter } from "next/router"

const Custom404 = () => {
    const router = useRouter()

    return <main className="md:flex min-h-screen bg-primary">
        <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="max-w-sm m-8">
                <div className="text-5xl md:text-[110px] border-accent border-b text-accent font-grotesk font-bold">404</div>

                <p className="text-white text-2xl md:text-3xl font-lightText font-barlow mb-8 mt-[40px]">Sorry, the page you are looking for could not be found.</p>
                <button className="mx-auto my-0 
                font-barlow font-bold px-[45px] py-[15px] mt-[40px] text-lightText rounded-[10px] bg-btnBg hover:bg-btnBgHover"
                    onClick={() => router.push('/')}>BACK TO HOME</button>
            </div>
        </div>
    </main>
}
export default Custom404