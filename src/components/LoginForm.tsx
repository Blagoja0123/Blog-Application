import Link from "next/link"
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import { CreateUserInput } from "../backend/schema/user.schema";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";

const VerifyToken = ({hash}:{hash: string})=>{
    const router = useRouter();
        const {data, isLoading} = trpc.useQuery(['users.verify-otp', {
            hash,
        }])

        if(isLoading){
            return <p>Verifying...</p>
        }

        router.push(data?.redirect.includes('login') ? '/': data?.redirect || '/')

        return <p>Redirecting...</p>
}

export const LoginForm = () =>{
    const [success, setSuccess] = useState(false);
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const router = useRouter();

        

    const {mutate, error} = trpc.useMutation(['users.login-otp'], {
        onSuccess: ()=>{
            setSuccess(true);
        }
    })

    function onSubmit (values: CreateUserInput){
        mutate({...values, redirect: router.asPath})
    }

    const hash = router.asPath.split('#token=')[1]

    if (hash) {
        return <VerifyToken hash={hash}/>
    }

    return (
    <>
        <div className=" bg-slate-700 flex items-center justify-center">
            <div className=" bg-slate-600 p-12 rounded-xl mt-36 w-1/3 h-fit flex-row items-center content-center text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && error.message}
                    {success && <p>check email</p>}
                <h1 className=" text-center font-bold text-3xl">Login</h1>
                <br/>
                <div className=" container justify-center ">
                    <div className=" flex-row space-y-3">
                        <input type='text' placeholder="email" {...register('email')} className=" bg-slate-400 placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full"/>
                        <br/>
                        <input type='text' placeholder="password" {...register('password')} className=" bg-slate-400 placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full"/>
                        <br/>
                        <button type='submit' className=" bg-slate-800 rounded-md px-12 py-4 flex item text-xl w-full hover:bg-slate-900">Login</button>
                        <span className=" items-center font-semibold space-y-1">OR</span>
                        <br/>
                    </div>
                </div>
                </form>
                <Link href='/register'><button className=" bg-slate-800 rounded-md px-12 py-4 flex text-xl w-full hover:bg-slate-900">Register</button></Link>
            </div>
        </div>
    </>
    )
}

export default LoginForm