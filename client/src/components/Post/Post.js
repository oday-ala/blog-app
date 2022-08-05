import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
export default function Post(props) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {props.post.photo && (
        <img className="postImg" src={PF + props.post.photo} alt="" />
      )}

      <div className="postInfo">
        <div className="postCats">
          {/* {.map((c) => ( */}
          <span className="postCat">{props.post.category}</span>
          {/* ))} */}
        </div>
        <Link to={`/post/${props.post._id}`} className="link">
          <span className="postTitle">{props.post.title}</span>
        </Link>
        <hr />
        <span className="postData">
          {new Date(props.post.updatedAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{props.post.desc}</p>
    </div>
  );
}
