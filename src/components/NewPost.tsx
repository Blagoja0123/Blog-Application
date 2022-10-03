import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export const NewPost = () =>{
    return (
        <>
            <Link href="/posts/new">
                <button className='fixed z-90 bottom-10 right-8  w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl hover:animate-bounce duration-300 border-white border'>
                        
                            <FontAwesomeIcon icon={faPlus} style={{fontSize: 25}}/>
                        
                </button>
            </Link>
        </>
    )
}

export default NewPost