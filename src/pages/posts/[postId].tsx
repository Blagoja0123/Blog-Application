import Error from "next/error";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import MakeComment from "../../components/MakeComment"
import Comments from "../../components/Comments";
import { NavBar } from "../../components/NavBar";

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
        <>
            <NavBar/>
            <div className=" justify-center align-top flex pt-5 overflow-hidden">
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
                        <div className=" h-80 overflow-y-scroll  mt-2">
                            <div>   
                                <br/>
                                <p>Leave a comment</p>
                                <MakeComment postId = {postId}/>
                            </div>
                            <div className=" pr-2">
                                <h2>Comments</h2>
                                <br/>
                                <Comments postId = {postId}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default SinglePost