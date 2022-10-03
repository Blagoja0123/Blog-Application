import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export const NavBar = () =>{
  
  return (
    <>
      <nav className="w-full h-16 flex items-center bg-red-600 relative z-50 align-top">
        <Link href='/'>
          <a className=" inline-flex items-start p-2 mr-4">
            <span className=" text-xl font-bold text-white  tracking-wide">HeapOverflow</span>
          </a>
        </Link>
        <div className=" w-full lg:inline-flex lg:flex-grow lg:w-auto items-end">
          <div className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto mx-1">
            <Link href='/user'>
                <a className='lg:inline-flex mx-2 lg:w-auto w-full px-3 py-2 rounded-md text-white font-bold items-center justify-center hover:bg-red-900 hover:text-white '>
                <FontAwesomeIcon icon={faUser} style={{fontSize: 20}}/>
                </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}