import { useEffect, useState } from "react";

import UserProfile from "./components/User/UserProfile";
import Photos from "./components/gallery/Photos";
import "./App.css";

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
     async function fetchData() {
      let myHeaders = new Headers();
      myHeaders.append("Origin", "https://localhost.com");
      
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let response = await fetch("https://image-gallery-pjks.s3.ca-central-1.amazonaws.com/data.json", requestOptions)
      response = await response.json();
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <UserProfile />

      {data && data.map((image) => (
        <Photos source={image.url} location = {image.location} description = {image.descreption} alt={`Photo-${image.id}`} key={Math.random()} />
      ))}
    </div>
  );
}

export default App;
