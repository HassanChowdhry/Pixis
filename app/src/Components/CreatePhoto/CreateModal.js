import Form from "./Form.js";
import "./CreatePhoto.css";

function CreateModal(props) {
  return (
    <div className="scroll-container z-50 flex items-center overflow-y-auto overflow-x-hidden fixed w-full h-full inset-0 max-h-full bg-black text-white bg-opacity-75 backdrop-blur-lg" >
      
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
