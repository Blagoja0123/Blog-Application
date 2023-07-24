import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../backend/schema/post.schema";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../config/firebase";
import { arrayBuffer } from "stream/consumers";
import { NavBar } from "../../components/NavBar";

const productInput = {
    title: '',
    body: '',
    img: ''
}

export const Post = () => {
    const [inputs, setInputs] = useState(productInput);
    const [file, setFile] = useState<any>(null);
    const router = useRouter();
    const storage = getStorage();
    const storageRef = ref(storage, 'images/rivers.jpg');
    const uploadTask = uploadBytesResumable(storageRef, file!);
    const { mutate, error } = trpc.useMutation(['posts.new-post'])
   

    function submit(values: CreatePostInput) {
        mutate(values);
    }

    const handleChange = (e: any) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        const file = e.target[1].files[0];
        try {
            
            const date = new Date().getTime();
            const storage = getStorage(app);
            const storageRef = ref(storage, `${file.name + date}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const product: CreatePostInput = { title: inputs.title, body: inputs.body, img: downloadURL };
                        submit(product);
                    });
                    router.push('/');
                }
            );
        } catch (error) {
            
        }
    }

    return (
        <>
            <NavBar />
            <div className=" justify-center align-top flex pt-5 overflow-hidden">
                <form className=" w-3/5 flex-row text-white space-y-2" onSubmit={handleClick}>
                    {error && error.message}
                    <h1 className=" text-5xl text-center text-white m-2">Create a post</h1>
                    <input className=" bg-transparent border-none w-11/12 h-16 text-5xl px-3" name="title" type="text" placeholder="Наслов" onChange={handleChange}></input>
                    <br />
                    <input type='file' id="file"/>
                    <br />
                    <textarea className=" bg-transparent w-full h-96 p-2 text-lg border-transparent" placeholder="Содржина" name="body" onChange={handleChange}></textarea>
                    <br />
                    <button className=" bg-zinc-800 p-4 rounded-xl hover:bg-zinc-900">Post</button>
                </form>
            </div>
        </>
    )
}

export default Post;