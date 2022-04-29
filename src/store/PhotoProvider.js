import { useEffect, useState } from "react";
import PhotoContext from "./photo-context";

function PhotoProvider(props) {
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

  const phContext = [
    data.map((image) => {
      return {
        url: image.url,
        description: image.description,
        location: image.location,
        id: image.id
      };
    }),
  ];

  return (
  <PhotoContext.Provider value={phContext}>
    {props.children}
  </PhotoContext.Provider>
  )
};

export default PhotoProvider;
