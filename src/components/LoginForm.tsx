import Link from "next/link"
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form'
import { CreateUserInput } from "../backend/schema/user.schema";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";

const VerifyToken = ({ hash }: { hash: string }) => {
    const router = useRouter();
    const { data, isLoading } = trpc.useQuery(['users.verify-otp', {
        hash,
    }])

    if (isLoading) {
        return <p>Verifying...</p>
    }

    router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

    return <p>Redirecting...</p>
}

export const LoginForm = () => {
    const [success, setSuccess] = useState(false);
    const [link, setLink] = useState('');
    const { handleSubmit, register } = useForm<CreateUserInput>();
    const router = useRouter();



    const { mutate, data, error } = trpc.useMutation(['users.login-otp'], {
        onSuccess: () => {
            setSuccess(true);
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate({ ...values, redirect: router.asPath })
    }

    const hash = router.asPath.split('#token=')[1]

    if (hash) {
        return <VerifyToken hash={hash} />
    }


    return (
        <>
            <div className=" flex items-center justify-center">
                <div className=" bg-zinc-700 p-12 rounded-xl mt-36 w-fit h-fit items-center content-center text-center shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        {error && <span>There was a problem with the server, try again</span>}
                        {success && <Link href={data?.test || ''}>Check your mail</Link>}
                        <h1 className=" text-center font-bold text-3xl text-white">Log in</h1>
                        <br />
                        <div className=" justify-center">
                            <div className=" space-y-3">
                                <input type='text' placeholder="email" {...register('email')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full" />
                                <br />
                                <input type='text' placeholder="password" {...register('password')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full" />
                                <br />
                                <button type='submit' className=" bg-zinc-800 rounded-md px-40 py-4 flex item text-xl w-full hover:bg-zinc-900 text-white">Log in</button>
                                <br />
                            </div>
                        </div>
                    </form>
                    <span className=" text-lg text-white">New here? <span className=" text-sky-700"><Link href="/register">Register</Link></span></span>
                </div>
            </div>
        </>
    )
}

export default LoginForm