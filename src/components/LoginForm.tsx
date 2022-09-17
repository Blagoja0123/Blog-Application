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
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && error.message}
            {success && <p>check email</p>}
        <h1>Login</h1>
        <input type='text' placeholder="email" {...register('email')}/>
        <br/>
        <input type='text' placeholder="password" {...register('password')}/>
        <br/>
        <button type='submit'>Login</button>
        </form>
        <Link href='/register'>Register</Link>
    </>
    )
}

export default LoginForm