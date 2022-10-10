import { trpc } from "../utils/trpc";
import Loader from "./Loader";

function Comments({postId}:{
    postId: number,
}){
    const {data, isLoading} = trpc.useQuery(['comment.all-comments', {
        postId,
    }])

    if(isLoading){
        return <Loader/>
    }

    return (
        <div className=" space-y-2">
            {data?.map((comment: any) =>{
                return(
                    <article className=" bg-white pl-3 rounded-md py-3 text-black" key={comment.id}>
                        <p>{comment.body}</p>
                    </article>
                )
            })}
        </div>
    )
}

export default Comments;