import PostArea from "@/components/PostArea";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useContext, useEffect, useState, useRef } from "react";
import OtherPosts from "@/components/OtherPosts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Loading } from "@/components/Loading";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "@/context/authContext";
import { toast } from 'react-toastify';

const SinglePost: React.FC = () => {
  interface CommentProps {
    comment_id: number;
    post_id: number;
    user_id: number;
    username: string;
    comment: string;
    date: string;
  }

  interface PostProps {
    id: number;
    uid: number;
    username: string;
    title: string;
    content: string;
    posts_img: string;
    date: string;
    category: string;
  }

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const postId = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { user, scrollToTop } = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
        const res = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(res.data);
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
        const resp = await axios.get(`http://localhost:5000/comments/${postId}`);
        setComments(resp.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching post/comment data", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const res = await axios.post<CommentProps>(
        `http://localhost:5000/comments`,
        {
          post_id: postId,
          comment: newComment,
          date: new Date().toISOString(),
        },
        { withCredentials: true }
      );
      // Update the comments state immediately
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
      toast.success("Comment added successfully");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (err) {
      toast.error("Failed to add comment");
      console.error("Error adding comment", err);
    }
  };

  const handleDeleteComment = async (comment_id: number) => {
    try {
      //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
      await axios.delete(`http://localhost:5000/comments/${comment_id}`, { withCredentials: true });
      setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id));
      toast.success("Comment deleted successfully");
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment", err);
    }
  };

  const handleUpdateComment = async (comment_id: number, updatedComment: string) => {
    try {
      await axios.put(
        //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
        `http://localhost:5000/comments/${comment_id}`,
        { comment: updatedComment },
        { withCredentials: true }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.comment_id === comment_id ? { ...comment, comment: updatedComment } : comment
        )
      );
      toast.success("Comment updated successfully");
    } catch (err) {
      toast.error("Failed to update comment");
      console.error("Error updating comment", err);
    }
  };

  let timeAgo;
  if (post.date) {
    const date = new Date(post.date);
    timeAgo = formatDistanceToNow(date, { addSuffix: true });
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        withCredentials: true,
      });
      toast.success('Post deleted successfully');
      navigate("/");
    } catch (err) {
      toast.error('Post failed to delete');
      console.error("Error deleting post", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to top on initial load
    scrollToTop();
  }, [scrollToTop]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col lg:flex-row justify-between gap-12 p-4">
        <div className="w-full lg:w-2/3 flex flex-col gap-7">
          <img
            src={post.posts_img}
            alt="post image"
            className="w-full h-auto max-h-80 object-cover rounded-lg"
            style={{ maxWidth: "100%", maxHeight: "450px" }}
          />
          <div className="flex items-center gap-3 text-sm">
            <div>
              <span className="font-semibold text-3xl mr-10">{post.username}</span>
              <p className="mt-4">Posted {timeAgo}</p>
            </div>
            {user?.id === post.uid && (
              <div className="flex gap-2 w-96">
                <Link to={`/post?id=${postId}`} state={post}>
                  <CiEdit className="w-5 h-5 cursor-pointer text-purple-800" />
                </Link>
                <CiTrash
                  className="w-5 h-5 cursor-pointer text-red-600"
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold hyphen-auto text-purple-800">
            {post.title}
          </h1>
          <PostArea val={post.content} />


          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-purple-800">Comments</h2>
            <div className="mt-4">
              {comments?.map((comment) => (
                <div key={comment.comment_id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{comment.username}</p>
                      <p className="text-gray-600">{comment.comment}</p>
                    </div>
                    {user?.id === comment.user_id && (
                      <div className="flex gap-2">
                        <CiEdit
                          className="w-5 h-5 cursor-pointer text-purple-800"
                          onClick={() => {
                            const updatedComment = prompt(
                              "Edit your comment",
                              comment.comment
                            );
                            if (updatedComment) handleUpdateComment(comment.comment_id, updatedComment);
                          }}
                        />
                        <CiTrash
                          className="w-5 h-5 cursor-pointer text-red-600"
                          onClick={() => handleDeleteComment(comment.comment_id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Section */}
            {user && (
              <form className="mt-4" onSubmit={handleAddComment}>
                <textarea
                  ref={textareaRef}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    if (textareaRef.current) {
                      textareaRef.current.style.height = 'auto';
                      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                    }
                  }}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-purple-800 text-white rounded-lg"
                >
                  Submit Comment
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-800">Other Posts</h2>
          <div className="flex flex-col gap-4">
            <OtherPosts post_id={postId} category={post.category} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
