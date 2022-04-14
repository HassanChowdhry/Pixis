import {Router, Route} from 'react-router';

import UserProfile from './components/UserProfile';
import Photos from './components/Photos';
import ImageArray from './components/Images';
import Picture from './components/Picture';
import "./App.css";

function App() {
  return (
    <div className="App">

      <UserProfile />
      
      {ImageArray.map((image, index) => (
        <Photos source={image} alt={`photo-${index + 1}`} key={Math.random()} />
      ))}

      <Router>
        <Route path='photo' component={Picture} />
      </Router>

    </div>
  );
}

export default App;
