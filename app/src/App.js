import { Routes, Route } from 'react-router-dom';
import UserPage from "./Components/User/UserPage.js";
import "./App.css";

function App() {
  return (
  <>
    <Routes>
      {/* <Route path='/' exact> 
        <Redirect to='/hassan' />
      </Route> */}
      <Route path='/:user' element={<UserPage/>} />
    </Routes>
  </>
  );
}

export default App;








// import { useEffect, useState } from "react";

// import UserProfile from "./Components/User/UserProfile.js";
// import Photos from "./Components/Gallery/Photos.js";
// // import Picture from "./Components/junk/Picture.js";
// import "./App.css";

// function App() {
//   const [photoData, setPhotoData] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     let myHeaders = new Headers();
//     myHeaders.append("Origin", window.origin);

//     let requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     const user = "hassan"

//     fetch(
//       `http://localhost:8080/api/user_data/${user}`,
//       requestOptions
//     )
//     .then((response) => response.json())
//     .catch(() => console.log("add backup data"))
//     .then((response) => {
//       setUserData(response[0]);
//       console.log("User Data")
//       console.log(response)
//       })

//     fetch(
//       `http://localhost:8080/api/photos/${user}`,
//       requestOptions
//     )
//     .then((response) => response.json())
//     .catch(() => console.log("add backup data"))
//     .then((response) => {
//       setPhotoData(response);
//       console.log("Photo")
//       console.log(response)
//       })
//   }, []);

//   return (
//     <>
//         <div className="app">
//           {userData && <UserProfile userData={userData}/>}

//           {photoData &&
//             photoData.map((image) => (
//               <Photos
//                 source={image.source}
//                 location={image.location}
//                 caption={image.caption}
//                 alt={`Photo-${image.id}`}
//                 id = {image.id}
//                 key={image.id}
//               />
//             ))}
          
//         </div>
//     </>
//   );
// }

// export default App;

// import "./App.css";
