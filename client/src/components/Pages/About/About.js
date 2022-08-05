import "./About.css";
export default function Sidebar() {
  return (
    <div className="about">
      <div className="aboutItem">
        <span className="aboutTitle">ABOUT Us</span>
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

      <div className="aboutItem">
        <span className="aboutTitle">FOLLOW US</span>
        <div className="aboutSocial">
          <i className="aboutIcon topIcon fa-brands fa-facebook-square"></i>
          <i className="aboutIcon topIcon fa-brands fa-twitter-square"></i>
          <i className="aboutIcon topIcon fa-brands fa-pinterest-square"></i>
          <i className="aboutIcon topIcon fa-brands fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
