import './Photos.css';


function Photos(props) {
  const onClickHandler = () => {

  }

  return (
    <figure className = "frame">
      <img src={props.source} alt={props.alt} className="image" onClick = {onClickHandler} />
    </figure>
  )
}

export default Photos;