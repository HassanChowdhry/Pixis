import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./UserProfile.css";
import photo from "../../Images/picture.png";
import CreateModal from "../CreatePhoto/CreateModal.js";

// function UserProfile({ first_name, last_name, bio }) {
function UserProfile({ userData }) {
  const onClickHandler = () => {
    window.open("https://hassanchowdhryportfolio.web.app", "_blank")
  };

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const { firstName, lastName, bio } = userData
  const fullname = firstName + " " + lastName;
  
  const toggleModal = () => {
    setModal(!modal);
  };

  const onHomeHandler = () => {
    navigate("/");
  }

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

      <div className="btn-container">
        <button className="user-button" onClick={toggleModal}>
          Add Photo
        </button>
        <button className="user-button" onClick={onHomeHandler}>
          Home
        </button>
      </div>

      {modal && (
      <CreateModal
        onClick={toggleModal} data={userData}
      />
    )}
    </div>
  );
}

export default UserProfile;
