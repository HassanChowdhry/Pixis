import Form from "./Form.js";

function CreateModal(props) {
  return (
    
    <div className="modal" >

      <span onClick={props.onClick} className="close">
        &times;
      </span>
      
      <Form onClick={props.onClick} />

    </div>
    
  );
}

export default CreateModal;
