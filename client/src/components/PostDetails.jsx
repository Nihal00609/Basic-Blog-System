import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted successfully.");
      // setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting post.");
    }
  };
  
  return (
    <div>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        From The Blog.
      </h2>
      <div className="flex flex-row md:w-1/2 justify-evenly mx-auto pt-10">
        <Link to={"/create-post"}>
          <h3 className="font-semibold text-indigo-400">New Post</h3>
        </Link>
        <Link to={`/edit-post/${post?._id}`}>
          <h3 className="font-semibold text-indigo-400">Edit Post</h3>
        </Link>
        <Link to={"/posts"}>
          <h3 className="font-semibold text-indigo-400" onClick={() => handleDelete(post?._id)}>Delete Post</h3>
        </Link>
        <Link to={"/posts"}>
          <h3 className="font-semibold text-indigo-400">View All Post</h3>
        </Link>
      </div>
      <div>
        <section className="text-gray-600 overflow-hidden">
          <div className="container px-5 py-1 mx-auto">
            <div className="flex flex-wrap justify-center -m-12">
              <div
                key={post?._id}
                className="p-12 md:w-1/2 flex flex-col items-start"
              >
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                  {post?.title}
                </h2>
                <p className="leading-relaxed mb-8">{post?.content}</p>
                <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                  <Link to={`/posts/${post?._id}`}>
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
                  </span>
                </div>
                <a className="inline-flex items-center">
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Author: {post?.author}
                    </span>
                    <h3 className="text-gray-400 text-sm tracking-widest mt-0.5">Comments</h3>
                    <ul>
                      {post?.comments.map((comment, index) => (
                        <li key={index}>
                          <strong>{comment?.commenter}</strong>: {comment?.comment}
                        </li>
                      ))}
                    </ul>
                    <CommentForm postId={id} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetails;
