import { Link, useParams } from "react-router-dom";
import { DataContext } from '../App'
import { useContext } from 'react';
import "./Picture.css";
import { Redirect } from "react-router-dom";

function Picture() {
  const { id } = useParams();
  const data = useContext(DataContext);
  const pictureMetaData = data ? data.find((dataItem) => dataItem.id === Number(id)) : {}

  if(!pictureMetaData) {
    return <Redirect to="/"/>
  }

  const { url, alt, location, descreption } = pictureMetaData ?? {};

  return (
    pictureMetaData?.url  && 
    <div className="template">

      <div className="place"> {location} </div>

      <div className="img-container">  
      
        <figure className="figure">
          <Link to="/gallery">
            <img src={url} alt={alt} id={id} title="Return to gallery" />
          </Link>
        </figure>
      
        </div>

        <div className="description"> {descreption} </div>
    </div>
  );
}

export default Picture;
