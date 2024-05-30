import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile.js";
import { Gallery } from "../Gallery/Gallery.js";
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-10 lg:px-8">
          <div>
            {userData && <UserProfile userData={userData}/>}
          </div>

          <div>
            {photoData && userData &&
              <Gallery userData={userData} photoData={photoData} />
              }
        </div>

        {!userData && <Loader />}
    </div>
  );
}

export default UserPage;