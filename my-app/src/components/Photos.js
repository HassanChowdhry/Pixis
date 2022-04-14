import { useState } from "react";
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
      <Image
        src={props.source}
        alt={props.alt}
        onClick={toggleModal}
      />

      {modal && (
        <Modal src={props.source} alt={props.alt} onClick={toggleModal} />
      )}
    </div>
  );
}

export default Photos;
