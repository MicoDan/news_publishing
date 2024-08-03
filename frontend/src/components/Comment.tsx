import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import Comment from './Comment';
import { AuthContext } from '@/context/authContext';
import { toast } from 'react-toastify';

// Interface defining the structure of a single comment
interface CommentProps {
  comment_id: number;
  post_id: number;
  user_id: number;
  username: string;
  user_img: string;
  comment: string;
  img: string;
  date: string;
}

// Interface defining the props for the Comments component
interface CommentsProps {
  postId: number; // The ID of the post to fetch and display comments for
}

// Functional component for displaying and adding comments
const Comments: React.FC<CommentsProps> = ({ postId }) => {
  // Accessing user information from the AuthContext
  const { user } = useContext(AuthContext);

  // State to store comments
  const [comments, setComments] = useState<CommentProps[]>([]);
  // State to manage the new comment input value
  const [newComment, setNewComment] = useState<string>('');
  // State to manage the expanded/collapsed state of the comments section
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Effect to fetch comments when the postId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [postId]);

  // Handler to add a new comment
  const handleAddComment = async () => {
    try {
      const date = new Date().toISOString(); // Getting the current date and time
      // Posting the new comment to the server
      const res = await axios.post('/comments', { post_id: postId, comment: newComment, date });
      // Updating the state with the new comment
      setComments([...comments, { ...res.data, user_id: user?.id, username: user?.username }]);
      setNewComment(''); // Clear the input field
      toast.success('comment added')
    } catch (error) {
      toast.error('failed to add the comment')
      console.error("Error adding comment", error);
    }
  };

  // JSX for rendering the comments section
  return (
    <div className="comments-section">
      {/* Header for the comments section, toggles expansion */}
      <div className="comments-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>Comments</h2>
      </div>
      {/* Rendering comments and comment input if the section is expanded */}
      {isExpanded && (
        <div className="comments">
          {/* List of comments */}
          <div className="comments__list">
            {comments?.map(comment => (
              <Comment postId={comment.post_id}/>
            ))}
          </div>
          {/* Input area for adding a new comment */}
          <div className="comments__add">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
