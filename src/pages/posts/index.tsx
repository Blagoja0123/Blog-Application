import Link from "next/link";
import Footer from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import NewPost from "../../components/NewPost";
import { trpc } from "../../utils/trpc";

export const Posts = () => {
    const { data, isLoading } = trpc.useQuery(['posts.all-posts'])

    const loader = () => {
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

    if (isLoading) {
        loader();
    }




    return (
        <>
            <NavBar />
            <div className=" flex w-full justify-center">

                <div className="flex h-full w-11/12 flex-wrap pt-4">
                    {data?.map((post) => {
                        return (
                            <>
                                <article key={post.id} className="flex w-full h-fit mx-12 p-2 my-6 items-baseline text-white">
                                    <div className="flex space-x-3">
                                        <Link href={`posts/${post.id}`} className="cursor-pointer">
                                            <div className=" w-1/3 h-5/6 cursor-pointer">
                                                <img src={post.img} className=" w-full h-full cursor-pointer rounded-lg" />
                                            </div>
                                        </Link>
                                        <Link href={`posts/${post.id}`} className="w-full cursor-pointer hover:text-blue-600">
                                            <h1 className=" text-4xl cursor-pointer">{post.title}</h1>
                                        </Link>
                                    </div>
                                </article>

                                <div className="w-11/12 bg-white h-px"></div>
                            </>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Posts;