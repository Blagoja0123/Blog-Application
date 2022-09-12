import Link from "next/link";


export const NavBar = () =>{
  return (
    <>
      <nav className="w-full h-16 flex items-center flex-wrap bg-cyan-700 relative z-50 align-top">
        <Link href='/'>
          <a className=" inline-flex items-center p-2 mr-4">
            <span>LG</span>
            <span className=" text-xl font-bold text-white uppercase tracking-wide">Portfolio</span>
          </a>
        </Link>
        <div className=" w-full lg:inline-flex lg:flex-grow lg:w-auto ">
          <div className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'">
            <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-cyan-900 hover:text-white '>
                  Home
                </a>
            </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-cyan-900 hover:text-white'>
                  Services
                </a>
            </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-cyan-900 hover:text-white'>
                  About us
                </a>
            </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-cyan-900 hover:text-white'>
                  Contact us
                </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}