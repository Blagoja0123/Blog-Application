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
                        <li className=" cursor-pointer">Прашања</li>
                        <li className=" cursor-pointer">Помош</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold'>Производи</span>
                    <ul>
                        <li className=" cursor-pointer">Тимови</li>
                        <li className=" cursor-pointer">Рекламирање</li>
                        <li className=" cursor-pointer">Колективи</li>
                        <li className=" cursor-pointer">Талент</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold cursor-pointer'>Компанија</span>
                    <ul>
                        <li className=" cursor-pointer">За нас</li>
                        <li className=" cursor-pointer">Вработи се овде</li>
                        <li className=" cursor-pointer">Приватност</li>
                        <li className=" cursor-pointer">Сервис</li>
                        <li className=" cursor-pointer">Контактирај не</li>
                        <li className=" cursor-pointer">Колачиња</li>
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