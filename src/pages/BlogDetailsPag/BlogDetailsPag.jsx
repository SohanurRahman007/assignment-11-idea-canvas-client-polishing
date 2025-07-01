import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

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

  if (!blog)
    return <p className="text-center py-10 text-gray-500">Loading blog...</p>;

  const isOwner = user?.email === blog?.email;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-base-100 rounded-sm shadow-lg space-y-6 mt-8">
      {/* Author Info */}
      <div className="flex items-center gap-4">
        <img
          src={
            blog.authorPhoto || "https://source.unsplash.com/100x100/?portrait"
          }
          alt={blog.authorName || "Author"}
          className="w-14 h-14 rounded-full border"
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

      {/* Blog Content */}
      <div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
          {blog.title}
        </h1>
        <span className=" outline outline-orange-500 px-2 py-1 rounded mb-4 inline-block">
          {blog.category}
        </span>
        <p className="text-base-content mt-1.5 mx-auto  leading-relaxed">
          {blog.longDescription}
        </p>
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
      <div className="flex flex-wrap items-center justify-between border-t pt-4">
        <div className="flex gap-4 text-sm text-gray-500">
          <span>💬 {comments.length} Comments</span>
          <span>❤️ {blog.likes || 0} Likes</span>
        </div>
      </div>

      {/* Comment Box */}
      <div className="pt-6">
        <h2 className="text-2xl font-semibold mb-3">💬 Comments</h2>
        {isOwner ? (
          <p className="text-red-400 font-medium">
            ❌ You cannot comment on your own blog.
          </p>
        ) : (
          <div className="space-y-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="textarea textarea-bordered w-full"
              rows={3}
            />
            <button onClick={handleComment} className="btn btn-primary">
              Post Comment
            </button>
          </div>
        )}
      </div>

      {/* Comment List */}
      <div className="mt-4 space-y-4">
        {comments.map((c, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-start bg-base-200 p-3 rounded-lg"
          >
            <img
              src={
                c.userPhoto || "https://source.unsplash.com/100x100/?portrait"
              }
              alt={c.userName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{c.userName}</p>
              <p className="text-gray-600">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
