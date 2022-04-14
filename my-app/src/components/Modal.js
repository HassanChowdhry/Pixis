import "./Modal.css";

function Modal(props) {
  return (
    <div className="modal">
      <div onClick={props.onClick} className="overlay" />

      <span className="close" onClick={props.onClick} >&times;</span>

        <img src={props.src} alt={props.alt} className="modal-content" onClick={props.onClick}/>
        
        <div className="caption"> {props.alt} </div>
    </div>
  );
}

export default Modal;
