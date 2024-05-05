import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile.js";
import Photos from "../Gallery/Photos.js";

function UserPage() {
  console.log("loaded")
  const [photoData, setPhotoData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user } = useParams();
  // console.log(user)

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/api/user_data/${user}`,
      requestOptions
    )
    .then((response) => response.json())
    .catch(() => console.log("add backup data"))
    .then((response) => {
      setUserData(response[0]);
      // console.log("User Data")
      // console.log(!response[0])
      })

    fetch(
      `http://localhost:8080/api/photos/${user}`,
      requestOptions
    )
    .then((response) => response.json())
    .catch(() => console.log("add backup data"))
    .then((response) => {
      setPhotoData(response);
      // console.log("Photo")
      // console.log(!response)
      // console.log(!response)
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

        {!userData && <div> Not loaded </div>}
    </>
  );
}

export default UserPage;