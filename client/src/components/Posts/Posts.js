import Post from "../Post/Post";
import "./Posts.css";
export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
      {console.log(posts)}
    </div>
  );
}
