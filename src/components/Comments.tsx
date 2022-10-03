import { trpc } from "../utils/trpc";

function Comments({postId}:{
    postId: number,
}){
    const {data, isLoading} = trpc.useQuery(['comment.all-comments', {
        postId,
    }])

    if(isLoading){
        return <p>Loading...</p>
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