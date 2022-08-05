import "./Write.css";
import { useContext, useState } from "react";
import { Context } from "../../../Context/Context";
import { axiosInstance } from "../../../config";
export default function Write() {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      category: cat,
    };
    if (file) {
      const data = new FormData();

      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      await axiosInstance
        .post("/upload", data)
        .catch((err) => console.log(err));
    }

    await axiosInstance
      .post("/posts", newPost)
      .then((res) => window.location.replace("/post/" + res.data._id))
      .catch((err) => console.log(err));
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={submitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i class="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            required
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            required
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <select
            className="selectCat"
            onChange={(e) => setCat(e.target.value)}
          >
            <option>None</option>

            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="sport">Sport</option>
            <option vlaue="life">Life</option>
          </select>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  );
}
