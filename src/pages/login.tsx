import Link from "next/link"
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import { CreateUserInput } from "../backend/schema/user.schema";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import dynamic from "next/dynamic";
import { NavBar } from "../components/NavBar";
import { Loader } from "../components/Loader";


const LoginForm = dynamic(()=>import('../components/LoginForm'), {
    ssr: false,
});

const VerifyToken = ({hash}:{hash: string})=>{
    const router = useRouter();
        const {data, isLoading} = trpc.useQuery(['users.verify-otp', {
            hash,
        }])

        if(isLoading){
            return <Loader/>
        }

        router.push(data?.redirect.includes('login') ? '/': data?.redirect || '/')

        return <p>Redirecting...</p>
}

export const Login = () =>{
    
    return (
    <>
        <NavBar/>
        <div>
            <LoginForm/>
        </div>
    </>
    )
}

export default Login