import UserProfile from "./components/UserProfile";
import Photos from "./components/Photos";
import ImageArray from "./components/Images";
import "./App.css";

function App() {
  return (
    <div className="App">

      <UserProfile />
      
      {ImageArray.map((image, index) => (
        <Photos source={image} alt={`photo-${index + 1}`} key={Math.random()} />
      ))}

    </div>
  );
}

export default App;
