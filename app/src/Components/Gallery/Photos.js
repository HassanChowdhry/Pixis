import React, { useState, useEffect } from "react";

import Modal from "./Modal.js";
import Image from "./Image.js";
import "./Photos.css";

function Photos(props) {
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
    <div className="box">
    
        <Image
          src={props.source}
          alt={props.alt}
          location={props.location}
          onClick={toggleModal}
        />

      {modal && (
            <Modal
              src={props.source}
              location={props.location}
              caption={props.caption}
              id = {props.id}
              alt={props.alt}
              onClick={toggleModal}
            />
          )}
    </div>
  );
}

export default Photos;
