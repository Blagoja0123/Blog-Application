import { useForm } from "react-hook-form";
import { CreateCommentInput } from "../backend/schema/comment.schema";
import { trpc } from "../utils/trpc";
export const MakeComment = ({postId}:{
    postId: number
}) =>{
    const {handleSubmit, register} = useForm<CreateCommentInput>()
    const {mutate, error} = trpc.useMutation(['comment.new-comment'])
    function onSubmit(values: CreateCommentInput){
        values.postId = postId;
        mutate(values);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-x-2">
                {error && error.message}
                <input type='text' placeholder="Остави коментар" {...register('body')} className=" bg-white placeholder-black rounded-md py-3 pl-2 pr-96"/>
                <button className=" bg-zinc-800 hover:bg-zinc-900 p-2 rounded-md px-4 py-3" type='submit'>Објави</button>
            </form>
        </div>
    )
}

export default MakeComment;