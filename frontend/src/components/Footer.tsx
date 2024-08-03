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
      
      {/* Container for the tagline text */}
      <div className="text-copy-lighter/50 font-bold text-2xl italic">
        "Post a blog of your choice"
      </div>
      
      <div className="font-semibold text-copy-lighter">
        Made with React
        <img src="react.svg" className="scale-75 inline-block" />
        and Node
        <img src="node.svg" className="scale-75 inline-block" />
      </div>
    </footer>
  );
};

export default Footer;
