import "./Settings.css";
import Sidebar from "../../Sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../../Context/Context";

import Pic from "../../../assets/user.png";
import { axiosInstance } from "../../../config";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PF = "http://localhost:5000/images/";
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      oldUserName: user.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      await axiosInstance
        .post("/upload", data)
        .catch((err) => console.log(err));
    }

    await axiosInstance
      .put("/users/" + user._id, updatedUser)
      .then((res) => {
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_FAILURE" });
      });
  };

  const deleteAccount = async () => {
    dispatch({ type: "UPDATE_START" });

    await axios
      .delete("/users/" + user._id, { data: { userId: user._id } })
      .then((res) => {
        dispatch({ type: "UPDATE_SUCCESS", payload: null });
        window.location.replace("/login");
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_FAILURE" });
      });
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={submitHandler}>
          <label>Profile Pic</label>
          <div className="settingsPP">
            {user.profilePic ? (
              <img
                src={
                  file ? URL.createObjectURL(file) || Pic : PF + user.profilePic
                }
                alt=""
              />
            ) : (
              <img src={Pic} alt="" />
            )}

            <label htmlFor="fileInput">
              <i class="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
        <span className="settingsDeleteTitle" onClick={deleteAccount}>
          Delete Your Account
        </span>
      </div>

      <Sidebar />
    </div>
  );
}
