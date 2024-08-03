import PostArea from "@/components/PostArea";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import OtherPosts from "@/components/OtherPosts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Loading } from "@/components/Loading";
import { PostProps } from "@/types/auth.types";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "@/context/authContext";
import { toast } from 'react-toastify'

/**
 * Single Post Component
 * This component renders a single post along with options to edit or delete if the user is the author.
 */
const Single = () => {
  // State to hold the post data
  const [post, setPost] = useState({} as PostProps);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Extract postId from URL
  const postId = useLocation().pathname.split("/")[2];

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Auth context to get the current user and scrollToTop function
  const { user, scrollToTop } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching post data", err);
      }
    };
    fetchData();
  }, [postId]);

  // Calculating time ago string for the post date
  let timeAgo;
  if (post.date) {
    const date = new Date(post.date);
    timeAgo = formatDistanceToNow(date, { addSuffix: true });
  }

  /**
   * Handling post deletion
   */
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`http://localhost:5000/posts/${postId}`, {
        withCredentials: true,
      });
      toast.success('post deleted successfully')
      console.log("Post deleted successfully", res.data);
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error('post failed to delete')
      console.error("Error deleting post", err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // Scrolling to top of the page when component is rendered
  scrollToTop();

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-between gap-12">
        <div className="w-2/3 flex flex-col gap-7">
          <img
            src={post.posts_img}
            alt="post image"
            className="w-full h-80 object-cover"
          />
          <div className="flex items-center gap-3 text-sm">
            <img
              src={post.users_img}
              alt="user image"
              className="size-12 rounded-full object-cover"
            />
            <div>
              <span className="font-semibold">{post.username}</span>
              <p>Posted {timeAgo}</p>
            </div>
            {user?.id === post.uid && (
              <div className="flex gap-2">
                <Link to={`/write?id=${postId}`} state={post}>
                  <CiEdit className="size-5 cursor-pointer" />
                </Link>
                <CiTrash
                  className="size-5 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold hyphen-auto text-primary-light">
            {post.title}
          </h1>
          <PostArea val={post.content} />
        </div>
        <OtherPosts post_id={postId} category={post.category} />
      </div>
    </>
  );
};

export default Single;
