import { PostProps } from "@/types/auth.types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

// Props interface for the OtherPosts component
interface OtherPostsProps {
  post_id: string;
  category: string;
}

// Functional component for displaying related posts
const OtherPosts: React.FC<OtherPostsProps> = ({ post_id, category }) => {
  // State to store posts and loading status
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hook for navigation
  const navigate = useNavigate();

  // Fetching related posts when component mounts or dependencies change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        // Fetching related posts based on post_id and category
        const response = await axios.get(
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
          `/posts/${post_id}/related?category=${category}`
        );
        setPosts(response.data); // Updating state with fetched posts
      } catch (error) {
        toast.error('failed to retrieve the posts')
        console.error("Error fetching related posts", error); 
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData(); 
  }, [post_id, category]); // Dependencies array

  return (
    <div className="w-3/4 flex flex-col space-y-5">
      <h1 className="text-xl text-black font-semibold">
        Other posts you may like
      </h1>
      {!isLoading && posts.length > 0 ? (
        //looping through the posts array and displaying each one of them
        posts.map((post: PostProps) => (
          <div className="flex-2 flex flex-col gap-3" key={post.id}>
            <img
              className="w-full h-56 object-cover rounded-xl shadow-xl"
              src={post.img}
              alt={post.title}
            />
            <h2 className="text-2xl font-bold hyphen-auto text-purple-800">
              {post.title}
            </h2>
            <Button
              variant="hust"
              className="w-28"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              Read more
            </Button>
          </div>
        ))
      ) : (
        //if it's not loading the below message is displayed
        !isLoading && <p>No related posts available.</p>
      )}
    </div>
  );
};

export default OtherPosts;
