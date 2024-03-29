import Link from "next/link"
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form'
import { CreateUserInput } from "../backend/schema/user.schema";
import { NavBar } from "../components/NavBar";
import { trpc } from "../utils/trpc";
export const Register = () => {
    const { handleSubmit, register } = useForm<CreateUserInput>();
    const router = useRouter();

    const { mutate, error } = trpc.useMutation((['users.register']), {
        onSuccess: () => {
            router.push('/login')
        },
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }



    return (
        <>
            <body>
                <NavBar />
                <div className=" flex items-center justify-center align-middle pt-16">
                    <div className=" bg-zinc-700 p-12 rounded-xl mb-36 pt-16 w-fit h-fit flex-row items-center content-center text-center">
                        <form onSubmit={handleSubmit(onSubmit)}>{error && <span>There was a problem with the server, try again</span>}
                            <h1 className=" text-center font-bold text-3xl text-white">Register</h1>
                            <br />
                            <div className=" container justify-center ">
                                <div className=" flex-row space-y-3">
                                    <input type='text' placeholder="username" {...register('username')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full" />
                                    <br />
                                    <input type='text' placeholder="email" {...register('email')} className=" bg-white placeholder-black rounded-md pr-16 py-4 pl-2 text-left text-black w-full" />
                                    <br />
                                    <input type='text' placeholder="password" {...register('password')} className=" bg-white placeholder-black rounded-md pr-16 pl-2 py-4 text-left text-black w-full" />
                                    <br />
                                    <button type='submit' className=" bg-zinc-800 rounded-md px-40 py-4 flex item text-xl w-full hover:bg-zinc-900 text-white">Register</button>
                                    <br />
                                </div>
                            </div>
                        </form>
                        <span className=" text-lg text-white">ALready have a profile? <span className=" text-sky-700"><Link href='/login'>Log in</Link></span></span>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Register