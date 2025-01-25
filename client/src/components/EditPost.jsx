import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setAuthor(res.data.author);
    };
    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        { title, content, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post updated successfully.");
      navigate("/posts");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating post.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Edit Post
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4 rounded-md p-4 shadow-lg">
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Author Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Input Title
          </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Write Your Content
          </label>
          <textarea
            placeholder="Content"
            value={content}
            maxLength={500}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          onClick={handleEdit}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPost;
