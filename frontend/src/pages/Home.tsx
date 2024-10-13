import axios from 'axios';
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { PostProps } from "@/types/auth.types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Home component that fetches and displays posts.
 *
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Development endpoint (use a proper URL in production)
        const res = await axios.get(`https://blitzbackend.onrender.com/posts${category}`);
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching data", error);
        setPosts([]); // Set posts to an empty array in case of error
      }
      setIsLoading(false);
    };

    fetchData();
  }, [category]);

  // Function to limit the post content preview to a certain number of characters
  const getPreviewText = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...'; // Append ellipsis after truncation
    }
    return content;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isLoading && <Loading />} {/* Show loading component if isLoading is true */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-12">
        {posts.length ? (
          posts.map((post: PostProps) => (
            <div
              key={post.id}
              className="flex flex-col items-center justify-start bg-foreground-hust border-border-hust border-2 rounded-lg shadow-lg p-4"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg">
                <img
                  src={post.img}
                  alt="post img"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="mt-4 text-xl font-bold text-center text-copy">
                {post.title}
              </h1>
              {/* Display truncated content */}
              <p className="mt-2 text-justify line-clamp-4 text-copy-light">
                {getPreviewText(post.content, 150)} {/* Truncate content to 150 characters */}
              </p>
              <Link to={`/post/${post.id}`}>
                <Button className="mt-4">Read more</Button>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-copy-lighter italic text-lg col-span-full">
            There's no post yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
