import { useState, useEffect } from "react";
import "./UserProfile.css";
import photo from "../../Images/picture.png";
import CreateModal from "../CreatePhoto/CreateModal.js";

function UserProfile() {
  const onClickHandler = () => {
    window.open("https://portfolio-729d5.web.app/about", "_blank")
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    
    } else {
      document.body.style.overflow = 'scroll';
    }

  }, [modal ]);

  return (
    <div className="profile">
      <div className="image-container">
        <img src={photo} alt="" onClick={onClickHandler} />
      </div>

      <strong> Hassan Chowdhry</strong>
      <p>
        Hey there!!
        Welcome to my Photo Gallery App. We are still under construction.
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
