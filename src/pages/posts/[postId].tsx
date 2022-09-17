import Error from "next/error";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import MakeComment from "../comments/new";
import Comments from "../comments/index";

export const SinglePost = () =>{
    const router = useRouter();
    const id = router.query.postId as string;
    const postId = parseInt(id);

    const {data, isLoading} = trpc.useQuery(['posts.single-post', {postId}])

    if(isLoading){
        return <p>Loading...</p>
    }

    if(!data){
        return <Error statusCode={404}/>
    }

    let date = data.createdAt;
    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.body}</p>
            <p>{date.toDateString()}</p>
            <div>
                <p>Leave a comment</p>
                <MakeComment postId = {postId}/>
            </div>
            <div>
                <h2>Comments</h2>
                <Comments postId = {postId}/>
            </div>
        </div>
    )
}

export default SinglePost