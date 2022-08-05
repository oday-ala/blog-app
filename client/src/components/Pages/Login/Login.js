import "./Login.css";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../../../Context/Context";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { axiosInstance } from "../../../config";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axiosInstance
      .post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => dispatch({ type: "LOGIN_SUCCESS", payload: res.data }))
      .catch((error) => {
        dispatch({ type: "LOGIN_FALIURE" });
        setError(error.response.data);
      });
  };
  return (
    <div className="login">
      <span className="loginTitle">Log In</span>
      <form className="loginForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your Username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter Your Password..."
          ref={passwordRef}
        />
        {error ? (
          <Stack sx={{ width: "100%", margin: "5px" }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        ) : null}
        <button className="loginSubmit" type="submit" disabled={isFetching}>
          Log In
        </button>
      </form>
      <button className="loginRegisterSubmit" disabled={isFetching}>
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
