import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile.js";
import Photos from "../Gallery/Photos.js";
import Loader from "../UI/Loader.js";

function UserPage() {
  const [photoData, setPhotoData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user } = useParams();

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/user_data/${user}`,
      requestOptions
    )
    .then((response) => response.json())
    .catch((err) => console.error("err: " + err))
    .then((response) => {
      setUserData(response[0]);
      })

    fetch(
      `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/photos/${user}`,
      requestOptions
    )
    .then((response) => response.json())
    .catch(() => console.log("add backup data"))
    .then((response) => {
      setPhotoData(response);
      })
  }, [user]);

  return (
    <>
        <div className="app">
          {userData && <UserProfile userData={userData}/>}

          {photoData &&
            photoData.map((image) => (
              <Photos
                source={image.source}
                location={image.location}
                caption={image.caption}
                alt={`Photo-${image.id}`}
                id = {image.id}
                key={image.id}
              />
            ))}
        </div>

        {!userData && <Loader />}
    </>
  );
}

export default UserPage;