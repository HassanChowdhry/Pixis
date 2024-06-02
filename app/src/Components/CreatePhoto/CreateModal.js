import Form from "./Form.js";
import "./CreatePhoto.css";

function CreateModal(props) {
  return (
    <div className="modal" >
      
      <div>
        <div onClick={props.onClick} className="close">
          &times;
        </div>
        
        <Form onClick={props.onClick} {...props}/>
      </div>

    </div>
  );
}

export default CreateModal;
