import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/blog/${id}`).then((res) => {
      setBlog(res.data);
    });
    axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const handleComment = async () => {
    if (!commentText.trim()) return toast.error("Comment cannot be empty");
    const commentData = {
      blogId: id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: commentText.trim(),
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/comments",
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

  if (!blog) return <Loading></Loading>;

  const isOwner = user?.email === blog?.email;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-base-100 rounded-sm shadow-lg space-y-8 mt-8">
      {/* Author Info */}
      <div className="flex items-center gap-4">
        <img
          src={
            blog.authorPhoto || "https://source.unsplash.com/100x100/?portrait"
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

      {/* Blog Content Side-by-Side */}
      <div className="flex flex-col md:flex-row md:space-x-10 items-start">
        {/* Text Content Left */}
        <div className="md:w-1/2">
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

        {/* Image Right */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-full object-cover rounded-md shadow-md"
          />
        </div>
      </div>

      {/* Update Button */}
      {isOwner && (
        <button
          onClick={() => navigate(`/update-blog/${id}`)}
          className="btn btn-warning w-fit"
        >
          ✏️ Update Blog
        </button>
      )}

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-between border-t pt-5">
        <div className="flex gap-6 text-sm text-gray-500">
          <span>💬 {comments.length} Comments</span>
          <span>❤️ {blog.likes || 0} Likes</span>
        </div>
      </div>

      {/* Comment Box */}
      <div className="pt-6">
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
              className="textarea textarea-bordered w-full resize-none"
              rows={4}
            />
            <button
              onClick={handleComment}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-semibold py-2 px-6 rounded-md transition-all duration-200 cursor-pointer "
            >
              Post Comment
            </button>
          </div>
        )}
      </div>

      {/* Comment List */}
      <div className="mt-6 space-y-5">
        {comments.map((c, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-start bg-base-200 p-4 rounded-lg"
          >
            <img
              src={
                c.userPhoto || "https://source.unsplash.com/100x100/?portrait"
              }
              alt={c.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{c.userName}</p>
              <p className="text-gray-700 whitespace-pre-line">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
