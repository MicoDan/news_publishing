import { Button } from "./ui/button"; 
import { FaArrowLeft } from "react-icons/fa"; 
import { useLocation, useNavigate } from "react-router-dom"; 

const BackButton = () => {
  // Hook to programmatically navigate users
  const navigate = useNavigate();
  
  // Hook to access the current location (pathname) in the router
  const location = useLocation();

  // Determining if the current pathname is the home page
  const isHome = location.pathname === "/";

  // Handler function to navigate one step back in the browser history
  const handleClick = () => {
    navigate(-1); // Navigating to the previous page in the history stack
  };

  return (
    <>
      {/* Rendering the back button only if the current page is not the home page */}
      {!isHome && (
        <div className="absolute z-10 top-4 left-4">
          {/* Button component with specific styles and click handler */}
          <Button
            variant="hust" // Using the "hust" variant for styling
            className="rounded-full hover:border-background-hust" // Additional styling for the button
            onClick={handleClick} // Attaching the click handler to navigate back
          >
            <FaArrowLeft className="object-cover" />
          </Button>
        </div>
      )}
    </>
  );
};

export default BackButton;
