import Masonry, { ResponsiveMasonry } from "react-responsive-masonry" 
import './style.css';

export const Gallery = ({ userData, photoData }) => {
  const items = Array.from(photoData).map(({source, id}) => (
    <img
      key={id}
      alt=""
      src={source}
      style={{ width: "100%", borderRadius: "8px" }}
    />
  ));

    return (
      <div className="w-[70vw] m-auto py-28">
        <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 2, 700: 3, 900: 4 }}>
            <Masonry>    
              {items}
            </Masonry>
        </ResponsiveMasonry>
      </div>
    );
};