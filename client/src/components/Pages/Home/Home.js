import Header from "../../Header/Header";
import Posts from "../../Posts/Posts";
import Sidebar from "../../Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../../config";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      await axiosInstance
        .get("/posts" + search)
        .then((res) => setPosts(res.data));
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
