import { trpc } from "../../utils/trpc";

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
        <div>
            {data.map((comment: any) =>{
                return(
                    <article key={comment.id}>
                        <p>{comment.body}</p>
                    </article>
                )
            })}
        </div>
    )
}

export default Comments;