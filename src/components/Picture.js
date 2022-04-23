import { Link, useLocation } from "react-router-dom";
import "./Picture.css";

function Picture(props) {
  const location = useLocation();
  const { id, src, alt, title, caption } = location.state;

  console.log(id, src, alt, title);

  return (
    <div className="template">

      <div className="place"> {title} </div>

      <div className="img-container">  
      
        <figure className="figure">
          <Link to="/gallery">
            <img src={src} alt={alt} id={id} title="Return to gallery" />
          </Link>
        </figure>
      
        </div>

        <div className="description"> {caption} </div>
    </div>
  );
}

export default Picture;
