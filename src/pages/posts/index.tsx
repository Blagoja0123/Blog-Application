import Link from "next/link";
import { trpc } from "../../utils/trpc";

export const Posts = () =>{
    const {data, isLoading} = trpc.useQuery(['posts.all-posts'])

    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-wrap w-3/4 mt-6">
            {data?.map((post) => {
                return (
                    <article key={post.id} className=" w-1/3 h-72 border-zinc-300 rounded-2xl border items-center p-4 mx-6 my-4 text-center hover:bg-slate-900">
                        <h1 className=" items-center ">{post.title}</h1>
                        <br/>
                        <Link href={`/posts/${post.id}`}>Read post</Link>
                    </article>
                )
            })}
        </div>
    )
}  

export default Posts;