import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layout/MainLayouts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import PrivetRoute from "./PrivetRoute";
import AddBlog from "../pages/AddBlog/AddBlog";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import BlogDetailsPage from "../pages/BlogDetailsPag/BlogDetailsPag";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import BlogsPage from "../pages/BlogsPage/BlogsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addBlog",
        element: (
          <PrivetRoute>
            <AddBlog></AddBlog>
          </PrivetRoute>
        ),
      },
      {
        path: "/blog/:id",
        Component: BlogDetailsPage,
      },
      {
        path: "/update-blog/:id",
        element: (
          <PrivetRoute>
            <UpdateBlog />
          </PrivetRoute>
        ),
      },
      {
        path: "/allBlogs",
        Component: BlogsPage,
      },
      {
        path: "/wishlist",
        Component: WishlistPage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
