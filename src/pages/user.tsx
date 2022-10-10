import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";
import { trpc } from "../utils/trpc"
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/router";
import UserPosts from "../components/UserPosts";
import Footer from "../components/Footer";
export const User = () => {
    const user = useUserContext();
    const router = useRouter();

    if (!user) {
        console.log(user)
        router.push('/login')
    }


    const logOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }

    return (
        <>
            <NavBar />
            <div className="flex space-x-3 p-2">
                <h1 className=" text-white text-4xl font-semibold mt-6 ml-6">Добредојде назад, {user?.username}!</h1>
                <button onClick={logOut} className="mt-3 p-4 bg-zinc-800 hover:bg-zinc-900 rounded-lg text-white">Одјава</button>
            </div>
            <div className=" text-white text-4xl font-semibold mt-12 ml-6">Ваши објави</div>
            <UserPosts userId={user?.id} />
            <Footer />
        </>
    )
}

export default User;