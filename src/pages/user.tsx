import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";
import { trpc } from "../utils/trpc"

export const User = () =>{
    const user = useUserContext();
    
    if(!user){
        <LoginForm/>
    }
   return (
    <>
        <div>{JSON.stringify(user)}</div>
    </>
   )
}

export default User;