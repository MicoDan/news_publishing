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
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
        const res = await axios.get(`http://localhost:5000/posts${category}`);
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
    <div className="px-4 sm:px-6 lg:px-8">
      {isLoading && <Loading />} {/* Show loading component if isLoading is true */}
      <div className="flex flex-col py-12 gap-10 bg-foreground-hust border-border-hust border-2 rounded-lg">
        {posts.length ? (
          posts.map((post: PostProps) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row justify-around gap-6 md:gap-10 mx-4 md:mx-8 lg:mx-16 xl:mx-24 odd:flex-col-reverse md:odd:flex-row-reverse"
            >
              <div className="w-full md:w-72 h-72 overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={post.img}
                  alt="post img"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 md:flex-2">
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold hyphen-auto text-copy">
                    {post.title}
                  </h1>
                  <p className="line-clamp-6 indent-4 text-justify text-copy-light">
                    {post.content}
                  </p>
                </div>
                <Link to={`/post/${post.id}`}>
                  <Button className="mt-4 md:mt-6 lg:mt-10">Read more</Button>
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