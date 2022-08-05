import Sidebar from "../../Sidebar/Sidebar";
import "./SinglePage.css";
import SinglePost from "../../SinglePost/SinglePost";

export default function SinglePage() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
