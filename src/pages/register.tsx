import Link from "next/link"
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import { CreateUserInput } from "../backend/schema/user.schema";
import { trpc } from "../utils/trpc";
export const Register = () =>{
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const router = useRouter();

    const {mutate, error} = trpc.useMutation((['users.register']), {
        onSuccess: () =>{
            router.push('/login')
        },
    })

    function onSubmit (values: CreateUserInput){
        mutate(values)
    }

    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>{error && error.message}
        <h1>Register</h1>
        <input type='text' placeholder="username" {...register('username')}/>
        <br/>
        <input type='text' placeholder="email" {...register('email')}/>
        <br/>
        <input type='text' placeholder="password" {...register('password')}/>
        <br/>
        <button type='submit'>Register</button>
        </form>
        <Link href='/login'>Login</Link>
    </>
    )
}

export default Register