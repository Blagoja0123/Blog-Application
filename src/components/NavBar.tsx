import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab);

export const NavBar = () => {

  return (
    <>
      <nav className="w-screen overflow-x-hidden h-16 flex items-center bg-black relative z-50 align-top border-white px-4">
        <Link href='/'>
          <a className=" inline-flex items-start p-2 mr-4 pl-4">
            <FontAwesomeIcon icon={["fab", "stack-overflow"]} color="white" style={{ fontSize: 30 }} />
            <span className=" text-xl font-bold text-white  tracking-wide ml-2">HeapOverflow</span>
          </a>
        </Link>
        <div className=" w-full lg:inline-flex lg:flex-grow lg:w-auto items-end space-x-1  ">
          <div className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto mx-1">
            <Link href='/posts'>
              <a className='lg:inline-flex mx-2 lg:w-auto w-full px-3 py-2 rounded-md text-white font-bold items-center justify-center border-white hover:border hover:text-white '>
                posts
              </a>
            </Link>
          </div>
          <div className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto mx-1">
            <Link href='/user'>
              <a className='lg:inline-flex mx-2 lg:w-auto w-full px-3 py-2 rounded-md text-white font-bold items-center justify-center border-white hover:border hover:text-white '>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}