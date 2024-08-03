import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Post from "./pages/Post";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <div className="relative px-4 sm:px-6 lg:px-8 min-h-screen">
        <Navbar />
        <main className="pt-16 pb-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background-hust">
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex-1">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;