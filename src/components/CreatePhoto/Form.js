import { useState } from 'react';
import "./Form.css"

function PhotoUploadForm(props) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle the form submission here
    console.log(
      `description: ${description}, location: ${location}, preview: ${file}`
    );

    await postPicture()
    props.onClick();
  };

  const postPicture = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Origin", window.origin);
    
    const formData = new FormData();
    formData.append('photo', file); // 'photo' is the key multer uses to process the file
    formData.append('location', location);
    formData.append('description', description);

    fetch("http://localhost:8080/api/photos", {
      method: "POST",
      headers: myHeaders,
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="file" onChange={handleImageChange} />
        {preview && <img className="form-image" src={preview} alt="Preview" accept="image/*" />}
        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

export default PhotoUploadForm;
