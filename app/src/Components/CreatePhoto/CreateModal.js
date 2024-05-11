import Form from "./Form.js";
import "./Form.css";

function CreateModal(props) {
  return (
    
    <div className="modal" >

      <div onClick={props.onClick} className="close">
        &times;
      </div>
      
      <Form onClick={props.onClick} {...props}/>

    </div>
    
  );
}

export default CreateModal;
