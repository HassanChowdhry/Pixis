import React, { useState } from 'react';
import "./Login.css";

const ProfileUpdateForm = () => {
  const [biography, setBiography] = useState('');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [useDefaultPfp, setUseDefaultPfp] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUseDefaultPfp(false);
    }
  };

  const handleDefaultPfpChange = () => {
    setUseDefaultPfp(!useDefaultPfp);
    if (!useDefaultPfp) {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!biography) {
      setError('Biography is required');
      return;
    }

    setError('');

    // Here, you would normally handle the form submission,
    // e.g., sending the data to your server.
    console.log({
      biography,
      file,
      useDefaultPfp
    });
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Complete Profile</div>
      </div>
      <div className='inputContainer'>
        <input
          value={biography}
          placeholder="Please input your biography"
          type='text'
          onChange={(e) => setBiography(e.target.value)}
          className='inputBox'
          required
        />
       {error && <label className="errorLabel">{error}</label>}
      </div>
      <div className='inputContainer'>
        <input
            className='inputBox'
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            disabled={useDefaultPfp}
          />
      </div>
      <div className='inputContainer'>
        <input
            type="checkbox"
            checked={useDefaultPfp}
            onChange={handleDefaultPfpChange}
            className="checkbox"
          />
          <label>Use Default Profile Picture</label>
      </div>
      {preview && <img className="form-image" src={preview} alt="Profile Preview" />}
      <div className='buttonContainer'>
        <button className='user-button' type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
    // <div className="mainContainer">
    //   <div className="titleContainer">
    //     <div>Complete Profile</div>
    //   </div>
    //   <form className='inputContainer' onSubmit={handleSubmit}>
    //     <textarea
    //       className='inputBox bio'
    //       placeholder="Biography"
    //       value={biography}
    //       onChange={(e) => setBiography(e.target.value)}
    //       required
    //     />
    //     {error && <label className="errorLabel">{error}</label>}
    //     <input
    //       className='inputBox'
    //       type="file"
    //       onChange={handleImageChange}
    //       accept="image/*"
    //       disabled={useDefaultPfp}
    //     />
    //     <div className="buttonContainer">
    //       <input
    //         type="checkbox"
    //         checked={useDefaultPfp}
    //         onChange={handleDefaultPfpChange}
    //         className="checkbox"
    //       />
    //       <label>Use Default Profile Picture</label>
    //     </div>
    //     {preview && <img className="form-image" src={preview} alt="Profile Preview" />}
    //     <div className="buttonContainer">
    //       <button className='user-button update-profile-button' type="submit">
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default ProfileUpdateForm;
