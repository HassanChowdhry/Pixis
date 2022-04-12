import './UserProfile.css';
import photo from '../Images/Hassan-Picture.jpg'

function UserProfile() {
  
  const onClickHandler = () => {
    alert('add modal');
  }

  return (
    <div className = "profile">
      <img src={photo} alt="" onClick={onClickHandler} />

      <strong> Hassan  </strong>
      <span> I am a cool boi </span>
    </div>
  )
}

export default UserProfile;