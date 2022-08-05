import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { margin } from "@mui/system";
import { axiosInstance } from "../../../config";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    await axiosInstance
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => window.location.replace("/login"))
      .catch((err) => setError(err.response.data || err));
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          required
          type="text"
          className="registerInput"
          placeholder="Enter Your Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          required
          type="email"
          className="registerInput"
          placeholder="Enter Your Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          required
          type="password"
          minLength="6"
          className="registerInput"
          placeholder="Enter Your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? (
          <Stack sx={{ width: "100%", margin: "5px" }} spacing={2}>
            <Alert severity="warning">{error}</Alert>
          </Stack>
        ) : null}
        <button className="registerSubmit">Register</button>
      </form>
      <button className="registerLoginSubmit">
        <Link to="/login" className="link">
          Log In
        </Link>
      </button>
    </div>
  );
}
