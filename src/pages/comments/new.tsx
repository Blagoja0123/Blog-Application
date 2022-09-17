import { useForm } from "react-hook-form";
import { CreateCommentInput } from "../../backend/schema/comment.schema";
import { trpc } from "../../utils/trpc";
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
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && error.message}
            <input type='text' placeholder="Leave a comment" {...register('body')}/>
            <br/>
            <button type='submit'>Post</button>
        </form>
    )
}

export default MakeComment;