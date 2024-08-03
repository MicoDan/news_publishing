import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import BackButton from "@/components/BackButton";
import { toast } from 'react-toastify'

/**
 * Register Component
 * This component renders the registration form for new users.
 */
const Register = () => {
  // State to hold the input values
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State to hold any error messages
  const [error, setError] = useState("");

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  /**
   * Handle input change
   * Updates the input state when the user types in the input fields.
   *
   * @param e - The change event triggered by the input field
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handle form submission
   * Sends a POST request to the registration endpoint with the input data.
   * Navigates to the login page upon successful registration.
   *
   * @param e - The click event triggered by the submit button
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
      await axios.post("http://localhost:5000/auth/register", input);
      console.log("User has been successfully created");
      toast.success('successfully registered user')
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error('failed to register user')
      setError(err.response.data);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-purple-400 via-purple-500 to-purple-600 h-lvh flex flex-col justify-center items-center gap-4">
      <BackButton />
      <h1 className="text-primary-content scroll-m-20 text-3xl font-extrabold lg:text-4xl">
        Register Page
      </h1>
      <form className="flex flex-col p-10 bg-background-hust w-72 gap-5 rounded-lg">
        <Input
          required
          placeholder="username"
          type="text"
          value={input.username}
          name="username"
          onChange={handleInputChange}
        />
        <Input
          required
          placeholder="email"
          type="email"
          value={input.email}
          name="email"
          onChange={handleInputChange}
        />
        <Input
          placeholder="password"
          type="password"
          value={input.password}
          name="password"
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} variant="hust">
          Register
        </Button>
        {error && <p className="text-error text-sm">Error: {error}</p>}
        <span className="text-copy-light text-sm leading-none text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-copy font-medium hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
