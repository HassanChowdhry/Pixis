import { useState } from 'react';
import "./Form.css"

function PhotoUploadForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    console.log(
      `title : ${title}, description: ${description}, location: ${location}, preview: ${preview}`
    );
    props.onClick();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="file" onChange={handleImageChange} />
        {preview && <img className="form-image" src={preview} alt="Preview" />}
        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

export default PhotoUploadForm;
