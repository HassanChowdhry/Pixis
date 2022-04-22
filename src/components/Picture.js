import { Link, useLocation } from "react-router-dom";
import "./Picture.css";

function Picture(props) {
  const location = useLocation();
  const { id, src, alt, title } = location.state
  
  console.log(id, src, alt, title)

  return (
    <div className="template">
      <Link to='/gallery'>
        <img src={src} alt={alt} id = {id} title='Return to gallery' /> 
      </Link>
      <p></p>
    </div>
  );
}

export default Picture;
