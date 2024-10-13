import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { toast } from 'react-toastify';

/**
 * Post Component
 * This component renders a form for creating or editing a post.
 */
const Post = () => {
  const state = useLocation().state;

  // State to manage post details
  const [val, setVal] = useState(state ? state.content : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(state ? state.category : "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const categoryArray = [
    "Study",
    "Research",
    "Technology",
    "Law",
    "Political",
    "Other",
  ];

  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");

  /**
   * Uploads an image file to the server
   * @returns The URL of the uploaded image
   */
  const upload = async () => {
    const defaultImg =
      "https://res.cloudinary.com/dx3jpfyvb/image/upload/v1710927237/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz_xpq8zm.jpg";
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
        const res = await axios.post("http://localhost:5000/upload", formData);
        return res.data;
      }
      if (state?.posts_img) return state.posts_img;
      toast.success('Image successfully uploaded');
      return defaultImg;
    } catch (err) {
      toast.error('Image failed to upload');
      console.log(err);
      return defaultImg;
    }
  };

  /**
   * Handles saving the post as a draft
   */
  const handleDraft = async () => {
    setIsLoading(true);
    const imgUrl = await upload();
    console.log(imgUrl);
    setIsLoading(false);
  };

  /**
   * Handles submitting the post to the server
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    const imgUrl = await upload();
    try {
      const res = state
        ? await axios.put(
          //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
          `http://localhost:5000/posts/${state.post_id}`,
          {
            title,
            content: val,
            category,
            img: imgUrl,
            date: formattedDate,
          },
          { withCredentials: true }
        )
        : await axios.post(
          //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
          "http://localhost:5000/posts",
          {
            title,
            content: val,
            category,
            img: imgUrl,
            date: formattedDate,
          },
          { withCredentials: true }
        );
      toast.success('Post successfully added');
      console.log(res.data);
      navigate(state ? `/post/${state.post_id}` : "/");
    } catch (err) {
      toast.error('Post creation failure');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col lg:flex-row gap-5 pb-7">
        <div className="flex-1 flex flex-col gap-5 py-3 px-5 border border-gray-300 rounded-lg">
          <h1 className="text-xl font-bold">Post editor</h1>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-3 bg-white border border-gray-300 rounded-md text-lg"
          />
          <TextArea
            val={val}
            setVal={setVal}
            isLearning={false}
            placeholder="Content"
          />
        </div>
        <div className="flex-1 flex flex-col gap-5 max-w-96">
          <div className="flex-1 flex flex-col justify-between gap-2 p-3 border border-gray-300 rounded-lg text-sm">
            <h1 className="text-xl font-bold text-purple-800">Publish</h1>
            <span>
              <b>Status:</b> <b>Draft</b>
            </span>
            <span>
              <b>Visibility:</b> <b>Public</b>
            </span>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="underline flex gap-1 cursor-pointer">
              <span>{file ? file.name : "Upload image"}</span>
              <MdOutlineDriveFolderUpload className="w-5 h-5" />
            </label>
            <div className="flex justify-between">
              <Button variant="hust" onClick={handleDraft}>
                Save as draft
              </Button>
              <Button variant="hust" onClick={handleSubmit}>
                {state ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-2 p-3 border border-gray-300 rounded-lg text-sm">
            <h1 className="text-xl font-bold text-purple-800">Category</h1>
            {categoryArray.map((name, index) => (
              <div className="flex items-center gap-2" key={index}>
                <input
                  type="radio"
                  name="category"
                  value={name}
                  id={name}
                  defaultChecked={name === category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
