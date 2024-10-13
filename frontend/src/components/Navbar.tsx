import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo2.png"; // Import the logo image
import { Button } from "./ui/button"; // Import custom Button component
import axios from 'axios'; // Import axios for API requests
import { useContext, useState } from "react"; // Import useContext hook for accessing context
import { AuthContext } from "@/context/authContext"; // Import AuthContext for user authentication
import BackButton from "./BackButton"; // Import BackButton component for navigation


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      // I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
      await axios.get('https://blitzbackend.onrender.com');
      navigate(user ? "/post" : "/login");
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const categoryArray = [
    "Study",
    "Research",
    "Technology",
    "Law",
    "Political",
    "Other",
  ];

  return (
    <div className="bg-white shadow-md">
      <BackButton />
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center items-center space-x-4">
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
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="hust"
                className="p-4 font-semibold"
                onClick={logout}
              >
                Logout
              </Button>
              {/* Check if the user's email matches the specified email */}
              {user.email === "menatehawashington@gmail.com" && (
                <Button
                  variant="hust"
                  className="font-bold"
                  onClick={handleClick}
                >
                  New post
                </Button>
              )}
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="hust" className="p-4 font-semibold">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hust" className="p-4 font-semibold">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
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
            <div className="flex items-center space-x-4 mt-4">
              {user ? (
                <>
                  <Button
                    variant="hust"
                    className="p-4 ml-16 mr-5 font-semibold"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                  {/* Check if the user's email matches the specified email in mobile view */}
                  {user.email === "menatehawashington@gmail.com" && (
                    <Button
                      variant="hust"
                      className="font-bold"
                      onClick={handleClick}
                    >
                      New post
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="hust" className="p-4 ml-16 mr-5 font-semibold">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="hust" className="p-4 font-semibold">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
