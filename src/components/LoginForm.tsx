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
    const [link, setLink] = useState('');
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const router = useRouter();

        

    const {mutate, data, error} = trpc.useMutation(['users.login-otp'], {
        onSuccess: ()=>{
            setSuccess(true);
            console.log(data)
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
        <div className=" flex items-center justify-center">
            <div className=" bg-gray-500 p-12 rounded-xl mt-36 w-1/3 h-fit flex-row items-center content-center text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && error.message}
                    {success && <Link href={data || ''}>check email</Link>}
                <h1 className=" text-center font-bold text-3xl">Login</h1>
                <br/>
                <div className=" container justify-center ">
                    <div className=" flex-row space-y-3">
                        <input type='text' placeholder="email" {...register('email')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full"/>
                        <br/>
                        <input type='text' placeholder="password" {...register('password')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full"/>
                        <br/>
                        <button type='submit' className=" bg-red-600 rounded-md px-12 py-4 flex item text-xl w-full hover:bg-red-900">Login</button>
                        <br/>
                    </div>
                </div>
                </form>
                <span className=" text-lg">Don't have an account? <span className=" text-blue-900"><Link href='/register'>Register</Link></span></span>
            </div>
        </div>
    </>
    )
}

export default LoginForm