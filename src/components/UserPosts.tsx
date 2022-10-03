import { trpc } from "../utils/trpc"
import Link from "next/link"
function UserPosts({userId}:{
    userId: any,
}){

    const {data, isLoading} = trpc.useQuery(['posts.user-posts', {
        userId,
    }])

    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            {data?.map((post) => {
                return (
                <Link href={`posts/${post.id}`} key={post.id}>
                    <article key={post.id} className=" w-11/12 h-72 border-zinc-300  border items-start p-4 mx-6 my-4 hover:bg-slate-900 flex space-x-2 bg-white text-black bg-gradient-to-l from-white to-black cursor-pointer">
                        
                            <img src={post.img} alt='no image' className="w-1/3 h-full rounded-md overflow-hidden border-black border-2"/>
                            <div>
                                <h1 className="text-5xl">{post.title}</h1>
                                <br/>
                                <p>{post.body}</p>
                                <div className=" text-end align-bottom h-16 justify-end pt-32">
                                    <p>Posted: {post.createdAt.toDateString()}</p>
                                </div>
                            </div>
                        
                    </article>
                </Link>
                )
            })}
        </>
    )
}

export default UserPosts