import Link from "next/link";
import NewPost from "../components/NewPost";
import { trpc } from "../utils/trpc";

export const Posts = () =>{
    const {data, isLoading} = trpc.useQuery(['posts.all-posts'])

    const loader = () =>{
        return (
            <>
            <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            </>
        )
    }

    if(isLoading){
        loader();
    }

    


    return (
        <div className="flex h-full w-full flex-wrap mt-6 pt-4 justify-self-auto mb-24">
            {data?.map((post) => {
                return (
                    <>
                    <article key={post.id} className="flex w-1/4 h-96 mx-12 p-2 my-6 items-baseline text-white border-b">
                            <div>
                                <Link href={`posts/${post.id}`} className="cursor-pointer">
                                    <img src={post.img} className="cursor-pointer rounded-lg h-3/4"/>
                                </Link>
                                <br/>
                                <Link href={`posts/${post.id}`} className=" cursor-pointer hover:text-blue-600">
                                    <h1 className="text-4xl cursor-pointer">{post.title}</h1>
                                </Link>
                               
                                

                            </div>
                            
                    </article>
                    </>
                )
            })}
            
        </div>
    )
}  

export default Posts;