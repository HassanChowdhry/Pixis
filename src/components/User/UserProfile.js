import "./UserProfile.css";
import photo from "../../Images/Hassan-Picture.webp";

function UserProfile() {
  const onClickHandler = () => {
    window.open("https://hassanchowdhryportfolio.web.app", "_blank")
  };

  return (
    <div className="profile">
      <div className="image-container">
        <img src={photo} alt="" onClick={onClickHandler} />
      </div>

      <strong> Hassan Chowdhry</strong>

      <span>
        Hey there!!
        Welcome to my Photo Gallery App. We are still under construction.
      </span>
    </div>
  );
}

export default UserProfile;
