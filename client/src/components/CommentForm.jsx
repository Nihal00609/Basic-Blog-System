import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId }) => {
  const [commenter, setCommenter] = useState("");
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`, {
        commenter,
        comment,
      });
      alert("Comment added successfully.");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding comment.");
    }
  };

  return (
    <div>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-5 mb-4 max-w-lg">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-900 text-lg">
              Add a new comment
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              value={commenter}
              onChange={(e) => setCommenter(e.target.value)}
              className="bg-gray-100 rounded-md border border-gray-300 px-3 py-1 mb-2 font- outline-none focus:bg-white transition duration-200"
              required
            />
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded-md border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 font- focus:outline-none focus:bg-white transition duration-200"
                name="body"
                placeholder="Write Your Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start px-3">
              <div className="ml-auto -mr-1">
                <button
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
