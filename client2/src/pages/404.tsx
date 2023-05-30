import Image from "next/image"

const Custom404 = () =>  {
    return <main className="w-full h-screen absolute bg-white flex justify-center items-center">
        <Image src="/404.jpg" width={1000} height={1000} alt="404" className="w-[400px]"/>
    </main>
}
export default Custom404