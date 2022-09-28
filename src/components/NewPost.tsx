import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export const NewPost = () =>{
    return (
        <>
            <div className="flex w-1/3 h-72 border-zinc-300 rounded-2xl border items-center p-4 mx-6 my-4 text-center hover:bg-slate-900 justify-center">
                <div className=" top-1/2 left-1/2">
                    <Link href="/posts/new">
                        <FontAwesomeIcon icon={faPlus} style={{fontSize: 100}}/>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NewPost