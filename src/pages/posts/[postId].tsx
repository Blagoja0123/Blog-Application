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
        <div className="w-screen h-screen bg-slate-700 justify-center align-top flex pt-5 overflow-x-hidden">
            <div className=" w-3/5 flex-row">
                <h1 className=" text-5xl align-top">{data?.title}</h1>
                <br/>
                <div className="w-full h-1 bg-slate-50 rounded-sm"></div>
                <div>
                    <br/>
                    <img className="h-fit" src={data?.img} alt='No image'></img>
                    <br/>
                    <p>{data?.body}</p>
                    <br/>
                    <p>Posted: {date.toDateString()}</p>
                    <div className="w-full h-1 bg-slate-50 rounded-sm"></div>
                    <div className=" h-80 overflow-y-scroll overflow-x-hidden mt-2 scroll-p-4">
                        <div>   
                            <br/>
                            <p>Leave a comment</p>
                            <MakeComment postId = {postId}/>
                        </div>
                        <div>
                            <h2>Comments</h2>
                            <br/>
                            <Comments postId = {postId}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SinglePost