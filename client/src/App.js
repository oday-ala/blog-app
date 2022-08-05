import Topbar from "./components/Topbar/Topbar";
import { Fregment, useContext } from "react";
import Home from "./components/Pages/Home/Home";
import SinglePage from "./components/Pages/SinglePage/SinglePage";
import Write from "./components/Pages/Write/Write";
import Settings from "./components/Pages/Settings/Settings";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Context } from "./Context/Context";
import About from "./components/Pages/About/About";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route exact path="/login" element={user ? <Home /> : <Login />} />

        <Route exact path="/write" element={user ? <Write /> : <Register />} />

        <Route path="/settings" element={user ? <Settings /> : <Register />} />

        <Route path="/post/:postId" element={<SinglePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
