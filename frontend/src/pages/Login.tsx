import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { Loading } from "@/components/Loading";
import BackButton from "@/components/BackButton";
import { toast } from "react-toastify";

/**
 * Login component that handles user authentication.
 *
 * @returns {JSX.Element} The Login component.
 */
const Login = (): JSX.Element => {
  // State to manage input fields
  const [input, setInput] = useState({ username: "", password: "" });
  // State to manage error messages
  const [error, setError] = useState("");
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Get the login function from the AuthContext
  const { login } = useContext(AuthContext);

  /**
   * Handle changes to input fields.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error message on input change
  };

  /**
   * Handle form submission.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event from the button.
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set loading state to true
      await login(input); // Call login function from AuthContext
      console.log("You are now logged in");
      toast.success("You are now logged in")
      navigate("/"); // Navigate to home page on successful login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data); // Set error message on failure
      toast.error('failed to log in')
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="bg-gradient-to-tr from-purple-400 via-purple-500 to-purple-600 h-lvh flex flex-col justify-center items-center gap-4">
      <BackButton /> {/* Back button component */}
      {isLoading && <Loading />} {/* Loading component */}
      <h1 className="text-primary-content scroll-m-20 text-4xl font-extrabold lg:text-5xl">
        Login Page
      </h1>
      <form className="flex flex-col p-10 bg-background-hust w-72 gap-10 rounded-lg">
        <Input
          placeholder="username or email"
          name="username"
          onChange={handleInputChange}
        />
        <Input
          placeholder="password"
          name="password"
          onChange={handleInputChange}
          type="password"
        />
        <Button variant="hust" onClick={handleSubmit}>
          Login
        </Button>
        {error && <p className="text-error text-sm">Error: {error}</p>}
        <span className="text-copy-light text-sm leading-none text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-copy font-medium hover:underline">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
