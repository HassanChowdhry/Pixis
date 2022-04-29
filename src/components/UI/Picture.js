import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Picture.css";

function Picture(props) {
  const location = useLocation();
  const idInPath = location.pathname.split('/').pop();
  const [picData, setPicData] = useState({});

  useEffect(() => {
    props.data.forEach(image => {
      if (idInPath == image.id) {
        setPicData({
          url: image.url,
          description: image.descreption,
          title:image.location,
          id: image.id
        })
      }
    });
  }, [idInPath, props.data])

  return (
    <div className="template">

      <div className="place"> {picData.title} </div>

      <div className="img-container">  
      
        <figure className="figure">
          <Link to="/gallery">
            <img src={picData.url} alt={`Pic-${picData.id}`} id={picData.id} title="Return to gallery" />
          </Link>
        </figure>
      
        </div>

        <div className="description"> {picData.description} </div>
    </div>
  );
}

export default Picture;
