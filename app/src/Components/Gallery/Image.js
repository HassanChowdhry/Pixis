import "./Image.css";

function Image(props) {
  return (
    <figure className="frame">
      <img
        src={props.src}
        alt={props.alt}
        title={props.location}
        className="image"
        onClick={props.onClick}
      />
    </figure>
  );
}

export default Image;
