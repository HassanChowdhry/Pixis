import Masonry, { ResponsiveMasonry } from "react-responsive-masonry" 
import "lightgallery.js/dist/css/lightgallery.css";
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import './style.css';

export const Gallery = ({ userData, photoData }) => {
  const items = Array.from(photoData).map(({source, id, caption, location}) => (
    <LightgalleryItem 
      subHtml={`${caption!==null||caption!=="" ? `<h1>Caption - <em>${caption}</em></h1>`: ""} ${location!==null||location!=="" ? `<h1>Location - <em>${location}</em></h1>`: ""}`} 
      src={source}>
      <img
        key={id}
        alt={caption + "-" + location}
        src={source}
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </LightgalleryItem>
  ));

    return (
      <div className="w-[70vw] m-auto py-28">
        <LightgalleryProvider>
        <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 2, 700: 3, 900: 4 }}>
            <Masonry>    
                {items}
            </Masonry>
        </ResponsiveMasonry>
        </LightgalleryProvider>
      </div>
    );
};