import { Link, useParams } from "react-router-dom";
import { DataContext } from '../../App.js'
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

  const { source, alt, location, description } = pictureMetaData ?? {};

  return (
    pictureMetaData?.source  && 
    <div className="template">

        <div className="place"> {location} </div>

        <div className="img-container">  
          <figure className="figure">
            <Link to="/gallery">
              <img src={source} alt={alt} id={id} title="Return to gallery" />
            </Link>
          </figure>
        </div>

        <div className="description"> {description} </div>
    </div>
  );
}

export default Picture;
