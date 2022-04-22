import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import Image from "./Image";
import "./Photos.css";

function Photos(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="box">
      <Link to={{ pathname: `/picture/${props.id}`, state : { src: props.source, alt:props.alt, id: props.id, title: props.location } }} >
        <Image
          src={props.source}
          alt={props.alt}
          location={props.location}
          onClick={toggleModal}
        />
      </Link>

      {/* {modal && (
            <Modal
              src={props.source}
              location={props.location}
              description={props.description}
              alt={props.alt}
              onClick={toggleModal}
            />
          )} */}
    </div>
  );
}

export default Photos;
