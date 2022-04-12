import './Photos.css';


function Photos(props) {

  return (
    <figure className = "frame">
      <img src={props.source} alt="" className="image"/>
    </figure>
  )
}

export default Photos;