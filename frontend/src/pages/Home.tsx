import axios from 'axios'
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
  // State to manage the list of posts
  const [posts, setPosts] = useState<PostProps[]>([]); // Initialize as an empty array

  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Getting the category from the URL query parameters
  const category = useLocation().search;

  // Fetching data when the component mounts or when the category changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 

      try {
        const res = await axios.get(`http://localhost:5000/posts${category}`);
        // Ensuring the data is an array before setting it to posts
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching data", error);
        setPosts([]); // Setting posts to an empty array in case of error
      }

      setIsLoading(false);
    };

    fetchData();
  }, [category]);

  return (
    <div className="">
      {isLoading && <Loading />} {/* Show loading component if isLoading is true */}
      
      <div className="flex flex-col py-12 gap-36 bg-foreground-hust border-border-hust border-2 rounded-lg">
        {posts.length ? (
          posts.map((post: PostProps) => (
            <div
              key={post.id}
              className="flex justify-around gap-10 mx-24 odd:flex-row-reverse"
            >
              <div className="min-w-72 w-72 h-72 overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={post.img}
                  alt="post img"
                  className="min-w-full min-h-full object-cover"
                />
              </div>
              <div className="flex-2">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-bold hyphen-auto text-copy">
                    {post.title}
                  </h1>
                  <p className="line-clamp-6 indent-4 text-justify text-copy-light">
                    {post.content}
                  </p>
                </div>
                <Link to={`/post/${post.id}`}>
                  <Button className="mt-10">Read more</Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-copy-lighter italic text-lg">
            There's no post yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
