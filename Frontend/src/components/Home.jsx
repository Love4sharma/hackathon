import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user);
  console.log(currentUser);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/myPosts?limit=3");
      const data = await res.json();
      let filteredPosts = data.posts;

      const isAdmin =
        currentUser &&
        currentUser.currentUser &&
        currentUser.currentUser.userdata &&
        currentUser.currentUser.userdata.isAdmin;

      if (!isAdmin) {
        filteredPosts = filteredPosts.filter((post) => post.isPublic);
      }

      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [currentUser]);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <Link
          to="/create"
          className="max-w-xs button-33 bg-green-200 rounded-full shadow-inner inset-box-shadow hover:bg-green-300 transform hover:scale-105 hover:rotate-1 transition-all duration-250 text-green-800 cursor-pointer inline-block font-sans py-2 px-5 text-center no-underline select-none"
        >
          Create
        </Link>
        <h1 className="text-7xl font-bold ">Sustainable Spirit</h1>

        <p className="text-gray-400 text-lg ">
          "Welcome to our sustainable living forum! Join a community passionate
          about eco-friendly lifestyles. Share ideas, learn sustainable
          practices, and connect with like-minded individuals. Together, let's
          inspire and support each other in creating a greener, more sustainable
          future."
        </p>
        {currentUser.currentUser ? (
          <Link
            to="/search"
            className="text-md  text-green-500 font-bold hover:underline"
          >
            View all posts...
          </Link>
        ) : (
          <Link
            to="/signin"
            className="text-md  text-green-500 font-bold hover:underline"
          >
            Sign in to view all posts...
          </Link>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <Posts key={post._id} post={post} />
              ))}
            </div>
            {currentUser.currentUser ? (
              <Link
                to="/search"
                className="text-md  text-green-500 font-bold hover:underline"
              >
                View all posts...
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-md  text-green-500 font-bold hover:underline"
              >
                Sign in to view all posts...
              </Link>
            )}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
