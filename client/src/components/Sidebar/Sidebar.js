import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      await axiosInstance
        .get("/categories")
        .then((res) => setCats(res.data))
        .catch((error) => console.log(error));
    };
    getCat();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT Us</span>
        <img
          src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p className="para">
          Yalla Blog is a blog website that allow users to share thier
          adventures, also writing in many categories like Sport, Tech, life,
          and Music
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem" key={c._id}>
                {c.name}
              </li>
              {/* <li className="sidebarListItem"> {c.name}</li> */}
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon topIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon topIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon topIcon fa-brands fa-pinterest-square"></i>
          <i className="sidebarIcon topIcon fa-brands fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
