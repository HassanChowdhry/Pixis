import { useState, useEffect } from "react";
import "./UserProfile.css";
import photo from "../../Images/picture.png";
import CreateModal from "../CreatePhoto/CreateModal.js";

// function UserProfile({ first_name, last_name, bio }) {
function UserProfile({ userData }) {
  const onClickHandler = () => {
    window.open("https://hassanchowdhryportfolio.web.app", "_blank")
  };

  const [modal, setModal] = useState(false);

  console.log("In user.js")
  console.log(userData.first_name)
  const { first_name, last_name, bio } = userData
  // const first_name = "Hassan";
  // const last_name = "Chowdhry";
  // const bio = "Hey there!! Welcome to my Photo Gallery App. We are still under construction."
  const fullname = first_name + " " + last_name;
  
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    
    } else {
      document.body.style.overflow = 'scroll';
    }

  }, [modal]);

  return (
    <div className="profile">
      <div className="image-container">
        <img src={photo} alt="" onClick={onClickHandler} />
      </div>

      <strong> {fullname} </strong>
      <p>
        {bio}
      </p>

      <button className="user-add-photo" onClick={toggleModal}>
        Add Photo
      </button>

      {modal && (
      <CreateModal
        onClick={toggleModal}
      />
    )}
    </div>
  );
}

export default UserProfile;
