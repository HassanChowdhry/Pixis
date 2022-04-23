import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import UserProfile from "./components/User/UserProfile";
import Photos from "./components/gallery/Photos";
import Picture from "./components/Picture";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://image-gallery-pjks.s3.ca-central-1.amazonaws.com/data.json",
      requestOptions
    )
      .then((response) => response.json())
      .catch(() => console.log("add backup data"))
      .then((response) => setData(response));
  }, []);

  return (
    <React.Fragment>

      <Route path='/PhotoGallery-V2' exact> 
        <Redirect to='gallery' />
      </Route>

      <Route path='/gallery'>

        <div className="app">
          <UserProfile />

          {data &&
            data.map((image) => (
              <Photos
                source={image.url}
                location={image.location}
                description={image.descreption}
                alt={`Photo-${image.id}`}
                id = {image.id}
                key={Math.random()}
              />
            ))}
        </div>
      </Route>

      <Route path='/picture/:id'>
         <Picture />
      </Route>

    </React.Fragment>
  );
}

export default App;
