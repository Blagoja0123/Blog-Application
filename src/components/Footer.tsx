import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
    return (
        <>
            <footer className='w-screen overflow-x-hidden h-96 bg-black border-t-2 px-16 py-8 text-white flex space-x-40 justify-center'>
                <FontAwesomeIcon icon={["fab", "stack-overflow"]} color="white" style={{ fontSize: 100 }} />
                <section>
                    <span className=' font-bold'>HEAP OVERFLOW</span>
                    <ul>
                        <li>Прашања</li>
                        <li>Помош</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold'>Производи</span>
                    <ul>
                        <li>Тимови</li>
                        <li>Рекламирање</li>
                        <li>Колективи</li>
                        <li>Талент</li>
                    </ul>
                </section>
                <section>
                    <span className=' font-bold'>Компанија</span>
                    <ul>
                        <li>За нас</li>
                        <li>Вработи се овде</li>
                        <li>Приватност</li>
                        <li>Сервис</li>
                        <li>Контактирај не</li>
                        <li>Колачиња</li>
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