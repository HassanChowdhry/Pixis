import { Link } from "react-router-dom";
import "./Modal.css";

function Modal(props) {
  return (
    <id>
    <div className="modal">
      <div onClick={props.onClick} className="overlay" />

      <span className="close" onClick={props.onClick}>
        &times;
      </span>

      <div className="location"> {props.location} </div>

      
      <img
        src={props.src}
        alt={props.alt}
        title={props.location}
        className="modal-content"
        onClick={props.onClick}
      />
      

      <div className="caption"> {props.description} </div>
    </div>
    </id>
  );
}

export default Modal;
