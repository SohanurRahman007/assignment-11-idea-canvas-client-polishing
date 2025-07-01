import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../Loading/Loading";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArticleIcon from "@mui/icons-material/Article";
import { motion } from "framer-motion";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:3000/recent").then((res) => setBlogs(res.data));
  }, []);

  const handleWishlist = async (blog) => {
    if (!user?.email) {
      return toast.error("Please login to add to wishlist");
    }

    const wishlistItem = {
      blogId: blog._id,
      title: blog.title,
      image: blog.image,
      category: blog.category,
      userEmail: user.email,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/wishlist",
        wishlistItem
      );
      if (res.data.success) {
        toast.success("Added to wishlist!");
      } else {
        toast(res.data.message || "Already in wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="my-12">
      <div className="text-center mb-10">
        <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
          Recent Blog Posts
        </h1>
        <p className=" text-base-content mt-1.5 max-w-2xl mx-auto">
          Stay up to date with the latest articles, tutorials, and stories from
          our amazing community.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#2c2c2c" : "#fff",
                boxShadow: 3,
                borderRadius: 1,
              }}
              className="transition-transform hover:scale-[1.02] "
            >
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                height="180"
                sx={{ objectFit: "cover" }}
              />
              <CardContent className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col gap-2">
                  <Chip label={blog.category} color="warning" size="small" />
                  <Typography variant="h6" component="h2" color="text.primary">
                    {blog.title.length > 45
                      ? blog.title.slice(0, 45) + "..."
                      : blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.shortDescription?.slice(0, 80)}...
                  </Typography>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<ArticleIcon />}
                    component={Link}
                    to={`/blog/${blog._id}`}
                    sx={{
                      bgcolor: "#f97316", // orange-500
                      color: "#fff",
                      "&:hover": { bgcolor: "#ea580c" }, // orange-600
                      fontWeight: "600",
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<FavoriteBorderIcon />}
                    onClick={() => handleWishlist(blog)}
                    sx={{
                      borderColor: "#f97316", // orange-500
                      color: "#f97316",
                      "&:hover": {
                        bgcolor: "#fff7ed", // very light orange
                        color: "#ea580c", // orange-600
                        borderColor: "#ea580c",
                      },
                      fontWeight: "600",
                    }}
                  >
                    Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
