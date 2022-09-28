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
                    <img className="h-fit" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2Fyi591FUlVsJEKg9Q6wKqWLHdFQ-PPzAsQU5Tveby3kA.jpg%3Fauto%3Dwebp%26s%3D79f70bdaffc909822029c86be956240d99feb875&f=1&nofb=1&ipt=86084f0b0d50316fe29bda0d259d89cc96548076da403bebebdf4ab61c736844&ipo=images"></img>
                    <br/>
                    <p>{data?.body}</p>
                    <br/>
                    <p>Posted: {date.toDateString()}</p>
                    {/* add author through new relation */}
                    <div className="w-full h-1 bg-slate-50 rounded-sm"></div>
                    <div className=" h-80 overflow-y-scroll overflow-x-hidden">
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