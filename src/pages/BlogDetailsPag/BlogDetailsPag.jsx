import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import ReadingProgress from "../../components/ReadingProgress/ReadingProgress";
import ContentRecommendations from "../../components/ContentRecommendations/ContentRecommendations";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [showReadingProgress, setShowReadingProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog data
        const blogRes = await axios.get(
          `https://b11a11-server-side-sohanpk24.vercel.app/blog/${id}`
        );
        const fetchedBlog = blogRes.data;
        setBlog(fetchedBlog);

        // After blog data is available, set likes and userLiked status
        setLikes(fetchedBlog.likes || 0);
        if (user && fetchedBlog.likedBy) {
          setUserLiked(fetchedBlog.likedBy.includes(user.email));
        }

        // Fetch comments
        const commentsRes = await axios.get(
          `https://b11a11-server-side-sohanpk24.vercel.app/comments/${id}`
        );
        setComments(commentsRes.data);

        // Show reading progress after content is loaded
        setShowReadingProgress(true);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchData();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like a post.");
      return;
    }

    const previousLikes = likes;
    const previousUserLiked = userLiked;

    setLikes(userLiked ? likes - 1 : likes + 1);
    setUserLiked(!userLiked);

    try {
      await axios.put(
        `https://b11a11-server-side-sohanpk24.vercel.app/blog/${blog._id}/like`,
        {
          userEmail: user.email,
        }
      );
    } catch (error) {
      console.error("Failed to update like status:", error);
      toast.error("Failed to update like status.");
      setLikes(previousLikes);
      setUserLiked(previousUserLiked);
    }
  };

  const handleComment = async () => {
    if (!user) {
      return toast.error("Please log in to comment.");
    }
    if (!commentText.trim()) {
      return toast.error("Comment cannot be empty");
    }
    const commentData = {
      blogId: id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: commentText.trim(),
    };
    try {
      const res = await axios.post(
        "https://b11a11-server-side-sohanpk24.vercel.app/comments",
        commentData
      );
      if (res.data.success) {
        toast.success("Comment added");
        setComments([...comments, commentData]);
        setCommentText("");
      }
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  if (!blog) return <Loading />;

  const isOwner = user?.email === blog?.email;

  return (
    <div className="min-h-screen bg-base-100">
      <Helmet>
        <title>{blog.title} | Idea Canvas</title>
      </Helmet>

      {/* Reading Progress Component */}
      {showReadingProgress && (
        <ReadingProgress
          blogId={blog._id}
          content={blog.longDescription}
          userEmail={user?.email}
        />
      )}

      <div className="container mx-auto mt-8 mb-8 pt-16">
        {" "}
        {/* Added pt-16 to account for fixed reading progress */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Blog Content */}
          <div className="lg:w-2/3 bg-base-100 rounded-sm shadow-md shadow-orange-300 p-6 md:p-8 space-y-6">
            <div className="overflow-hidden mb-6">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-md shadow-md"
              />
            </div>
            <div className="flex items-center gap-4">
              <img
                src={
                  blog.authorPhoto ||
                  "https://source.unsplash.com/100x100/?portrait"
                }
                alt={blog.authorName || "Author"}
                className="w-14 h-14 rounded-full border object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">
                  {blog.authorName || "Unknown Author"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                {blog.title}
              </h1>
              <span className="inline-block outline outline-orange-500 px-3 py-1 rounded mb-6 text-sm font-semibold">
                {blog.category}
              </span>
              <p className="text-base-content leading-relaxed whitespace-pre-line">
                {blog.longDescription}
              </p>
            </div>
            {isOwner && (
              <button
                onClick={() => navigate(`/update-blog/${id}`)}
                className="btn btn-warning text-white bg-orange-400 hover:bg-orange-500 w-fit"
              >
                ✏️ Update Blog
              </button>
            )}
            <div className="flex flex-wrap items-center justify-between border-t border-orange-500 pt-5">
              <div className="flex gap-6 text-sm text-gray-500">
                <span>💬 {comments.length} Comments</span>
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <span className="text-lg">{userLiked ? "❤️" : "🤍"}</span>
                  {likes} Likes
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Comments Section */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-base-100 rounded-sm shadow-orange-300 shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>
              {isOwner ? (
                <p className="text-red-400 font-medium">
                  ❌ You cannot comment on your own blog.
                </p>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    className="textarea textarea-bordered w-full resize-none rounded-sm bg-base-100 border-2 border-gray-300 focus:outline-none focus:border-orange-500"
                    rows={4}
                  />
                  <button
                    onClick={handleComment}
                    className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-semibold py-2 px-6 rounded-md transition-all duration-200 cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>
              )}
            </div>
            <div className="bg-base-100 rounded-sm shadow-orange-300 shadow-md p-6 space-y-5">
              <h3 className="text-xl font-semibold">All Comments</h3>
              {comments.length === 0 ? (
                <p className="text-base-content text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start bg-base-200 p-4 rounded-lg"
                  >
                    <img
                      src={
                        c.userPhoto ||
                        "https://source.unsplash.com/100x100/?portrait"
                      }
                      alt={c.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{c.userName}</p>
                      <p className="text-gray-700 whitespace-pre-line">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Content Recommendations Section */}
        <div className="mt-12">
          <ContentRecommendations
            currentBlogId={blog._id}
            userEmail={user?.email}
            type="related"
          />
        </div>
        {/* Personalized Recommendations (if user is logged in) */}
        {user && (
          <div className="mt-8">
            <ContentRecommendations
              userEmail={user.email}
              type="personalized"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
