import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Footer = () => {
    return (
        <>
            <footer className='w-screen overflow-x-hidden h-96 bg-black border-t-2 px-16 py-8 text-white flex space-x-40 justify-center'>
                <div className="cursor-pointer">
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={["fab", "stack-overflow"]} color="white" style={{ fontSize: 100 }}/>
                    </Link>
                </div>
                <section>
                    <span className=' font-bold'>HEAP OVERFLOW</span>
                    <ul>
                        <li className=" cursor-pointer">Questions</li>
                        <li className=" cursor-pointer">Help</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold'>Products</span>
                    <ul>
                        <li className=" cursor-pointer">Teams</li>
                        <li className=" cursor-pointer">Marketing</li>
                        <li className=" cursor-pointer">Collectives</li>
                        <li className=" cursor-pointer">Talent</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold cursor-pointer'>Company</span>
                    <ul>
                        <li className=" cursor-pointer">About</li>
                        <li className=" cursor-pointer">Work here</li>
                        <li className=" cursor-pointer">Privacy</li>
                        <li className=" cursor-pointer">Service</li>
                        <li className=" cursor-pointer">COntact</li>
                        <li className=" cursor-pointer">Cookies</li>
                    </ul>
                </section>
                <section>
                    <ul className='flex space-x-2'>
                        <li className='cursor-pointer'><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 30 }} /></li>
                        <li className='cursor-pointer'><FontAwesomeIcon icon={["fab", "facebook-square"]} style={{ fontSize: 30 }} /></li>
                        <li className='cursor-pointer'><FontAwesomeIcon icon={["fab", "twitter"]} style={{ fontSize: 30 }} /></li>
                        <li className='cursor-pointer'><FontAwesomeIcon icon={["fab", "instagram"]} style={{ fontSize: 30 }} /></li>
                        <li className='cursor-pointer'><FontAwesomeIcon icon={["fab", "linkedin"]} style={{ fontSize: 30 }} /></li>
                    </ul>
                </section >
            </footer>
        </>
    )
}

export default Footer;