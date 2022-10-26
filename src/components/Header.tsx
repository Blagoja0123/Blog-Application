import { baseUrl } from "../constants";
import Link from "next/link";
export function Header(){

    const source: string = "https://firebasestorage.googleapis.com/v0/b/blog-app-bf9a8.appspot.com/o/1664825670075Untitled.png?alt=media&token=41a42ee5-30e3-4504-b111-b9bc1bdb057c"


    return (
        <>
            <Link href={`${baseUrl}/posts/1`}>
                <div className=" py-16 pl-12 flex text-white cursor-pointer">
                        <img src={source} alt="no image" className="rounded-lg"/>
                        <div className=" pl-2">
                            <h1 className=" text-5xl space-y-3 mb-2">Призма релации</h1>
                            <span>Mon Oct 03 2022</span>
                        </div>
                    
                </div>
            </Link>
            <div className="w-full rounded-full h-px bg-white justify-center"></div>
        </>
    )
}

export default Header;