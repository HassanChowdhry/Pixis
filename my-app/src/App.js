import UserProfile from './components/UserProfile';
import Photos from './components/Photos';
import ImageArray from './components/Images';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <UserProfile />
      {ImageArray.map((image) => <Photos source={image} />)}
      
    
    </div>
  );
}

export default App;
