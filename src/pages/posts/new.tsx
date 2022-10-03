import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../backend/schema/post.schema";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../config/firebase";
import { arrayBuffer } from "stream/consumers";

const productInput = {
    title: '',
    body: '',
    img: ''
}

export const Post = () =>{
    const [inputs, setInputs] = useState(productInput);
    const [file, setFile] = useState(null);
    const router = useRouter();
    const storage = getStorage();
    const storageRef = ref(storage, 'images/rivers.jpg');
    const uploadTask = uploadBytesResumable(storageRef, file!);
    const {mutate, error} = trpc.useMutation(['posts.new-post'])

    const renderError = () =>{
        return (
            <p>NO</p>
        )
    }

    function submit(values: CreatePostInput) {
        mutate(values);
    }

    const handleChange = (e: any) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

    const handleClick = (e: any) =>{
        e.preventDefault();
        const fileName = new Date().getTime() + file?.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file!);

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
            default:
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
        }
        );
    }

    
    return (
        <>
            <form>
                {error && error.message}
                <h1>Create Post</h1>
                <input name="title" type="text" placeholder="Title" onChange={handleChange}></input>
                <br/>
                <input type='file' id="file" onChange={(e) => setFile(e.target.files[0])}/>
                <br/>
                <textarea placeholder="Body" name="body" onChange={handleChange}></textarea>
                <br/>
                <button onClick={handleClick}>Create Post</button>
            </form>
        </>
    )
}

export default Post;