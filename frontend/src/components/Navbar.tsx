import { Link } from "react-router-dom"; 
import Logo from "../img/logo2.png"; // Import the logo image
import { Button } from "./ui/button"; // Import custom Button component
import axios from 'axios' // Import axios for API requests
import { useContext } from "react"; // Import useContext hook for accessing context
import { AuthContext } from "@/context/authContext"; // Import AuthContext for user authentication
import BackButton from "./BackButton"; // Import BackButton component for navigation
import { toast } from 'react-toastify'

// Functional component for the navigation bar
const Navbar = () => {
  // Function to handle API request on button click
  const handleClick = async () => {
    try {
      await axios.get("http://localhost:5000/posts");
      toast.success('retrieved the posts')
    } catch (error) {
      toast.error('Error fetching posts')
      console.error("Error fetching posts", error);
    }
  };

  // Access user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);

  // Array of categories for the navigation links
  const categoryArray = [
    "Study",
    "Career",
    "Research",
    "Technology",
    "Entertainment",
    "Other",
  ];

  return (
    <div>
      {/* Render the BackButton component */}
      <BackButton />

      <div className="flex justify-between py-4">
        {/* Logo and home link */}
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
        </div>

        {/* Navigation links for categories */}
        <div className="flex flex-4 items-center">
          {categoryArray.map((category, index) => (
            <Button
              key={index}
              variant="link"
              size="default"
              className="text-copy"
              asChild
            >
              <Link to={`/?category=${category}`}>{category}</Link>
            </Button>
          ))}
        </div>

        {/* User information and authentication actions */}
        <div className="flex gap-5 items-start mt-4 bg-blue-200/0">
          <div className="flex flex-col items-end bg-red-200/0">
            <span className="font-bold">
              {user ? `Welcome back, ${user.username}` : `Welcome guest`}
            </span>
            <div className="flex gap-4">
              {user ? (
                // Logout button for authenticated users
                <Button
                  variant="link"
                  className="p-0 font-semibold h-min"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  {/* Register and Login buttons for unauthenticated users */}
                  <Button variant="link" className="p-0 font-semibold h-min">
                    <Link to="/register">Register</Link>
                  </Button>
                  <Button variant="link" className="p-0 font-semibold h-min">
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Button to create a new post */}
          <Button
            variant="hust"
            className="font-bold"
            onClick={handleClick}
            asChild
          >
            <Link to={user ? "/write" : "/login"} state={null}>
              New post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
