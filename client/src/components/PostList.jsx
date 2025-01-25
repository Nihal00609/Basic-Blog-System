import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-end mr-10 mt-5">
        <button
          className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Blog Posts
      </h2>
      <Link to={"/create-post"}>
        <h3 className="px-16 font-semibold text-indigo-400">Create Post</h3>
      </Link>

      <section className="text-gray-600 overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-12">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-12 md:w-1/2 flex flex-col items-start"
              >
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                  {post.title}
                </h2>
                <p className="leading-relaxed mb-8">{post.content}</p>
                <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                  <Link to={`/posts/${post._id}`}>
                    <div className="text-indigo-500 inline-flex items-center">
                      View More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </Link>
                  <span className="text-gray-400 inline-flex items-center ml-auto leading-none text-sm">
                    <Link
                      to={`/posts/${post._id}`}
                      className="inline-flex hover:text-indigo-500"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {post?.comments.length}
                    </Link>
                  </span>
                </div>
                <a className="inline-flex items-center">
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Author: {post.author}
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostList;
