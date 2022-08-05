import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SinglePost.css";
import { Context } from "../../Context/Context";
import { axiosInstance } from "../../config";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      await axiosInstance
        .get("/posts/" + path)
        .then((res) => {
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
        })
        .catch((err) => console.log(err));
    };
    getPost();
  }, [path]);

  const deleteHandler = async () => {
    axiosInstance
      .delete("/posts/" + path, { data: { username: user.username } })
      .then((res) => window.location.replace("/"))
      .catch((err) => console.log(err));
  };

  const updateHandler = async () => {
    await axiosInstance
      .put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      })
      .then((res) => setUpdateMode(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={deleteHandler}
                  alt="Delete"
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div className="paraText">
          {updateMode ? (
            <textarea
              value={desc}
              className="singlePostDescInput"
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
        </div>
        {updateMode ? (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        ) : null}
      </div>
    </div>
  );
}
