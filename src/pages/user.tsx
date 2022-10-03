import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";
import { trpc } from "../utils/trpc"
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/router";
export const User = () =>{
    const user = useUserContext();
    const router = useRouter();
    
    if(!user){
        router.push('/login')
    }
    

   return (
    <>
        <NavBar/>
        <div>{JSON.stringify(user)}</div>
    </>
   )
}

export default User;