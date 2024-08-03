import {
  AuthContextProps,
  AuthContextProviderProps,
  AuthUserProps,
  Input,
} from "@/types/auth.types";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'

// Create the AuthContext with a default value
export const AuthContext = createContext({} as AuthContextProps);

/**
 * AuthContextProvider component that provides authentication state and functions to its children.
 * 
 * @param {AuthContextProviderProps} props - The props for the provider.
 * @param {React.ReactNode} props.children - The child components that will have access to the AuthContext.
 * @returns {JSX.Element} The AuthContextProvider component.
 */
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // State to manage the authenticated user
  const [user, setUser] = useState<AuthUserProps | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") || null
  );

  /**
   * Login function to authenticate the user.
   * 
   * @param {Input} input - The login credentials.
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  const login = async (input: Input) => {
    //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
    const res = await axios.post("http://localhost:5000/auth/login", input, {
      withCredentials: true,
    });
    setUser(res.data); // Setting the authenticated user
  };

  /**
   * Logout function to de-authenticate the user.
   * 
   * @returns {Promise<void>} A promise that resolves when the logout is complete.
   */
  const logout = async () => {
    //I added the endpoint (http://localhost:5000) only because it's in development, I know this is not good at production level
    const res = await axios.post("http://localhost:5000/auth/logout", {}, {
      withCredentials: true,
    });
    setUser(null); // Clearing the authenticated user
    console.log(res.data); // Logging the response
  };

  // useEffect hook to sync the user state with session storage
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  /**
   * Function to scroll the window to the top smoothly.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, scrollToTop }}>
      {children}
    </AuthContext.Provider>
  );
};
