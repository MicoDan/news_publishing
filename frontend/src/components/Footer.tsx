import { Link } from "react-router-dom";
import Logo from "../img/logo2.png";

// Functional component for the footer of the website
const Footer = () => {
  return (
    <footer className="bg-border-hust mt-20 p-5 flex justify-between items-center">
      {/* Container for the logo and navigation */}
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="w-28" />
        </Link>
      </div>
      
      
      
      <div className="font-semibold text-copy-lighter">
      Where Stories Unfold
      </div>
    </footer>
  );
};

export default Footer;
