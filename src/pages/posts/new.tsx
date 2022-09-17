import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../backend/schema/post.schema";
import { trpc } from "../../utils/trpc";



export const Post = () =>{
    const {handleSubmit, register} = useForm<CreatePostInput>();
    const router = useRouter();

    const {mutate, error} = trpc.useMutation(['posts.new-post'])

    function onSubmit(values: CreatePostInput) {
        mutate(values);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && error.message}
                <h1>Create Post</h1>
                <input type="text" placeholder="Title" {...register('title')}></input>
                <br/>
                <textarea placeholder="Body" {...register('body')}></textarea>
                <br/>
                <button>Create Post</button>
            </form>
        </>
    )
}

export default Post;