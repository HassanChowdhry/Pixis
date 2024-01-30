import "./UserProfile.css";
import photo from "../../Images/picture.jpeg";

function UserProfile() {
  const onClickHandler = () => {
    window.open("https://portfolio-729d5.web.app/about", "_blank")
  };

  return (
    <div className="profile">
      <div className="image-container">
        <img src={photo} alt="" onClick={onClickHandler} />
      </div>

      <strong> Hassan Chowdhry</strong>

      <span>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam obcaecati
        modi exercitationem a cumque consequuntur fugit eius quaerat? Laborum,
        odit.
      </span>
    </div>
  );
}

export default UserProfile;
