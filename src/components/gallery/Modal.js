import { Link } from "react-router-dom";
import "./Modal.css";

function Modal(props) {
  return (
    
    <div className="modal" onClick={props.onClick}>

      <span className="close">
        &times;
      </span>

      <div className="location"> {props.location} </div>

      <Link className="link" to={{ pathname: `/picture/${props.id}`, state : { src: props.src, alt:props.alt, id: props.id, title: props.location, caption : props.description} }} >
        <img
          src={props.src}
          alt={props.alt}
          title= "go to Template page"
          className="modal-content"
        />
      </Link>

        <br />

      <div className="caption"> {props.description} </div>
      </div>
    
  );
}

export default Modal;
