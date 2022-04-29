import React from 'react';

const PhotoContext = React.createContext([{
  url:'',
  description:'',
  location:'',
  id:''
}]);

export default PhotoContext;